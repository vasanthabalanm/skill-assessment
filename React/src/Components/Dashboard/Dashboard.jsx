import React, { useState } from 'react'
import '../Dashboard/Dashboard.css'
import Navbars from '../Navbar/Navbar'
import vector9 from '../../assets/Vector (9).png'
import vector10 from '../../assets/Vector (10).png'
import vector11 from '../../assets/Vector (11).png'
import vector12 from '../../assets/Vector (12).png'
import vector13 from '../../assets/Vector (13).png'
import vector14 from '../../assets/Vector (14).png'
import arrow from '../../assets/arrow1.png'
import SeekerAssessment from '../JobSeekerAssessment/SeekerAssessment';
import EmployeeAssessment from '../EmployeeAssessment/EmployeeAssessment'


const Dashboard = () => {
  const [isSeekerDrawerOpen, setIsSeekerDrawerOpen] = useState(false);
  const [isEmployeeDrawerOpen, setIsEmployeeDrawerOpen] = useState(false);

  const handleSeekerDrawerOpen = () => {
    setIsSeekerDrawerOpen(true);
  };

  const handleSeekerDrawerClose = () => {
    setIsSeekerDrawerOpen(false);
  };

  const handleEmployeeDrawerOpen = () => {
    setIsEmployeeDrawerOpen(true);
  };

  const handleEmployeeDrawerClose = () => {
    setIsEmployeeDrawerOpen(false);
  };

  const GoToAddQuestion = () => {
    window.location.href = '/AddQuestion'
  }

  const GoToQuestionBank = () => {
    window.location.href = '/QuestionBank/*'
  }

  const GoToJobAssessment = () => {
    window.location.href = '/JobseekerAssessments'
  }

  const GoToEmpAssessment = () => {
    window.location.href = '/EmployeeAssessments'
  }

  const GoToEmpManagement = () => {
    window.location.href = '/ManageEmployee'
  }

  const GoToRequest = () => {
    window.location.href = '/EmployeeRequest'
  }


  return (
    <>
      <Navbars title='Welcome, Admin!' desc='View complete details of all location and its corresponding details' />
      <div className="container1">
        <div className="main">
          <div className="img1">
            <div className="banner1">
              <p className="p1">Setup Job Seeker <br />Assessment</p>
              <p className="p2">Create assessments for job Seekers/Freshers</p>
              <a href="#"><button type="button" id="btn1" onClick={handleSeekerDrawerOpen} >CREATE ASSESSMENT</button></a>
              {isSeekerDrawerOpen && <SeekerAssessment onClose={handleSeekerDrawerClose} />}
            </div>
          </div>
          <div className="img2">
            <div className="banner2">
              <p className="p1">Setup Employee <br />Assessment</p>
              <p className="p2 bannerTxt">Create assessments for employees to upgrade their skills</p>
              <a href="#"><button type="button" id="btn2" onClick={handleEmployeeDrawerOpen}>CREATE ASSESSMENT</button></a>
              {isEmployeeDrawerOpen && <EmployeeAssessment onClose={handleEmployeeDrawerClose} />}
            </div>
          </div>
        </div>

        <p id="explore">EXPLORE</p>

        <div className="row1">
          <div className="col1">
            <div className="rect1">
              <div className="ell1">
                <div className="icon1">
                  <img src={vector9} alt="icon" />
                </div>
                <a href="#"><img src={arrow} alt="arrow" onClick={GoToAddQuestion} /></a>
              </div>
              <div className="con">
                <p id="phead">Add Questions</p>
                <p id="ptime">Last created on 22 June 2022 <br /> 08:00 am</p>
              </div>
            </div>
          </div>
          <div className="col2">
            <div className="rect1">
              <div className="ell1">
                <div className="icon1">
                  <img src={vector10} alt="icon" />
                </div>
                <a href="#"><img src={arrow} alt="arrow" onClick={GoToQuestionBank} /></a>
              </div>
              <div className="con">
                <p id="phead">Question Bank</p>
                <p id="ptime">Last created on 22 June 2022 <br /> 08:00 am</p>
              </div>
            </div>
          </div>
          <div className="col3 ">
            <div className="rect1">
              <div className="ell1">
                <div className="icon1">
                  <img src={vector11} alt="icon" />
                </div>
                <a href="#"><img src={arrow} alt="arrow" onClick={GoToJobAssessment} /></a>
              </div>
              <div className="con">
                <p id="phead">Jobseeker Assessments</p>
                <p id="ptime">Last created on 22 June 2022 <br /> 08:00 am</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row1">
          <div className="col1">
            <div className="rect1">
              <div className="ell1">
                <div className="icon1">
                  <img src={vector12} alt="icon" />
                </div>
                <a href="#"><img src={arrow} alt="arrow" onClick={GoToEmpAssessment} /></a>
              </div>
              <div className="con">
                <p id="phead">Employee Assessments</p>
                <p id="ptime">Last created on 22 June 2022 <br /> 08:00 am</p>
              </div>
            </div>
          </div>
          <div className="col2">
            <div className="rect1">
              <div className="ell1">
                <div className="icon1">
                  <img src={vector13} alt="icon" />
                </div>
                <a href="#"><img src={arrow} alt="arrow" onClick={GoToEmpManagement} /></a>
              </div>
              <div className="con">
                <p id="phead">Employee Management</p>
                <p id="ptime">Last created on 22 June 2022 <br /> 08:00 am</p>
              </div>
            </div>
          </div>
          <div className="col3">
            <div className="rect1">
              <div className="ell1">
                <div className="icon1">
                  <img src={vector14} alt="icon" />
                </div>
                <a href="#"><img src={arrow} alt="arrow" onClick={GoToRequest} /></a>
              </div>
              <div className="con">
                <p id="phead">Request Received</p>
                <p id="ptime">Last created on 22 June 2022 <br /> 08:00 am</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default Dashboard