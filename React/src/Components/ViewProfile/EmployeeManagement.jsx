import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import location from '../../assets/viewprofile/map.png'
import phone from '../../assets/viewprofile/phone.png'
import mail from '../../assets/viewprofile/mail.png'
import clock from '../../assets/viewprofile/clock.png'
import user from '../../assets/viewprofile/user.png'
import AnimatedProgressProvider from "../AnimatedProgressBar/AnimatedProgressProvider";
import result from '../../assets/viewprofile/result.png'
import axios from 'axios'
import './Employeemanagement.css'
import Navbars from '../Navbar/Navbar';
import { useParams } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { easeQuadInOut } from "d3-ease";
import TimerIcon from '@mui/icons-material/Timer';
import BadgeIcon from '@mui/icons-material/Badge';
import QuizIcon from '@mui/icons-material/Quiz';
import Slider from '@mui/material/Slider';
import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

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


const EmployeeManagement = () => {
    const { empid } = useParams();
    const [value, setValue] = React.useState('1');
    const [loading, setLoading] = useState(true);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [viewprofile, setviewprofile] = useState('');
    const [completedtest, setcompletedtest] = useState([]);
    const [ongoingtest, setongoingtest] = useState([]);
    const [progressValue, setProgressValue] = useState(0);
    const [latestProgressValue, setLatestProgressValue] = useState(0);
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


    const Fetchviewprofilecompletedtest = async () => {
        const id = sessionStorage.getItem('profile')
        console.log(empid);
        try {
            const response = await axios.get(`https://localhost:7281/api/ViewEmployeeProfile/completedtest?UserId=${empid}`, {
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem('token')
                },
            });
            setcompletedtest(response.data);
            console.log(viewprofile)
        }
        catch (error) {
            console.error(error);
        }
    }
    const Fetchviewprofileongoingtest = async () => {
        try {
            const response = await axios.get(`https://localhost:7281/api/ViewEmployeeProfile/ongoingtest?userid=${empid}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + sessionStorage.getItem('token')
                    },
                });
            setongoingtest(response.data);
            console.log(viewprofile)
        }
        catch (error) {
            console.error(error);
        }
    }


    const Fetchviewprofile = async () => {
        try {
            const response = await axios.get(`https://localhost:7281/api/ViewEmployeeProfile/getparticularuser?UserId=${empid}`,
                {
                    headers: {
                        "Authorization": "Bearer " + sessionStorage.getItem('token')
                    },
                });
            setviewprofile(response.data);
            console.log(viewprofile)
        }
        catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        Fetchviewprofile()
    }, [])

    useEffect(() => {
        Fetchviewprofilecompletedtest()
    }, [])

    useEffect(() => {
        Fetchviewprofileongoingtest()
    }, [])

    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 6,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: theme.palette.mode === 'light' ? '#AAD064' : '#AAD064',
        },
    }));

    const formatDate2 = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();

        return `${day}-${month}-${year}`;
    };

    const [open, setOpen] = useState(false);
    const handleOpen = (userAssessmentId) => () => {
        console.log('Open modal for userAssessmentId:', userAssessmentId);
        fetchData(userAssessmentId);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const fetchData = (userAssessmentId) => {
        fetch(`https://localhost:7281/TestHistory/History?UserAssessmentId=${userAssessmentId}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem('token')
            },
        })
            .then(async (data) => {
                const myData = await data.json();
                console.log(myData);
                if (typeof myData === "object" && myData !== null) {
                    setHistory(myData);
                    setLatestProgressValue(myData.score);
                } else {
                    console.error("Invalid data format for history");
                }
                console.log(history);
            })
            .catch((error) => {
                console.log("Error:", error);
            });
    };

    return (
        <>
            <Navbars title="Employee Management" desc="Add question under the selected department and topics"></Navbars>
            <div className='commondiv'>
                <div className='leftcards'>

                    <Card className='card1 py-4' sx={{ borderRadius: 3, width: '33rem' }}>
                        <img src={`https://localhost:7281/Images/${viewprofile.employeeImage}`} className='profileImageBig' alt='Profile' />

                        <CardContent className='boxsize'>
                            <br />
                            <Typography variant='h5'>
                                {viewprofile.usersId}-
                                {viewprofile.name}
                            </Typography>

                            <Typography>
                                {viewprofile.designation} - {viewprofile.department}
                            </Typography>
                            <Typography sx={{ textAlign: 'center', paddingBottom: '8px', fontSize: '14px' }} color="text.secondary">
                                Skill Level: <span>Begineer</span>
                            </Typography>
                            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                                <BorderLinearProgress variant="determinate" value={20} style={{ width: '50%' }} />
                            </Box>
                            <br />
                            <br />
                            <div className="points">
                                <div className="bg">
                                    <div className='wholedivspoints px-5'>
                                        <div>
                                            <p className='earnedpoints pt-3'>Earned Points</p>
                                            <p className='earned'>{viewprofile.earnedPoints}</p>
                                        </div>
                                        <div>
                                            <div className="stroke"></div>
                                        </div>
                                        <div>
                                            <p className='TestTaken pt-3'>Test Taken</p>
                                            <p className='test'>{viewprofile.testTaken}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <br />
                            <br />


                            <div className='details'>
                                <p className='contact'>Contact Details</p>
                                <div className='combine'>
                                    <div> <img src={location} alt='loctaion_images' /> </div>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <div>{viewprofile.location}</div>
                                </div>
                                <div className='combine'>
                                    <div><img src={phone} alt='phone_images' /></div>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <div>{viewprofile.phone}</div>
                                </div>
                                <div className='combine'>
                                    <div><img src={mail} alt='mail_images' /></div> &nbsp;&nbsp;&nbsp;&nbsp;
                                    <div>{viewprofile.userEmail}</div>
                                </div>
                            </div>

                        </CardContent>
                    </Card>


                </div>
                <div className='secondbody'>
                    <Box sx={{ typography: 'body1' }}>
                        <TabContext value={value}>

                            <div>
                                <Box sx={{ borderBottom: 0 }}>
                                    <TabList onChange={handleChange}
                                        TabIndicatorProps={{
                                            style: {
                                                backgroundColor: '#1589CC',
                                                height: '4px',
                                                borderRadius: '10px'
                                            },
                                        }}
                                    >
                                        <Tab label="Completed Test" value="1"
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
                                            }}
                                        />
                                        <Tab label="Ongoing Test" value="2"
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
                                            }}
                                        />
                                    </TabList>
                                </Box>
                            </div>
                            <TabPanel value="1">
                                {loading ? (
                                    <div className="loader-container">
                                        <div className="loader"></div>
                                    </div>
                                ) : (
                                    completedtest.length === 0 ? (
                                        <p className='noitems-available'>No Completed Test Available</p>
                                    ) : (
                                        completedtest.map((completetests) => (
                                            <Card className='card2' sx={{ borderRadius: 2, margin: 2 }}>

                                                <CardContent className='boxsize2'>
                                                    <div className='combine2'>
                                                        <div>
                                                            <Typography variant='h5' component="h2" className='mainhead11'>
                                                                User-Experience Skill Assessment
                                                            </Typography> <br />
                                                            <Typography>
                                                                Topics : <span>{completetests.topicNames + ','}</span>
                                                            </Typography>
                                                            {/* <hr /> */}
                                                            <br />
                                                            <div className='assignments'>
                                                                <div className='times'>
                                                                    <div><img src={clock} alt='clock_images' /></div>&nbsp;&nbsp;
                                                                    <div>Created On : {formatDate2(completetests.dateOfCreation)}</div>
                                                                </div>
                                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                                <div className='times'>
                                                                    <div><img src={user} alt='user_images' /></div>&nbsp;&nbsp;
                                                                    <div>Created By : Admin</div>
                                                                </div>
                                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                                <div className='times'>
                                                                    <div><img src={clock} alt='clcks_images' /></div>&nbsp;&nbsp;
                                                                    <div>Submitted On : {formatDate2(completetests.dateOfSubmission)} </div>
                                                                </div>
                                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                                <div className='times'>
                                                                    <div><img src={result} alt='result_images' /></div>&nbsp;&nbsp;
                                                                    <div>Result : {completetests.score}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <button className='viewres' onClick={handleOpen(completetests.userAssessmentId)}> View Result</button>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>

                                        ))
                                    )
                                )}

                                <br />


                            </TabPanel>
                            <TabPanel value="2">
                                <>
                                    {ongoingtest.length === 0 ? (
                                        <p className='noitems-available'>No Ongoing Test Available</p>
                                    ) : (

                                        ongoingtest.map((ongoingtest) => (
                                            <Card className='card2' sx={{ borderRadius: 2 }}>

                                                <CardContent className='boxsize2'>
                                                    <div className='combine2'>
                                                        <div>
                                                            <Typography variant='h5' component="h2" className='mainhead11'>
                                                                User-Experience Skill Assessment
                                                            </Typography> <br />
                                                            <Typography>
                                                                Topics : <span>{ongoingtest.topicNames + ','}</span>
                                                            </Typography>
                                                            {/* <hr /> */}
                                                            <br />
                                                            <div className='assignments'>
                                                                <div className='times'>
                                                                    <div><img src={clock} alt='clock_images' /></div>&nbsp;&nbsp;
                                                                    <div>Created On : {formatDate2(ongoingtest.dateOfCreation)}</div>
                                                                </div>
                                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                                <div className='times'>
                                                                    <div><img src={user} alt='user_images' /></div>&nbsp;&nbsp;
                                                                    <div>Created By : Admin</div>
                                                                </div>
                                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                                <div className='times'>
                                                                    <div><img src={clock} alt='clock_images' /></div>&nbsp;&nbsp;
                                                                    <div>Submit Before : {formatDate2(ongoingtest.dateOfSubmission)}</div>
                                                                </div>
                                                                &nbsp;&nbsp;&nbsp;&nbsp;

                                                            </div>
                                                        </div>
                                                        <div>
                                                            <button className='viewres btn-disabled'> View Details</button>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>

                                        ))
                                    )}
                                </>
                                <br />
                            </TabPanel>
                        </TabContext>
                    </Box>
                </div>

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
              <div className='flex-propt2'>
                <div className='width'>
                  <div className='flex'>
                    <div><BadgeIcon style={{ color: '#1589CC' }} /></div>
                    <div className='moveright'>
                      <div className='head'>Employee Details</div>
                      <div className='name'>{history.name}</div>
                      <table>
                        <tr>
                          <td className='heading'>Emp Code</td>
                          <td className='response'>{history.userId}</td>
                        </tr>
                        <tr>
                          <td className='heading'>Email Address</td>
                          <td className='response'>{history.userEmail}</td>
                        </tr>
                        <tr>
                          <td className='heading'>Department</td>
                          <td className='response'>{history.department}</td>
                        </tr>
                        <tr>
                          <td className='heading'>Designation</td>
                          <td className='response'>{history.designation}</td>
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
                            no-repeat
                          >
                            {value => {
                              const roundedValue = Math.round(progressValue);
                              return (
                                <CircularProgressbar
                                  value={value}
                                  text={`${roundedValue}%`}
                                  strokeWidth={6}
                                  text2={history.points}
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
                                width: '200px', 
                                marginBottom: '0px'
                              },
                              '@media (max-width: 820px)': {
                                width: '200px', 
                              },
                              '@media (max-width: 420px)': {
                                width: '100%', 
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

            </div>
        </>

    )
}

export default EmployeeManagement


function Example(props) {
    return (
        <div style={{ marginBottom: 10 }}>
            <div style={{ marginLeft: '20px', display: "flex" }}>
                <div className='circularBar' style={{}}>{props.children}</div>
            </div>
        </div>
    );
}
