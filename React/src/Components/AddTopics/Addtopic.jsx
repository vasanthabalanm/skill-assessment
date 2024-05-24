import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import successfully from '../../assets/Topic added successfully.gif'
import close from '../../assets/close.png'
import book from '../../assets/book.png'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
const style = {
  position: 'absolute',
  top: '33%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
}
const Addtopic = () => {
  const [open, setOpen] = React.useState(false)
  const [department, setDepartment] = useState(0)
  const [departmentData, setDepartmentData] = useState([])
  const [isDepartmentValid, setIsDepartmentValid] = useState(false)
  const [isPngFileValid, setIsPngFileValid] = useState(false)
  const [isAddTopicValid, setIsAddTopicValid] = useState(false)
  const [imageSrc, setImageSrc] = useState('')
  const [open1, setOpen1] = React.useState(false)
  useEffect(() => {
    fetchData()
  }, [])
  const [selectedPack, setSelectedPack] = useState({
    departmentId: department,
    topicName: '',
    imageFileFormat: null,
    topicImage: '',
  })
  const fetchData = async () => {
    try {
      const departmentResponse = await axios.get(
        'https://localhost:7281/api/GetAllDepartment',
        {
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          },
        }
      )
      setDepartmentData(departmentResponse.data)
    } catch (error) {
      toast.error(error)
    }
  }
  useEffect(() => {
    setIsAddTopicValid(isDepartmentValid && isPngFileValid)
  }, [isDepartmentValid, isPngFileValid, department])
  const handleDepartmentChange = (event) => {
    const selectedDepartment = event.target.value
    const isDepartment = selectedDepartment !== ''
    setDepartment(selectedDepartment)
    setSelectedPack((prevSelectedPack) => ({
      ...prevSelectedPack,
      departmentId: selectedDepartment,
    }))
    setIsDepartmentValid(isDepartment)
  }
  useEffect(() => {
    console.log('Updated department:', department)
  }, [department])
  const handleDrop = (event) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    const topic = document.getElementById('topic').value
    setSelectedPack({
      ...selectedPack,
      imageFileFormat: file,
      topicImage: file.name,
      topicName: topic,
    })
    if (file.type === 'image/png') {
      const reader = new FileReader()
      reader.onload = () => {
        const imageUrl = reader.result
        setImageSrc(imageUrl)
      }
      reader.readAsDataURL(file)
    }
  }
  const handleDragOver = (event) => {
    event.preventDefault()
  }
  const handlePngFileInput = (event) => {
    const file = event.target.files[0]
    const topic = document.getElementById('topic').value
    handleFile(file)
    setSelectedPack((prevSelectedPack) => ({
      ...prevSelectedPack,
      imageFileFormat: file,
      topicImage: file.name,
      topicName: topic,
    }))
    if (file) {
      setIsPngFileValid(true)
    } else {
      setIsPngFileValid(false)
    }
  }
  const handleFile = (file) => {
    if (file.type === 'image/png') {
      const reader = new FileReader()
      reader.onload = () => {
        const imageUrl = reader.result
        setImageSrc(imageUrl)
      }
      reader.readAsDataURL(file)
      setIsPngFileValid(isPngFileValid)
    }
  }
  const handleClose1 = () => {
    window.location.reload()
    setOpen1(false)
  }
  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)
  const handleOpen1 = () => {
    try {
      const formData = new FormData()
      formData.append('departmentId', selectedPack.departmentId)
      formData.append('topicName', selectedPack.topicName)
      formData.append('imageFileFormat', selectedPack.imageFileFormat)
      formData.append('topicImage', selectedPack.topicImage)
      axios.post('https://localhost:7281/api/AddTopicWithImage', formData, {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      })
      setOpen1(true)
    } catch (error) {
      toast.error(error)
    }
  }
  return (
    <div>
      <div className="topic">
        <button className="topicBtn" id="mybtn" onClick={handleOpen}>
          <span className="faPlus">
            <FontAwesomeIcon icon={faPlus} />
          </span>
          Add Topic
        </button>
      </div>
      <div className="dialog-box1">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <div className="sec-page" id="sec">
            <div className="sec-page-con">
              <h1>Add Topics</h1>
              <div class="horizontal-line">
                <hr />
              </div>
              <div className="dept-size">
                <Box sx={{ minWidth: 460, fontFamily: 'Manrope' }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Department
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={department}
                      label="Department"
                      onChange={handleDepartmentChange}
                    >
                      {departmentData.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.departmentName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </div>
              <input
                type="text"
                id="topic"
                name="topic"
                className="input-form"
                placeholder="  Enter the topic name to be added...."
                required
              />
              <div className="sub">Choose a picture from your computer</div>
              <label className="file-input-label" htmlFor="file-input">
                <div
                  className="pic-drop"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <div className="pic-img">
                    {imageSrc ? (
                      <img src={imageSrc} width="40px" height="40px" alt="" />
                    ) : (
                      <img src={book} alt="" />
                    )}
                  </div>
                  {imageSrc && !isPngFileValid ? (
                    <div className="csv-file">
                      Invalid image. Topic name must match the image name.
                    </div>
                  ) : (
                    <div className="csv-file">
                      Drop a picture file here, or Browse to represent the
                      topics
                    </div>
                  )}

                  <input
                    id="file-input"
                    type="file"
                    accept="image/png"
                    onChange={handlePngFileInput}
                    style={{ display: 'none' }}
                  />
                </div>
              </label>
              <div className="btnss">
                <div className="btn1">
                  <button className="cancel" onClick={handleClose}>
                    Cancel
                  </button>
                </div>
                <div className="btn2">
                  <button
                    id="submit"
                    onClick={handleOpen1}
                    className={isAddTopicValid ? '' : 'disabled'}
                    disabled={!isAddTopicValid}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
      <div>
        <Modal
          open={open1}
          onClose={handleClose1}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={style}>
            <div className="third-page" id="third">
              <div className="successfully">
                <div className="close-btn">
                  <button className="closebtn">
                    <img src={close} alt="" onClick={handleClose1} />
                  </button>
                </div>
                <div className="gif">
                  <img
                    className="success"
                    src={successfully}
                    alt="topic added successfully"
                  />
                </div>
                <div className="added">Topic added Successfully</div>
                <div className="added-sec">
                  Topic has been added successfully, it will be reflected on
                  page in few minutes
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  )
}
export default Addtopic
