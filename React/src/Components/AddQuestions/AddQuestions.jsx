import React, { useEffect, useState } from 'react'
import Navbars from '../Navbar/Navbar'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import './AddQuestions.css'
import Group from '../../assets/ThreeDots.png'
import Tick from '../../assets/CorrectAns.png'
import { toast } from 'react-toastify'

const AddQuestions = () => {
  const [getAllDept, setNewDept] = useState([]);
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [Level, setLevel] = useState([]);
  const [question, setQuestion] = useState('');
  const [type, setType] = useState([]);
  const [showOption, setShowOption] = useState(false);
  const [getTopic, setNewTopic] = useState([]);
  const [postQuestion, setPostQuestion] = useState({
    topicId: 0,
    skillId: 0,
    questionTypeId: 0,
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: [''],
    explanation: ''
  });
  const [newOpt1, setNewOpt1] = useState('');
  const [newOpt2, setNewOpt2] = useState('');
  const [newOpt3, setNewOpt3] = useState('');
  const [newOpt4, setNewOpt4] = useState('');
  const [inputsDisabled, setInputsDisabled] = useState(false); // Initially not disabled
  const [showLimitMessage, setShowLimitMessage] = useState(false);
  const [clickedStates, setClickedStates] = useState({
    optionA: false,
    optionB: false,
    optionC: false,
    optionD: false
  });
  const [clickedStates2, setClickedStates2] = useState({
    optionA: false,
    optionB: false,
    optionC: false,
    optionD: false
  });
  const [done, setDone] = useState(false);

  useEffect(() => {
    fetchDepartment();
    fetchSkill();
    fetchQnType();
  }, []);

  const fetchDepartment = () => {
    fetch(`https://localhost:7281/api/GetAllDepartment`, {
      method: "GET",
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    })
      .then(async (data) => {
        const myData = await data.json();
        setNewDept(myData);
      })
      .catch((error) => {
        toast.error(error);
      });
  }

  const handleDepartmentChange = (event) => {
    setSelectedDept(event.target.value)
    const url = `https://localhost:7281/api/GetTopic?departmentId=${event.target.value}`;
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    })
      .then(async (data) => {
        const myData = await data.json();
        setNewTopic(myData);
      })
      .catch((error) => {
        toast.error(error);
      });
  }

  const fetchSkill = () => {
    fetch(`https://localhost:7281/HistoryTable/GetAllSkill`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    })
      .then(async (data) => {
        const myData = await data.json();
        setLevel(myData)
      })
      .catch((error) => {
        toast.error(error);
      })
  }
  const fetchQnType = () => {
    fetch(`https://localhost:7281/HistoryTable/GetAllQuestionType`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    })
      .then(async (data) => {
        const myData = await data.json();
        setType(myData)
      })
      .catch((error) => {
        toast.error(error);
      });
  }

  const handleTopicChange = (event) => {
    setPostQuestion({ ...postQuestion, topicId: event.target.value })
  }

  const handleQnType = (event) => {
    setSelectedType(event.target.value)
    setPostQuestion({ ...postQuestion, questionTypeId: event.target.value })
    setShowOption(true)
  }

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value)
    setPostQuestion({ ...postQuestion, question: event.target.value })
  }

  const handleOption1Change = (event) => {
    setPostQuestion({ ...postQuestion, option1: event.target.value })
    setNewOpt1(event.target.value)
  }

  const handleOption2Change = (event) => {
    setPostQuestion({ ...postQuestion, option2: event.target.value })
    setNewOpt2(event.target.value)
  }

  const handleOption3Change = (event) => {
    setPostQuestion({ ...postQuestion, option3: event.target.value })
    setNewOpt3(event.target.value)
  }

  const handleOption4Change = (event) => {
    setPostQuestion({ ...postQuestion, option4: event.target.value })
    setNewOpt4(event.target.value)
  }

  const handleAnswerChange = (event) => {
    setPostQuestion({
      ...postQuestion,
      answer: event.target.value,
      option1: '',
      option2: '',
      option3: '',
      option4: '',
    })
  }

  const handleExplanationChange = (event) => {
    setPostQuestion({ ...postQuestion, explanation: event.target.value })
  }

  const handleSaveButtonClick = () => {
    setInputsDisabled(true); // Disable inputs on save button click
  };

  const handleEditButtonClick = () => {
    setInputsDisabled(false)
  }

  const handleTickClick = (option) => {
    setClickedStates((prevStates) => ({
      ...prevStates,
      [option]: !prevStates[option],
    }))
    // Create a copy of the current answer array
    const newAnswer = [postQuestion.answer];
    // Depending on the option, append the corresponding newOpt value
    if (option === 'optionA') {
      newAnswer.push(newOpt1)
    } else if (option === 'optionB') {
      newAnswer.push(newOpt2)
    } else if (option === 'optionC') {
      newAnswer.push(newOpt3)
    } else if (option === 'optionD') {
      newAnswer.push(newOpt4)
    }
    setPostQuestion({ ...postQuestion, answer: newAnswer });
  };

  const handleTickClick2 = (option) => {
    // For question type 1, handle the single selection logic
    if (option === 'optionA') {
      setClickedStates2({
        optionA: true,
        optionB: false,
        optionC: false,
        optionD: false,
      })
      setPostQuestion({
        ...postQuestion,
        answer: postQuestion.option1,
      })
    } else if (option === 'optionB') {
      setClickedStates2({
        optionA: false,
        optionB: true,
        optionC: false,
        optionD: false,
      })
      setPostQuestion({
        ...postQuestion,
        answer: postQuestion.option2,
      })
    } else if (option === 'optionC') {
      setClickedStates2({
        optionA: false,
        optionB: false,
        optionC: true,
        optionD: false,
      })
      setPostQuestion({
        ...postQuestion,
        answer: postQuestion.option3,
      })
    } else if (option === 'optionD') {
      setClickedStates2({
        optionA: false,
        optionB: false,
        optionC: false,
        optionD: true,
      })
      setPostQuestion({
        ...postQuestion,
        answer: postQuestion.option4,
      })
    }
  };

  const PostQnFunction = () => {
    console.log(postQuestion)
    if (postQuestion.answer.length === 1) {
      fetch('https://localhost:7281/api/AddNewQuestions', {
        method: 'POST',
        headers: {
          accept: 'text/plain',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
        body: JSON.stringify(postQuestion),
      })
        .then(async (data) => {
          if (data.status === 200) {
            var user = await data.json();
            setDone(true)
            setShowLimitMessage(true)
            setTimeout(() => {
              setShowLimitMessage(false)
              setDone(false)
            }, 2500)
          }
        })
        .catch((error) => {
          alert('Not Posted Successfully!!');
          console.log(error)
        })
    }
    if (selectedType === 3) {
      fetch('https://localhost:7281/api/AddNewQuestions', {
        method: 'POST',
        headers: {
          accept: 'text/plain',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
        body: JSON.stringify(postQuestion),
      })
        .then(async (data) => {
          if (data.status === 200) {
            var user = await data.json();
            setDone(true)
            setShowLimitMessage(true)
            setTimeout(() => {
              setShowLimitMessage(false)
              setDone(false)
            }, 2500)
          }
        })
        .catch((error) => {
          alert('Not Posted Successfully!!');
        })
    }
    if (postQuestion.answer.length > 1) {
      console.log(123)
      for (let i = 1; i <= postQuestion.answer.length; i++) {
        const answerValue = postQuestion.answer[i];
        const modifiedPostQuestion = {
          ...postQuestion,
          answer: answerValue
        };
        fetch('https://localhost:7281/api/AddNewQuestions', {
          method: 'POST',
          headers: {
            accept: 'text/plain',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          },
          body: JSON.stringify(modifiedPostQuestion),
        })
          .then(async (data) => {
            if (data.status === 200) {
              var user = await data.json();
              setDone(true)
              setShowLimitMessage(true)
              setTimeout(() => {
                setShowLimitMessage(false)
                setDone(false)
              }, 2500)
            }
          })
          .catch((error) => {
            alert('Not Posted Successfully!!');
            console.log(error)
          })
      }
    }
  }

  return (
    <>
      <Navbars
        title="Add Questions"
        desc="Add questions under selected department and topics"
      ></Navbars>
      <div className="question-container">

        <div className='depart-margin-tag'>
          <Box>
            <FormControl className="depart-tag">
              <InputLabel id="demo-simple-select-label">
                Department
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Select Department"
                value={selectedDept}
                onChange={handleDepartmentChange}
                sx={{
                  '@media (max-width: 1280px)': {
                    width: '1000px'
                  },
                }}
              >
                {getAllDept.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.departmentName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div>

        <div
          className="question-border"
          style={{ height: selectedType === '' ? '329px' : '629px' }}
        >
          <div className="topic-head">
            <Box>
              <FormControl className="topic-tag">
                <InputLabel id="demo-simple-select-label2">Topic</InputLabel>
                <Select
                  labelId="demo-simple-select-label2"
                  id="demo-simple-select2"
                  label="Select Department"
                  onChange={handleTopicChange}
                  disabled={inputsDisabled}
                  sx={{
                    '@media (max-width: 1280px)': {
                      width: '1000px',
                    },
                  }}
                >
                  {getTopic.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.topicName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </div>
          <div className="level-head">
            <div>Select Level:</div>
            {Level.map((option) => (
              <div className='margin-level'>
                <label key={option.id}>
                  <div className="level-align">
                    <div>
                      <input
                        type="radio"
                        name="options"
                        value={option.id}
                        id={option.id}
                        onChange={() =>
                          setPostQuestion({
                            ...postQuestion,
                            skillId: option.id,
                          })
                        }
                        disabled={inputsDisabled}
                      />
                    </div>
                    <div className="lvl-img">
                      <img
                        src={require(`../../assets/${option.skillLevel}.png`)}
                        width="18px"
                        height="18px"
                        alt="img"
                      />
                    </div>
                    <div className="marg-level-left">{option.skillLevel}</div>
                  </div>
                </label>
              </div>
            ))}
          </div>
          <div className='flex-space-btw'>
            <div className='topic-head'>
              <TextField id="outlined-basic" label="Type your question" value={question} onChange={handleQuestionChange} variant="outlined" className="topic-tag" disabled={inputsDisabled}
                sx={{
                  '@media (max-width: 1280px)': {
                    width: '1000px',
                  },
                }}
              />
            </div>
            <div className="type-head">
              <Box>
                <FormControl className="type-tag">
                  <InputLabel id="demo-simple-select-label3">
                    Answer Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label3"
                    id="demo-simple-select3"
                    label="Answer Type"
                    value={selectedType}
                    onChange={handleQnType}
                    disabled={inputsDisabled}
                  >
                    {type.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.questionTypes}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </div>
          </div>

          {showOption &&
            (selectedType === 2 ? (
              <div className="flex-space">
                <div>
                  <div className="flex-width">
                    <div className="flex-opt">
                      <div className="img-group">
                        <img src={Group}></img>
                      </div>
                      <div>
                        <TextField
                          id="outlined-basic1"
                          label="Option A"
                          variant="outlined"
                          className="option-tag"
                          onChange={handleOption1Change}
                          disabled={inputsDisabled}
                        />
                      </div>
                    </div>
                    <div
                      className={`tick-box ${clickedStates.optionA ? 'selected' : ''
                        }`}
                      onClick={() => handleTickClick('optionA')}
                      disabled={inputsDisabled}
                    >
                      <img src={Tick} className="tick-img"></img>
                    </div>
                  </div>
                  <div className='flex-width'>
                    <div className='flex-opt'>
                      <div className='img-group'>
                        <img src={Group}></img>
                      </div>
                      <div>
                        <TextField
                          id="outlined-basic2"
                          label="Option B"
                          variant="outlined"
                          className="option-tag"
                          onChange={handleOption2Change}
                          disabled={inputsDisabled}
                        />
                      </div>
                    </div>
                    <div
                      className={`tick-box ${clickedStates.optionB ? 'selected' : ''
                        }`}
                      onClick={() => handleTickClick('optionB')}
                    >
                      <img src={Tick} className="tick-img"></img>
                    </div>
                  </div>
                  <div className='flex-width'>
                    <div className='flex-opt'>
                      <div className='img-group'>
                        <img src={Group}></img>
                      </div>
                      <div>
                        <TextField
                          id="outlined-basic3"
                          label="Option C"
                          variant="outlined"
                          className="option-tag"
                          onChange={handleOption3Change}
                          disabled={inputsDisabled}
                        />
                      </div>
                    </div>
                    <div
                      className={`tick-box ${clickedStates.optionC ? 'selected' : ''
                        }`}
                      onClick={() => handleTickClick('optionC')}
                    >
                      <img src={Tick} className="tick-img"></img>
                    </div>
                  </div>
                  <div className='flex-width'>
                    <div className='flex-opt'>
                      <div className='img-group'>
                        <img src={Group}></img>
                      </div>
                      <div>
                        <TextField
                          id="outlined-basic4"
                          label="Option D"
                          variant="outlined"
                          className="option-tag"
                          onChange={handleOption4Change}
                          disabled={inputsDisabled}
                        />
                      </div>
                    </div>
                    <div
                      className={`tick-box ${clickedStates.optionD ? 'selected' : ''
                        }`}
                      onClick={() => handleTickClick('optionD')}
                    >
                      <img src={Tick} className="tick-img"></img>
                    </div>
                  </div>
                </div>
                <div>
                  <Box
                    sx={{
                      '& .MuiTextField-root': {
                        marginRight: '18px',
                        width: '260px',
                        marginTop: '36px',
                      },
                    }}
                  >
                    <TextField
                      id="outlined-multiline-static"
                      label="Explanation"
                      multiline
                      rows={7}
                      onChange={handleExplanationChange}
                      disabled={inputsDisabled}
                    />
                  </Box>
                </div>
              </div>
            ) : selectedType === 1 ? (
              <div className="flex-space">
                <div>
                  <div className="flex-width">
                    <div className="flex-opt">
                      <div className="img-group">
                        <img src={Group}></img>
                      </div>
                      <div>
                        <TextField
                          id="outlined-basic1"
                          label="Option A"
                          variant="outlined"
                          className="option-tag"
                          onChange={handleOption1Change}
                          disabled={inputsDisabled}
                        />
                      </div>
                    </div>
                    <div
                      className={`tick-box ${clickedStates2.optionA ? 'selected' : ''
                        }`}
                      onClick={() => handleTickClick2('optionA')}
                      disabled={inputsDisabled}
                    >
                      <img src={Tick} className="tick-img"></img>
                    </div>
                  </div>
                  <div className='flex-width'>
                    <div className='flex-opt'>
                      <div className='img-group'>
                        <img src={Group}></img>
                      </div>
                      <div>
                        <TextField
                          id="outlined-basic2"
                          label="Option B"
                          variant="outlined"
                          className="option-tag"
                          onChange={handleOption2Change}
                          disabled={inputsDisabled}
                        />
                      </div>
                    </div>
                    <div
                      className={`tick-box ${clickedStates2.optionB ? 'selected' : ''
                        }`}
                      onClick={() => handleTickClick2('optionB')}
                    >
                      <img src={Tick} className="tick-img"></img>
                    </div>
                  </div>
                  <div className='flex-width'>
                    <div className='flex-opt'>
                      <div className='img-group'>
                        <img src={Group}></img>
                      </div>
                      <div>
                        <TextField
                          id="outlined-basic3"
                          label="Option C"
                          variant="outlined"
                          className="option-tag"
                          onChange={handleOption3Change}
                          disabled={inputsDisabled}
                        />
                      </div>
                    </div>
                    <div
                      className={`tick-box ${clickedStates2.optionC ? 'selected' : ''
                        }`}
                      onClick={() => handleTickClick2('optionC')}
                    >
                      <img src={Tick} className="tick-img" alt='tickImg'/>
                    </div>
                  </div>
                  <div className='flex-width'>
                    <div className='flex-opt'>
                      <div className='img-group'>
                        <img src={Group} alt='groupImg'></img>
                      </div>
                      <div>
                        <TextField
                          id="outlined-basic4"
                          label="Option D"
                          variant="outlined"
                          className="option-tag"
                          onChange={handleOption4Change}
                          disabled={inputsDisabled}
                        />
                      </div>
                    </div>
                    <div
                      className={`tick-box ${clickedStates2.optionD ? 'selected' : ''
                        }`}
                      onClick={() => handleTickClick2('optionD')}
                    >
                      <img src={Tick} className="tick-img"></img>
                    </div>
                  </div>
                </div>
                <div>
                  <Box
                    sx={{
                      '& .MuiTextField-root': {
                        marginRight: '18px',
                        width: '260px',
                        marginTop: '36px',
                      },
                    }}
                  >
                    <TextField
                      id="outlined-multiline-static"
                      label="Explanation"
                      multiline
                      rows={7}
                      onChange={handleExplanationChange}
                      disabled={inputsDisabled}
                    />
                  </Box>
                </div>
              </div>
            ) : selectedType === 3 ? (
              <div>
                <div className="flex-space">
                  <div>
                    <div className="flex-width">
                      <Box
                        sx={{
                          '& .MuiTextField-root': {
                            width: '1182px',
                            marginLeft: '20px',
                            marginTop: '16px',
                          },
                          '@media (max-width: 1280px)': {
                            '& .MuiTextField-root': { width: '1000px' },
                          },
                        }}
                      >
                        <TextField
                          id="outlined-multiline-static"
                          label="Answer"
                          multiline
                          rows={10.5}
                          onChange={handleAnswerChange}
                          disabled={inputsDisabled}
                          sx={{
                            '@media (max-width: 1280px)': {
                              width: '800px',
                            },
                          }}
                        />
                      </Box>
                    </div>
                  </div>
                  <div>
                    <Box
                      sx={{
                        '& .MuiTextField-root': {
                          marginRight: '18px',
                          width: '260px',
                          marginTop: '36px',
                        },
                      }}
                    >
                      <TextField
                        id="outlined-multiline-static"
                        label="Explanation"
                        multiline
                        rows={7}
                        onChange={handleExplanationChange}
                        disabled={inputsDisabled}
                      />
                    </Box>
                  </div>
                </div>
              </div>
            ) : null
            )}
          <div className='margin-top-ques'>
            <hr></hr>
          </div>
          <div className="save-edit-flex">
            <div className="save-edit">
              <div className="save-btn" onClick={handleSaveButtonClick}>
                Save
              </div>
              <div className="edit-btn" onClick={handleEditButtonClick}>
                Edit
              </div>
            </div>
            <div>
            </div>
          </div>
        </div>
        <div className="question-base">
          <div className="ques-submit" onClick={PostQnFunction}>
            Submit Question
          </div>
        </div>
      </div>
      {done && (
        <div
          className="limit-reached"
          style={{ display: showLimitMessage ? 'block' : 'none' }}
        >
          Successfully Posted!!
        </div>
      )}
    </>
  )
}

export default AddQuestions
