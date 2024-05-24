import React, { useState, useEffect } from 'react';
import './Settings.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import Navbars from '../Navbar/Navbar';
import { toast } from 'react-toastify';

const Settings = () => {
  //State Variables
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isValueChanged,setIsValuedChanged] = useState(false)
  const [formData, setFormData] = useState({
    dateOfBirth: null,
  });
  const [changePasswordData, setChangePasswordData] = useState({
    newPassword: '',
    confirmNewPassword: '',
  });

  //UseEffect
  useEffect(() => {
    fetchData();
  }, []);

  //Methods Definition
  const fetchData = async () => {
    try {
      const response = await fetch('https://localhost:7281/api/AssessmentData/AdminDetails', {
        headers: {
          "Authorization": "Bearer " + sessionStorage.getItem('token')
        },
      });
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      toast.error("Error Fetching Details")
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (date) => {
    const previousDate = new Date(date);
    previousDate.setDate(previousDate.getDate() - 1);
    setFormData({
      ...formData,
      dateOfBirth: previousDate.toISOString().split('T')[0],
    });
  };

  const handleSaveChanges = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.put(
        'https://localhost:7281/api/AssessmentData/UpdatingAdminValues?id=KB2308',
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          },
        }
      );
      if (response.status === 200) {
       setIsValuedChanged(true)
        setTimeout(() => {
          setIsValuedChanged(false);
        }, 2000);
      }
    } catch (error) {
      toast.error("Error While Updating")
    }
    setIsEditMode(false);
  };

  const handleChangePassword = () => {
    setIsChangePasswordOpen(true);
  };

  const handleCloseChangePassword = () => {
    setIsChangePasswordOpen(false);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setChangePasswordData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSavePassword = async () => {
    try {
      const { newPassword, confirmNewPassword } = changePasswordData;
      if (newPassword !== confirmNewPassword) {
        toast.error("New password and confirm password do not match")
      }
      const getEmail = sessionStorage.getItem('email')
      const sendDto = {
        email: getEmail,
        password: changePasswordData.newPassword
      };
      const updatePasswordApi = 'https://localhost:7281/api/Auth/Update_Password';
      const updatePasswordResponse = await axios.put(updatePasswordApi, sendDto, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + sessionStorage.getItem('token')
        },
      });
      if (updatePasswordResponse.status === 200) {
        console.log('Password updated successfully');
        setIsPasswordChanged(true);
        setTimeout(() => {
          setIsPasswordChanged(false);
        }, 2000);
        handleCloseChangePassword();
      } else {
        toast.error('Failed to update password');
      }
    } catch (error) {
      toast.error('Error updating password:', error);
    }
  };

  const handleEditProfile = () => {
    setIsEditMode(true);
  };

  return (
    <>
      <Navbars title="Settings" desc="View completed details of all locations and its corresponding details"></Navbars>
      <div className="entire-page">
        <div className="top-logo-and-image">
          <div className="profile-image">
            <img src={`https://localhost:7281/Images/${formData.employeeImage}`} style={{ marginTop: '110px' }} className='priya-img' alt="ProfileImage" />
          </div>
        </div>
        <div className="top-flex">
          <div className="top-flex1">
            <h4>{formData.id} - {formData.firstName} {formData.lastName}</h4>
            <h5>{formData.designation}</h5>
          </div>
          <div className="top-flex2">
            <Button sx={{ color: 'black', fontFamily: 'manrope', fontSize: '16px', border: '1px solid lightblue' }} className="edit-profile" onClick={handleEditProfile}>Edit Profile</Button>
          </div>
        </div>
        {/* Total Label */}
        <div className="total-label">
          <div className="personal">
            <h3 style={{ fontWeight: '600' }}>Personal</h3><br />
            <form>
              <div className="name-flex">
                <div className="name-input">
                  <label>
                    First Name
                    <input
                      className='settings-input'
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      disabled />
                  </label>
                </div>
                <div className="name-input">
                  <label>
                    Last Name
                    <input
                      type="text"
                      className='settings-input'
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      disabled />
                  </label>
                </div>
              </div>
              <br />
              <label className='settings-label'>
                Department
                <input
                  type="text"
                  name="department"
                  className='settings-input'
                  value={formData.designation}
                  onChange={handleChange}
                  disabled />
              </label>
              <br />
              <div className="gender-date-flex">
                <div className="gender-input">
                  <label className='settings-label'>
                    Gender
                    <input
                      type="text"
                      name="gender"
                      className='settings-input'
                      value={formData.gender}
                      onChange={handleChange}
                      disabled={!isEditMode} />
                  </label>
                </div>
                <div className="date-input">
                  <label className='settings-label'>
                    Date of Birth
                    <DatePicker
                      className='settings-input'
                      selected={formData.dateOfBirth ? new Date(formData.dateOfBirth) : null}
                      onChange={handleDateChange}
                      dateFormat="dd/MM/yyyy"
                      showYearDropdown
                      scrollableYearDropdown
                      yearDropdownItemNumber={100}
                      placeholderText="Select Date"
                      disabled={!isEditMode} />
                  </label>
                </div>
              </div>
              <br />
              <label className='settings-label'>
                Education Level
                <input
                  className='settings-input'
                  type="text"
                  name="educationLevel"
                  value={formData.educationLevel}
                  onChange={handleChange}
                  disabled={!isEditMode} />
              </label>
            </form>
            <br />
          </div>
          <div className="contact-details">
            <h3 style={{ fontWeight: '600' }}>Contact Details</h3>
            <form>
              <label className='settings-label'>
                Email
                <input
                  className='settings-input'
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditMode} />
              </label>
              <br />
              <label className='settings-label'>
                Phone Number
                <input
                  className='settings-input'
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  disabled={!isEditMode} />
              </label>
              <br />
              <label className='settings-label'>
                Location
                <input
                  className='settings-input'
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  disabled={!isEditMode} />
              </label>
              <br />
              <label className='settings-label'>
                Address
                <input
                  className='settings-input-address'
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={!isEditMode} />
              </label>
            </form>
            <br />
          </div>
        </div>
        {/* Buttons */}
        <div className="buttons">
          <button
            className={`save-changes-btn ${isEditMode ? 'show' : 'hide'}`}
            onClick={handleSaveChanges}
            style={{ backgroundColor: '#7BCCED', border: '1px solid grey', width: '160px', height: '44px', fontSize: '14px' }}>
            Save Changes
          </button>
          <span
            className={`change-password-btn ${isEditMode ? 'show' : 'hide'}`}
            onClick={handleChangePassword}
            style={{ paddingLeft: '20px', fontSize: '14px', cursor: 'pointer' }}>
            Change Password
          </span>
        </div>
      </div>
      <form>
        <Dialog open={isChangePasswordOpen} onClose={handleCloseChangePassword}>
          <DialogTitle>Change Password</DialogTitle>
          <DialogContent>
            <form>
              <div>
                <label>
                  New Password
                  <input
                    type="password"
                    name="newPassword"
                    value={changePasswordData.newPassword}
                    onChange={handlePasswordChange} />
                </label>
              </div>
              <div>
                <label>
                  Confirm New Password
                  <input
                    type="password"
                    name="confirmNewPassword"
                    value={changePasswordData.confirmNewPassword}
                    onChange={handlePasswordChange} />
                </label>
              </div>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseChangePassword}>Cancel</Button>
            <Button onClick={handleSavePassword} autoFocus>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </form>
      {isPasswordChanged && (
        <Stack>
          <Alert severity="success" sx={{ marginLeft: '850px', marginTop: '-60px', width: '15%' }}>
            Password changed successfully
          </Alert>
        </Stack>
      )}
       {isValueChanged && (
        <Stack>
          <Alert severity="success" sx={{ marginLeft: '850px', marginTop: '-60px', width: '15%' }}>
            Values Updated Successfully
          </Alert>
        </Stack>
      )}
    </>
  );
};

export default Settings;