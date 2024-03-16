import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import './Breakdown.css'
import { useNavigate } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
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

  const [formData, setFormData] = useState({
    machineName: { AllotedMachine },
    breakdownType: '', // Assuming this corresponds to breakdownType
    breakdownReason: '',
    breakdownStartDate: '',
    breakdownStartTime: '',
    Status: 'Open',
  })

  useEffect(() => {
    // Fetch data from the API
    axios
      .get('https://oshiyameatlbackend.onrender.com/api/breakdowns')
      .then((response) => {
        if (response.data) {
          setBreakdownList(response.data)
        }
      })
      .catch((error) => console.error('Error fetching data:', error))
  }, [successMessage])

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

  const editStatus = (id) => {
    // Assume you have an API endpoint to update the status by breakdown ID
    axios
      .put(`https://oshiyameatlbackend.onrender.com/api/breakdowns/${id}`, { Status: 'Complete' })
      .then((response) => {
        console.log('Status updated:', response.data)

        // Update the status in the frontend
        const updatedBreakdownList = breakdownList.map((breakdown) =>
          breakdown._id === id ? { ...breakdown, Status: 'Complete' } : breakdown,
        )
        setBreakdownList(updatedBreakdownList)
        setSuccessMessage('Status successfully updated!')

        // Set timeout to clear the success message after 3 seconds (adjust as needed)
        setTimeout(() => {
          setSuccessMessage('')
        }, 2000)
      })
      .catch((error) => {
        console.error('Error updating status:', error)
        setSuccessMessage('Error updating status. Please try again.')

        // Set timeout to clear the error message after 3 seconds (adjust as needed)
        setTimeout(() => {
          setSuccessMessage('')
        }, 2000)
      })
  }

  const deleteData = (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this data?')
    if (isConfirmed) {
      axios
        .delete(`https://oshiyameatlbackend.onrender.com/api/breakdowns/${id}`)
        .then((response) => {
          console.log('Data deleted:', response.data)

          // Delete from frontend
          const updatedBreakdownList = breakdownList.filter((breakdown) => breakdown._id !== id)
          setBreakdownList(updatedBreakdownList)
          setSuccessMessage('Data successfully deleted!')

          // Set timeout to clear the success message after 3 seconds (adjust as needed)
          setTimeout(() => {
            setSuccessMessage('')
          }, 2000)
        })
        .catch((error) => {
          console.error('Error deleting data:', error)
          setSuccessMessage('Error deleting data. Please try again.')

          // Set timeout to clear the error message after 3 seconds (adjust as needed)
          setTimeout(() => {
            setSuccessMessage('')
          }, 2000)
        })
    }
  }

  return (
    <>
      <div className="container">
        <div className="table-container" style={{ paddingTop: '2rem' }}>
          <h5 style={{ paddingBottom: '1rem' }}>Breakdown Data</h5>
          <table className="table">
            <thead>
              <tr>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>Machine Name</th>

                <th style={{ backgroundColor: '#002244', color: 'white' }}>Machine Name</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>Breakdown Type</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>Breakdown Reason</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>Breakdown Start Date</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>Breakdown Start Time</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>Status</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>Edit</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>Delete</th>
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
                  <td style={{ textAlign: 'center' }}>
                    {breakdown.Status === 'Open' && (
                      <button
                        className="btn"
                        onClick={() => editStatus(breakdown._id)}
                        style={{ color: 'green' }}
                      >
                        Edit Status
                      </button>
                    )}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      className="btn"
                      onClick={() => deleteData(breakdown._id)}
                      style={{ color: 'red' }}
                    >
                      {/* <img src={dlt} alt="" width={30} height={30} /> */}
                      <MdDelete />
                    </button>
                  </td>
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
