import React, { useState } from "react";
import "./UserTestDetails.css";
import Clock from "../../assets/clock.png";
import User from "../../assets/bx_user.png";
import axios from "axios";
import { useEffect } from "react";
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import AlarmIcon from '@mui/icons-material/Alarm';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { Link } from 'react-router-dom';

const UserTestDetails = () => {
  const [getAllottedAssessment, setAllottedAssessment] = useState([{}]);
  const getAllAssessment = async () => {
    const assessmentResponse = await axios.get(
      `https://localhost:7281/allocatedassessment/assessments?UserId=${sessionStorage.getItem(
        "id"
      )}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
    const assessment = assessmentResponse.data;
    setAllottedAssessment(assessment);
  };
  useEffect(() => {
    getAllAssessment()
  }, [])

  function formatDate(dateString) {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
  
    return formattedDate;
  }

  const startAssessment=(assessmentId,totalQuestions)=>{
    sessionStorage.setItem("assessmentId", assessmentId);
    sessionStorage.setItem("totalQuestions", totalQuestions);
  }

  return (
    <div>
      <div className="allotted-container">
        <div className="allotted-head">Allocated Assessment</div>
        <div className="allotted-exam">
          <div className="allotted-grid">
            {getAllottedAssessment.length === 0 ? ( // Check if there are no topics
              <div className="no-topics-message">
                <h2 style={{ fontWeight: "600" }}>
                  There is no Assessment Allocated
                </h2>
              </div>
            ) : (
              getAllottedAssessment.map((item) => (
                <div className="allotted-box">
                  <div className="allotted-head">{item.assessmentId}</div>
                  <div className="allotted-flex allotted-margin">
                    <div>
                      <img src={User} alt="User" />
                    </div>
                    <div className="chip-margin data-size">Requested By: <span className="bold-details">{item.reportedBy}</span></div>
                  </div>
                  <div className="allotted-flex allotted-margin">
                    <div>
                      <img src={Clock} alt="Clock" />
                    </div>
                    <div className="chip-margin data-size">
                      Date of Creation: <span className="bold-details">{formatDate(item.dateOfCreation)}</span>
                    </div>
                  </div>
                  <div className="allotted-flex allotted-margin">
                    <div>
                    <AlarmIcon style={{ color: '#7d878b',fontSize:'18px',marginLeft:'-2px' }} />
                    </div>
                    <div className="chip-margin data-size">
                      Date of Submission: <span className="bold-details">{formatDate(item.dateOfCompletion)}</span>
                    </div>
                  </div>
                  <div className="allotted-flex allotted-margin">
                    <div>
                      <HourglassEmptyIcon style={{ color: '#7d878b',marginLeft:'-2px',fontSize:'18px' }} />
                    </div>
                    <div className="chip-margin data-size">
                      Total Time: <span className="bold-details">{item.totalTime}</span> min
                    </div>
                  </div>
                  <div className="allotted-flex allotted-margin">
                    <div>
                    <AddTaskIcon style={{ color: '#7d878b',marginLeft:'-2px',fontSize:'18px' }} />
                    </div>
                    <div className="chip-margin data-size">
                      Total Questions: <span className="bold-details">{item.numberOfQuestion}</span>
                    </div>
                  </div>
                  <div className="allotted-line" />
                  <Link to={`/assessmentportal/${item.assessmentId}/${item.numberOfQuestion}`} onClick={startAssessment(item.assessmentId,item.numberOfQuestion)}><div className="startassessment">Start Assessment</div></Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTestDetails;
