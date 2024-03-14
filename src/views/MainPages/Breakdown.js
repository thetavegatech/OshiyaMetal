import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import './Breakdown.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
export default function BreakDown() {
  // const message = encodeURIComponent(
  //   `Breakdown For ${MachineName} please visit concerned department Details are ${username} - Aurangabad Auto Ancillary`,
  // )
  const [breakdownType, setBreakdownType] = useState('')
  const [breakdownReasonOptions, setBreakdownReasonOptions] = useState([])
  const [currentDate, setCurrentDate] = useState('')
  const [currentTime, setCurrenttime] = useState('')
  const [breakdownData, setBreakdownData] = useState([])
  const [successMessage, setSuccessMessage] = useState('')
  const [breakdownList, setBreakdownList] = useState([])
  const AllotedMachine = useSelector((state) => state.auth.userInfo?.AllotedMachine)
  const loggedInUsername = useSelector((state) => state.auth.userInfo?.name)

  const [formData, setFormData] = useState({
    machineName: { AllotedMachine },
    breakdownType: '', // Assuming this corresponds to breakdownType
    breakdownReason: '',
    breakdownStartDate: '',
    breakdownStartTime: '',
    Status: 'Open',
    username: '',
  })

  useEffect(() => {
    // Fetch data from the API
    axios
      .get('http://localhost:5001/api/breakdowns')
      .then((response) => {
        if (response.data) {
          setBreakdownList(response.data)
        }
      })
      .catch((error) => console.error('Error fetching data:', error))
  }, [successMessage])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  const formatDate = (dateString) => {
    if (!dateString) return '' // Return an empty string for null or undefined

    const date = new Date(dateString)
    if (isNaN(date.getTime())) return '' // Return an empty string for invalid date

    const options = { day: '2-digit', month: '2-digit', year: 'numeric' }
    return new Intl.DateTimeFormat('en-GB', options).format(date)
  }

  useEffect(() => {
    // Set the current date when the component mounts
    const today = new Date()
    const formattedDate = today.toISOString().split('T')[0]
    const formattedTime = today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setCurrentDate(formattedDate)
    setCurrenttime(formattedTime)
    setFormData({
      ...formData,
      breakdownStartDate: formattedDate,
      breakdownStartTime: formattedTime,
    })
  }, [])

  // Function to handle the change in Breakdown Type
  const handleBreakdownTypeChange = (e) => {
    const selectedType = e.target.value
    setBreakdownType(selectedType)

    // Set the breakdown reasons based on the selected type
    // You can customize this logic according to your data structure
    let reasons = []
    switch (selectedType) {
      case 'Operational BreakDown':
        reasons = [
          'Guage Changes',
          'Size Problem',
          'Edge fold',
          'Impeder Change',
          'Work Coil change',
          'Joint welding time',
          'Roll Mark',
          'Roll damage',
          'Fin Change',
          'Cutter change',
          'Joint Broken',
        ]
        break
      case 'Mechanical Maintenance':
        reasons = [
          'Bearing change',
          'Shift change',
          'Gripper Packing',
          'Propeller Shift change',
          'Other',
        ]
        break
      case 'Electrical Maintenance':
        reasons = ['HF trip', 'COC Trip', 'Mill Dive Trip', 'Other']
        break
      case 'Power Failure':
        reasons = ['Power Failure']
        break
      case 'Manpower Problem':
        reasons = ['Manpower Problem']
        break
      case 'Waiting for material':
        reasons = ['Waiting for material']
        break
      // Add cases for other breakdown types
      default:
        reasons = []
        break
    }

    setBreakdownReasonOptions(reasons)
  }

  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const machineName = e.target.machineName?.value
    const breakdownType = e.target.breakdownType?.value
    const breakdownReason = e.target.breakdownReason?.value
    const breakdownStartDate = e.target.breakdownStartDate?.value
    const breakdownStartTime = e.target.breakdownStartTime?.value
    const Status = 'Open'
    const username = e.target.username?.value
    // const deliveryDate = e.target.deliveryDate?.value
    axios
      .post('http://localhost:5001/api/breakdowns', {
        machineName: machineName,
        breakdownType: breakdownType,
        breakdownReason: breakdownReason,
        breakdownStartDate: breakdownStartDate,
        breakdownStartTime: breakdownStartTime,
        Status: Status,
        username: loggedInUsername,
      })
      .then((response) => {
        console.log(response)
        if (response.data) {
          // Update the state with the saved data
          // setBreakdownData([response.data])
          setSuccessMessage('Data saved successfully!')
          e.target.reset()
          setTimeout(() => {
            setSuccessMessage('')
          }, 1000)
        } else {
          console.error('Invalid API response:', response)
        }
        setSuccessMessage('Data saved successfully!')
        e.target.reset()
        setTimeout(() => {
          setSuccessMessage('')
        }, 1000)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  // Function to handle time input change
  const handleTimeChange = (e) => {
    setFormData({
      ...formData,
      breakdownStartTime: e.target.value,
    })
  }

  return (
    <>
      <div
        className="container"
        style={
          {
            //   border: '2px solid #ccc',
            //   backgroundColor: '',
            //   padding: '20px',
            //   borderRadius: '10px',
            //   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            //   width: '90%',
          }
        }
      >
        <form action="" method="post" onSubmit={handleFormSubmit}>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label htmlFor="machineName" style={{ marginBottom: '10px', fontSize: '16px' }}>
                Machine Number:
              </label>
              <input
                className="form-control col-sm-6"
                required
                id="machineName"
                value={AllotedMachine}
                name="machineName"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label
                htmlFor="assetLocation"
                className="form-label"
                style={{ marginBottom: '10px' }}
              >
                Breakdown Type:
              </label>
              <select
                className="form-control col-sm-6"
                required
                name="breakdownType"
                id="breakdownType"
                // value={formData.breakdownType}
                onChange={handleBreakdownTypeChange}
                // value={formData.Location}
                // onChange={handleChange}
              >
                <option value="">Select an option</option>
                <option value="Operational BreakDown">Operational BreakDown</option>
                <option value="Mechanical Maintenance">Mechanical Maintenance</option>
                <option value="Electrical Maintenance">Electrical Maintenance</option>
                <option value="Power Failure">Power Failure</option>
                <option value="Manpower Problem"> Manpower Problem</option>
                <option value="Waiting for Material"> Waiting for Material</option>
                <option>Guage Changes</option>
              </select>
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="breakdownDate" style={{ marginBottom: '10px' }}>
                Breakdown Reason:
              </label>
              <select
                className="form-control col-sm-6"
                required
                name="breakdownReason"
                id="breakdownReason"
                value={formData.breakdownReason}
                onChange={handleChange}
                // value={formData.Location}
                // onChange={handleChange}
              >
                <option value="">Select an option</option>
                {/* Dynamically render options based on breakdownType */}
                {breakdownReasonOptions.map((reason, index) => (
                  <option key={index} value={reason}>
                    {reason}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="breakdownDate" style={{ marginBottom: '10px' }}>
                Breakdown Start Date:
              </label>
              <input
                type="date"
                // disabled
                className="form-control col-sm-6"
                name="BreakdownStartDate"
                // value={currentDate}
                id="breakdownStartDate"
                value={currentDate}
                onChange={handleChange}
                // value={formData.breakdownStartDate}
                // onChange={handleChange}
                // value={formData.BreakdownStartDate}
                // onChange={handleChange}
                placeholder=""
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="breakdownStartTime" style={{ marginBottom: '10px' }}>
                Breakdown Start Time:
              </label>
              <input
                type="time"
                id="breakdownStartTime"
                value={formData.breakdownStartTime}
                className="form-control col-sm-6"
                onChange={handleTimeChange}
              />
            </div>
            {/* </div> */}
          </div>
          <button
            type="submit"
            className="btn"
            style={{
              backgroundColor: '#002244',
              color: 'white',
              paddingLeft: '3rem',
              paddingRight: '3rem',
            }}
          >
            Save
          </button>
        </form>
        <div className="table-container" style={{ paddingTop: '3rem' }}>
          <h5>Breakdown Data</h5>
          <table className="table">
            <thead>
              <tr>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>user Name</th>

                <th style={{ backgroundColor: '#002244', color: 'white' }}>Machine Name</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>Breakdown Type</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>Breakdown Reason</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>Breakdown Start Date</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>Breakdown Start Time</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {breakdownList.map((breakdown, index) => (
                <tr key={index}>
                  <td>{breakdown.username}</td>
                  <td>{breakdown.machineName}</td>
                  <td>{breakdown.breakdownType}</td>
                  <td>{breakdown.breakdownReason}</td>
                  <td>{formatDate(breakdown.breakdownStartDate)}</td>
                  <td>{breakdown.breakdownStartTime}</td>
                  <td>{breakdown.Status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* </div> */}
    </>
  )
}
