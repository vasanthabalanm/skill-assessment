import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Drawer from '@mui/material/Drawer'
import close from '../../assets/close.png'
import Button from '@mui/material/Button'
import book from '../../assets/book.png'
import imp from '../../assets/import.png'
import {
  faChevronDown,
  faPlus,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import successfully from '../../assets/Topic added successfully.gif'
import { useNavigate } from 'react-router-dom'
const style = {
  position: 'absolute',
  top: '33%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
}
const ImportCSV = () => {
  const [csvLevel, setCsvLevel] = useState([])
  const [openImport, setOpenImport] = useState(false)
  const [csvFileContent, setCsvFileContent] = useState(null)
  const [csvDepartmentData, setCsvDepartmentData] = useState([])
  const [csvDepartment, setCsvDepartment] = useState([])
  const [deptBasedTopic, setDeptBasedTopic] = useState([])
  const [deptByTopicData, setDeptTopicByData] = useState([])
  const [selectedLevelOption, setSelectedLevelOption] = useState(0)
  const [formValid, setFormValid] = useState(false)
  const [removeSelected, setRemoveSelected] = useState(false)
  const [csvFile, setCsvFile] = useState(null)
  const [csvFileValid, setCsvFileValid] = useState(false)
  const [csvFileDropped, setCsvFileDropped] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [imported, setImported] = React.useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const departmentResponse = await axios.get(
        'https://localhost:7281/api/GetAllDepartment',
        {
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          },
        }
      )
      setCsvDepartmentData(departmentResponse.data)
      const levelResponse = await axios.get(
        'https://localhost:7281/api/GetAllSkillLevel',
        {
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          },
        }
      )
      setCsvLevel(levelResponse.data)
    } catch (error) {
      toast.error(error)
    }
  }

  const navigate = useNavigate()

  const handleDownloadTemplate = () => {
    const csvData =
      'QuestionType,Question,Option1,Option2,Option3,Option4,Answer,Explanation\n1,Which organization defines Web standard?,Apple Inc,IBM Corporation,World Wide Web Consortium,Microsoft Corporation,World Wide Web Consortium,The World Wide Web Consortium (W3C) is an international community that develops open standards to ensure the long-term growth of the Web'
    const blob = new Blob([csvData], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'sampleQuestion.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const openImportDiv = () => {
    setOpenImport(true)
  }

  const importClose = () => {
    setOpenImport(false)
  }

  const handleCsvDepartmentChange = (event) => {
    const DepartmentId = event.target.value
    setCsvDepartment(DepartmentId)
    topicBasedOnDept(DepartmentId)
    setDeptBasedTopic([])
    setRemoveSelected(false)
  }
  const topicBasedOnDept = async (DepartmentId) => {
    const topicByDept = await axios.get(
      `https://localhost:7281/api/GetTopic?departmentId=${DepartmentId}`,
      {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      }
    )
    setDeptTopicByData(topicByDept.data)
  }

  const handleChangeTopic = (event) => {
    setDeptBasedTopic(event.target.value)
  }

  useEffect(() => {
    console.log(deptBasedTopic)
  }, [deptBasedTopic])
  const handleCheckboxChange = (event, topicId) => {
    const isChecked = event.target.checked
    setDeptBasedTopic((prevTopics) => {
      if (isChecked) {
        return [...prevTopics, topicId]
      } else {
        return prevTopics.filter((prevTopic) => prevTopic !== topicId)
      }
    })
  }

  const handleApplyTopic = () => {
    setRemoveSelected(false)
  }

  const handleCloseTopic = () => {
    setDeptBasedTopic([])
    setRemoveSelected(false)
  }

  const renderTopicValue = (selected) => {
    if (selected.length === 0) {
      return 'None'
    }
    if (selected.length === 1) {
      const topic = deptByTopicData.find((topic) => topic.id === selected[0])
      return topic ? topic.topicName : 'Unknown'
    }
    if (selected.length === 2) {
      const topics = selected.map(
        (topicId) =>
          deptByTopicData.find((topic) => topic.id === topicId)?.topicName
      )
      return topics.join(' and ')
    }
    return `${deptByTopicData
      .filter((topic) => selected.includes(topic.id))
      .slice(0, 2)
      .map((topic) => topic.topicName)
      .join(', ')} and ${selected.length - 2} more`
  }

  const radioBtnChange = (event) => {
    setSelectedLevelOption(event.target.value)
  }

  useEffect(() => {
    validateForm()
  }, [selectedLevelOption])

  const handleCsvFileInput = async (event) => {
    const file = event.target.files[0]
    setCsvFileDropped(true)
    await validateCsvFile(file)
  }

  const handleCsvDrop = async (event) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    setCsvFileDropped(true)
    await validateCsvFile(file)
  }

  const handleCsvDragOver = (event) => {
    event.preventDefault()
    setCsvFileDropped(true)
  }

  const validateCsvFile = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        setCsvFile(null)
        setCsvFileValid(false)
        resolve(false)
      }
      const reader = new FileReader()
      reader.onload = function (e) {
        const contents = e.target.result
        setCsvFileContent(contents)
        const lines = contents.split('\n')
        const header = lines[0].trim()
        const expectedHeader =
          'QuestionType,Question,Option1,Option2,Option3,Option4,Answer,Explanation'
        if (header === expectedHeader) {
          setCsvFile(file)
          setCsvFileValid(true)
          resolve(true)
        } else {
          setCsvFile(null)
          setCsvFileValid(false)
          resolve(false)
        }
      }
      reader.onerror = function (e) {
        setCsvFile(null)
        setCsvFileValid(false)
        reject(new Error('Failed to read the file.'))
      }
      reader.readAsText(file)
    })
  }

  const validateForm = () => {
    const isDepartmentValid = csvDepartment !== ''
    const isLevelValid = selectedLevelOption > 0
    const isTopicValid = deptBasedTopic.length > 0
    setFormValid(isDepartmentValid && isLevelValid && isTopicValid)
  }

  const handleImportSubmit = () => {
    if (csvFileContent) {
      const lines = csvFileContent.split('\n')
      const header = lines[0].trim()
      const expectedHeader =
        'QuestionType,Question,Option1,Option2,Option3,Option4,Answer,Explanation'
      if (header === expectedHeader) {
        for (let i = 0; i < deptBasedTopic.length; i++) {
          const topicIdValue = deptBasedTopic[i]
          for (let lineIndex = 1; lineIndex < lines.length; lineIndex++) {
            const line = lines[lineIndex].trim()
            if (line === '') {
              continue
            }
            const values = line.split(',')
            const questionTypeId = values[0]?.trim() || ''
            const question = values[1]?.trim() || ''
            const option1 = values[2]?.trim() || ''
            const option2 = values[3]?.trim() || ''
            const option3 = values[4]?.trim() || ''
            const option4 = values[5]?.trim() || ''
            const answer = values[6]?.trim() || ''
            const explanation = values[7]?.trim() || ''
            const data = {
              topicId: topicIdValue,
              skillId: selectedLevelOption,
              questionTypeId,
              question,
              option1,
              option2,
              option3,
              option4,
              answer,
              explanation,
            }
            AddQuestion(data)
          }
        }
      } else {
        toast.error(
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
            'Give a valid CSV file'
          </span>,
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        )
      }
    }
  }
  const AddQuestion = async (data) => {
    try {
      const addQn = await axios.post(
        'https://localhost:7281/api/AddNewQuestions',
        data,
        {
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          },
        }
      )
      setImported(true)
    } catch (error) {
      toast.error(error)
    }
  }
  const handleButtonClick = () => {
    setIsModalVisible(true)
  }
  const handleCloseModal = () => {
    setIsModalVisible(false)
  }
  const closeImported = () => {
    window.location.reload()
    setCsvFile(null)
    setImported(false)
  }
  return (
    <div>
      <div>
        <button className="addqns" onClick={handleButtonClick}>
          Add Questions
          <span className="faIcon">
            <FontAwesomeIcon icon={faChevronDown} />
          </span>
        </button>
        {isModalVisible && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div
                className="Hover"
                onClick={() => {
                  navigate('/AddQuestion')
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
                &nbsp; Add Questions
              </div>
              <div className="Hover" onClick={openImportDiv}>
                <img src={imp} alt="" />
                &nbsp; Import Questions
              </div>
            </div>
          </div>
        )}
      </div>
      <Modal
        open={imported}
        onClose={closeImported}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={style}>
          <div className="third-page" id="third">
            <div className="successfully">
              <div className="close-btn">
                <button className="closebtn">
                  <img src={close} alt="" onClick={closeImported} />
                </button>
              </div>
              <div className="gif">
                <img
                  className="success"
                  src={successfully}
                  alt="topic added successfully"
                />
              </div>
              <div className="added">Questions Imported Successfully</div>
              <div className="added-sec">
                Questions has been imported successfully, it will be reflected
                on question bank in few minutes
              </div>
            </div>
          </div>
        </Box>
      </Modal>
      <div className="csv-import">
        <Drawer anchor="right" open={openImport} onClose={importClose}>
          <div style={{ width: 755 }} className="importCSV">
            <div className="overall-import-content">
              <div className="Import-header">
                <div className="import-title">
                  <h2>Import questions from CSV file</h2>
                </div>
                <div className="importCloseIcon" onClick={importClose}>
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    style={{
                      color: '#a7a8a9',
                      fontSize: '25px',
                      paddingTop: '10px',
                    }}
                  />
                </div>
              </div>
              <div className="import-desc">
                This tool allows you to import (or merge) questions to your
                question bank from a CSV file.
              </div>
            </div>
            <div class="horizontal-line">
              <hr />
            </div>
            <div className="template-import">
              <div className="import-con">
                <div className="import-con-head">
                  <h3>Download Template</h3>
                </div>
                <div className="import-con-desc">
                  Download the CSV file template to match your question
                </div>
              </div>
              <div className="download-import" onClick={handleDownloadTemplate}>
                <button className="topicBtn" id="mybtn">
                  Download Template
                </button>
              </div>
            </div>
            <div class="horizontal-line">
              <hr />
            </div>
            <div className="dept-size">
              <Box sx={{ minWidth: 660, fontFamily: 'Manrope' }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-multiple-name-label">
                    Select Department
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    label="Select Department"
                    value={csvDepartment}
                    onChange={handleCsvDepartmentChange}
                  >
                    {csvDepartmentData.map((department) => (
                      <MenuItem key={department.id} value={department.id}>
                        {department.departmentName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </div>
            <div className="deptBasedTopic dept-size">
              <Box sx={{ minWidth: 660, fontFamily: 'Manrope' }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-multiple-name-label">
                    Select Topic
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={deptBasedTopic}
                    label="Select Topic"
                    onChange={handleChangeTopic}
                    renderValue={renderTopicValue}
                    open={removeSelected}
                    onOpen={() => setRemoveSelected(true)}
                    onClose={() => setRemoveSelected(false)}
                    MenuProps={{
                      PaperProps: {
                        style: { maxHeight: 300 },
                      },
                      MenuListProps: {
                        style: { padding: 0 },
                      },
                      classes: {
                        paper: 'custom-scrollbar',
                      },
                    }}
                  >
                    {deptByTopicData.map((topic) => (
                      <MenuItem key={topic.id} value={topic.id}>
                        <input
                          type="checkbox"
                          checked={deptBasedTopic.includes(topic.id)}
                          onChange={(event) =>
                            handleCheckboxChange(event, topic)
                          }
                        />
                        {topic.topicName}
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
              </Box>
            </div>
            <div className="select-lvl">
              <div className="lvl-head">
                <h3 className="lvl-title import-con-head">Select Level</h3>
                <div className="lvl-opt">
                  {csvLevel.length > 0 ? (
                    csvLevel.map((option) => (
                      <label key={option.id}>
                        <div className="level-align">
                          <div>
                            <input
                              type="radio"
                              name="options"
                              value={option.id}
                              id={option.id}
                              onChange={radioBtnChange}
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
                          <div>{option.skillLevel}</div>
                        </div>
                      </label>
                    ))
                  ) : (
                    <p>Loading level options...</p>
                  )}
                </div>
              </div>
              <div className="lvl-chk"></div>
            </div>
            <div className="sub csv-sub">
              <h3>Choose a CSV file from your computer</h3>{' '}
            </div>
            <label className="file-input-label" htmlFor="file-input">
              <div
                className="pic-drop-csv"
                onDrop={handleCsvDrop}
                onDragOver={handleCsvDragOver}
              >
                <div className="pic-img">
                  <img src={book} alt="img" />
                </div>
                <div className="csv-file">
                  <h3>
                    {csvFile
                      ? csvFileValid
                        ? csvFile.name
                        : 'Invalid CSV file. Drop another file here, or Browse'
                      : csvFileDropped
                        ? 'Invalid CSV file. Drop another file here, or Browse'
                        : 'Drop your CSV file here, or Browse'}
                  </h3>

                  <div>Supports: CSV</div>
                </div>
              </div>
              <input
                id="file-input"
                type="file"
                accept=".csv"
                onChange={handleCsvFileInput}
                style={{ display: 'none' }}
              />
            </label>{' '}
            <div className="btnss">
              <div className="btn1">
                <button className="cancel" onClick={importClose}>
                  Cancel
                </button>
              </div>
              <div className="btn2">
                <button
                  id="submit"
                  onClick={handleImportSubmit}
                  className={formValid ? '' : 'disabled'}
                  disabled={!formValid}
                >
                  Import
                </button>
              </div>
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  )
}

export default ImportCSV
