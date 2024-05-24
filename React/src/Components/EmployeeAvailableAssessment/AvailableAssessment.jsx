import React, { useEffect, useState } from 'react'
import '../EmployeeAvailableAssessment/AvailableAssessment.css'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Avatar1 from '../../assets/avatar1.png'
import Avatar2 from '../../assets/avatar2.png'
import Avatar3 from '../../assets/avatar3.png'
import Avatar4 from '../../assets/avatar4.png'
import Modal from '@mui/material/Modal'
import Drawer from '@mui/material/Drawer'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { TablePagination, Pagination } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import InputAdornment from '@mui/material/InputAdornment'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import kaniniLogo from '../../assets/formlogo.png'
import successGif from '../../assets/Sent Successfully.gif'
import copy from 'copy-to-clipboard'
import dayjs from 'dayjs'
import axios from 'axios'
import { toast } from 'react-toastify'
import Basic from '../../assets/Basic.png'
import Intermediate from '../../assets/Intermediate.png'
import Advanced from '../../assets/Advanced.png'

const AvailableAssessment = () => {
  //State Variables
  const [departments, setDepartments] = useState([])
  const [skills, setSkills] = useState([])
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [topics, setTopics] = useState([])
  const [assessment, setAssessment] = useState([])
  const [getEmpName, setEmpName] = useState([])
  const [getTopicNamed, setTopicNamed] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(8)
  const [isDrawerOpen2, setIsDrawerOpen2] = useState(false)
  const [selectedTopics, setSelectedTopics] = useState([])
  const [selectedSkill, setSelectedSkill] = useState('')
  const [editRow, setEditRow] = useState({})
  const [updateDateValue, setUpdateDateValue] = useState('')
  const [topicInData, setTopicInData] = useState([])
  const [formValuesList, setFormValuesList] = useState([])
  const [isEmployeeDrawerOpen, setIsEmployeeDrawerOpen] = useState(false)
  const [isInputActive2, setIsInputActive2] = useState(false)
  const [department, setDepartment] = useState('')
  const [isTextFieldClicked, setIsTextFieldClicked] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [modalopen, setModalOpen] = useState(false)
  const [copyText, setCopyText] = useState('')
  const [questionNo, setQuestionNo] = useState('')
  const [personName, setPersonName] = useState([])
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState([])
  const [topicName, setTopicName] = useState([])
  const [newTopicName, setNewTopicName] = useState('')
  const [getAllEmp, setNewEmp] = useState([])
  const [selectedItems, setselectedItems] = useState({
    deptid: 0,
    skillid: 0,
    topicid: [0],
  })

  //UseEffect
  useEffect(() => {
    getAllTopicsFunction()
    PostData()
    fetchDepartments()
    fetchSkills()
    fetchAssessment()
    fetchEmployee()
  }, [])

  //Methods Definitions
  const getAllTopicsFunction = async () => {
    const topicResponse = await axios.get(
      'https://localhost:7281/api/GetAllTopics',
      {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      }
    )
    const topics = topicResponse.data
    setTopicInData(topics)
  }

  const closeEdit2 = () => {
    toggleDrawer2(false)
  }

  const handleDateChange = (newValue) => {
    setUpdateDateValue(dayjs(newValue).format('YYYY-MM-DD'))
  }

  const handleEmployeeDrawerClose = () => {
    setIsEmployeeDrawerOpen(false)
  }

  const postUserAssessment = () => {
    const updatedFormValuesList = []
    for (let i = 0; i < selectedEmployeeIds.length; i++) {
      const id = selectedEmployeeIds[i]
      const formValues = {
        userId: id,
        assessmentId: editRow.assessmentId,
        numberOfTopics: editRow.numberOfTopic,
        numberOfQuestions: 1 * questionNo,
        totalTime: questionNo * 1,
        dateOfCreation: currentDate,
        dateOfCompletion: updateDateValue,
        description: editRow.description,
        assessmentHistoryId: null,
      }
      updatedFormValuesList.push(formValues)
    }
    setFormValuesList(updatedFormValuesList)
    postEmail()
  }

  //Fetch Employee
  const fetchEmployee = () => {
    fetch(
      `https://localhost:7281/HistoryTable/HistoryDetails?roleName=Employee`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      }
    ).then(async (data) => {
      const myData = await data.json()
      setNewEmp(myData)
    })
  }

  //Post through api for assessed to
  const PostData = () => {
    //POST
    for (let i = 0; i < formValuesList.length; i++) {
      fetch(`https://localhost:7281/HistoryTable/PostExistingAssessment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
        body: JSON.stringify(formValuesList[i]),
      })
        .then((response) => response.json())
        .then((data) => {
          handleModalOpen()
        })
    }
  }

  const postEmail = () => {
    const updatedFormValuesList = []
    const currentDate = new Date()
    // Format the date to "yyyy-mm-dd" format
    const formattedDate = currentDate.toISOString().split('T')[0]
    for (let i = 0; i < selectedEmployeeIds.length; i++) {
      const id = selectedEmployeeIds[i]
      const formValues = {
        userId: id,
        assessmentId: editRow.assessmentId,
        sentTime: formattedDate,
      }
      updatedFormValuesList.push(formValues)
    }
    // Construct the names parameter based on the length of getEmpNames
    for (let i = 0; i < formValuesList.length; i++) {
      try {
        const url = `https://localhost:7281/api/AssessmentData/EmailPost`;
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
            handleModalOpen(true);
          })
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    }
  }

  const toggleDrawer2 = (open, target, assid) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    setIsDrawerOpen2(open)
    setOpen2(false)
    fetchDepartments()
    AssignButton(assid)
  }

  const handleInputMouseDown2 = () => {
    setIsInputActive2(true)
  }

  const handleInputBlur2 = () => {
    setIsInputActive2(true)
  }

  const edithandleChange = (event) => {
    setDepartment(event.target.value)
  }

  //select
  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  }

  const handleModalOpen = () => setModalOpen(true)

  const handleModalClose = () => setModalOpen(false)

  const handleCopyText = (e) => {
    setCopyText(e.target.value)
  }

  const copyToClipboard = () => {
    copy(copyText)
    toast.success(`You have copied "${copyText}"`)
  }

  const currentDate = new Date().toISOString().slice(0, 10)
  const handleQuestionNoChange = (event) => {
    setQuestionNo(event.target.value)
  }

  const handleClick = (event) => {
    event.stopPropagation()
    setIsTextFieldClicked(true)
  }

  const edithandleOpen2 = () => {
    setEditOpen(true)
  }

  const edithandleClose2 = () => {
    setEditOpen(false)
  }

  const handlePersonChange = (event) => {
    const {
      target: { value },
    } = event
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
    const selectedNames = Array.isArray(value) ? value : [value]
    const selectedIds = selectedNames.map((name) => {
      const employee = getAllEmp.find((emp) => emp.name === name)
      if (employee) {
        setEmpName((prevNames) => [...prevNames, employee.name])
        return employee.empId
      } else {
        return null
      }
    })
    setSelectedEmployeeIds(selectedIds)
  }

  const renderValue = (selected) => {
    if (selected.length === 0) {
      return 'Select'
    }
    if (selected.length <= 2) {
      return selected.join(', ')
    }
    return `${selected.slice(0, 2).join(', ')} & ${selected.length - 2} more (${selected.length
      })`
  }

  const handleTopicChangeinDrawer = (event) => {
    const {
      target: { value },
    } = event
    setTopicName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  const routeToPage = () => {
    window.location.href = '/ExamPortal'
  }

  const handleNewTopicNameChange = (event) => {
    setNewTopicName(event.target.value)
  }

  const handleAddTopicName = () => {
    if (newTopicName.trim() !== '') {
      setTopicName((prevNames) => [...prevNames, newTopicName])
      setNewTopicName('')
    }
  }

  // Fetch departments and update state
  const fetchDepartments = async () => {
    try {
      const response = await fetch(
        'https://localhost:7281/api/GetAllDepartment',
        {
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          },
        }
      )
      const data = await response.json()
      setDepartments(data)
    } catch (error) {
      toast.error('Failed to Fetch')
    }
  }

  // Fetch skills and update state
  const fetchSkills = async () => {
    try {
      const response = await fetch(
        'https://localhost:7281/HistoryTable/GetAllSkill',
        {
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          },
        }
      )
      const data = await response.json()
      setSkills(data)
    } catch (error) {
      toast.error('Failed to Fetch')
    }
  }

  // Fetch assessment and update state
  const fetchAssessment = async () => {
    try {
      const response = await fetch(
        'https://localhost:7281/api/AssessmentData/AllAssessments?rolename=Employee',
        {
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          },
        }
      )
      const data = await response.json()
      setAssessment(data)
    } catch (error) {
      toast.error('Failed to Fetch')
    }
  }

  // Handle department selection
  const handleDepartmentChange = (event) => {
    const departmentId = event.target.value
    setSelectedDepartment(departmentId)
    fetchTopicsByDepartment(departmentId)
    setselectedItems({ ...selectedItems, deptid: departmentId })
  }

  // Fetch topics based on department selection
  const fetchTopicsByDepartment = async (departmentId) => {
    try {
      const response = await fetch(
        `https://localhost:7281/api/GetTopic?departmentId=${departmentId}`,
        {
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          },
        }
      )
      const data = await response.json()
      setTopics(data)
    } catch (error) {
      toast.error('Failed to Fetch')
    }
  }

  // Handle topic selection
  const handleTopicChange = (event) => {
    const {
      target: { value },
    } = event
    setTopicName(typeof value === 'string' ? value.split(',') : value)
    const selectedTopics = Array.isArray(value) ? value : [value]
    const selectedIds = selectedTopics.map((name) => {
      const employee = topicInData.find((emp) => emp.topicName === name)
      if (employee) {
        setTopicNamed((prevNames) => [...prevNames, employee.id])
        return employee.id
      } else {
        return null
      }
    })
    setSelectedTopics(value)
    setselectedItems({ ...selectedItems, topicid: value })
  }

  const handleSkillChange = (event) => {
    const skillId = event.target.value
    setSelectedSkill(skillId)
    setselectedItems({ ...selectedItems, skillid: skillId })
  }

  const handlePostRequest = async () => {
    try {
      console.log(selectedItems)
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
        body: JSON.stringify(selectedItems),
      }
      const response = await fetch(
        'https://localhost:7281/api/AssessmentData/GetSelectedItems?rolename=Employee',
        requestOptions
      )
      if (response.ok) {
        const data = await response.json()
        // Apply sorting based on selected department, skill, and topics
        const sortedAssessment = data.sort((a, b) => {
          if (selectedDepartment !== '' && a.deptid !== b.deptid) {
            return a.deptid - b.deptid
          }
          if (selectedSkill !== '' && a.skillid !== b.skillid) {
            return a.skillid - b.skillid
          }
          if (selectedTopics.length > 0) {
            const topicA = a.topicid?.find((topicId) =>
              selectedTopics.includes(topicId)
            )
            const topicB = b.topicid?.find((topicId) =>
              selectedTopics.includes(topicId)
            )
            if (topicA !== undefined && topicB !== undefined) {
              return topicA - topicB
            }
          }
          return 0
        })
        setAssessment(sortedAssessment)
        setPage(0)
      }
    } catch (error) {
      toast.error('Failed to Fetch')
    }
  }

  const AssignButton = (assid) => {
    fetch(
      `https://localhost:7281/api/AssessmentData/GetSideBarDetails?id=${assid}`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      }
    )
      .then(async (data) => {
        const myData = await data.json()
        setEditRow(myData)
      })
  }

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <>
      <div className="Available-Assessment">
        <div className="select-tags">
          {/* Available Departments */}
          <div className="select1">
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-name-label">
                Select Department
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                label="Select Department"
                value={selectedDepartment}
                onChange={handleDepartmentChange}
              >
                {departments.map((department) => (
                  <MenuItem key={department.id} value={department.id}>
                    {department.departmentName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          {/* Available Topics */}
          <div className="select2">
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-checkbox-label">
                Select Topics
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={selectedTopics}
                label="Select Topics"
                onChange={handleTopicChange}
                renderValue={(selected) =>
                  selected
                    .map((value) => {
                      const topic = topics.find((topic) => topic.id === value)
                      return topic ? topic.topicName : ''
                    })
                    .join(', ')
                }
              >
                {topics.map((topic) => (
                  <MenuItem key={topic.id} value={topic.id}>
                    <Checkbox checked={selectedTopics.includes(topic.id)} />
                    {topic.topicName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          {/* Skills */}
          <div className="select3">
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-name-label">
                Select Skills
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                label="Select Skills"
                value={selectedSkill}
                onChange={handleSkillChange}
              >
                {skills.map((skill) => (
                  <MenuItem key={skill.id} value={skill.id}>
                    {skill.skillLevel}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="sorts">
          <div className="sort">
            <button
              className="sort-button"
              style={{
                border: '1px solid white',
                width: '110px',
                borderRadius: '3px',
              }}
              onClick={handlePostRequest}
            >
              Sort by <UnfoldMoreIcon />
            </button>
          </div>
        </div>
      </div>
      {/* List Of Assessments */}
      <h4
        style={{
          fontFamily: 'manrope',
          margin: '30px 25px',
          fontWeight: '700',
        }}
      >
        List Of Assessments
      </h4>
      <div className="List-Of-Assessments">
        <div
          className="container"
          style={{ maxWidth: '1480px', marginLeft: '30px' }}
        >
          <div className="row">
            {assessment
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((ass, index) => (
                <div className="col-md-7 col-lg-3 mb-4 px-4" key={index}>
                  <div
                    className="card"
                    style={{
                      border: '1px solid #48B8E6',
                      borderRadius: '7px',
                      width: '320px',
                    }}
                  >
                    <div className="card-body">
                      <h5 className="card-title" style={{ fontWeight: 'bold' }}>
                        {ass.assessmentID}
                      </h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {ass.department}
                      </h6>
                      <div className="skill-and-topic">
                        <span
                          className="badge"
                          style={{
                            border: '1px solid grey',
                            color: 'black',
                            borderRadius: '10px',
                          }}
                        >
                          {ass.skllLevel}
                        </span>
                        &nbsp;&nbsp;&nbsp;
                        <span
                          className="badge"
                          style={{
                            border: '1px solid grey',
                            color: 'black',
                            borderRadius: '10px',
                          }}
                        >
                          Topics: {ass.topicID.join(' & ')}
                        </span>
                      </div>
                      <p className="card-text" style={{ width: '150px' }}>
                        {ass.topicName.join(', ')}
                      </p>
                      <div
                        className="avatar-and-button"
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span style={{ width: '180px' }}>
                          <AvatarGroup total={7}>
                            <Avatar alt="Remy Sharp" src={Avatar2} />
                            <Avatar alt="Travis Howard" src={Avatar1} />
                            <Avatar alt="Cindy Baker" src={Avatar3} />
                            <Avatar alt="Agnes Walker" src={Avatar4} />
                          </AvatarGroup>
                        </span>
                        <span
                          onClick={toggleDrawer2(
                            'right',
                            true,
                            ass.assessmentID
                          )}
                          style={{
                            border: '1px solid #48B8E6',
                            borderRadius: '15px',
                            marginTop: '15px',
                            marginBottom: '7px',
                            color: '#1CAAE2',
                            cursor: 'pointer',
                          }}
                        >
                          Assign to <ArrowForwardIcon />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="ending">
          <div className="pagination-container">
            <Pagination
              count={Math.ceil(assessment.length / rowsPerPage)}
              page={page + 1}
              onChange={(event, newPage) =>
                handleChangePage(event, newPage - 1)
              }
              backIconButtonProps={{ style: { display: 'none' } }}
              nextIconButtonProps={{ style: { display: 'none' } }}
              sx={{
                marginTop: '30px',
                marginLeft: '700px',
              }}
            />
          </div>
          <div className="flex-prop1">
            <div
              className="margin"
              style={{ paddingRight: '50px', marginTop: '35px' }}
            >
              Go to page ----
            </div>
            <div
              className="flex-prop2"
              style={{ marginTop: '1px', marginRight: '20px' }}
            >
              <TablePagination
                rowsPerPageOptions={[8, 14, 24]}
                component="div"
                count={assessment.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                labelRowsPerPage={null}
                labelDisplayedRows={() => ''}
                backIconButtonProps={{ style: { display: 'none' } }}
                nextIconButtonProps={{ style: { display: 'block' } }}
                SelectProps={{ style: { display: 'none' } }}
                sx={{
                  '& .MuiTablePagination-toolbar.MuiToolbar-root.MuiToolbar-gutters.MuiToolbar-regular':
                  {
                    paddingLeft: 0,
                  },
                  '& .MuiTablepagination': {
                    marginLeft: 0,
                  },
                  '& .MuiTablePagination-actions': {
                    marginTop: '20px',
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Accessed To */}
        <div>
          <Drawer
            anchor="right"
            open={isDrawerOpen2}
            onClose={toggleDrawer2(false)}
            sx={{
              '& .MuiBackdrop-root.MuiModal-backdrop': {
                backgroundColor: '#143b6f48',
              },
            }}
          >
            <div className="EditSidebar">
              <div className="createFlex">
                <div className="create">Create Employee Assessment</div>
                <div onClick={closeEdit2} className="cursor">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M16 2C19.713 2 23.274 3.475 25.8995 6.1005C28.525 8.72601 30 12.287 30 16C30 19.713 28.525 23.274 25.8995 25.8995C23.274 28.525 19.713 30 16 30C12.287 30 8.72601 28.525 6.1005 25.8995C3.475 23.274 2 19.713 2 16C2 12.287 3.475 8.72601 6.1005 6.1005C8.72601 3.475 12.287 2 16 2ZM16 14.302L12.748 11.05C12.5228 10.8248 12.2174 10.6983 11.899 10.6983C11.5806 10.6983 11.2752 10.8248 11.05 11.05C10.8248 11.2752 10.6983 11.5806 10.6983 11.899C10.6983 12.2174 10.8248 12.5228 11.05 12.748L14.302 16L11.05 19.252C10.9385 19.3635 10.8501 19.4959 10.7897 19.6415C10.7294 19.7872 10.6983 19.9433 10.6983 20.101C10.6983 20.2587 10.7294 20.4148 10.7897 20.5605C10.8501 20.7061 10.9385 20.8385 11.05 20.95C11.1615 21.0615 11.2939 21.1499 11.4395 21.2103C11.5852 21.2706 11.7413 21.3017 11.899 21.3017C12.0567 21.3017 12.2128 21.2706 12.3585 21.2103C12.5041 21.1499 12.6365 21.0615 12.748 20.95L16 17.698L19.252 20.95C19.3635 21.0615 19.4959 21.1499 19.6415 21.2103C19.7872 21.2706 19.9433 21.3017 20.101 21.3017C20.2587 21.3017 20.4148 21.2706 20.5605 21.2103C20.7061 21.1499 20.8385 21.0615 20.95 20.95C21.0615 20.8385 21.1499 20.7061 21.2103 20.5605C21.2706 20.4148 21.3017 20.2587 21.3017 20.101C21.3017 19.9433 21.2706 19.7872 21.2103 19.6415C21.1499 19.4959 21.0615 19.3635 20.95 19.252L17.698 16L20.95 12.748C21.0615 12.6365 21.1499 12.5041 21.2103 12.3585C21.2706 12.2128 21.3017 12.0567 21.3017 11.899C21.3017 11.7413 21.2706 11.5852 21.2103 11.4395C21.1499 11.2939 21.0615 11.1615 20.95 11.05C20.8385 10.9385 20.7061 10.8501 20.5605 10.7897C20.4148 10.7294 20.2587 10.6983 20.101 10.6983C19.9433 10.6983 19.7872 10.7294 19.6415 10.7897C19.4959 10.8501 19.3635 10.9385 19.252 11.05L16 14.302Z"
                      fill="#242D35"
                    />
                  </svg>
                </div>
              </div>
              <TextField
                helperText="Please enter the title of assessment that help you to manage"
                id="outlined-basic"
                variant="outlined"
                className="assessmentId"
                onMouseDown={handleInputMouseDown2}
                onBlur={handleInputBlur2}
                label={!isInputActive2 ? 'Enter Assessment ID' : ''}
                InputLabelProps={{
                  shrink: true,
                }}
                value={editRow.assessmentId || ''}
                disabled
                sx={{
                  margin: '0px 40px 0px 48px',
                  maxWidth: '654px',
                  height: '27px',
                  marginBottom: '60px',
                  marginTop: '36px',

                  '& .MuiOutlinedInput-root': {
                    width: '654px',
                  },
                }}
              />
              <Box
                sx={{ marginLeft: '48px', width: '654px', marginTop: '36px' }}
              >
                <FormControl className="departmentBox">
                  <InputLabel
                    id="demo-simple-select-label"
                    shrink={!isInputActive2}
                  >
                    Department
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={editRow.department || ''}
                    label={!isInputActive2 ? 'Department' : ''}
                    onChange={edithandleChange}
                    open={editOpen}
                    onOpen={edithandleOpen2}
                    onClose={edithandleClose2}
                    sx={{ width: '654px' }}
                    disabled
                  >
                    {editRow.department && (
                      <MenuItem value={editRow.department}>
                        {editRow.department}
                      </MenuItem>
                    )}
                    <MenuItem value="">
                      <TextField
                        sx={{
                          width: '100%',
                          border: 'none',
                          '& .MuiInputBase-input.MuiOutlinedInput-input': {
                            padding: '0px 10px',
                            color: '#1589CC',
                          },
                        }}
                        placeholder="+ Enter new department"
                        value={department}
                        onClick={handleClick}
                        InputProps={{
                          endAdornment: (
                            <>
                              {isTextFieldClicked && department && (
                                <Button variant="text">Add</Button>
                              )}
                            </>
                          ),
                        }}
                        onFocus={(e) => e.stopPropagation()}
                      />
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <h3 className="selectLevel">Select Levels</h3>
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
                    labelPlacement="start"
                    checked={editRow.skills === 'Basic'}
                    disabled
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
                    checked={editRow.skills === 'Intermediate'}
                    labelPlacement="start"
                    disabled
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
                    labelPlacement="start"
                    checked={editRow.skills === 'Advanced'}
                    disabled
                  />
                  <FormControlLabel
                    value="upskill"
                    control={<Radio color="default" />}
                    sx={{ marginRight: '0px', marginLeft: '50px' }}
                    label={
                      <React.Fragment>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="15"
                          viewBox="0 0 18 15"
                          fill="none"
                        >
                          <path
                            d="M4.3425 14.4L0 10.0575L4.3425 5.715L5.2875 6.66L2.565 9.3825H9.675V10.7325H2.565L5.2875 13.455L4.3425 14.4ZM13.6575 8.685L12.7125 7.74L15.435 5.0175H8.325V3.6675H15.435L12.7125 0.945L13.6575 0L18 4.3425L13.6575 8.685Z"
                            fill="#0C1116"
                          />
                        </svg>
                        &nbsp; upskill
                      </React.Fragment>
                    }
                    labelPlacement="start"
                    checked={editRow.skills === 'upskill'}
                    disabled
                  />
                </RadioGroup>
              </FormControl>
              <div>
                <FormControl
                  sx={{ marginLeft: '48px', width: '654px', marginTop: '36px' }}
                >
                  <InputLabel id="demo-multiple-checkbox-label">
                    Employee profile
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={personName}
                    onChange={handlePersonChange}
                    input={<OutlinedInput label="Employee profile" />}
                    renderValue={renderValue}
                    MenuProps={MenuProps}
                  >
                    {getAllEmp.map((option) => (
                      <MenuItem key={option.name} value={option.name}>
                        <Checkbox
                          checked={personName.indexOf(option.name) > -1}
                        />
                        <ListItemAvatar>
                          <div className='imageDiv'><img src={`https://localhost:7281/Images/${option.employeeImage}`} className='image'></img></div>
                        </ListItemAvatar>
                        <ListItemText primary={option.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div>
                <FormControl
                  sx={{ marginLeft: '48px', width: '654px', marginTop: '36px' }}
                >
                  <InputLabel
                    id="demo-multiple-checkbox-label"
                    shrink={!isInputActive2}
                  >
                    Topics
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={editRow.topicName || []}
                    label={!isInputActive2 ? 'Topics' : ''}
                    onChange={handleTopicChangeinDrawer}
                    input={<OutlinedInput label="Topics" />}
                    renderValue={renderValue}
                    MenuProps={MenuProps}
                    disabled
                  >
                    <MenuItem>
                      <TextField
                        sx={{
                          width: '100%',
                          border: 'none',
                          '& .MuiInputBase-input.MuiOutlinedInput-input': {
                            padding: '0px 15px',
                            color: '#1589CC',
                          },
                        }}
                        value={newTopicName}
                        onChange={handleNewTopicNameChange}
                        placeholder="+ Enter new topic"
                        variant="outlined"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              {newTopicName.trim() !== '' && (
                                <Button
                                  variant="text"
                                  onClick={handleAddTopicName}
                                >
                                  Add
                                </Button>
                              )}
                            </InputAdornment>
                          ),
                        }}
                      />
                    </MenuItem>
                    {topics.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={topicName.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="divideBox">
                <div>
                  <Box
                    component="form"
                    sx={{
                      '& > :not(style)': {
                        marginLeft: '48px',
                        width: '300px',
                        marginTop: '36px',
                      },
                    }}
                    Validate
                    autoComplete="off"
                  >
                    <TextField
                      id="outlined-basic"
                      label={'Total Questions'}
                      variant="outlined"
                      value={questionNo}
                      onChange={handleQuestionNoChange}
                    />
                  </Box>
                  <p
                    className="questionsPara"
                    style={{ marginLeft: '55px', marginTop: '15px' }}
                  >
                    Time alloted for a question is 90 sec.
                  </p>
                </div>
                <div style={{ marginLeft: '-130px' }}>
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    sx={{ width: '310px', marginTop: '36px' }}
                  >
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker
                        label={'Date of Completion'}
                        sx={{ width: '330px', marginTop: '48px' }}
                        format="DD/MM/YYYY"
                        value={updateDateValue}
                        onChange={handleDateChange}
                        multiple
                        disablePast
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  <p
                    className="datePara"
                    style={{ marginLeft: '-0px', marginTop: '15px' }}
                  >
                    Valid till 11:59PM on the selected date
                  </p>
                </div>
              </div>
              <Box
                sx={{
                  '& .MuiTextField-root': {
                    marginLeft: '48px',
                    width: '654px',
                    marginTop: '36px',
                    marginBottom: '36px',
                  },
                }}
              >
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows={5}
                  variant="outlined"
                  value={editRow.description}
                  disabled
                />
              </Box>
              <div className="mailButtons">
                <Stack spacing={2} direction="row">
                  <Button
                    className="cancelButton"
                    onClick={toggleDrawer2(false)}
                    variant="text"
                  >
                    Cancel
                  </Button>
                  <Button
                    className="sendButton"
                    variant="outlined"
                    onClick={postUserAssessment}
                  >
                    Send Mail
                  </Button>
                </Stack>
              </div>
              <img
                src={kaniniLogo}
                className="formLogo"
                height="240px"
                width="240px"
                alt="Kanini Logo"
              />
            </div>
          </Drawer>
        </div>
        {/* Email Sended Successfully */}
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
                  onClick={handleEmployeeDrawerClose}
                >
                  <path
                    d="M16 2C19.713 2 23.274 3.475 25.8995 6.1005C28.525 8.72601 30 12.287 30 16C30 19.713 28.525 23.274 25.8995 25.8995C23.274 28.525 19.713 30 16 30C12.287 30 8.72601 28.525 6.1005 25.8995C3.475 23.274 2 19.713 2 16C2 12.287 3.475 8.72601 6.1005 6.1005C8.72601 3.475 12.287 2 16 2ZM16 14.302L12.748 11.05C12.5228 10.8248 12.2174 10.6983 11.899 10.6983C11.5806 10.6983 11.2752 10.8248 11.05 11.05C10.8248 11.2752 10.6983 11.5806 10.6983 11.899C10.6983 12.2174 10.8248 12.5228 11.05 12.748L14.302 16L11.05 19.252C10.9385 19.3635 10.8501 19.4959 10.7897 19.6415C10.7294 19.7872 10.6983 19.9433 10.6983 20.101C10.6983 20.2587 10.7294 20.4148 10.7897 20.5605C10.8501 20.7061 10.9385 20.8385 11.05 20.95C11.1615 21.0615 11.2939 21.1499 11.4395 21.2103C11.5852 21.2706 11.7413 21.3017 11.899 21.3017C12.0567 21.3017 12.2128 21.2706 12.3585 21.2103C12.5041 21.1499 12.6365 21.0615 12.748 20.95L16 17.698L19.252 20.95C19.3635 21.0615 19.4959 21.1499 19.6415 21.2103C19.7872 21.2706 19.9433 21.3017 20.101 21.3017C20.2587 21.3017 20.4148 21.2706 20.5605 21.2103C20.7061 21.1499 20.8385 21.0615 20.95 20.95C21.0615 20.8385 21.1499 20.7061 21.2103 20.5605C21.2706 20.4148 21.3017 20.2587 21.3017 20.101C21.3017 19.9433 21.2706 19.7872 21.2103 19.6415C21.1499 19.4959 21.0615 19.3635 20.95 19.252L17.698 16L20.95 12.748C21.0615 12.6365 21.1499 12.5041 21.2103 12.3585C21.2706 12.2128 21.3017 12.0567 21.3017 11.899C21.3017 11.7413 21.2706 11.5852 21.2103 11.4395C21.1499 11.2939 21.0615 11.1615 20.95 11.05C20.8385 10.9385 20.7061 10.8501 20.5605 10.7897C20.4148 10.7294 20.2587 10.6983 20.101 10.6983C19.9433 10.6983 19.7872 10.7294 19.6415 10.7897C19.4959 10.8501 19.3635 10.9385 19.252 11.05L16 14.302Z"
                    fill="#717D8A"
                  />
                </svg>
              </div>
              <img
                src={successGif}
                className="successGIF"
                alt="Sent Successfully"
                height="120px"
                width="120px"
              />
              <h1 className="modalHeading">Assessment assigned Successfully</h1>
              <p className="modalPara">
                The jobseeker assessment has been successfully sent through
                their respectful email id
              </p>
              <div className="linkBox">
                <div className="linkField">
                  <TextField
                    id="outlined-basic"
                    label="Assessment link"
                    variant="outlined"
                    sx={{
                      width: '380px',
                      cursor: 'pointer',
                      color: 'blue',
                      textDecoration: 'underlined',
                    }}
                    value="Assessment_Link_for_the_Generated_Assessment" // Set the initial value here
                    onChange={handleCopyText}
                    onClick={routeToPage}
                  />
                </div>
                <div className="copyButton">
                  <Button
                    variant="outlined"
                    onClick={copyToClipboard}
                    sx={{
                      padding: 1.7,
                      color: '#717D8A',
                      height: '50px',
                      width: '100px',
                      borderColor: '#717D8A',
                      textTransform: 'none',
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="20"
                      viewBox="0 0 17 20"
                      fill="none"
                    >
                      <path
                        d="M1.5 20C1.1 20 0.75 19.85 0.45 19.55C0.15 19.25 0 18.9 0 18.5V3.425H1.5V18.5H13.35V20H1.5ZM4.5 17C4.1 17 3.75 16.85 3.45 16.55C3.15 16.25 3 15.9 3 15.5V1.5C3 1.1 3.15 0.75 3.45 0.45C3.75 0.15 4.1 0 4.5 0H15.5C15.9 0 16.25 0.15 16.55 0.45C16.85 0.75 17 1.1 17 1.5V15.5C17 15.9 16.85 16.25 16.55 16.55C16.25 16.85 15.9 17 15.5 17H4.5ZM4.5 15.5H15.5V1.5H4.5V15.5ZM4.5 15.5V1.5V15.5Z"
                        fill="#717D8A"
                      />
                    </svg>
                    &nbsp; Copy Link
                  </Button>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
    </>
  )
}

export default AvailableAssessment

//Modal Style
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 640,
  height: 340,
  bgcolor: 'background.paper',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
}