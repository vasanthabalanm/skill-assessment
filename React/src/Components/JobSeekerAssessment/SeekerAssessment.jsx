import React from 'react'
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import InputAdornment from '@mui/material/InputAdornment';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import kaniniLogo from '../../assets/formlogo.png';
import Drawer from '@mui/material/Drawer';
import '../EmployeeAssessment/EmployeeAssessment.css';
import { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import successGif from '../../assets/Sent Successfully.gif'
import copy from "copy-to-clipboard";
import axios from 'axios';
import Basic from '../../assets/Basic.png'
import Intermediate from '../../assets/Intermediate.png'
import Advanced from '../../assets/Advanced.png'
//send popup

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 640,
    height: 320,
    bgcolor: 'background.paper',
    borderRadius: "15px",
    boxShadow: 24,
    p: 4,
};

const ITEM_HEIGHT = 58;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: '654px',
        },
    },
};

const SeekerAssessment = ({ onClose }) => {

    const [getAllDept, setNewDept] = useState([]);
    const [getAllJS, setNewJS] = useState([]);
    const [department, setDepartment] = React.useState('');
    const [TopicName, setTopicName] = React.useState([]);
    const [state, setState] = React.useState({
        right: true,
    });
    const [formValues, setFormValues] = useState({
        userId: '',
        assessmentId: '',
        numberOfTopics: 0,
        numberOfQuestions: 0,
        totalTime: 0,
        dateOfCreation: '',
        dateOfCompletion: '',
        description: '',
        assessmentHistoryId: null
    });
    const currentDate = new Date().toISOString().slice(0, 10);
    const [questionNo, setQuestionNo] = useState(0);
    const [noquestion, setNoQuestion] = useState(0);
    const [topicInData, setTopicInData] = useState([])
    const [description, setDescription] = useState('');
    const [assessmentId, setAssessmentId] = useState('');
    const [topicNumber, setTopicNumber] = useState('');
    const [formValuesList, setFormValuesList] = useState([]);
    const [selectedEmployeeIds, setSelectedEmployeeIds] = useState([]);





    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{
                width: anchor === 'left' ? 'auto' : 750,
            }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, true)}
        >
            <List></List>
        </Box>
    );

    const [chips, setChips] = React.useState([]);
    const [mail, setmail] = useState([])
    const [isInputActive2, setIsInputActive2] = React.useState(false);
    const [isInputActive1, setIsInputActive1] = React.useState(false);
    const [getTopicNamed, setTopicNamed] = useState([]);
    const [inputValue1,] = React.useState('');
    const [getEmpName, setEmpName] = useState([]);
    const [inputValue, setInputValue] = React.useState('');
    const [isInputActive, setIsInputActive] = React.useState(false);
    const [skillIdCheck, setSkillCheck] = useState(0)
    const handleInputMouseDown2 = () => {
        setIsInputActive2(true);
    };
    const handleInputBlur2 = () => {
        setIsInputActive2(true);
    };

    const [getNewJS, setNewJs] = useState([]);

    const handleAddChip = () => {
        if (inputValue.trim() !== '') {
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(inputValue)) {
                console.log('Invalid email');
                return;
            }
            console.log(inputValue);
            const trimmedLabel = inputValue.split('@')[0].trim();
            const newChip = {
                id: Date.now(),
                label: trimmedLabel,
                imageUrl: '/static/images/avatar/1.jpg',
            };
            setChips((prevChips) => [...prevChips, newChip]);
            setInputValue('');
            setmail(inputValue);

            const selectedEmail = Array.isArray(inputValue) ? inputValue : [inputValue];
            console.log('sn:', selectedEmail)
            const selectedIds = selectedEmail.map((name) => {
                console.log(name);
                console.log(getAllJS.userEmail)
                const jobseeker = getAllJS.find(
                    (emp) => emp.userEmail === name
                );
                console.log('check:', jobseeker)

                if (jobseeker) {
                    console.log('if', jobseeker.name)
                    setNewJs(jobseeker.name);
                    return jobseeker.empId;
                } else {
                    return null;
                }
            });

            setmail(selectedIds);

        }
    };

    const handleDeleteChip = (chipId) => {
        setChips((prevChips) => prevChips.filter((chip) => chip.id !== chipId));
    };

    const handleInputMouseDown = () => {
        setIsInputActive(true);
    };

    const handleInputBlur = () => {
        setIsInputActive(true);
    };

    const handleInputMouseDown1 = () => {
        setIsInputActive1(true);
    };
    const handleInputBlur1 = () => {
        setIsInputActive1(true);
    };


    const handleTextFieldClick = (event) => {
        event.stopPropagation();
        setIsTextFieldClicked(true);
    };

    const [isTextFieldClicked, setIsTextFieldClicked] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const handleChange = (event) => {
        setDepartment(event.target.value);
        //api call
        const url = `https://localhost:7281/HistoryTable/GetTopicsByDepartment?deptlist=${event.target.value}`;
        fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem('token')
            },
        })
            .then(async (data) => {
                const myData = await data.json();
                console.log(myData);
                setTopicName(myData);
                console.log(TopicName);
            })
            .catch((error) => {
                console.log("Error:", error);
            });
    };

    useEffect(() => {
        if (Object.keys(department).length > 0) {
            console.log(department);
        }
    }, [department]);



    const getAllTopicsFunction = async () => {
        const topicResponse = await axios.get(
            'https://localhost:7281/api/GetAllTopics', {
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem('token')
            },
        }
        )
        const topics = topicResponse.data
        setTopicInData(topics)
    }
    useEffect(() => {
        getAllTopicsFunction()
    }, [])



    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = () => {
        console.log('Adding department:', department);
    };
    const [personName, setPersonName] = React.useState([]);

    const handlePersonChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            typeof value === 'string' ? value.split(',') : value,
        );


    };
    const renderValue = (selected) => {
        if (selected.length === 0) {
            return 'Select';
        }

        if (selected.length <= 2) {
            return selected.join(', ');
        }
        setTopicNumber(selected);
        return `${selected.slice(0, 2).join(', ')} & ${selected.length - 2} more (${selected.length})`;
    };

    const [TopicNameComma, setTopicNameComma] = useState([]);
    const [removeSelected, setRemoveSelected] = useState(false)
    const [removeSelected2, setRemoveSelected2] = useState(false)
    const handleTopicChange = (event) => {
        const {
            target: { value },
        } = event;
        setTopicNameComma(
            typeof value === 'string' ? value.split(',') : value,
        );

        const selectedTopics = Array.isArray(value) ? value : [value];
        console.log('sn:', selectedTopics)
        const selectedIds = selectedTopics.map((name) => {
            const employee = topicInData.find(
                (emp) => emp.topicName === name
            );
            console.log('check:', employee)

            if (employee) {
                console.log('if', employee.id)
                setTopicNamed(prevNames => [...prevNames, employee.id]);
                return employee.id;
            } else {
                return null;
            }
        });
    };
    //Topic
    const handleApplyTopic = () => {
        setRemoveSelected(false)
    }

    const handleCloseTopic = () => {
        setTopicNameComma([])
        setRemoveSelected(false)
    }
    //Employee
    const handleApplyEmp = () => {
        setRemoveSelected2(false)
    }

    const handleCloseEmp = () => {
        setPersonName([])
        setRemoveSelected2(false)
    }

    const routeToPage = () => {
        window.location.href = '/ExamPortal'
    }

    const fetchDepartment = () => {
        fetch(`https://localhost:7281/api/GetAllDepartment`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem('token')
            },
        })
            .then(async (data) => {
                const myData = await data.json();
                console.log(myData);
                setNewDept(myData)
                console.log(getAllDept);
            })
            .catch((error) => {
                console.log("Error:", error);
            });
    }

    useEffect(() => {
        fetchDepartment();
    }, []);

    //get all employee

    const fetchEmployee = () => {
        fetch(`https://localhost:7281/HistoryTable/HistoryDetails?roleName=JobSeeker`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem('token')
            },
        })
            .then(async (data) => {
                const myData = await data.json();
                console.log(myData);
                setNewJS(myData)
                console.log(getAllJS);
            })
            .catch((error) => {
                console.log("Error:", error);
            });
    }

    useEffect(() => {
        fetchEmployee();
    }, []);

    // Post Assessment

    const [updateDateValue, setUpdateDateValue] = useState('')

    const postAssessment = () => {
        const updatedFormValuesList = [];
        for (let i = 0; i < mail.length; i++) {
            console.log(mail);
            const id = mail[i];
            const formValues = {
                userId: id,
                assessmentId: assessmentId,
                numberOfTopics: TopicNameComma.length,
                numberOfQuestions: 1 * noquestion,
                totalTime: questionNo * 1,
                dateOfCreation: currentDate,
                dateOfCompletion: updateDateValue,
                description: description,
                assessmentHistoryId: null,
            };
            updatedFormValuesList.push(formValues);
        }

        setFormValuesList(updatedFormValuesList);
        console.log(formValuesList)

        postQuestions();
        postEmail();
    }


    useEffect(() => {
        console.log("FormValuesList Updated: ", formValuesList);
        PostData()
    }, [formValuesList]);

    //Post through api for assessed to
    const PostData = () => {
        //POST
        for (let i = 0; i < formValuesList.length; i++) {
            fetch(`https://localhost:7281/HistoryTable/PostExistingAssessment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + sessionStorage.getItem('token')
                },
                body: JSON.stringify(formValuesList[i]),
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Posted Successfully");
                    postQuestions();
                    handleModalOpen(true);
                })
                .catch(error => {
                    console.error('Error fetching topics:', error);
                });
        }
    }

    const postQuestions = async () => {
        console.log(skillIdCheck)
        console.log(formValues.numberOfQuestions)
        console.log(getTopicNamed)
        try {
            console.log('random')
            console.log(getNewJS)
            const url = `https://localhost:7281/HistoryTable/PostingAssessmentDetails?assessId=${assessmentId}&names=${getNewJS}`;
            console.log('getinrandom')
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + sessionStorage.getItem('token')
                },
                body: JSON.stringify({
                    questionCount: noquestion,
                    skillId: skillIdCheck,
                    topicIds: getTopicNamed
                }),
            });

            const data = await response.json();
            if (response.status === 200) {
                handleModalOpen(true);
            }
        } catch (error) {
            console.error('Error fetching topics:', error);
        }

    }

    const postEmail = () => {

        const updatedFormValuesList = [];
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        console.log(formattedDate);

        for (let i = 0; i < selectedEmployeeIds.length; i++) {
            const id = selectedEmployeeIds[i];
            const formValues = {
                userId: id,
                assessmentId: assessmentId,
                sentTime: formattedDate
            };
            updatedFormValuesList.push(formValues);
        }
        for (let i = 0; i < formValuesList.length; i++) {
            try {
                console.log(1234)
                const url = `https://localhost:7281/api/AssesmentData/EmailPost`;
                console.log(5678)
                const response = fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + sessionStorage.getItem('token')
                    },
                    body: JSON.stringify(formValuesList[i]),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log("EmailPosted Successfully");
                        handleModalOpen(true);
                    })
            } catch (error) {
                console.error('Error fetching topics:', error);
            }
        }
    }

    const handleDateChange = (newValue) => {
        setUpdateDateValue(dayjs(newValue).format('YYYY-MM-DD'));
    };

    const handleQuestionNoChange = (event) => {
        setQuestionNo(event.target.value);
        setNoQuestion(event.target.value);
    };

    const handleAssessmentChange = (event) => {
        setAssessmentId(event.target.value);
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }

    // email sended successfully
    const [modalopen, setModalOpen] = React.useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);


    const [copyText, setCopyText] = React.useState('');

    const handleCopyText = (e) => {
        setCopyText(e.target.value);
    }

    const copyToClipboard = () => {
        copy(copyText);
        alert(`You have copied "${copyText}"`);
    }

    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={onClose}
                        onOpen={toggleDrawer(anchor, true)}
                        sx={{
                            '& .MuiBackdrop-root.MuiModal-backdrop': {
                                backgroundColor: '#143b6f48',
                            },
                        }}
                    >
                        {list(anchor)}
                        <form className='employeeForm'>
                            <div className="formHead">
                                <div>
                                    <h2 className="createHead">Create JobSeeker Assessment</h2>
                                </div>
                                <div className='crossleft'>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="closeImg"
                                        width="32"
                                        height="32"
                                        viewBox="0 0 32 32"
                                        fill="none"
                                        onClick={onClose}
                                    >
                                        <path
                                            d="M16 2C19.713 2 23.274 3.475 25.8995 6.1005C28.525 8.72601 30 12.287 30 16C30 19.713 28.525 23.274 25.8995 25.8995C23.274 28.525 19.713 30 16 30C12.287 30 8.72601 28.525 6.1005 25.8995C3.475 23.274 2 19.713 2 16C2 12.287 3.475 8.72601 6.1005 6.1005C8.72601 3.475 12.287 2 16 2ZM16 14.302L12.748 11.05C12.5228 10.8248 12.2174 10.6983 11.899 10.6983C11.5806 10.6983 11.2752 10.8248 11.05 11.05C10.8248 11.2752 10.6983 11.5806 10.6983 11.899C10.6983 12.2174 10.8248 12.5228 11.05 12.748L14.302 16L11.05 19.252C10.9385 19.3635 10.8501 19.4959 10.7897 19.6415C10.7294 19.7872 10.6983 19.9433 10.6983 20.101C10.6983 20.2587 10.7294 20.4148 10.7897 20.5605C10.8501 20.7061 10.9385 20.8385 11.05 20.95C11.1615 21.0615 11.2939 21.1499 11.4395 21.2103C11.5852 21.2706 11.7413 21.3017 11.899 21.3017C12.0567 21.3017 12.2128 21.2706 12.3585 21.2103C12.5041 21.1499 12.6365 21.0615 12.748 20.95L16 17.698L19.252 20.95C19.3635 21.0615 19.4959 21.1499 19.6415 21.2103C19.7872 21.2706 19.9433 21.3017 20.101 21.3017C20.2587 21.3017 20.4148 21.2706 20.5605 21.2103C20.7061 21.1499 20.8385 21.0615 20.95 20.95C21.0615 20.8385 21.1499 20.7061 21.2103 20.5605C21.2706 20.4148 21.3017 20.2587 21.3017 20.101C21.3017 19.9433 21.2706 19.7872 21.2103 19.6415C21.1499 19.4959 21.0615 19.3635 20.95 19.252L17.698 16L20.95 12.748C21.0615 12.6365 21.1499 12.5041 21.2103 12.3585C21.2706 12.2128 21.3017 12.0567 21.3017 11.899C21.3017 11.7413 21.2706 11.5852 21.2103 11.4395C21.1499 11.2939 21.0615 11.1615 20.95 11.05C20.8385 10.9385 20.7061 10.8501 20.5605 10.7897C20.4148 10.7294 20.2587 10.6983 20.101 10.6983C19.9433 10.6983 19.7872 10.7294 19.6415 10.7897C19.4959 10.8501 19.3635 10.9385 19.252 11.05L16 14.302Z"
                                            fill="#242D35"
                                        />
                                    </svg>
                                </div>
                            </div>

                            <Stack direction="column" spacing={1}>
                                <TextField
                                    className="seekerEmail"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            handleAddChip();
                                        }
                                    }}
                                    sx={{ marginLeft: '48px', width: '654px', marginTop: '36px' }}
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                {chips.map((chip) => (
                                                    <Chip
                                                        key={chip.id}
                                                        avatar={<Avatar alt="Avatar" src={chip.value} />}
                                                        label={chip.label}
                                                        variant="outlined"
                                                        onDelete={() => handleDeleteChip(chip.id)}
                                                    />
                                                ))}
                                            </InputAdornment>
                                        ),
                                    }}
                                    InputLabelProps={{
                                        shrink: isInputActive || inputValue.trim() !== '',
                                    }}
                                    onMouseDown={handleInputMouseDown}
                                    onBlur={handleInputBlur}
                                    label={!isInputActive ? 'Enter Jobseeker Mail ID' : 'Email ID'}
                                    onClick={handleTextFieldClick}
                                />
                            </Stack>

                            <div className='selectLevel'>Assessment Detail</div>

                            <TextField
                                helperText="Please enter the title of assessment that help you to manage"
                                id="outlined-basic"
                                variant="outlined"
                                className="assessmentId"
                                onMouseDown={handleInputMouseDown1}
                                onBlur={handleInputBlur1}
                                label={!isInputActive1 ? 'Enter Assessment ID' : 'Assessment ID'}
                                value={assessmentId}
                                onChange={handleAssessmentChange}
                                InputLabelProps={{
                                    shrink: isInputActive1 || inputValue1.trim() !== '',
                                }}
                                sx={{
                                    margin: '0px 40px 0px 48px',
                                    maxWidth: '654px',
                                    height: '27px',
                                    marginBottom: '60px',
                                    marginTop: '36px',

                                    '& .MuiOutlinedInput-root': {
                                        width: '654px'
                                    }
                                }}
                            />

                            <Box sx={{ marginLeft: '48px', width: '654px', marginTop: '36px' }}>
                                <FormControl className="departmentBox">
                                    <InputLabel id="demo-simple-select-label" >Department</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={department}
                                        label="Department"
                                        onChange={handleChange}
                                        open={open}
                                        onOpen={handleOpen}
                                        onClose={handleClose}
                                        sx={{ width: '654px' }}
                                    >

                                        {getAllDept.map((name) => (
                                            <MenuItem
                                                key={name}
                                                value={name.departmentName}
                                                sx={{
                                                    width: '654px',
                                                    height: '22px'
                                                }}
                                            >
                                                {name.departmentName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>

                            <h3 className='selectLevel'>Select Levels</h3>
                            <FormControl>
                                <RadioGroup row sx={{ marginLeft: '48px', width: '654px' }}>
                                    <FormControlLabel
                                        value="Basic"
                                        control={<Radio color="default" />}
                                        label={
                                            <React.Fragment>
                                                <div className='skill-level-flex'>
                                                    <div><img src={Basic} /></div>
                                                    <div className='skill-level-margin-left'>Basic</div>
                                                </div>
                                            </React.Fragment>
                                        }
                                        labelPlacement='start'
                                        onChange={() => { setSkillCheck(1) }}
                                    />
                                    <FormControlLabel
                                        value="Intermediate"
                                        control={<Radio color="default" />}
                                        sx={{ marginRight: '20px', marginLeft: '50px' }}
                                        label={
                                            <React.Fragment>
                                                <div className='skill-level-flex'>
                                                    <div><img src={Intermediate} /></div>
                                                    <div className='skill-level-margin-left'>Intermediate</div>
                                                </div>
                                            </React.Fragment>
                                        }
                                        labelPlacement='start'
                                        onChange={() => { setSkillCheck(2) }}
                                    />
                                    <FormControlLabel
                                        value="Advanced"
                                        control={<Radio color="default" />}
                                        label={
                                            <React.Fragment>
                                                <div className='skill-level-flex'>
                                                    <div><img src={Advanced} /></div>
                                                    <div className='skill-level-margin-left'>Advanced</div>
                                                </div>
                                            </React.Fragment>
                                        }
                                        sx={{ marginRight: 'px', marginLeft: '20px' }}
                                        labelPlacement='start'
                                        onChange={() => { setSkillCheck(3) }}
                                    />

                                </RadioGroup>
                            </FormControl>


                            <div>
                                <FormControl sx={{ marginLeft: '48px', width: '654px', marginTop: '36px' }}>
                                    <InputLabel id="demo-multiple-checkbox-label">Topics</InputLabel>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        multiple
                                        value={TopicNameComma}
                                        onChange={handleTopicChange}
                                        open={removeSelected}
                                        onOpen={() => setRemoveSelected(true)}
                                        onClose={() => setRemoveSelected(false)}
                                        input={<OutlinedInput label="Topics" />}
                                        renderValue={renderValue}
                                        MenuProps={MenuProps}
                                    >

                                        {TopicName.map((name) => (
                                            <MenuItem key={name} value={name}>
                                                <Checkbox checked={TopicNameComma.indexOf(name.name) > -1} />
                                                <ListItemText primary={name} />
                                            </MenuItem>
                                        ))}
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                                padding: '8px',
                                            }}
                                        >
                                            <Button onClick={handleCloseTopic}>Close</Button>
                                            <Button onClick={handleApplyTopic}>Apply</Button>
                                        </Box>

                                    </Select>
                                </FormControl>
                            </div>
                            <div className='divideBox'>
                                <div className='questionForm'>
                                    <Box
                                        component="form"
                                        sx={{
                                            '& > :not(style)': { marginLeft: '48px', width: '300px', marginTop: '36px' },
                                        }}
                                        Validate
                                        autoComplete="off"
                                    >
                                        <TextField id="outlined-basic" label="No.ofQuestions" type='number' onChange={handleQuestionNoChange} variant="outlined" />

                                    </Box>
                                    <p className='questionsPara'>Time alloted for a question is 60 sec.</p>

                                </div>
                                <div>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ width: '310px', marginTop: '36px' }}>
                                        <DemoContainer components={['DatePicker']}>
                                            <DatePicker label="Date of completion" sx={{
                                                width: '300px', marginTop: '48px', marginLeft: '100px', zIndex: '1',
                                                '& .MuiFormLabel-root': {
                                                    color: 'grey', // Set the text color to black
                                                    borderBottomColor: 'black', // Set the border color to black
                                                },
                                            }} format="DD/MM/YYYY"
                                                disablePast
                                                value={updateDateValue}
                                                onChange={handleDateChange}
                                                multiple />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                    <p className='datePara'>Valid till 11:59PM on the selected date</p>
                                </div>
                            </div>
                            <Box
                                sx={{
                                    '& .MuiTextField-root': { marginLeft: '48px', width: '654px', marginTop: '36px', marginBottom: '36px' },
                                }}
                            >
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Description"
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    multiline
                                    rows={5}
                                />
                            </Box>
                            <div className='mailButtons'>
                                <Stack spacing={2} direction="row">
                                    <Button className='cancelButton' onClick={onClose} variant="text">Cancel</Button>
                                    <Button className='sendButton' variant="outlined" onClick={postAssessment}>Send Mail</Button>
                                </Stack>
                            </div>
                        </form>
                        <img src={kaniniLogo} className='formLogo' height='240px' width='240px' alt="Kanini Logo" />
                    </Drawer>
                </React.Fragment>
            ))
            }
            <div>
                <Modal
                    open={modalopen}
                    onClose={handleModalClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalStyle}>
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="closeIcon"
                                width="28"
                                height="28"
                                viewBox="0 0 32 32"
                                fill="none"
                                onClick={onClose}
                            >
                                <path
                                    d="M16 2C19.713 2 23.274 3.475 25.8995 6.1005C28.525 8.72601 30 12.287 30 16C30 19.713 28.525 23.274 25.8995 25.8995C23.274 28.525 19.713 30 16 30C12.287 30 8.72601 28.525 6.1005 25.8995C3.475 23.274 2 19.713 2 16C2 12.287 3.475 8.72601 6.1005 6.1005C8.72601 3.475 12.287 2 16 2ZM16 14.302L12.748 11.05C12.5228 10.8248 12.2174 10.6983 11.899 10.6983C11.5806 10.6983 11.2752 10.8248 11.05 11.05C10.8248 11.2752 10.6983 11.5806 10.6983 11.899C10.6983 12.2174 10.8248 12.5228 11.05 12.748L14.302 16L11.05 19.252C10.9385 19.3635 10.8501 19.4959 10.7897 19.6415C10.7294 19.7872 10.6983 19.9433 10.6983 20.101C10.6983 20.2587 10.7294 20.4148 10.7897 20.5605C10.8501 20.7061 10.9385 20.8385 11.05 20.95C11.1615 21.0615 11.2939 21.1499 11.4395 21.2103C11.5852 21.2706 11.7413 21.3017 11.899 21.3017C12.0567 21.3017 12.2128 21.2706 12.3585 21.2103C12.5041 21.1499 12.6365 21.0615 12.748 20.95L16 17.698L19.252 20.95C19.3635 21.0615 19.4959 21.1499 19.6415 21.2103C19.7872 21.2706 19.9433 21.3017 20.101 21.3017C20.2587 21.3017 20.4148 21.2706 20.5605 21.2103C20.7061 21.1499 20.8385 21.0615 20.95 20.95C21.0615 20.8385 21.1499 20.7061 21.2103 20.5605C21.2706 20.4148 21.3017 20.2587 21.3017 20.101C21.3017 19.9433 21.2706 19.7872 21.2103 19.6415C21.1499 19.4959 21.0615 19.3635 20.95 19.252L17.698 16L20.95 12.748C21.0615 12.6365 21.1499 12.5041 21.2103 12.3585C21.2706 12.2128 21.3017 12.0567 21.3017 11.899C21.3017 11.7413 21.2706 11.5852 21.2103 11.4395C21.1499 11.2939 21.0615 11.1615 20.95 11.05C20.8385 10.9385 20.7061 10.8501 20.5605 10.7897C20.4148 10.7294 20.2587 10.6983 20.101 10.6983C19.9433 10.6983 19.7872 10.7294 19.6415 10.7897C19.4959 10.8501 19.3635 10.9385 19.252 11.05L16 14.302Z"
                                    fill="#717D8A"
                                />
                            </svg>
                        </div>
                        <img src={successGif} className='successGIF' alt="Sent Successfully" height='120px' width='120px' />
                        <h1 className='modalHeading'>Assessment assigned Successfully</h1>
                        <p className='modalPara'>The jobseeker assessment has been successfully sent through their respectful email id</p>
                        <div className="linkBox">
                            <div className='linkField'>
                                <TextField id="outlined-basic" label="Assessment link" variant="outlined"
                                    sx={{ width: '380px', cursor: 'pointer', color: 'blue', textDecoration: 'underlined' }}
                                    value="Assessment_Link_for_the_Generated_Assessment" // Set the initial value here
                                    onChange={handleCopyText}
                                    onClick={routeToPage}
                                />
                            </div>
                            <div className='copyButton'>
                                <Button variant="outlined" onClick={copyToClipboard}
                                    sx={{ padding: 1.7, color: '#717D8A', borderColor: '#717D8A', textTransform: 'none' }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="20" viewBox="0 0 17 20" fill="none">
                                        <path d="M1.5 20C1.1 20 0.75 19.85 0.45 19.55C0.15 19.25 0 18.9 0 18.5V3.425H1.5V18.5H13.35V20H1.5ZM4.5 17C4.1 17 3.75 16.85 3.45 16.55C3.15 16.25 3 15.9 3 15.5V1.5C3 1.1 3.15 0.75 3.45 0.45C3.75 0.15 4.1 0 4.5 0H15.5C15.9 0 16.25 0.15 16.55 0.45C16.85 0.75 17 1.1 17 1.5V15.5C17 15.9 16.85 16.25 16.55 16.55C16.25 16.85 15.9 17 15.5 17H4.5ZM4.5 15.5H15.5V1.5H4.5V15.5ZM4.5 15.5V1.5V15.5Z" fill="#717D8A" />
                                    </svg>&nbsp;
                                    Copy Link</Button>
                            </div>
                        </div>
                    </Box>
                </Modal>
            </div>
        </div >
    )
}

export default SeekerAssessment