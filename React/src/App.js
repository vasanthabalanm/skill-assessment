import './App.css';
import * as React from 'react';
import EmpAssessment from './Components/EmployeeTestHistory/EmpAssessment';
import Settings from './Components/Settings/Settings';
import Dashboard from './Components/Dashboard/Dashboard';
import EmployeeRequest from './Components/EmployeeRequest/EmployeeRequest';
import JobAssessment from './Components/JobSeekerTestHistory/JobAssessment';
import Question from './Components/AddTopics/Question';
import Management from './Components/EmployeeManagement/Management';
import EmployeeManagement from './Components/ViewProfile/EmployeeManagement';
import AvailableQuestions from './Components/Available Questions/AvailableQuestions';
import AddQuestions from './Components/AddQuestions/AddQuestions';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/LogIn/LoginPage';
import Error from './Components/Error/Error';
import UserTestList from './Components/UserTestList/UserTestList';

function App() {
  const userRole = sessionStorage.getItem('role');
  return (
    <div>
      <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet"></link>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/Dashboard" element={userRole === 'Admin' ? <Dashboard /> : <Error />}></Route>
          <Route path="/EmployeeRequest" element={userRole === 'Admin' ? <EmployeeRequest /> : <Error />}></Route>
          <Route path="/EmployeeAssessments" element={userRole === 'Admin' ? <EmpAssessment /> : <Error />}></Route>
          <Route path="/JobseekerAssessments" element={userRole === 'Admin' ? <JobAssessment /> : <Error />}></Route>
          <Route path="/AddQuestion" element={userRole === 'Admin' ? <AddQuestions /> : <Error />}></Route>
          <Route path="/Settings" element={userRole === 'Admin' ? <Settings /> : <Error />}></Route>
          <Route path="/ManageEmployee/*" element={userRole === 'Admin' ? <Management /> : <Error />}></Route>
          <Route path="/ManageEmployee/:empid" element={userRole === 'Admin' ? <EmployeeManagement /> : <Error />}></Route>
          <Route path='/QuestionBank/*' element={userRole === 'Admin' ? <Question /> : <Error />} />
          <Route path='QuestionBank/:topic/:levelValue' element={userRole === 'Admin' ? <AvailableQuestions /> : <Error />} />
          <Route path='/AllottedAssessment' element={userRole === 'Employee' ? <UserTestList /> : <Error />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
