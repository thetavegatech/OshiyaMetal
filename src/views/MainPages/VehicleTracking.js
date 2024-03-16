import React, { useEffect, useState } from 'react'
import axios from 'axios'
import * as XLSX from 'xlsx'
// import XLSX from 'xlsx'

const MotherCoilMaster = () => {
  const [successMessage, setSuccessMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [data, setData] = useState([])
  const [motherCoil, setMotherCoil] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [trackingData, setTrackingData] = useState([])
  const [formData, setFormData] = useState({
    vehicleNo: '',
    totalNOPrime: '',
    customerDetails: '',
    date: '',
    deliveryDate: '',
    status: '',
  })
  const currentDate = new Date().toISOString().split('T')[0]

  useEffect(() => {
    // Fetch data from the API
    fetch('https://oshiyameatlbackend.onrender.com/vehicletracking')
      .then((response) => response.json())
      .then((result) => {
        // Check if the request was successful (success property is true) and if data is an array
        if (result.success && Array.isArray(result.data)) {
          setTrackingData(result.data)
        } else {
          console.error('Invalid API response:', result)
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

  const submitHandle = (e) => {
    e.preventDefault()
    // const vehicleNo = e.target.vehicleNo.value
    const vehicleNo = e.target.vehicleNo?.value
    const totalNOPrime = e.target.totalNOPrime?.value
    const customerDetails = e.target.customerDetails?.value
    const date = e.target.date?.value
    const status = e.target.status?.value
    const deliveryDate = e.target.deliveryDate?.value
    axios
      .post('https://oshiyameatlbackend.onrender.com/vehicletracking', {
        vehicleNo: vehicleNo,
        totalNOPrime: totalNOPrime,
        customerDetails: customerDetails,
        date: date,
        deliveryDate: deliveryDate,
        status: status,
      })
      .then((response) => {
        console.log(response)
        setSuccessMessage('Data saved successfully!')

        // const fetchData = async () => {
        //   try {
        //     const response = await axios.get('http://localhost:5000/vehicletracking')
        //     console.log('Response data:', response.data)
        //     setSlittingData(response.data)
        //   } catch (error) {
        //     console.error('Error fetching data:', error)
        //   }
        // }

        // fetchData()

        e.target.reset()
        setTimeout(() => {
          setSuccessMessage('')
        }, 1000)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // const [startDate, setStartDate] = useState('')
  // const [endDate, setEndDate] = useState('')

  return (
    <div>
      <h4 style={{ marginBottom: '1rem', color: '#002244' }}>Vehicle Tracking</h4>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <form onSubmit={submitHandle}>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Vehicle No</label>
            <input
              type="number"
              className="form-control"
              name="vehicleNo"
              id="vehicleNo"
              value={formData.vehicleNo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Total No of Assets</label>
            <input
              type="string"
              className="form-control"
              name="totalNOPrime"
              id="totalNOPrime"
              value={formData.totalNOPrime}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Customer Details</label>
            <input
              type="string"
              className="form-control"
              name="customerDetails"
              id="customerDetails"
              value={formData.customerDetails}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Dispatch Date</label>
            <input
              type="date"
              className="form-control"
              name="date"
              id="date"
              value={currentDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Delivery Date</label>
            <input
              type="date"
              className="form-control"
              name="deliveryDate"
              id="deliveryDate"
              value={formData.deliveryDate}
              onChange={handleChange}
              required
            />
          </div>
          {/* <div className="col-md-4 mb-3">
            <label className="form-label">Status</label>
            <select className="form-control" name="status" id="status">
              <option value="" disabled selected>
                Select Status
              </option>

              <option value="Dispatch">Dispatch</option>
              <option value="Deliver">Deliver</option>
              <option value="Cancel">Cancel</option>
            </select>
          </div> */}
        </div>

        <div className="row">
          <div className="col-md-4">
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
          </div>
        </div>
      </form>
      <div className="table-responsive">
        {Array.isArray(trackingData) && trackingData.length > 0 ? (
          <div className="table-responsive" style={{ marginTop: '2rem' }}>
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th style={{ backgroundColor: '#002244', color: 'white' }}>Vehicle No</th>
                  <th style={{ backgroundColor: '#002244', color: 'white' }}>totalNOPrime</th>
                  <th style={{ backgroundColor: '#002244', color: 'white' }}> Dispatch Date</th>
                  <th style={{ backgroundColor: '#002244', color: 'white' }}>customerDetails</th>
                  <th style={{ backgroundColor: '#002244', color: 'white' }}>Delivery Date</th>
                  {/* <th style={{ backgroundColor: '#002244', color: 'white' }}>status</th> */}
                </tr>
              </thead>
              <tbody>
                {trackingData.map((vehicle) => (
                  <tr key={vehicle.id}>
                    <td>{vehicle.vehicleNo}</td>
                    <td>{vehicle.totalNOPrime}</td>
                    <td>{formatDate(vehicle.date)}</td>
                    <td>{vehicle.customerDetails}</td>
                    <td>{formatDate(vehicle.deliveryDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  )
}

export default MotherCoilMaster
