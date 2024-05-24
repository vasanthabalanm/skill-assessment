import '../EmployeeAssessment/EmployeeAssessment.css';
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
import axios from 'axios';
import ImportExportTwoToneIcon from '@mui/icons-material/ImportExportTwoTone';
import Modal from '@mui/material/Modal';
import CancelIcon from '@mui/icons-material/Cancel';
import Navbars from '../Navbar/Navbar';
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
// import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';
import kaniniLogo from '../../assets/formlogo.png';
import dayjs from 'dayjs';
import TickGif from '../../assets/updatedsuccessfully.gif'
import Alert from '@mui/material/Alert';
import { toast } from 'react-toastify';
import Basic from '../../assets/Basic.png'
import Intermediate from '../../assets/Intermediate.png'
import Advanced from '../../assets/Advanced.png'


/*style*/

const tablefetch = {
    border: 'none', textAlign: 'center', fontSize: '12px',
    color: '#0C1116',
    fontFamily: 'Manrope',
    fontSize: '13px',
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

//select 
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

const EmployeeRequest = () => {

    const [getEmployee, setEmployee] = useState([]);
    const [getDetails, setDetails] = useState({});
    const [orderBy, setOrderBy] = useState('');
    const [order, setOrder] = useState('asc');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);
    const [open, setOpen] = React.useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);//Edit Button
    const [open5, setOpen5] = React.useState(false);//Edit Successfully
    const [isChecked, setIsChecked] = useState(false);//successfully tag
    const [isNotChecked, setIsNotChecked] = useState(false);
    const [showSlide, setShowSlide] = useState(false);
    const [removedRows, setRemovedRows] = useState([]);
    const [removedRows2, setRemovedRows2] = useState([]);
    const [formValues,] = useState({
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
    const [showSlide2, setShowSlide2] = useState(false);
    const [topicName, setTopicName] = React.useState([]);
    const [personName, setPersonName] = React.useState([]);
    const [department, setDepartment] = React.useState('');
    const [editOpen, setEditOpen] = React.useState(false);
    const [isInputActive2, setIsInputActive2] = React.useState(false);
    const [editRow, setEditRow] = useState({});
    const [selectedRow, setSelectedRow] = useState({});
    const [updateDateValue, setUpdateDateValue] = useState('')
    const [editFinish, setEditFinish] = useState({})

    const empFetch = () => {
        axios.get('https://localhost:7281/HistoryTable/GetAllRequestReceived',
            {
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem('token')
                },
            })
            .then(response => {
                const myData = response.data;
                setEmployee(myData);
            })
            .catch(error => {
                toast.error('Error:', error);
            });
    };

    //fetch all the values in a table
    useEffect(() => {
        empFetch();
    }, []);

    //convert to date format
    const formatDate = (dateString) => {
        const options = { month: 'short', day: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    //Edit Button
    const formatDate3 = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();

        return `${day}/${month}/${year}`;
    };

    //Sorting
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

    //Display the table in sorted manner
    const sortedRows = stableSort(getEmployee, getComparator(order, orderBy));
    //For no of rows equal to pagination part
    const slicedRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleOpen = (userAssessmentId) => () => {
        console.log('Open modal for userAssessmentId:', userAssessmentId);
        fetchData(userAssessmentId);
        // Handle modal opening logic here
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const fetchData = (userAssessmentId) => {
        fetch(`https://localhost:7281/HistoryTable/GetUserRequestDetails?RequestId=${userAssessmentId}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem('token')
            },
        })
            .then(async (data) => {
                const myData = await data.json();
                if (typeof myData === "object" && myData !== null) {
                    setDetails(myData);
                } else {
                    toast.error("Invalid data format for history");
                }
            })
            .catch((error) => {
                toast.error("Error:", error);
            });
    };

    //details of topic names seperated by ,
    function renderTopics(topics) {
        if (Array.isArray(topics)) {
            return topics.join(', ');
        }
        return '';
    }

    //acceptButton
    const handleRemoveRow = (requestId, row) => {
        setShowSlide(true);
        setTimeout(() => {
            setShowSlide(false);
        }, 2000);
        //bottom
        setIsChecked(true)
        setTimeout(() => {
            setIsChecked(false);
        }, 2000);
        setRemovedRows(
            removedRows.includes(requestId)
                ? removedRows.filter((id) => id !== requestId)
                : [removedRows, requestId]
        );
        //API Call
        fetch(`https://localhost:7281/HistoryTable/UpdatingIsChecked?RequestId=${requestId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem('token')
            },
            body: JSON.stringify({
                isChecked: true,
            }),
        })
            .then(response => response.json())
            .then(data => {
            })
            .catch(error => {
                toast.error('Error fetching topics:', error);
            });

        //POST ACTION
        const formValues = {
            userId: row.empId,
            assessmentId: row.assessmentId,
            numberOfTopics: row.numberOfTopic,
            numberOfQuestions: row.noOfQuestion,
            totalTime: row.timeAllotted,
            dateOfCreation: row.requestedOn,
            dateOfCompletion: row.completionOn,
            description: "Request to take to the above assessment",
            assessmentHistoryId: null,
        };
        fetch(`https://localhost:7281/HistoryTable/PostExistingAssessment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem('token')
            },
            body: JSON.stringify(formValues),
        })
            .then(response => response.json())
            .then(data => {
            })
            .catch(error => {
                toast.error('Error fetching topics:', error);
            });
    };
    //posting an assessment
    useEffect(() => {
    }, [formValues]);

    //Reject Button

    const handleRemoveRow2 = (requestId) => {

        setShowSlide2(true);

        // // Hide the slide after 1 second
        setTimeout(() => {
            setShowSlide2(false);
        }, 2000);
        setRemovedRows2(
            removedRows2.includes(requestId)
                ? removedRows2.filter((id) => id !== requestId)
                : [removedRows2, requestId]
        );
        //API Call
        fetch(`https://localhost:7281/HistoryTable/AfterAdminDecision?RequestId=${requestId}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem('token')
            },
        })
            .then(async (data) => {
                const myData = await data.json();
                if (data.success) {
                    empFetch();
                } else {
                }
            })
            .catch((error) => {
                toast.error("Error:", error);
            });
        setIsNotChecked(true);

        setTimeout(() => {
            setIsNotChecked(false);
        }, 2000);
    };
    //edit Button
    const closeEdit = () => {
        toggleDrawer(false)
        window.location.reload();
    }

    const updateClose = () => {
        handleClose5()
        toggleDrawer(false)
    }
    const handleTopicChange = (event) => {
        const {
            target: { value },
        } = event;
        setTopicName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const edithandleOpen2 = () => {
        setEditOpen(true);
    };

    const edithandleClose2 = () => {
        setEditOpen(false);
    };

    const handlePersonChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
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
        return `${selected.slice(0, 2).join(', ')} & ${selected.length - 2} more (${selected.length})`;
    };

    //EditButton
    const toggleDrawer = (open, response, reqId) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsDrawerOpen(open);
        editButton(reqId);
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

    const editButton = (reqId) => {
        setSelectedRow(reqId);
        //edit sidebar values api fetch
        fetch(`https://localhost:7281/HistoryTable/GetSideBarDetailForRequest?id=${reqId}`, {
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
    }
    useEffect(() => { editButton() }, [])

    const handleDateChange = (newValue) => {
        setUpdateDateValue(dayjs(newValue).format('YYYY-MM-DD'));
    };

    const updateDate = () => {
        fetch(`https://localhost:7281/HistoryTable/UpdatingDate?RequestId=${selectedRow}`, {
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
                toast.error('Error fetching topics:', error);
            });
        setOpen5(true);
    }
    //updated successfully
    const handleClose5 = () => {
        setOpen5(false);
    }
    return (
        <>
            <Navbars title="Employee Request Received" desc="View completed details of all request assessed and its corresponding details raised from employee"></Navbars>
            <div className='alignment2'>
                <TableContainer>
                    <Table sx={{ border: '1px solid #ccc' }}>
                        <TableHead sx={{ backgroundColor: '#DFF3FB' }}>
                            <TableRow >
                                <TableCell align="center" sx={tablehead}>
                                    <TableSortLabel
                                        active={orderBy === 'name'}
                                        direction={orderBy === 'name' ? order : 'asc'}
                                        onClick={() => handleSortClick('name')}
                                        IconComponent={ImportExportTwoToneIcon}
                                        sx={{
                                            '& .MuiTableSortLabel-icon': {
                                                opacity: 1,
                                                color: 'blue',
                                                marginLeft: '15px',
                                            },
                                        }}
                                    >
                                        Employee Name & ID
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
                                                marginLeft: '15px'
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
                                                marginLeft: '15px'
                                            },

                                        }}
                                    >
                                        Level
                                    </TableSortLabel>
                                    <div className='right-border'></div>
                                </TableCell>

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
                                                marginLeft: '15px'
                                            },
                                        }}
                                    >
                                        Assessment ID
                                    </TableSortLabel>
                                    <div className='right-border'></div>
                                </TableCell>

                                <TableCell align="center" sx={tablehead}>
                                    No. of Topics
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
                                                color: 'blue',
                                                marginLeft: '15px'
                                            },
                                        }}
                                    >
                                        Requested On
                                    </TableSortLabel>
                                    <div className='right-border'></div>
                                </TableCell>

                                <TableCell align="center" sx={tablehead}>
                                    Details
                                    <div className='right-border'></div>
                                </TableCell>

                                <TableCell align="center" sx={tablehead}>
                                    Decisison
                                    <div className='right-border'></div>
                                </TableCell>

                                <TableCell align="center" sx={tablehead}>
                                    More
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {slicedRows.map((row) => {
                                const isRowRemoved = removedRows.includes(row.requestId);
                                const isRowRemoved2 = removedRows2.includes(row.requestId);
                                return (
                                    <TableRow key={row.requestId}>
                                        {!isRowRemoved && !isRowRemoved2 && (<TableCell sx={{ border: 'none', fontSize: '12px' }}>
                                            <div className='flex-prop'>
                                                <div className='imageDiv'><img src={`https://localhost:7281/Images/${row.employeeImage}`} className='image' alt='EmployeeImage'/></div>
                                                <div>
                                                    <div className='EmpName'>{row.name}</div>
                                                    <div className='float viewResult'>{row.empId}</div>
                                                </div>
                                            </div>
                                        </TableCell>)}
                                        {!isRowRemoved && !isRowRemoved2 && (<TableCell sx={tablefetch}>{row.department}</TableCell>)}
                                        {!isRowRemoved && !isRowRemoved2 && (<TableCell sx={tablefetch}>{row.skills}</TableCell>)}
                                        {!isRowRemoved && !isRowRemoved2 && (<TableCell sx={tablefetch}>{row.assessmentId}</TableCell>)}
                                        {!isRowRemoved && !isRowRemoved2 && (<TableCell sx={tablefetch}>{row.numberOfTopic}</TableCell>)}
                                        {isRowRemoved && showSlide && (
                                            <TableCell colSpan={9} sx={{ textAlign: 'center', borderBottom: 'none', color: '#039855' }}>
                                                <div className='slided'>APPROVED</div>
                                            </TableCell>
                                        )}
                                        {isRowRemoved2 && showSlide2 && (
                                            <TableCell colSpan={9} sx={{ textAlign: 'center', borderBottom: 'none' }}>
                                                <div className='slide2'>DENIED</div>
                                            </TableCell>
                                        )}
                                        {!isRowRemoved && !isRowRemoved2 && (
                                            <TableCell sx={tablefetch}>
                                                {formatDate(row.requestedOn)}
                                            </TableCell>)}
                                        {!isRowRemoved && !isRowRemoved2 && (
                                            <TableCell sx={tablefetch} className='viewResult'>
                                                <p className='result' onClick={handleOpen(row.requestId)}>VIEW DETAILS</p>
                                            </TableCell>)}
                                        {!isRowRemoved && !isRowRemoved2 && (
                                            <TableCell sx={tablefetch} className='viewResult'>
                                                <div className='decisionFlex'>
                                                    <div className='cursor tick' onClick={() => handleRemoveRow(row.requestId, row)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                            <path d="M10.23 17.46L18.72 8.97L17.34 7.62L10.23 14.73L6.63 11.13L5.28 12.48L10.23 17.46ZM12 24C10.36 24 8.81 23.685 7.35 23.055C5.89 22.425 4.615 21.565 3.525 20.475C2.435 19.385 1.575 18.11 0.945 16.65C0.315 15.19 0 13.64 0 12C0 10.34 0.315 8.78 0.945 7.32C1.575 5.86 2.435 4.59 3.525 3.51C4.615 2.43 5.89 1.575 7.35 0.945C8.81 0.315 10.36 0 12 0C13.66 0 15.22 0.315 16.68 0.945C18.14 1.575 19.41 2.43 20.49 3.51C21.57 4.59 22.425 5.86 23.055 7.32C23.685 8.78 24 10.34 24 12C24 13.64 23.685 15.19 23.055 16.65C22.425 18.11 21.57 19.385 20.49 20.475C19.41 21.565 18.14 22.425 16.68 23.055C15.22 23.685 13.66 24 12 24ZM12 22.2C14.84 22.2 17.25 21.205 19.23 19.215C21.21 17.225 22.2 14.82 22.2 12C22.2 9.16 21.21 6.75 19.23 4.77C17.25 2.79 14.84 1.8 12 1.8C9.18 1.8 6.775 2.79 4.785 4.77C2.795 6.75 1.8 9.16 1.8 12C1.8 14.82 2.795 17.225 4.785 19.215C6.775 21.205 9.18 22.2 12 22.2Z" fill="#42D38B" />
                                                        </svg>
                                                    </div>
                                                    <div className='cursor remove' onClick={() => handleRemoveRow2(row.requestId)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                            <path d="M7.5 17.76L12 13.26L16.5 17.76L17.76 16.5L13.26 12L17.76 7.5L16.5 6.24L12 10.74L7.5 6.24L6.24 7.5L10.74 12L6.24 16.5L7.5 17.76ZM12 24C10.36 24 8.81 23.685 7.35 23.055C5.89 22.425 4.615 21.565 3.525 20.475C2.435 19.385 1.575 18.11 0.945 16.65C0.315 15.19 0 13.64 0 12C0 10.34 0.315 8.78 0.945 7.32C1.575 5.86 2.435 4.59 3.525 3.51C4.615 2.43 5.89 1.575 7.35 0.945C8.81 0.315 10.36 0 12 0C13.66 0 15.22 0.315 16.68 0.945C18.14 1.575 19.41 2.43 20.49 3.51C21.57 4.59 22.425 5.86 23.055 7.32C23.685 8.78 24 10.34 24 12C24 13.64 23.685 15.19 23.055 16.65C22.425 18.11 21.57 19.385 20.49 20.475C19.41 21.565 18.14 22.425 16.68 23.055C15.22 23.685 13.66 24 12 24ZM12 22.2C14.84 22.2 17.25 21.205 19.23 19.215C21.21 17.225 22.2 14.82 22.2 12C22.2 9.16 21.21 6.75 19.23 4.77C17.25 2.79 14.84 1.8 12 1.8C9.18 1.8 6.775 2.79 4.785 4.77C2.795 6.75 1.8 9.16 1.8 12C1.8 14.82 2.795 17.225 4.785 19.215C6.775 21.205 9.18 22.2 12 22.2Z" fill="#FCA5A5" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </TableCell>)}
                                        {!isRowRemoved && !isRowRemoved2 && (
                                            <TableCell sx={{ border: 'none', textAlign: 'center' }}>
                                                <p className='cursor' onClick={toggleDrawer("right", true, row.requestId)}>EDIT</p>
                                            </TableCell>)}
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                    <div className='flex-propt'>
                        <div>
                            <TablePagination
                                rowsPerPageOptions={[8, 16, 25]}
                                component="div"
                                count={getEmployee.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                labelDisplayedRows={() => ''}
                                backIconButtonProps={{ style: { display: 'none' } }}
                                nextIconButtonProps={{ style: { display: 'none' } }}

                                sx={{
                                    marginTop: 5,
                                    '& .MuiToolbar-root.MuiTablePagination-toolbar': {
                                        width: '170px'
                                    }
                                }}
                            />
                        </div>
                        <div>
                            <Pagination
                                count={Math.ceil(getEmployee.length / rowsPerPage)}
                                page={page + 1}
                                onChange={(event, newPage) => handleChangePage(event, newPage - 1)}

                                backIconButtonProps={{ style: { display: 'none' } }}
                                nextIconButtonProps={{ style: { display: 'none' } }}
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
                                    count={getEmployee.length}
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
                                            paddingLeft: 0
                                        },
                                        '& .MuiTablepagination':
                                        {
                                            marginLeft: 0
                                        },
                                        marginTop: 5
                                    }}

                                />
                            </div>
                        </div>
                    </div>
                </TableContainer>

                {/* Result Modal */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className='requestbox resultcolor'>
                        <div>
                            <div className='flexing'>
                                <div className='fontsize'>Assessment Request</div>
                                <div onClick={handleClose} className='cancel paddnone'><CancelIcon /></div>
                            </div>
                            <div className='reqline'></div>
                            <div className='requestDetail'>
                                <div className='requestHead'>Employee Details</div>
                                <div className='requestFlex'>
                                    <div className='requestFlex3 reqtop'>
                                        <div className='reqColumn'>Employee Id</div>
                                        <div className='requestInput alignCent mrgleft'>{getDetails.empId}</div>
                                    </div>
                                    <div className='requestFlex3 reqtop'>
                                        <div className='reqColumn'>Department</div>
                                        <div className='requestInput alignCent mrgleft2'>{getDetails.department}</div>
                                    </div>
                                </div>
                                <div className='requestFlex reqtop'>
                                    <div className='requestFlex'>
                                        <div className='reqColumn'>Employee Name</div>
                                        <div className='requestInput alignCent mrgleft3'>{getDetails.name}</div>
                                    </div>
                                    <div className='requestFlex reqtop'>
                                        <div className='reqColumn'>Designation</div>
                                        <div className='requestInput alignCent mrgleft2'>{getDetails.designation}</div>
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <div className='white'>
                                <div className='requestDetail margtopReq'>
                                    <div className='requestHead'>Assessment Details</div>
                                    <div className='requestFlex'>
                                        <div className='requestFlex'>
                                            <div className='reqColumn'>Assessment Id</div>
                                            <div className='requestInput alignCent margleft4 assessInput'>{getDetails.assessmentId}</div>
                                        </div>
                                        <div className='requestFlex'>
                                            <div className='reqColumn mleft'>Date</div>
                                            <div className='requestInput alignCent margleft5  assessInput'>{formatDate3(getDetails.completionOn)}</div>
                                        </div>
                                    </div>
                                    <div className='requestFlex'>
                                        <div className='requestFlex'>
                                            <div className='reqColumn'>Topics</div>
                                            <div className='requestInput2 alignCent margleft6 assessInput'>{getDetails.topicName}</div>
                                        </div>
                                        <div className='requestFlex2 '>
                                            <div className='requestFlex mtop'>
                                                <div className='reqColumn'>Time Allotted</div>
                                                <div className='requestInput alignCent margleft7 assessInput'>{getDetails.timeAllotted}</div>
                                            </div>
                                            <div className='requestFlex mtop'>
                                                <div className='reqColumn'>Level</div>
                                                <div className='requestInput alignCent margleft8 assessInput'>{getDetails.skillLevel}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='proceedFlex'>
                                    <div className='reqCancel' onClick={handleClose}>Cancel</div>
                                    <div className='reqProceed' onClick={() => handleRemoveRow(getDetails.requestId, getDetails)}>Proceed</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
                {/* Image bottom */}
                <div className='bottomImage2'>
                </div>
                {/* Edit SideBar */}

                <div>
                    <Drawer
                        anchor="right"
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
                                <div className='create'>Update Employee Request</div>
                                <div onClick={closeEdit} className='cursor'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                        <path d="M16 2C19.713 2 23.274 3.475 25.8995 6.1005C28.525 8.72601 30 12.287 30 16C30 19.713 28.525 23.274 25.8995 25.8995C23.274 28.525 19.713 30 16 30C12.287 30 8.72601 28.525 6.1005 25.8995C3.475 23.274 2 19.713 2 16C2 12.287 3.475 8.72601 6.1005 6.1005C8.72601 3.475 12.287 2 16 2ZM16 14.302L12.748 11.05C12.5228 10.8248 12.2174 10.6983 11.899 10.6983C11.5806 10.6983 11.2752 10.8248 11.05 11.05C10.8248 11.2752 10.6983 11.5806 10.6983 11.899C10.6983 12.2174 10.8248 12.5228 11.05 12.748L14.302 16L11.05 19.252C10.9385 19.3635 10.8501 19.4959 10.7897 19.6415C10.7294 19.7872 10.6983 19.9433 10.6983 20.101C10.6983 20.2587 10.7294 20.4148 10.7897 20.5605C10.8501 20.7061 10.9385 20.8385 11.05 20.95C11.1615 21.0615 11.2939 21.1499 11.4395 21.2103C11.5852 21.2706 11.7413 21.3017 11.899 21.3017C12.0567 21.3017 12.2128 21.2706 12.3585 21.2103C12.5041 21.1499 12.6365 21.0615 12.748 20.95L16 17.698L19.252 20.95C19.3635 21.0615 19.4959 21.1499 19.6415 21.2103C19.7872 21.2706 19.9433 21.3017 20.101 21.3017C20.2587 21.3017 20.4148 21.2706 20.5605 21.2103C20.7061 21.1499 20.8385 21.0615 20.95 20.95C21.0615 20.8385 21.1499 20.7061 21.2103 20.5605C21.2706 20.4148 21.3017 20.2587 21.3017 20.101C21.3017 19.9433 21.2706 19.7872 21.2103 19.6415C21.1499 19.4959 21.0615 19.3635 20.95 19.252L17.698 16L20.95 12.748C21.0615 12.6365 21.1499 12.5041 21.2103 12.3585C21.2706 12.2128 21.3017 12.0567 21.3017 11.899C21.3017 11.7413 21.2706 11.5852 21.2103 11.4395C21.1499 11.2939 21.0615 11.1615 20.95 11.05C20.8385 10.9385 20.7061 10.8501 20.5605 10.7897C20.4148 10.7294 20.2587 10.6983 20.101 10.6983C19.9433 10.6983 19.7872 10.7294 19.6415 10.7897C19.4959 10.8501 19.3635 10.9385 19.252 11.05L16 14.302Z" fill="#242D35" />
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
                                    onChange={handlePersonChange}
                                    label={!isInputActive2 ? 'Employee Profile' : ''}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={editRow.name || ''}
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
                            </div>
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
                                        <TextField
                                            id="outlined-basic"
                                            variant="outlined"
                                            label={!isInputActive2 ? 'Number Of Questions' : ''}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            value={editRow.numberOfQuestion || ''}

                                            disabled
                                        />
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
                                                variant="outlined"
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
                                    value={editRow.description}
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
                {isChecked && (
                    <Stack>
                        <Alert severity="success" sx={{ marginLeft: '650px', position: 'relative', bottom: '380px', width: '18%' }}>
                            Assessment Approved Successfully
                        </Alert>
                    </Stack>
                )}
                {isNotChecked && (
                    <Stack>
                        <Alert severity="success" sx={{ marginLeft: '650px', position: 'relative', bottom: '380px', width: '18%' }}>
                            Assessment Rejected Successfully
                        </Alert>
                    </Stack>
                )}
            </div>
        </>

    )
}

export default EmployeeRequest