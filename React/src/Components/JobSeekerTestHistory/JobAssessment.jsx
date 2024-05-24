import React, { useEffect, useState } from 'react';
import {
  Box,
  TableCell,
  TableRow,
  TableContainer,
  TableBody,
  TablePagination,
  Table,
  TableHead,
  TableSortLabel,
  Tab,
  Pagination
} from '@mui/material';
import ImportExportTwoToneIcon from '@mui/icons-material/ImportExportTwoTone';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FilterListTwoToneIcon from '@mui/icons-material/FilterListTwoTone';
import { createSvgIcon } from '@mui/material/utils';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import TimerIcon from '@mui/icons-material/Timer';
import BadgeIcon from '@mui/icons-material/Badge';
import QuizIcon from '@mui/icons-material/Quiz';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from "../AnimatedProgressBar/AnimatedProgressProvider";
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import deleteGif from '../../assets/delete.gif';
import Navbars from '../Navbar/Navbar';
import dayjs from 'dayjs';
import TickGif from '../../assets/updatedsuccessfully.gif'
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import InputAdornment from '@mui/material/InputAdornment';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';
import kaniniLogo from '../../assets/formlogo.png';
import SeekerAssessment from '../JobSeekerAssessment/SeekerAssessment'
import successGif from '../../assets/Sent Successfully.gif'
import copy from "copy-to-clipboard";
import '../EmployeeTestHistory/EmpAssessment.css'
import JobAvailableAssessment from '../JobSeekerAvailableAssessment/JobSeekerAvailableAssessment';
import axios from 'axios';
import { toast } from 'react-toastify';
import Basic from '../../assets/Basic.png'
import Intermediate from '../../assets/Intermediate.png'
import Advanced from '../../assets/Advanced.png'
/*style*/


const tablefetch = {
  border: 'none', textAlign: 'center', fontSize: '12px',
  color: '#0C1116',
  fontFamily: 'Manrope',
  fontSize: '12.5px',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: 'normal'
}

const tablehead = {
  border: 'none', position: 'relative',
  color: '#0C1116',
  fontFamily: 'Manrope',
  fontSize: '13px',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: '21px',
  width: '252px',
  height: '48px'
}

//slider
const PrettoSlider = styled(Slider)({
  color: '#1589CC',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 10,
    width: 10,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#52af77',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 640,
  height: 340,
  bgcolor: 'background.paper',
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
};


const JobAssessment = () => {

  const [jobseeker, setJobseeker] = useState([]);
  const [history, setHistory] = useState(
    {
      "empCode": "",
      "name": "",
      "assessmentId": "",
      "department": "",
      "designation": "",
      "skill": "",
      "numberOfQuestion": 0,
      "userEmail": "",
      "numberOfTopics": 0,
      "creatingOn": "",
      "completedOn": "",
      "score": 0,
      "correctAnswer": 0,
      "wrongAnswer": 0,
      "skippedAnswer": 0,
      "points": 0
    }
  );
  const [progressValue, setProgressValue] = useState(0);
  const [latestProgressValue, setLatestProgressValue] = useState(0);
  const [getAllDept, setNewDept] = useState([]);
  const [selectDept, setSelectDept] = useState([]);
  const [getTopic, setNewTopic] = useState([]);
  const [getSkill, setNewSkill] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [value, setValue] = React.useState('1');
  const [open, setOpen] = React.useState(false);
  const [departmentName, setdepartmentName] = React.useState([]);
  const [open3, setOpen3] = React.useState(false);
  const [modalPosition2, setModalPosition2] = useState({ top: 0, left: 0 });
  const [open2, setOpen2] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [open5, setOpen5] = React.useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [toggleclick, setToggleClick] = useState(true);
  const [click, setClick] = useState(true);
  const [click2, setClick2] = useState(true);
  const [click3, setClick3] = useState(true);
  const [anchor, setAnchor] = React.useState('right');
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isDrawerOpen2, setIsDrawerOpen2] = React.useState(false);
  const [topicToggleclick, setTopicToggleClick] = useState(true);
  const [skillToggleclick, setSkillToggleClick] = useState(true);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [showPaginationDiv, setShowPaginationDiv] = useState(true);
  const [filteredOutput, setFilteredOutput] = useState([]);
  const [selectedRow, setSelectedRow] = useState();
  const [afterDelete, setAfterDelete] = useState([]);
  const [afterDeleteRecord, setAfterDeleteRecord] = useState([]);
  const [isEmployeeDrawerOpen, setIsEmployeeDrawerOpen] = useState(false);
  const [getAllJS, setNewJS] = useState([]);
  const [editRow, setEditRow] = useState({});
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
  const [personName, setPersonName] = React.useState([]);
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState([]);
  const [topicName, setTopicName] = React.useState([]);
  const [newTopicName, setNewTopicName] = React.useState('');
  const [getTopicNamed, setTopicNamed] = useState([]);
  const [histId, setHistId] = useState();
  const [checkedCount, setCheckedCount] = useState(0);
  const [topicCount, setTopicCount] = useState(0);
  const [skillCount, setSkillCount] = useState(0);
  const [isInputActive2, setIsInputActive2] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [chips, setChips] = React.useState([]);
  const [mail, setmail] = useState([])
  const [isInputActive1, setIsInputActive1] = React.useState(false);
  const [inputValue1,] = React.useState('');
  const [isInputActive, setIsInputActive] = React.useState(false);
  const [jsid, setJsId] = useState([])
  const [jsname, setJsName] = useState([]);
  const [department, setDepartment] = React.useState('');
  const [isTextFieldClicked, setIsTextFieldClicked] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [updateDateValue, setUpdateDateValue] = useState('')
  const [editFinish, setEditFinish] = useState({});
  const [questionNo, setQuestionNo] = useState(0);
  const [topicInData, setTopicInData] = useState([])
  const [formValuesList, setFormValuesList] = useState([]);
  const [skillIdCheck, setSkillIdCheck] = useState(0);
  const [copyText, setCopyText] = React.useState('');
  const [modalopen, setModalOpen] = React.useState(false);

  const jobFetch = () => {
    fetch("https://localhost:7281/HistoryTable/HistoryDetails?roleName=JobSeeker", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem('token')
      }
    })
      .then(async (data) => {
        const myData = await data.json();
        setJobseeker(myData);
      });
  };

  //get all on render
  useEffect(() => {
    jobFetch();
  }, []);

  //fetch all history
  const fetchData = (userAssessmentId) => {
    fetch(`https://localhost:7281/TestHistory/History?UserAssessmentId=${userAssessmentId}`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem('token')
      }
    })
      .then(async (data) => {
        const myData = await data.json();
        if (typeof myData === "object" && myData !== null) {
          setHistory(myData);
          setLatestProgressValue(myData.score);
        } else {
          toast.error("Invalid data format for history");
        }
      });
  };

  //fetching all department
  const fetchDepartment = () => {
    fetch(`https://localhost:7281/api/GetAllDepartment`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem('token')
      }
    })
      .then(async (data) => {
        const myData = await data.json();
        setNewDept(myData)
      });
  }
  //get All skill
  const getAllSkill = () => {
    fetch(`https://localhost:7281/HistoryTable/GetAllSkill`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem('token')
      }
    })
      .then(async (data) => {
        const myData = await data.json();
        const filteredData = myData.filter(skill => skill.skillLevel !== 'Upskill');
        setNewSkill(filteredData);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  const deleteRecord = (selectedRow, histId) => {
    fetch(`https://localhost:7281/HistoryTable/DeleteAssessment?UserAssessId=${histId}`, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem('token')
      }
    })
      .then(async (data) => {
        const myData = await data.json();
        setAfterDelete(myData);
      })
      .catch((error) => {
        toast.log("Error:", error);
      });
    fetch(`https://localhost:7281/HistoryTable/DeleteAssessmentHistory?HistId=${selectedRow}`, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem('token')
      }
    })
      .then(async (data) => {
        const myData = await data.json();
        setAfterDeleteRecord(myData);
      })
      .catch((error) => {
        toast.error("Error:", error);
      });
    window.location.reload();
  }

  const fetchEmployee = () => {
    fetch(`https://localhost:7281/HistoryTable/HistoryDetails?roleName=JobSeeker`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem('token')
      }
    })
      .then(async (data) => {
        const myData = await data.json();
        setNewJS(myData)
      })
      .catch((error) => {
        toast.error("Error:", error);
      });
  }

  useEffect(() => {
    fetchEmployee();
  }, []);

  useEffect(() => {
    fetchData(history.userAssessmentId);
  }, [history.userAssessmentId]);

  useEffect(() => {
    setProgressValue(latestProgressValue);
  }, [latestProgressValue]);


  useEffect(() => {
    getAllSkill();
  }, [])


  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatDate2 = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  };

  const formatDate3 = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  };

  const handleSortClick = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrderBy(property);
    setOrder(isAsc ? 'desc' : 'asc');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getComparator = (order, orderBy) => {
    return (a, b) => {
      const valueA = a[orderBy] || '';
      const valueB = b[orderBy] || '';
      if (order === 'asc') {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    };
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const sortedRows = stableSort(jobseeker, getComparator(order, orderBy));
  const slicedRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const sortedFilteredRows = stableSort(filteredOutput, getComparator(order, orderBy));
  const slicedFilteredRows = sortedFilteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === '2') {
      setIsFilterVisible(false);
    } else {
      setIsFilterVisible(true);
    }
  };

  //plus icon
  const PlusIcon = createSvgIcon(
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 35 35"
      strokeWidth={2.0}
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>,
    'Plus',
  );

  const handleOpen = (userAssessmentId) => () => {
    fetchData(userAssessmentId);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleOpen2 = (event, row, histId) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const position = {
      top: rect.bottom,
      left: rect.right
    };
    setModalPosition(position);
    setOpen2(true);
    setSelectedRow(row);
    setHistId(histId);
    fetch(`https://localhost:7281/HistoryTable/GetSideBarDetails?id=${histId}`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem('token')
      },
    })
      .then(async (data) => {
        const myData = await data.json();
        setEditRow(myData);
      })
      .catch((error) => {
        toast.error("Error:", error);
      });
  };

  useEffect(() => {
    if (Object.keys(editRow).length > 0) {
    }
  }, [editRow]);

  const handleClose2 = () => {
    setOpen2(false);
  };

  // FilterButton Modal
  const handleOpen3 = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const position = {
      top: rect.bottom,
      left: rect.right
    };
    setModalPosition2(position);
    setOpen3(true);
    fetchDepartment();
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  //delete
  const handleClose4 = () => {
    setOpen4(false);
  }

  //updated successfully
  const handleClose5 = () => {
    setOpen5(false);
  }

  //EditButton
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
    setOpen2(false);
    fetchDepartment();
  };
  //AccessedButton

  const toggleDrawer2 = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen2(open);
    setOpen2(false);
    fetchDepartment();
    fetchEmployee();
  };

  const handleDelete = () => {
    handleClose2();
    setOpen4(true);
  };

  const confirmDelete = () => {
    deleteRecord(selectedRow, histId);
    handleClose4();
  }
  const theme = useTheme();
  const toggle = () => {
    if (topicToggleclick == false) {
      setTopicToggleClick(true)
      setClick2(false)
    }
    if (skillToggleclick == false) {
      setSkillToggleClick(true);
      setClick3(false)
    }
    setToggleClick(!toggleclick);
    setClick(true);
  };


  const handleCheckboxChange = (event, id) => {
    const updatedDept = getAllDept.map((dept) =>
      dept.id === id ? { ...dept, checked: event.target.checked } : dept
    );
    setSelectDept(updatedDept);

    const selectedDepts = updatedDept
      .filter((dept) => dept.checked)
      .map((dept) => dept.departmentName);
    // Fetch topics for checked departments
    if (!event.target.checked) {
      setCheckedCount((prevCount) => prevCount - 1);
      const uncheckedDeptName = getAllDept.find((dept) => dept.id === id).departmentName;
      const prevSelectedDeptNames = selectedDepts.indexOf(deptName => deptName === uncheckedDeptName);
      if (selectedDepts.length > 0) {
        const url = `https://localhost:7281/HistoryTable/GetTopicsByDepartment?deptlist=${prevSelectedDeptNames}`;
        fetch(url, {
          method: "GET",
          headers: {
            "Authorization": "Bearer " + sessionStorage.getItem('token')
          },
        })
          .then(async (data) => {
            const myData = await data.json();
            setNewTopic(myData);
          })
          .catch((error) => {
            toast.error("Error:", error);
          });
      }
    }
    else {
      setCheckedCount((prevCount) => prevCount + 1);
      const url = `https://localhost:7281/HistoryTable/GetTopicsByDepartment?deptlist=${selectedDepts}`;
      fetch(url, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + sessionStorage.getItem('token')
        },
      })
        .then(async (data) => {
          const myData = await data.json();
          setNewTopic((prevTopics) => [...prevTopics, ...myData]);
        })
        .catch((error) => {
          toast.error("Error:", error);
        });
    }
  };

  useEffect(() => {
    console.log("checked values: ", getTopic);
  }, [getTopic]);

  const handleTopicCheckboxChange = (event, topic) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      if (!selectedTopics.includes(topic)) {
        setSelectedTopics((prevTopics) => [...prevTopics, topic]);
        setTopicCount((prevCount) => prevCount + 1);
      }
    } else {
      setSelectedTopics((prevTopics) => prevTopics.filter((selectedTopic) => selectedTopic !== topic));
      setTopicCount((prevCount) => prevCount - 1);
    }
  };

  const handleSkillChange = event => {
    setSelectedSkill(event.target.value);
    const isChecked = event.target.checked;
    if (isChecked) {
      setSkillCount((prevCount) => prevCount + 1);
    } else {
      setSkillCount((prevCount) => prevCount - 1);
    }
  };

  useEffect(() => {
    const selectedDepts = getAllDept.filter(dept => dept.checked);
    const deptList = selectedDepts.map(dept => dept.departmentName);
    fetch(`https://localhost:7281/HistoryTable/GetTopicsByDepartment?deptlist=${deptList}`, {
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem('token')
      },
    })
      .then(response => response.json())
      .then(data => {
        setNewTopic(data);
      })
      .catch(error => {
        toast.error('Error fetching topics:', error);
      });
  }, [getAllDept]);

  const TopicToggle = () => {
    if (toggleclick == false) {
      setToggleClick(true)
      setClick(false)
    }
    if (skillToggleclick == false) {
      setSkillToggleClick(true);
      setClick3(false)
    }

    setTopicToggleClick(!topicToggleclick);
    setClick2(true);
  };

  const SkillToggle = () => {
    if (toggleclick == false) {
      setToggleClick(true)
      setClick(false)
    }
    if (topicToggleclick == false) {
      setTopicToggleClick(true)
      setClick2(false)
    }
    getAllSkill();
    setSkillToggleClick(!skillToggleclick);
    setClick3(true);
  };

  // Clear All
  const clearAllCheckboxes = () => {
    const updatedDept = getAllDept.map((dept) => ({ ...dept, checked: false }));
    setNewDept(updatedDept);
    setCheckedCount(0)
    setSelectedSkill('');
  };


  const applyFilters = () => {
    handleClose3();
    setIsFilterApplied(true);
    setShowPaginationDiv(false);


    const selectedTopicParams = selectedTopics.join('&topiclist=');
    const url = `https://localhost:7281/HistoryTable/FilterByTopic?topiclist=${selectedTopicParams}&skillLevel=${selectedSkill}&roleName=JobSeeker`;
    fetch(url, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem('token')
      },
    })
      .then(async (data) => {
        const myData = await data.json();
        setFilteredOutput(myData);
      })
      .catch((error) => {
        toast.error("Error:", error);
      });
  };

  //remove Filter
  const removeFilter = () => {
    setIsFilterApplied(false);
    window.location.reload();
    setShowPaginationDiv(true);
  }

  //Create Assessment
  const handleEmployeeDrawerOpen = () => {
    setIsEmployeeDrawerOpen(true);
  };

  const handleEmployeeDrawerClose = () => {
    setIsEmployeeDrawerOpen(false);
    setModalOpen(false);
  };

  const handleAddChip = () => {
    if (inputValue.trim() !== '') {
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(inputValue)) {
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
      const selectedEmail = Array.isArray(inputValue) ? inputValue : [inputValue];
      const selectedIds = selectedEmail.map((name) => {
        const jobseeker = getAllJS.find(
          (emp) => emp.userEmail === name
        );
        if (jobseeker) {
          setJsId(jobseeker.empId)
          setJsName(jobseeker.name)
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

  const handleTextFieldClick = (event) => {
    event.stopPropagation();
    setIsTextFieldClicked(true);
  };

  const handleInputMouseDown2 = () => {
    setIsInputActive2(true);
  };
  const handleInputBlur2 = () => {
    setIsInputActive2(true);
  };

  const edithandleChange = (event) => {
    setDepartment(event.target.value);
  };

  const handleClick = (event) => {
    event.stopPropagation();
    setIsTextFieldClicked(true);
  };

  const edithandleOpen2 = () => {
    setEditOpen(true);
  };

  const edithandleClose2 = () => {
    setEditOpen(false);
  };

  const handleAdd = () => {
  };

  const renderValue = (selected) => {
  };

  const handleTopicChange = (event) => {
    const {
      target: { value },
    } = event;
    setTopicName(
      typeof value === 'string' ? value.split(', ') : value,
    );
    const selectedTopics = Array.isArray(value) ? value : [value];
    const selectedIds = selectedTopics.map((name) => {
      const employee = topicInData.find(
        (emp) => emp.topicName === name
      );
      if (employee) {
        setTopicNamed(prevNames => [...prevNames, employee.id]);
        return employee.id;
      } else {
        return null;
      }
    });
  };

  const handleNewTopicNameChange = (event) => {
    setNewTopicName(event.target.value);
  };

  const handleAddTopicName = () => {
    if (newTopicName.trim() !== '') {
      setTopicName((prevNames) => [...prevNames, newTopicName]);
      setNewTopicName('');
    }
  };

  const routeToPage = () => {
    window.location.href = '/ExamPortal'
  }

  const handleDateChange = (newValue) => {
    setUpdateDateValue(dayjs(newValue).format('YYYY-MM-DD'));
  };
  const updateDate = () => {
    fetch(`https://localhost:7281/HistoryTable/PutCompletionDate?userassessId=${histId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem('token')
      },
      body: JSON.stringify({
        dateOfCompletion: updateDateValue,
      }),
    })
      .then(response => response.json())
      .then(data => {
        setEditFinish(data);
      })
      .catch(error => {
        console.error('Error fetching topics:', error);
      });
    setOpen5(true);
  }

  const closeEdit = () => {
    toggleDrawer(false)
    window.location.reload();
  }

  const updateClose = () => {
    handleClose5()
    toggleDrawer(false)
  }

  useEffect(() => {
  }, [formValues]);

  const currentDate = new Date().toISOString().slice(0, 10);

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


  const postUserAssessment = () => {

    const updatedFormValuesList = [];
    for (let i = 0; i < mail.length; i++) {
      const id = mail[i];
      const formValues = {
        userId: id,
        assessmentId: editRow.assessmentId,
        numberOfTopics: editRow.numberOfTopic,
        numberOfQuestions: questionNo * 1,
        totalTime: questionNo * 1,
        dateOfCreation: currentDate,
        dateOfCompletion: updateDateValue,
        description: editRow.description,
        assessmentHistoryId: null,
      };
      updatedFormValuesList.push(formValues);
    }

    setFormValuesList(updatedFormValuesList);
    postQuestions();
    postEmail();
  }


  useEffect(() => {
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
          handleModalOpen();
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
    // Construct the names parameter based on the length of getEmpNames
    try {
      if (editRow.skills === "Basic") {
        setSkillIdCheck(1)
      }
      if (editRow.skills === "Intermediate") {
        setSkillIdCheck(2)
      }
      if (editRow.skills === "Advanced") {
        setSkillIdCheck(3)
      }
      if (editRow.skills === "upskill") {
        setSkillIdCheck(4)
      }
      console.log(1234)
      const namesParameter = jsname.map(name => `names=${encodeURIComponent(name)}`).join('&');
      const url = `https://localhost:7281/HistoryTable/PostingAssessmentDetails?assessId=${editRow.assessmentId}&${namesParameter}`;
      console.log(5678)
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + sessionStorage.getItem('token')
        },
        body: JSON.stringify({
          questionCount: questionNo,
          skillId: skillIdCheck,
          topicIds: getTopicNamed
        }),
      });
      const data = await response.json();
      if (data.status === 200) {
      }
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  }

  const postEmail = async () => {
    const updatedFormValuesList = [];
    const currentDate = new Date();
    // Format the date to "yyyy-mm-dd" format
    const formattedDate = currentDate.toISOString().split('T')[0];
    for (let i = 0; i < selectedEmployeeIds.length; i++) {
      const id = selectedEmployeeIds[i];
      const formValues = {
        userId: id, // Use selectedEmployeeIds array to populate the userId
        assessmentId: editRow.assessmentId,
        sentTime: formattedDate
      };
      updatedFormValuesList.push(formValues);
    }
    // Construct the names parameter based on the length of getEmpNames
    for (let i = 0; i < formValuesList.length; i++) {
      try {
        console.log(1234)
        const url = `https://localhost:7281/api/AssesmentData/EmailPost`;
        console.log(5678)
        const response = await fetch(url, {
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
  const handleQuestionNoChange = (event) => {
    setQuestionNo(event.target.value);
  };

  // email sended successfully
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleCopyText = (e) => {
    setCopyText(e.target.value);
  }

  const copyToClipboard = () => {
    copy(copyText);
    alert(`You have copied "${copyText}"`);
  }
  return (
    <>
      <Navbars title="JobSeeker Assessment Data" desc="View completed details of all assessed and its corresponding details of jobseeker"></Navbars>
      <div className='alignment'>
        <TabContext value={value}>
          <div>
            <div className='flexproperty'>
              <div>
                <Box sx={{ borderBottom: 0 }}>
                  <TabList onChange={handleChange}
                    TabIndicatorProps={{
                      style: {
                        backgroundColor: '#1589CC', // Set the desired background color for the indicator
                        height: '4px', // Set the desired height of the indicator
                        borderRadius: '10px'
                      },
                    }}
                  >
                    <Tab label="Assessment List" value="1"
                      aria-label="styled tabs example"
                      sx={{
                        textTransform: 'none',
                        fontSize: '18px',
                        fontWeight: '400',
                        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',

                        '&.Mui-selected': {
                          color: '#0C1116',
                          fontSize: '18px',
                          fontWeight: '500',
                          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif'
                        }
                        //borderBottom: '5px solid #1A9CE0', // Set the desired border style
                      }}
                    />
                    <Tab label="Available Assessment" value="2"
                      sx={{
                        textTransform: 'none',
                        fontSize: '18px',
                        fontWeight: '400',
                        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',

                        '&.Mui-selected': {
                          color: '#0C1116',
                          fontSize: '18px',
                          fontWeight: '500',
                          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif'
                        }
                        //borderBottom: '5px solid #1A9CE0', // Set the desired border style
                      }}
                    />
                  </TabList>
                </Box>
              </div>
              <div className='flexpropertys'>
                {isFilterVisible && (
                  <div className='filterbox' onClick={(event) => handleOpen3(event)}>
                    <span>
                      <FilterListTwoToneIcon />
                    </span>
                  </div>
                )}
                <div className='create-assess' onClick={handleEmployeeDrawerOpen}><span className='plus'> <PlusIcon /></span>Create Assessment</div>
              </div>
            </div>

          </div>

          <TabPanel value="1">
            <TableContainer>
              <Table sx={{ border: '1px solid #ccc' }}>
                <TableHead sx={{ backgroundColor: '#DFF3FB' }}>
                  <TableRow >
                    <TableCell align="center" sx={tablehead}>
                      <TableSortLabel
                        active={orderBy === 'assessmentId'}
                        direction={orderBy === 'assessmentId' ? order : 'asc'}
                        onClick={() => handleSortClick('assessmentId')}
                        IconComponent={ImportExportTwoToneIcon}
                        sx={{
                          '& .MuiTableSortLabel-icon': {
                            opacity: 1,
                            color: 'blue',
                            marginLeft: '15px',// Set the desired color
                          },
                        }}
                      >
                        Assessment ID
                      </TableSortLabel>
                      <div className='right-border'></div>
                    </TableCell>

                    <TableCell align="center" sx={tablehead}>
                      <TableSortLabel
                        active={orderBy === 'department'}
                        direction={orderBy === 'department' ? order : 'asc'}
                        onClick={() => handleSortClick('department')}
                        IconComponent={ImportExportTwoToneIcon}
                        sx={{
                          '& .MuiTableSortLabel-icon': {
                            opacity: 1,
                            color: 'blue',
                            marginLeft: '15px' // Set the desired color
                          },
                        }}
                      >
                        Department
                      </TableSortLabel>
                      <div className='right-border'></div>
                    </TableCell>

                    <TableCell align="center" sx={tablehead}>
                      <TableSortLabel
                        active={orderBy === 'skills'}
                        direction={orderBy === 'skills' ? order : 'asc'}
                        onClick={() => handleSortClick('skills')}
                        IconComponent={ImportExportTwoToneIcon}
                        sx={{
                          '& .MuiTableSortLabel-icon': {
                            opacity: 1,
                            color: 'blue',
                            marginLeft: '15px' // Set the desired color
                          },

                        }}
                      >
                        Level
                      </TableSortLabel>
                      <div className='right-border'></div>
                    </TableCell>

                    <TableCell align="center" sx={tablehead}>
                      No. of Topics
                      <div className='right-border'></div>
                    </TableCell>

                    <TableCell align="center" sx={tablehead}>
                      <TableSortLabel
                        active={orderBy === 'userEmail'}
                        direction={orderBy === 'userEmail' ? order : 'asc'}
                        onClick={() => handleSortClick('userEmail')}
                        IconComponent={ImportExportTwoToneIcon}
                        sx={{
                          '& .MuiTableSortLabel-icon': {
                            opacity: 1,
                            color: 'blue', // Set the desired color
                            marginLeft: '15px'
                          },
                        }}
                      >
                        Email ID
                      </TableSortLabel>
                      <div className='right-border'></div>
                    </TableCell>

                    <TableCell align="center" sx={tablehead}>
                      <TableSortLabel
                        active={orderBy === 'status'}
                        direction={orderBy === 'status' ? order : 'asc'}
                        onClick={() => handleSortClick('status')}
                        IconComponent={ImportExportTwoToneIcon}
                        sx={{
                          '& .MuiTableSortLabel-icon': {
                            opacity: 1,
                            color: 'blue', // Set the desired color
                            marginLeft: '15px'
                          },
                        }}
                      >
                        Status
                      </TableSortLabel>
                      <div className='right-border'></div>
                    </TableCell>

                    <TableCell align="center" sx={tablehead}>
                      <TableSortLabel
                        active={orderBy === 'dateOfCompletion'}
                        direction={orderBy === 'dateOfCompletion' ? order : 'asc'}
                        onClick={() => handleSortClick('dateOfCompletion')}
                        IconComponent={ImportExportTwoToneIcon}
                        sx={{
                          '& .MuiTableSortLabel-icon': {
                            opacity: 1,
                            color: 'blue', // Set the desired color
                            marginLeft: '15px'
                          },
                        }}
                      >
                        Completion Date
                      </TableSortLabel>
                      <div className='right-border'></div>
                    </TableCell>

                    <TableCell align="center" sx={tablehead}>
                      Results
                      <div className='right-border'></div>
                    </TableCell>

                    <TableCell align="center" sx={tablehead}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isFilterApplied ? (
                    slicedFilteredRows.map((row) => (
                      <TableRow key={row.userAssessmentId}>
                        <TableCell sx={tablefetch}>
                          <div >
                            {row.assessmentId}
                          </div>
                        </TableCell>
                        <TableCell sx={tablefetch}>{row.department}</TableCell>
                        <TableCell sx={tablefetch}>{row.skills}</TableCell>
                        <TableCell sx={tablefetch}>{row.numberOfTopics}</TableCell>
                        <TableCell sx={tablefetch}>{row.userEmail}</TableCell>
                        <TableCell sx={tablefetch}>
                          <Typography sx={{
                            backgroundColor:
                              row.status === 'Completed' ? '#d6f3e9' : '#fde1e1',
                            width: 'fit-content',
                            padding: '5px 5px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: '600',
                            fontFamily: 'Manrope',
                            fontStyle: 'normal',
                            lineHeight: 'normal',
                            color:
                              row.status === 'Completed' ? '#039855' : '#bb251a'
                          }}>{row.status}</Typography> </TableCell>
                        <TableCell sx={tablefetch}>
                          {row.status === 'Completed' ? formatDate(row.dateOfCompletion) : '-'}
                        </TableCell>
                        <TableCell sx={tablefetch}>
                          {row.status === 'Completed' ? (
                            <p className='result' onClick={handleOpen(row.userAssessmentId)}>VIEW RESULT</p>
                          ) : (
                            <p className='result disabled'>VIEW RESULT</p>
                          )}
                        </TableCell>
                        <TableCell sx={{ border: 'none', textAlign: 'center' }}>
                          <MoreVertIcon sx={{ cursor: 'pointer' }} onClick={(event) => handleOpen2(event, row.historyId, row.userAssessmentId)} />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (

                    slicedRows.map((row) => (
                      <TableRow key={row.userAssessmentId} >
                        <TableCell sx={tablefetch}>
                          <div >
                            {row.assessmentId}
                          </div>
                        </TableCell>
                        <TableCell sx={tablefetch}>{row.department}</TableCell>
                        <TableCell sx={tablefetch}>{row.skills}</TableCell>
                        <TableCell sx={tablefetch}>{row.numberOfTopics}</TableCell>
                        <TableCell sx={tablefetch}>{row.userEmail}</TableCell>
                        <TableCell sx={tablefetch}>
                          <Typography sx={{
                            backgroundColor:
                              row.status === 'Completed' ? '#d6f3e9' : '#fde1e1',
                            width: 'fit-content',
                            padding: '5px 5px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: '600',
                            fontFamily: 'Manrope',
                            fontStyle: 'normal',
                            lineHeight: 'normal',
                            color:
                              row.status === 'Completed' ? '#039855' : '#bb251a'
                          }}>{row.status}</Typography> </TableCell>
                        <TableCell sx={tablefetch}>
                          {row.status === 'Completed' ? formatDate(row.dateOfCompletion) : '-'}
                        </TableCell>
                        <TableCell sx={tablefetch}>
                          {row.status === 'Completed' ? (
                            <p className='result' onClick={handleOpen(row.userAssessmentId)}>VIEW RESULT</p>
                          ) : (
                            <p className='result disabled'>VIEW RESULT</p>
                          )}
                        </TableCell>
                        <TableCell sx={{ border: 'none', textAlign: 'center' }}>
                          <MoreVertIcon sx={{ cursor: 'pointer' }} onClick={(event) => handleOpen2(event, row.historyId, row.userAssessmentId)} />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              {isFilterApplied ? (
                <div className='flex-propt'>
                  <div>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={filteredOutput.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      labelDisplayedRows={() => ''} // Hide the displayed rows information
                      backIconButtonProps={{ style: { display: 'none' } }} // Hide the back button
                      nextIconButtonProps={{ style: { display: 'none' } }} // Hide the next button

                      sx={{
                        marginTop: 5,
                        '& .MuiToolbar-root.MuiTablePagination-toolbar': {
                          width: '180px'
                        },
                        '.css-pdct74-MuiTablePagination-selectLabel': {
                          fontFamily: 'Manrope',
                          marginTop: '10px'
                        }
                      }}
                    />
                  </div>
                  <div>
                    <Pagination
                      count={Math.ceil(filteredOutput.length / rowsPerPage)}
                      page={page + 1}
                      onChange={(event, newPage) => handleChangePage(event, newPage - 1)}

                      backIconButtonProps={{ style: { display: 'none' } }} // Hide the back button
                      nextIconButtonProps={{ style: { display: 'none' } }} // Hide the next button

                      sx={{
                        marginTop: 6
                      }}
                    />
                  </div>
                  <div className='flex-prop1'>
                    <div className='margin'>Go to page ----</div>
                    <div>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={filteredOutput.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        labelRowsPerPage={null} // Hide the "Rows per page" label
                        labelDisplayedRows={() => ''} // Hide the displayed rows information
                        backIconButtonProps={{ style: { display: 'none' } }} // Hide the back button
                        nextIconButtonProps={{ style: { display: 'block' } }} // Show the next button
                        SelectProps={{ style: { display: 'none' } }} // Hide the select dropdown
                        sx={{
                          '& .MuiTablePagination-toolbar.MuiToolbar-root.MuiToolbar-gutters.MuiToolbar-regular':
                          {
                            paddingLeft: 0
                          },
                          '& .MuiTablepagination':
                          {
                            marginLeft: 0
                          },
                          marginTop: 4.2,
                          fontFamily: 'Manrope'
                        }}
                      />
                    </div>
                  </div>
                  <div onClick={removeFilter} className='reqProceed gback'>Go Back</div>
                </div>

              ) : (

                <div className='flex-propt'>
                  <div>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={jobseeker.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      labelDisplayedRows={() => ''} // Hide the displayed rows information
                      backIconButtonProps={{ style: { display: 'none' } }} // Hide the back button
                      nextIconButtonProps={{ style: { display: 'none' } }} // Hide the next button

                      sx={{
                        marginTop: 5,
                        '.css-pdct74-MuiTablePagination-selectLabel': {
                          fontFamily: 'Manrope',
                          marginTop: '10px'
                        }
                      }}
                    />
                  </div>
                  <div>
                    <Pagination
                      count={Math.ceil(jobseeker.length / rowsPerPage)}
                      page={page + 1}
                      onChange={(event, newPage) => handleChangePage(event, newPage - 1)}

                      backIconButtonProps={{ style: { display: 'none' } }} // Hide the back button
                      nextIconButtonProps={{ style: { display: 'none' } }} // Hide the next button

                      sx={{
                        marginTop: 6
                      }}
                    />
                  </div>
                  <div className='flex-prop1'>
                    <div className='margin'>Go to page ----</div>
                    <div>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={jobseeker.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        labelRowsPerPage={null} // Hide the "Rows per page" label
                        labelDisplayedRows={() => ''} // Hide the displayed rows information
                        backIconButtonProps={{ style: { display: 'none' } }} // Hide the back button
                        nextIconButtonProps={{ style: { display: 'block' } }} // Show the next button
                        SelectProps={{ style: { display: 'none' } }} // Hide the select dropdown
                        sx={{
                          '& .MuiTablePagination-toolbar.MuiToolbar-root.MuiToolbar-gutters.MuiToolbar-regular':
                          {
                            paddingLeft: 0
                          },
                          '& .MuiTablepagination':
                          {
                            marginLeft: 0
                          },
                          marginTop: 4.2,
                          fontFamily: 'Manrope'
                        }}

                      />
                    </div>
                  </div>
                </div>
              )}

            </TableContainer>
          </TabPanel>
          <TabPanel value='2'>
            <JobAvailableAssessment />
          </TabPanel>
        </TabContext>
        {/* Result Modal */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className='resultbox resultcolor'>
            <div>
              <div className='flexing'>
                <div className='fontsize'>Assessment Result</div>
                <div onClick={handleClose} className='cancel paddnone'><CancelIcon /></div>
              </div>
              <div className='line'></div>
              <div className='flex-propt'>
                <div className='width'>
                  <div className='flex'>
                    <div><BadgeIcon style={{ color: '#1589CC' }} /></div>
                    <div className='moveright'>
                      <div className='head'>JobSeeker Details</div>
                      <div className='name'>{history.name}</div>
                      <table>

                        <tr>
                          <td className='heading'>Email Address</td>
                          <td className='response'>{history.userEmail}</td>
                        </tr>

                      </table>
                    </div>
                  </div>
                </div>

                <div className='width'>
                  <div className='flex'>
                    <div><QuizIcon style={{ color: '#1589CC' }} /></div>
                    <div className='moveright'>
                      <div className='head'>Assessment Details</div>
                      <div className='name'>{history.assessmentId}</div>
                      <div>
                        <table>
                          <tr>
                            <td className='heading'>Level</td>
                            <td className='response'>{history.skill}</td>
                          </tr>
                          <tr>
                            <td className='heading'>No of Topics</td>
                            <td className='response'>{history.numberOfTopics}</td>
                          </tr>
                          <tr>
                            <td className='heading'>No of Questions</td>
                            <td className='response'>{history.numberOfQuestion}</td>
                          </tr>
                          <tr>
                            <td className='heading'>Created On</td>
                            <td className='response'>{formatDate2(history.dateOfCreation)}</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br></br>
              <div className='white'>
                <br></br>
                <div className='flex-prop'>
                  <div className="rectangle">
                    <div className='resultname'>Result</div>
                    <div className='flex'>
                      <div><CheckBoxIcon style={{ color: '#039855' }} /></div>
                      <div className='margleft'>
                        <div className='passed'>Assessment Passed</div>
                        <div className='answer'>Correct Answer</div>
                        <div className='margbot answer'><span className='score'>{history.correctAnswer}</span>/{history.numberOfQuestion}</div>
                        <div className='answer'>Wrong Answer</div>
                        <div className='margbot answer'><span className='score'>{history.wrongAnswer}</span>/{history.numberOfQuestion}</div>
                        <div className='answer'>Skipped Answer</div>
                        <div className='answer'><span className='score'>{history.skippedAnswer}</span>/{history.numberOfQuestion}</div>
                      </div>
                      <div className='mark'>
                        <Example>
                          <AnimatedProgressProvider
                            valueStart={0}
                            valueEnd={progressValue}
                            duration={2.5}
                            easingFunction={easeQuadInOut}
                          >
                            {value => {
                              const roundedValue = Math.round(progressValue);
                              return (
                                <CircularProgressbar
                                  value={value}
                                  strokeWidth={6}
                                  text={`${roundedValue}%`}
                                  styles={buildStyles({
                                    pathTransition: "",
                                    textColor: '#039855',
                                    trailColor: '#d6d6d6',
                                    pathColor: "#039855",
                                  })}
                                />
                              );
                            }}
                          </AnimatedProgressProvider>
                        </Example>

                      </div>
                    </div>
                    <div className='position'>
                      <div className='flex2'>
                        {/* <div className='percent'><span className='bigpresent'>{history.score}</span>%</div>
                        <div className='points'>60 Points</div> */}
                      </div>
                    </div>
                  </div>
                  <div className="rectangle marg">
                    <div className='resultname'>Timer</div>
                    <div className='flex'>
                      <div><TimerIcon style={{ color: '#1589CC' }} /></div>
                      <div className='margleft'>
                        <div className='timer'>Total Time</div>
                        <div className='start'>00:00:12 &nbsp;&nbsp;&nbsp; /  &nbsp;&nbsp;&nbsp;<span className='end'>00:27:21</span></div>
                        <div className='margboth'>
                          <PrettoSlider
                            valueLabelDisplay="none"
                            aria-label="pretto slider"
                            defaultValue={5}
                            sx={{
                              width: '300px',
                              '@media (max-width: 1024px)': {
                                width: '200px', // Adjust width for screens up to 1024px
                                marginBottom: '0px'
                              },
                              '@media (max-width: 820px)': {
                                width: '200px', // Adjust width for screens up to 820px
                              },
                              '@media (max-width: 420px)': {
                                width: '100%', // Adjust width for screens up to 420px
                              }
                            }}
                          />
                        </div>
                        <div>
                          <table>
                            <tr>
                              <td className='answer'>Start Time</td>
                              <td className='time'>05:35pm</td>
                              <td className='answer'>Questions</td>
                              <td className='time'>01</td>
                            </tr>
                            <tr>
                              <td className='answer margboth'>End Time</td>
                              <td className='time margboth' >06:02pm</td>
                              <td className='answer margboth'>Date of Completion</td>
                              <td className='time margboth'>{formatDate2(history.completedOn)}</td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </Modal>

        {/* Accessories Modal */}
        <Modal
          open={open2}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{
            position: 'absolute',
            top: modalPosition.top,
            right: modalPosition.left,
          }}
        >
          <div className='accessoriesBox'>
            <div className='flexbox'>
              <div className='comman' onClick={toggleDrawer("right", true)}>Edit</div>
              <div className='comman' onClick={handleDelete}>Delete</div>
              <div className='comman' onClick={toggleDrawer2("right", true)}>Accessed to</div>
            </div>
          </div>
        </Modal>
        {/* FilterButton */}

        <Modal
          open={open3}
          onClose={handleClose3}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{
            position: 'absolute',
            top: modalPosition2.top,
            right: modalPosition2.left,
          }}
        >
          <div className='filterBoxpop'>
            <div className="flexouter">
              <div className='filterflex'>
                <div className='filterhead'>Filters</div>
                <div className='filterflex2'>
                  <div className='filtercomman clearAll' onClick={clearAllCheckboxes}>Clear All</div>
                  <div className='filtercomman apply' onClick={applyFilters}>Apply</div>
                </div>
              </div>
              <div className='filterline'></div>
              <div className='filterflex' onClick={toggle}>
                <div className='filterBased'>
                  Department
                </div>
                <div className='filterflex2'>
                  {checkedCount > 0 ? (
                    <div className='countbg'> {checkedCount}</div>) : null}
                  <div className='margright'><FontAwesomeIcon icon={toggleclick ? faChevronDown : faChevronUp} /></div>
                </div>
              </div>
              {/* Department dropdown */}
              <div className={toggleclick ? "dept hidden" : "dept"} id="ques">
                {/* Add Questions link */}
                {getAllDept.map((name) => (
                  <p>
                    <input type='checkbox'
                      value={name.departmentName}
                      checked={name.checked}
                      onChange={(event) => handleCheckboxChange(event, name.id)} /> {name.departmentName}
                  </p>
                ))}
              </div>

              <div className='filterline'></div>
              {/* Topics */}
              <div className='filterflex' onClick={TopicToggle}>
                <div className='filterBased'>
                  Topic
                </div>
                <div className='filterflex2'>
                  {topicCount > 0 ? (
                    <div className='countbg'>{topicCount}</div>) : null}
                  <div className='margright'><FontAwesomeIcon icon={topicToggleclick ? faChevronDown : faChevronUp} /></div>
                </div>
              </div>
              {/* Topic dropdown */}
              <div className={topicToggleclick ? "dept hidden" : "dept"} id="ques">
                {/* Add Questions link */}
                {getTopic.map((topics, index) => (
                  <p key={index}>
                    <input type='checkbox' value={topics} checked={selectedTopics.includes(topics)}
                      onChange={(event) => handleTopicCheckboxChange(event, topics)} /> {topics}
                  </p>
                ))}
              </div>
              <div className='filterline'></div>

              {/* Skill Level */}
              <div className='filterflex' onClick={SkillToggle}>
                <div className='filterBased'>
                  Skill
                </div>
                <div className='filterflex2 height'>
                  {skillCount > 0 ? (
                    <div className='countbg'>{skillCount}</div>) : null}
                  <div className='margright'><FontAwesomeIcon icon={skillToggleclick ? faChevronDown : faChevronUp} /></div>
                </div>
              </div>
              {/* Topic dropdown */}
              <div className={skillToggleclick ? "dept hidden" : "dept"} id="ques">
                {/* Add skill link */}
                {getSkill.map((name) => (
                  <p key={name.id}>

                    <input type='checkbox' value={name.skillLevel} checked={selectedSkill === name.skillLevel}
                      onChange={handleSkillChange} /> {name.skillLevel}

                  </p>
                ))}
              </div>
              <div className='filterline'></div>
            </div>
          </div>
        </Modal>

        {/* Edit Button */}

        <div>
          <Drawer
            anchor="right" // Set the anchor to "right" for the drawer to appear from the right side
            open={isDrawerOpen}
            onClose={toggleDrawer(false)}
            sx={{
              '& .MuiBackdrop-root.MuiModal-backdrop': {
                backgroundColor: '#143b6f48',
              },
            }}
          >
            <div className='EditSidebar'>
              <div className='createFlex'>
                <div className='create'>Update JobSeeker Assessment</div>
                <div onClick={closeEdit} className='cursor'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M16 2C19.713 2 23.274 3.475 25.8995 6.1005C28.525 8.72601 30 12.287 30 16C30 19.713 28.525 23.274 25.8995 25.8995C23.274 28.525 19.713 30 16 30C12.287 30 8.72601 28.525 6.1005 25.8995C3.475 23.274 2 19.713 2 16C2 12.287 3.475 8.72601 6.1005 6.1005C8.72601 3.475 12.287 2 16 2ZM16 14.302L12.748 11.05C12.5228 10.8248 12.2174 10.6983 11.899 10.6983C11.5806 10.6983 11.2752 10.8248 11.05 11.05C10.8248 11.2752 10.6983 11.5806 10.6983 11.899C10.6983 12.2174 10.8248 12.5228 11.05 12.748L14.302 16L11.05 19.252C10.9385 19.3635 10.8501 19.4959 10.7897 19.6415C10.7294 19.7872 10.6983 19.9433 10.6983 20.101C10.6983 20.2587 10.7294 20.4148 10.7897 20.5605C10.8501 20.7061 10.9385 20.8385 11.05 20.95C11.1615 21.0615 11.2939 21.1499 11.4395 21.2103C11.5852 21.2706 11.7413 21.3017 11.899 21.3017C12.0567 21.3017 12.2128 21.2706 12.3585 21.2103C12.5041 21.1499 12.6365 21.0615 12.748 20.95L16 17.698L19.252 20.95C19.3635 21.0615 19.4959 21.1499 19.6415 21.2103C19.7872 21.2706 19.9433 21.3017 20.101 21.3017C20.2587 21.3017 20.4148 21.2706 20.5605 21.2103C20.7061 21.1499 20.8385 21.0615 20.95 20.95C21.0615 20.8385 21.1499 20.7061 21.2103 20.5605C21.2706 20.4148 21.3017 20.2587 21.3017 20.101C21.3017 19.9433 21.2706 19.7872 21.2103 19.6415C21.1499 19.4959 21.0615 19.3635 20.95 19.252L17.698 16L20.95 12.748C21.0615 12.6365 21.1499 12.5041 21.2103 12.3585C21.2706 12.2128 21.3017 12.0567 21.3017 11.899C21.3017 11.7413 21.2706 11.5852 21.2103 11.4395C21.1499 11.2939 21.0615 11.1615 20.95 11.05C20.8385 10.9385 20.7061 10.8501 20.5605 10.7897C20.4148 10.7294 20.2587 10.6983 20.101 10.6983C19.9433 10.6983 19.7872 10.7294 19.6415 10.7897C19.4959 10.8501 19.3635 10.9385 19.252 11.05L16 14.302Z" fill="#242D35" />
                  </svg>
                </div>
              </div>

              <Stack direction="column" spacing={1}>
                <TextField
                  className="seekerEmail"
                  value={editRow.userEmail}
                  disabled
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddChip();
                    }
                  }}
                  sx={{ marginLeft: '48px', width: '654px', marginTop: '10px' }}
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
                    shrink: true,
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
                onMouseDown={handleInputMouseDown2}
                onBlur={handleInputBlur2}
                label={!isInputActive1 ? 'Enter Assessment ID' : ''}
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
                    width: '654px'
                  }
                }}
              />

              <Box sx={{ marginLeft: '48px', width: '654px', marginTop: '36px' }}>
                <FormControl className="departmentBox">
                  <InputLabel id="demo-simple-select-label" shrink={!isInputActive2}>Department</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={editRow.department || ''}
                    label={!isInputActive2 ? 'Department' : ''}
                    // label={!editRow.department ? 'Department' : ''}
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
                        sx={{ width: '100%', border: 'none', '& .MuiInputBase-input.MuiOutlinedInput-input': { padding: '0px 10px', color: '#1589CC' } }}
                        placeholder="+ Enter new department"
                        value={department}
                        onClick={handleClick}
                        InputProps={{
                          endAdornment: (
                            <>
                              {isTextFieldClicked && department && (
                                <Button variant="text" onClick={handleAdd}>
                                  Add
                                </Button>
                              )}
                            </>
                          ),
                        }}
                        onFocus={(e) => e.stopPropagation()} // Prevent closing when clicking on TextField
                      />
                    </MenuItem>
                    {getAllDept.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, departmentName, theme)}
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
                    checked={editRow.skills === "Basic"}
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
                    checked={editRow.skills === "Intermediate"}
                    labelPlacement='start'
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
                    labelPlacement='start'
                    checked={editRow.skills === "Advanced"}
                    disabled
                  />
                  <FormControlLabel
                    value="upskill"
                    control={<Radio color="default" />}
                    sx={{ marginRight: '0px', marginLeft: '50px' }}
                    label={
                      <React.Fragment>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="15" viewBox="0 0 18 15" fill="none">
                          <path d="M4.3425 14.4L0 10.0575L4.3425 5.715L5.2875 6.66L2.565 9.3825H9.675V10.7325H2.565L5.2875 13.455L4.3425 14.4ZM13.6575 8.685L12.7125 7.74L15.435 5.0175H8.325V3.6675H15.435L12.7125 0.945L13.6575 0L18 4.3425L13.6575 8.685Z" fill="#0C1116" />
                        </svg>&nbsp;
                        upskill
                      </React.Fragment>
                    }
                    labelPlacement='start'
                    checked={editRow.skills === "upskill"}
                    disabled
                  />
                </RadioGroup>
              </FormControl>

              <div>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  className="assessmentId"
                  onMouseDown={handleInputMouseDown2}
                  onBlur={handleInputBlur2}
                  onChange={handleTopicChange}
                  label={!isInputActive2 ? 'Enter Topic Names' : ''}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={editRow.topicName || ''}
                  renderValue={renderValue}
                  disabled
                  sx={{
                    margin: '0px 40px 0px 48px',
                    maxWidth: '654px',
                    height: '27px',
                    marginBottom: '30px',
                    marginTop: '36px',
                    '& .MuiOutlinedInput-root': {
                      width: '654px'
                    }
                  }}
                />
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
                    <TextField id="outlined-basic" label={'Number of Questions'} variant="outlined" value={editRow.numberOfQuestion} disabled />

                  </Box>
                  <p className='questionsPara'>Time alloted for a question is 90 sec.</p>

                </div>
                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ width: '310px', marginTop: '36px' }}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker label={!editRow.dateOfCompletion ? formatDate3(editRow.dateOfCompletion) : 'Date of Completion'}
                        sx={{ width: '300px', marginTop: '48px', marginLeft: '100px' }}
                        format="DD/MM/YYYY"
                        value={updateDateValue}
                        onChange={handleDateChange}
                        multiple
                        disablePast
                      />
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
                  multiline
                  rows={5}
                  variant="outlined"
                  value={editRow.description} // Make sure to use value prop for TextField
                  disabled
                />
              </Box>
              <div className='mailButtons'>
                <Stack spacing={2} direction="row">
                  <Button className='cancelButton' onClick={toggleDrawer(false)} variant="text">Cancel</Button>
                  <Button className='sendButton' variant="outlined" onClick={updateDate}>Update</Button>
                </Stack>
              </div>
              <img src={kaniniLogo} className='formLogo' height='240px' width='240px' alt="Kanini Logo" />


            </div>
          </Drawer>
        </div>
        {/* Updated Successfully */}
        <Modal
          open={open5}
          onClose={handleClose5}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className='updateBody'>
            <div onClick={updateClose} className='crossUp'>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 2C19.713 2 23.274 3.475 25.8995 6.1005C28.525 8.72601 30 12.287 30 16C30 19.713 28.525 23.274 25.8995 25.8995C23.274 28.525 19.713 30 16 30C12.287 30 8.72601 28.525 6.1005 25.8995C3.475 23.274 2 19.713 2 16C2 12.287 3.475 8.72601 6.1005 6.1005C8.72601 3.475 12.287 2 16 2ZM16 14.302L12.748 11.05C12.5228 10.8248 12.2174 10.6983 11.899 10.6983C11.5806 10.6983 11.2752 10.8248 11.05 11.05C10.8248 11.2752 10.6983 11.5806 10.6983 11.899C10.6983 12.2174 10.8248 12.5228 11.05 12.748L14.302 16L11.05 19.252C10.9385 19.3635 10.8501 19.4959 10.7897 19.6415C10.7294 19.7872 10.6983 19.9433 10.6983 20.101C10.6983 20.2587 10.7294 20.4148 10.7897 20.5605C10.8501 20.7061 10.9385 20.8385 11.05 20.95C11.1615 21.0615 11.2939 21.1499 11.4395 21.2103C11.5852 21.2706 11.7413 21.3017 11.899 21.3017C12.0567 21.3017 12.2128 21.2706 12.3585 21.2103C12.5041 21.1499 12.6365 21.0615 12.748 20.95L16 17.698L19.252 20.95C19.3635 21.0615 19.4959 21.1499 19.6415 21.2103C19.7872 21.2706 19.9433 21.3017 20.101 21.3017C20.2587 21.3017 20.4148 21.2706 20.5605 21.2103C20.7061 21.1499 20.8385 21.0615 20.95 20.95C21.0615 20.8385 21.1499 20.7061 21.2103 20.5605C21.2706 20.4148 21.3017 20.2587 21.3017 20.101C21.3017 19.9433 21.2706 19.7872 21.2103 19.6415C21.1499 19.4959 21.0615 19.3635 20.95 19.252L17.698 16L20.95 12.748C21.0615 12.6365 21.1499 12.5041 21.2103 12.3585C21.2706 12.2128 21.3017 12.0567 21.3017 11.899C21.3017 11.7413 21.2706 11.5852 21.2103 11.4395C21.1499 11.2939 21.0615 11.1615 20.95 11.05C20.8385 10.9385 20.7061 10.8501 20.5605 10.7897C20.4148 10.7294 20.2587 10.6983 20.101 10.6983C19.9433 10.6983 19.7872 10.7294 19.6415 10.7897C19.4959 10.8501 19.3635 10.9385 19.252 11.05L16 14.302Z" fill="#242D35" />
              </svg>
            </div>
            <div className='divcenter'>
              <img src={TickGif} className='imgtick'></img>
            </div>
            <div className='updated'>Updated Successfully</div>
          </div>
        </Modal>

        {/* Accessed To */}
        <div>
          <Drawer
            anchor="right" // Set the anchor to "right" for the drawer to appear from the right side
            open={isDrawerOpen2}
            onClose={toggleDrawer2(false)}
            sx={{
              '& .MuiBackdrop-root.MuiModal-backdrop': {
                backgroundColor: '#143b6f48',
              },
            }}
          >
            <div className='EditSidebar'>
              <div className='createFlex'>
                <div className='create'>Create JobSeeker Assessment</div>
                <div onClick={closeEdit} className='cursor'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M16 2C19.713 2 23.274 3.475 25.8995 6.1005C28.525 8.72601 30 12.287 30 16C30 19.713 28.525 23.274 25.8995 25.8995C23.274 28.525 19.713 30 16 30C12.287 30 8.72601 28.525 6.1005 25.8995C3.475 23.274 2 19.713 2 16C2 12.287 3.475 8.72601 6.1005 6.1005C8.72601 3.475 12.287 2 16 2ZM16 14.302L12.748 11.05C12.5228 10.8248 12.2174 10.6983 11.899 10.6983C11.5806 10.6983 11.2752 10.8248 11.05 11.05C10.8248 11.2752 10.6983 11.5806 10.6983 11.899C10.6983 12.2174 10.8248 12.5228 11.05 12.748L14.302 16L11.05 19.252C10.9385 19.3635 10.8501 19.4959 10.7897 19.6415C10.7294 19.7872 10.6983 19.9433 10.6983 20.101C10.6983 20.2587 10.7294 20.4148 10.7897 20.5605C10.8501 20.7061 10.9385 20.8385 11.05 20.95C11.1615 21.0615 11.2939 21.1499 11.4395 21.2103C11.5852 21.2706 11.7413 21.3017 11.899 21.3017C12.0567 21.3017 12.2128 21.2706 12.3585 21.2103C12.5041 21.1499 12.6365 21.0615 12.748 20.95L16 17.698L19.252 20.95C19.3635 21.0615 19.4959 21.1499 19.6415 21.2103C19.7872 21.2706 19.9433 21.3017 20.101 21.3017C20.2587 21.3017 20.4148 21.2706 20.5605 21.2103C20.7061 21.1499 20.8385 21.0615 20.95 20.95C21.0615 20.8385 21.1499 20.7061 21.2103 20.5605C21.2706 20.4148 21.3017 20.2587 21.3017 20.101C21.3017 19.9433 21.2706 19.7872 21.2103 19.6415C21.1499 19.4959 21.0615 19.3635 20.95 19.252L17.698 16L20.95 12.748C21.0615 12.6365 21.1499 12.5041 21.2103 12.3585C21.2706 12.2128 21.3017 12.0567 21.3017 11.899C21.3017 11.7413 21.2706 11.5852 21.2103 11.4395C21.1499 11.2939 21.0615 11.1615 20.95 11.05C20.8385 10.9385 20.7061 10.8501 20.5605 10.7897C20.4148 10.7294 20.2587 10.6983 20.101 10.6983C19.9433 10.6983 19.7872 10.7294 19.6415 10.7897C19.4959 10.8501 19.3635 10.9385 19.252 11.05L16 14.302Z" fill="#242D35" />
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
                    width: '654px'
                  }
                }}
              />

              <Box sx={{ marginLeft: '48px', width: '654px', marginTop: '36px' }}>
                <FormControl className="departmentBox">
                  <InputLabel id="demo-simple-select-label" shrink={!isInputActive2}>Department</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={editRow.department || ''}
                    label={!isInputActive2 ? 'Department' : ''}
                    // label={!editRow.department ? 'Department' : ''}
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
                        sx={{ width: '100%', border: 'none', '& .MuiInputBase-input.MuiOutlinedInput-input': { padding: '0px 10px', color: '#1589CC' } }}
                        placeholder="+ Enter new department"
                        value={department}
                        onClick={handleClick}
                        InputProps={{
                          endAdornment: (
                            <>
                              {isTextFieldClicked && department && (
                                <Button variant="text" onClick={handleAdd}>
                                  Add
                                </Button>
                              )}
                            </>
                          ),
                        }}
                        onFocus={(e) => e.stopPropagation()} // Prevent closing when clicking on TextField
                      />
                    </MenuItem>
                    {getAllDept.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, departmentName, theme)}
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
                    checked={editRow.skills === "Basic"}
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
                    checked={editRow.skills === "Intermediate"}
                    labelPlacement='start'
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
                    labelPlacement='start'
                    checked={editRow.skills === "Advanced"}
                    disabled
                  />
                  <FormControlLabel
                    value="upskill"
                    control={<Radio color="default" />}
                    sx={{ marginRight: '0px', marginLeft: '50px' }}
                    label={
                      <React.Fragment>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="15" viewBox="0 0 18 15" fill="none">
                          <path d="M4.3425 14.4L0 10.0575L4.3425 5.715L5.2875 6.66L2.565 9.3825H9.675V10.7325H2.565L5.2875 13.455L4.3425 14.4ZM13.6575 8.685L12.7125 7.74L15.435 5.0175H8.325V3.6675H15.435L12.7125 0.945L13.6575 0L18 4.3425L13.6575 8.685Z" fill="#0C1116" />
                        </svg>&nbsp;
                        upskill
                      </React.Fragment>
                    }
                    labelPlacement='start'
                    checked={editRow.skills === "upskill"}
                    disabled
                  />
                </RadioGroup>
              </FormControl>

              <div>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  className="assessmentId"
                  onMouseDown={handleInputMouseDown2}
                  onBlur={handleInputBlur2}
                  renderValue={renderValue}
                  onChange={handleTopicChange}
                  label={!isInputActive2 ? 'Enter Topic Names' : ''}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={editRow.topicName || ''}
                  disabled
                  sx={{
                    margin: '0px 40px 0px 48px',
                    maxWidth: '654px',
                    height: '27px',
                    marginBottom: '30px',
                    marginTop: '36px',
                    '& .MuiOutlinedInput-root': {
                      width: '654px'
                    }
                  }}
                />
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
                    <TextField id="outlined-basic" label={'Total Questions'} variant="outlined" type='number' onChange={handleQuestionNoChange} />
                  </Box>
                  <p className='questionsPara'>Time alloted for a question is 90 sec.</p>

                </div>

                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ width: '310px', marginTop: '36px' }}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker label="Date of completion" sx={{ width: '300px', marginTop: '48px', marginLeft: '100px' }} format="DD/MM/YYYY"
                        value={updateDateValue}
                        onChange={handleDateChange}
                        disablePast
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
                  multiline
                  rows={5}
                  variant="outlined"
                  value={editRow.description} // Make sure to use value prop for TextField
                  disabled
                />
              </Box>
              <div className='mailButtons'>
                <Stack spacing={2} direction="row">
                  <Button className='cancelButton' onClick={toggleDrawer2(false)} variant="text">Cancel</Button>
                  <Button className='sendButton' variant="outlined" onClick={postUserAssessment}>Send Mail</Button>
                </Stack>
              </div>
              <img src={kaniniLogo} className='formLogo' height='240px' width='240px' alt="Kanini Logo" />
            </div>
          </Drawer>
        </div>

        {/* Do you want to delete */}

        <Modal
          open={open4}
          onClose={handleClose4}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className='deleteBox'>
            <div className='floatRight' onClick={handleClose4}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 2C19.713 2 23.274 3.475 25.8995 6.1005C28.525 8.72601 30 12.287 30 16C30 19.713 28.525 23.274 25.8995 25.8995C23.274 28.525 19.713 30 16 30C12.287 30 8.72601 28.525 6.1005 25.8995C3.475 23.274 2 19.713 2 16C2 12.287 3.475 8.72601 6.1005 6.1005C8.72601 3.475 12.287 2 16 2ZM16 14.302L12.748 11.05C12.5228 10.8248 12.2174 10.6983 11.899 10.6983C11.5806 10.6983 11.2752 10.8248 11.05 11.05C10.8248 11.2752 10.6983 11.5806 10.6983 11.899C10.6983 12.2174 10.8248 12.5228 11.05 12.748L14.302 16L11.05 19.252C10.9385 19.3635 10.8501 19.4959 10.7897 19.6415C10.7294 19.7872 10.6983 19.9433 10.6983 20.101C10.6983 20.2587 10.7294 20.4148 10.7897 20.5605C10.8501 20.7061 10.9385 20.8385 11.05 20.95C11.1615 21.0615 11.2939 21.1499 11.4395 21.2103C11.5852 21.2706 11.7413 21.3017 11.899 21.3017C12.0567 21.3017 12.2128 21.2706 12.3585 21.2103C12.5041 21.1499 12.6365 21.0615 12.748 20.95L16 17.698L19.252 20.95C19.3635 21.0615 19.4959 21.1499 19.6415 21.2103C19.7872 21.2706 19.9433 21.3017 20.101 21.3017C20.2587 21.3017 20.4148 21.2706 20.5605 21.2103C20.7061 21.1499 20.8385 21.0615 20.95 20.95C21.0615 20.8385 21.1499 20.7061 21.2103 20.5605C21.2706 20.4148 21.3017 20.2587 21.3017 20.101C21.3017 19.9433 21.2706 19.7872 21.2103 19.6415C21.1499 19.4959 21.0615 19.3635 20.95 19.252L17.698 16L20.95 12.748C21.0615 12.6365 21.1499 12.5041 21.2103 12.3585C21.2706 12.2128 21.3017 12.0567 21.3017 11.899C21.3017 11.7413 21.2706 11.5852 21.2103 11.4395C21.1499 11.2939 21.0615 11.1615 20.95 11.05C20.8385 10.9385 20.7061 10.8501 20.5605 10.7897C20.4148 10.7294 20.2587 10.6983 20.101 10.6983C19.9433 10.6983 19.7872 10.7294 19.6415 10.7897C19.4959 10.8501 19.3635 10.9385 19.252 11.05L16 14.302Z" fill="#242D35" />
              </svg>
            </div>
            <div className='deleteCentre'>
              <div><img src={deleteGif} alt='Delete' className='dustBin'></img></div>
              <div className='deleteHead'>Do you Want to Delete</div>
              <div className='deleteBody'>Do you want to delete this name from the assessment List</div>
              <div className='deleteBody marginbottom'>Click Confirm to Delete</div>
            </div>
            <div className='delLine'></div>
            <div className='deleteflex'>
              <div className='cancelDelete' onClick={handleClose4}>Cancel</div>
              <div className='confirmDelete' onClick={confirmDelete}>Confirm</div>
            </div>
          </div>
        </Modal>

        {/* Image bottom */}
        <div className='bottomImage'>
        </div>
        {/* Create Assessment call */}
        <div>{isEmployeeDrawerOpen && <SeekerAssessment onClose={handleEmployeeDrawerClose} />}</div>
        {/* sended popup */}
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
      </div>
    </>
  );
};

export default JobAssessment;


function Example(props) {
  return (
    <div style={{ marginBottom: 80 }}>
      <div style={{ marginLeft: '20px', display: "flex" }}>
        <div className='circularBar' style={{}}>{props.children}</div>
      </div>
    </div>
  );
}



function getStyles(getAllDept, departmentName, theme) {
  return {
    fontWeight:
      departmentName.indexOf(getAllDept) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}