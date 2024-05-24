import React from 'react'
import Navbars from '../Navbar/Navbar'
import UserTestDetails from './UserTestDetails'

const UserTestList = () => {
  return (
    <div>
      <Navbars title='Allocated Assessment' desc='View complete details of all assessed and its corresponding details of employee under your profile' />
      <UserTestDetails/>
    </div>
  )
}

export default UserTestList
