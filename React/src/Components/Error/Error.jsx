import React from 'react'
import './Error.css'
import error from '../../assets/4660894_2456051.jpg'
const Error = () => {
  return (
    <div className='error-container'>
        <img src={error} className='error-image'/>
    </div>
  )
}

export default Error