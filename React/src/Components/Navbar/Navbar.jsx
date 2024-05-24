import React, { useState, useEffect } from "react";
import "./Navbar.css";
import {
  faBars,
  faChevronDown,
  faChevronUp,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../../assets/logo-s.png";
import L_Logo from "../../assets/Logo-l.png";
import Kanini from "../../assets/kanini-c.png";
import Dashboard_V from "../../assets/DashboardVector.png";
import Questions_V from "../../assets/QuestionsVector.png";
import Jobseeker_V from "../../assets/JobseekerVector.png";
import Employee_V from "../../assets/EmployeeVector.png";
import Settings_V from "../../assets/SettingsVector.png";
import Logout_V from "../../assets/LogoutVector.png";
import Allotted_V from "../../assets/allotted.png";
import Bell_V from "../../assets/Bell.png";
import { Link } from "react-router-dom";
import axios from "axios";

const Navbars = (props) => {
  // State variables
  const [click, setClick] = useState(true); // Toggle for Questions section
  const [empClick, setEmpClick] = useState(true); // Toggle for Employee section
  const [menu, setMenu] = useState(false); // Toggle for sidebar menu
  const [activePara, setActivePara] = useState(null); // Track the active paragraph
  const [getEmployee, setEmployee] = useState([]);
  // Toggle Questions section and set active paragraph
  const questionToggle = () => {
    setEmpClick(true); // Hide Employee section
    setClick(!click); // Toggle Questions section
    setActivePara(click ? "assessmentData" : null); // Set active paragraph to 'assessmentData' if click is true, otherwise reset to null
  };
  // Toggle Employee section and set active paragraph
  const toggle = () => {
    setEmpClick(!empClick);
    setClick(true);
    setActivePara(click ? "addQuestions" : null);
  };
  // Toggle sidebar menu
  const sideBar = () => {
    setMenu(!menu);
  };
  // Handle click on a paragraph to set it as active
  const handleParaClick = (paraId) => {
    setActivePara(paraId);
    if (paraId === "dashboard") {
      window.location.href = "/Dashboard";
    }
    if (paraId === "addQuestions") {
      setActivePara("addQuestions");
      window.location.href = "/AddQuestion";
    }
    if (paraId === "assessmentData") {
      setActivePara("assessmentData");
      window.location.href = "/EmployeeAssessments";
    }
    if (paraId === "questionbank") {
      window.location.href = "/QuestionBank";
    }
    if (paraId === "jobseeker") {
      window.location.href = "/JobseekerAssessments";
    }
    if (paraId === "manageemployee") {
      window.location.href = "/ManageEmployee";
    }
    if (paraId === "settings") {
      window.location.href = "/Settings";
    }
    if (paraId === "employeeRequest") {
      window.location.href = "/EmployeeRequest";
    }
    if (paraId === "allotted") {
      window.location.href = "/AllottedAssessment";
    }
    if (paraId === "logout") {
      console.log("hi");
      sessionStorage.removeItem("role");
      sessionStorage.removeItem("id");
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("token");
      window.location.href = "/";
    }
  };
  // Handle click outside of sidebar to deactivate active paragraph
  const handleOutsideClick = (event) => {
    if (!event.target.closest(".sidebar p")) {
      setActivePara(null); // Deactivate the active paragraph
    }
  };
  // Add event listener for outside click and remove it on component unmount
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const empFetch = () => {
    axios
      .get("https://localhost:7281/HistoryTable/GetAllRequestReceived", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((response) => {
        const myData = response.data;
        console.log(myData);
        setEmployee(myData);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

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
  //fetch all the values in a table
  useEffect(() => {
    if (sessionStorage.getItem('role') === 'Employee') {
      getAllAssessment();
    }
    empFetch();
  }, []);

  const RouteToRequest = () => {
    window.location.href = "/EmployeeRequest";
  };

  const id = sessionStorage.getItem("id");

  return (
    <div>
      {/* Main container */}
      <div className="container">
        {/* Sidebar with dynamic class assignment based on 'menu' state */}
        <div className={menu ? "sidebar" : "sidebar hidden-2"} id="nav-links">
          {/* Logo section */}
          <div className="logo-2">
            <img
              src={Logo}
              alt="Logo"
              className="logo-img"
              width="47px"
              height="47px"
            />
            <h3 id="kaniniletter">
              Kanini
              <br />
              <span id="letter">Assessment</span>
            </h3>
            {/* Menu icon with click event to trigger sidebar function */}
            <div className="menu" onClick={sideBar}>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
          {sessionStorage.getItem("role") === "Admin" && (
            <p
              onClick={() => handleParaClick("dashboard")}
              className={activePara === "dashboard" ? "active" : ""}
              to="/Dashboard"
              id="sidebar-item"
            >
              <img src={Dashboard_V} />
              &emsp;Dashboard
            </p>
          )}
          {sessionStorage.getItem("role") === "Employee" && (
            <p
              onClick={() => handleParaClick("allotted")}
              className={activePara === "allotted" ? "active" : ""}
              id="sidebar-item allotted-item"
              style={{ marginTop: "50px" }}
            >
              <img src={Allotted_V} />
              &emsp;Take Assessment
            </p>
          )}

          {sessionStorage.getItem("role") === "Admin" && (
            <>
              <p onClick={toggle} to="/AddQuestion">
                <img src={Questions_V} />
                &emsp;Questions &emsp;&emsp;&emsp;
                <FontAwesomeIcon
                  icon={empClick ? faChevronDown : faChevronUp}
                />
              </p>
              <div className={empClick ? "ques hidden" : "ques"} id="ques">
                <p
                  onClick={() => handleParaClick("addQuestions")}
                  className={activePara === "addQuestions" ? "active" : ""}
                  id="sidebar-item"
                  to="/AddQuestion"
                >
                  Add Questions
                </p>
                <p
                  onClick={() => handleParaClick("questionbank")}
                  className={activePara === "questionbank" ? "active" : ""}
                  id="sidebar-item"
                  to="/QuestionBank"
                >
                  Question bank
                </p>
              </div>
              <p
                onClick={() => handleParaClick("jobseeker")}
                className={activePara === "jobseeker" ? "active" : ""}
                id="sidebar-item"
                to="/JobseekerAssessments"
              >
                <img src={Jobseeker_V} />
                &emsp;Jobseeker
              </p>
              <p
                onClick={questionToggle}
                to="/EmployeeAssessments"
                id="sidebar-item"
              >
                <img src={Employee_V} />
                &emsp;Employee &emsp;&emsp;&emsp;&nbsp;&nbsp;
                <FontAwesomeIcon icon={click ? faChevronDown : faChevronUp} />
              </p>
              <div className={click ? "emp hidden" : "emp"} id="emp">
                <p
                  onClick={() => handleParaClick("assessmentData")}
                  className={activePara === "assessmentData" ? "active" : ""}
                  id="sidebar-item"
                  to="/EmployeeAssessments"
                >
                  Assessment Data
                </p>
                <p
                  onClick={() => handleParaClick("manageemployee")}
                  className={activePara === "manageemployee" ? "active" : ""}
                  id="sidebar-item"
                  to="/ManageEmployee"
                >
                  Manage Employee
                </p>
                <p
                  onClick={() => handleParaClick("employeeRequest")}
                  className={activePara === "employeeRequest" ? "active" : ""}
                  id="sidebar-item"
                  to="/EmployeeRequest"
                >
                  Employee Request
                </p>
              </div>
              <p
                onClick={() => handleParaClick("settings")}
                className={activePara === "settings" ? "active" : ""}
                id="sidebar-item"
                to="/Settings"
              >
                <img src={Settings_V} />
                &emsp;Settings
              </p>
            </>
          )}
          {/* Logo and logout section */}
          <div className="l-logo">
            <img
              src={L_Logo}
              className="logo-L"
              alt="Kanini Logo"
              width="190px"
              height="240px"
            />
            {/* Logout link */}
            <p
              onClick={() => handleParaClick("logout")}
              className={activePara === "logout" ? "active" : ""}
              id="sidebar-item"
            >
              <img src={Logout_V} />
              &emsp;Logout
            </p>
          </div>
        </div>
      </div>

      {/* navbar */}
      <div>
        <div className="navbar">
          {/* Menu Icon */}
          <div className="menu" onClick={sideBar}>
            <FontAwesomeIcon icon={faBars} />
          </div>
          {/* Heading */}
          <div className="heading">
            <h3 id="title">
              {props.title}
              <br />
              <br />
              <span id="desc">{props.desc}</span>
            </h3>
          </div>
          {/* Admin Section */}
          <div className="inline">
            <div className="hide-icon" id="hr">
              {/* Bell icon */}
              {getEmployee.length > 0 || getAllottedAssessment.length > 0 ? (
                <span className="bell-icon-cursor" onClick={RouteToRequest}>
                  <img src={Bell_V} id="bell" height="28px" width="28px" />
                  <span>
                    <div className="dot-request">&nbsp;</div>
                  </span>
                </span>
              ) : (
                <img src={Bell_V} id="bell" height="28px" width="28px" />
              )}
              {/* Kanini Logo */}
              <span>
                <img
                  className="kanini-c"
                  src={Kanini}
                  alt="kanini"
                  height="38px"
                  width="38px"
                />
              </span>
              {sessionStorage.getItem("role") === "Admin" && (
                <span id="admintext">HR Admin</span>
              )}
              {sessionStorage.getItem("role") === "Employee" && (
                <span id="admintext">{id}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbars;
