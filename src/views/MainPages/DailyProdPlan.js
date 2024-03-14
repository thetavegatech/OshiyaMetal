import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import * as math from 'mathjs'
import Select from 'react-select'

// import { CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react'

const DailyProdPlan = () => {
  const [Date, setDate] = useState('')
  const [productionPlanNo, setproductionPlanNo] = useState('')
  const [Size, setSize] = useState('')
  const [odSize, setodSize] = useState('')
  const [Thick, setThick] = useState('')
  const [Length, setLength] = useState('')
  const [Gr, setGr] = useState('')
  const [Weigth, setWeigth] = useState('')
  const [Speed, setSpeed] = useState('')
  const [ProdHr, setProdHr] = useState('')
  const [TimeAvailable, setTimeAvailable] = useState('')
  const [TimeRequired, setTimeRequired] = useState('')
  const [SlitNos, setSlitNos] = useState('')
  const [PlanMt, setPlanMt] = useState('')
  const [PrimeNos, setPrimeNos] = useState('')
  const [PrimeWt, setPrimeWt] = useState('')
  // const [Pq2, setPQ2] = useState('')
  // const [Pq2Wt, setPQ2Wt] = useState('')
  const [Open, setOpen] = useState('')
  const [OpenWt, setOpenWt] = useState('')
  const [Joint, setJoint] = useState('')
  const [JointWt, setJointWt] = useState('')
  const [roleChange, setRoleChange] = useState('')
  const [rolechangetime, setrolechangetime] = useState('')
  const [Plant, setPlant] = useState('')
  const [WorkHours, setWorkHours] = useState('')
  const [productionPlanData, setProductionPlanData] = useState([])
  const [entries, setEntries] = useState([])
  const [status, setStatus] = useState('Pending')

  // Fetch production plan data from the API on component mount
  useEffect(() => {
    const fetchProductionPlanData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/getdailyproplandata')
        if (response.status === 200) {
          setProductionPlanData(response.data)
        } else {
          console.error('Failed to fetch production plan data')
        }
      } catch (error) {
        console.error('Error fetching production plan data:', error)
      }
    }

    fetchProductionPlanData()
  }, [])

  // Function to add a new entry to the state
  const addEntry = () => {
    // Validate required fields before adding the entry
    if (productionPlanNo && Plant && selectedSize && Thick && Length && Gr) {
      let lastCalculatedTimeAvailable = parseFloat(TimeAvailable)

      if (entries.length > 0) {
        const lastEntryTimeAvailable = parseFloat(entries[entries.length - 1].TimeAvailable)
        lastCalculatedTimeAvailable = lastEntryTimeAvailable - parseFloat(TimeRequired)

        // Subtract roleChange time if roleChange is selected
        if (roleChange) {
          lastCalculatedTimeAvailable -= parseFloat(roleChange)
        }
      }
      setEntries((prevEntries) => [
        ...prevEntries,
        {
          productionPlanNo,
          Plant,
          Size: selectedSize,
          odSize,
          Thick,
          Length,
          Gr,
          Weigth,
          Speed,
          ProdHr,
          TimeAvailable: lastCalculatedTimeAvailable.toFixed(2),
          TimeRequired,
          WorkHours,
          // SlitNos: SlitNos,
          PlanMt,
          Date,
          roleChange,
          rolechangetime,
          status: 'Pending',
          // Add other fields as needed
        },
      ])

      // Clear the form fields after adding the entry
      setSize(selectedSize)
      setproductionPlanNo('')
      setPlant('')
      setodSize('')
      setThick('')
      setLength('')
      setGr('')
      setWeigth('')
      setSpeed('')
      setProdHr('')
      setWorkHours('')
      setTimeAvailable(lastCalculatedTimeAvailable.toFixed(2))
      setTimeRequired('')
      setrolechangetime('')
      setRoleChange('')
      // setSlitNos('')
      setPlanMt('')
      setDate('')
      setStatus('Pending')
      // Clear other fields as needed
    } else {
      // Display an error message or handle validation
      alert('Please fill in all required fields.')
    }
  }

  // Function to save all entries
  const saveAllEntries = async () => {
    try {
      // Make API call to save all entries using axios
      const response = await axios.post('http://localhost:5001/api/saveproplan', entries)

      if (response.status === 200) {
        console.log('All entries saved successfully:', response.data)
        // Clear the entries state after saving
        setEntries([])
        setStatus('Pending')
        // Display success message
        alert('All entries saved successfully')
      } else {
        console.error('Failed to save entries')
        // Handle error or show a user-friendly message
      }
    } catch (error) {
      console.error('Internal Server Error:', error)
      // Handle error or show a user-friendly message
    }
  }

  // JSX for the production plan table
  const productionPlanTable = (
    <div>
      <h2>Production Plan Table</h2>
      <table className="table">
        <thead>
          <tr>
            {/* Add table header columns based on your production plan data structure */}
            <th style={{ backgroundColor: '#002244', color: 'white' }}>Plant</th>
            <th style={{ backgroundColor: '#002244', color: 'white' }}>Plan No</th>
            {/* <th style={{ backgroundColor: '#002244', color: 'white' }}>Date</th> */}
            {/* <th style={{ backgroundColor: '#002244', color: 'white' }}>No</th> */}
            <th style={{ backgroundColor: '#002244', color: 'white' }}>Size</th>
            <th style={{ backgroundColor: '#002244', color: 'white' }}>Thick</th>
            <th style={{ backgroundColor: '#002244', color: 'white' }}>Od</th>
            <th style={{ backgroundColor: '#002244', color: 'white' }}>Length</th>
            <th style={{ backgroundColor: '#002244', color: 'white' }}>Gr</th>
            <th style={{ backgroundColor: '#002244', color: 'white' }}>Weigth</th>
            <th style={{ backgroundColor: '#002244', color: 'white' }}>Speed</th>
            <th style={{ backgroundColor: '#002244', color: 'white' }}>ProdHr</th>
            <th style={{ backgroundColor: '#002244', color: 'white' }}>PlanMt</th>
            <th style={{ backgroundColor: '#002244', color: 'white' }}>WorkHours</th>
            <th style={{ backgroundColor: '#002244', color: 'white' }}>TimeRequired</th>
            <th style={{ backgroundColor: '#002244', color: 'white' }}>TimeAvailable</th>
            <th style={{ backgroundColor: '#002244', color: 'white' }}>Status</th>
            {/* <th style={{ backgroundColor: '#002244', color: 'white' }}>SlitNos</th> */}
            {/* <th style={{ backgroundColor: '#002244', color: 'white' }}>PlanMt</th> */}
            <th style={{ backgroundColor: '#002244', color: 'white' }}>Role Change Time</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {/* {productionPlanData.map((plan) => ( */}
          {entries.map((entry, index) => (
            // <tr key={plan.id}>
            <tr key={index}>
              <td>{entry.Plant}</td>
              <td>{entry.productionPlanNo}</td>
              {/* <td>{new Date(plan.Date).toLocaleDateString()}</td> */}
              <td>{entry.Size}</td>
              <td>{entry.Thick}</td>
              <td>{entry.odSize}</td>
              {/* <td>{item.Thick}</td> */}
              <td>{entry.Length}</td>
              <td>{entry.Gr}</td>
              <td>{entry.Weigth}</td>
              <td>{entry.Speed}</td>
              <td>{entry.ProdHr}</td>
              <td>{entry.PlanMt}</td>
              <td>{entry.WorkHours}</td>
              <td>{entry.TimeRequired}</td>
              <td>{entry.TimeAvailable}</td>
              <td>{entry.status}</td>
              {/* Display other plan details in respective columns */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const [odData, setod] = useState([
    { Size: 41.3, Thick: 1.2, odSize: 41.3, Speed: 50 },
    { Size: 41.3, Thick: 1.63, odSize: 43.3, Speed: 60 },
    { Size: 41.3, Thick: 2, odSize: 42.3, Speed: 50 },
    { Size: 41.3, Thick: 2.5, odSize: 41.3, Speed: 40 },
    { Size: 41.3, Thick: 3, odSize: 41.3, Speed: 35 },
    { Size: 32 * 32, Thick: 1.2, odSize: 41.3, Speed: 50 },
    { Size: 41.3, Thick: 3.2, odSize: 41.3, Speed: 35 },
    { Size: 41.3, Thick: 3.5, odSize: 41.3, Speed: 35 },
    { Size: 41.3, Thick: 4, odSize: 41.3, Speed: 30 },
    { Size: 48.3, Thick: 1.2, odSize: 48.3, Speed: 60 },
    { Size: 48.3, Thick: 1.63, odSize: 48.3, Speed: 70 },
    { Size: 48.3, Thick: 2, odSize: 48.3, Speed: 65 },
    { Size: 48.3, Thick: 2.5, odSize: 48.3, Speed: 55 },
    { Size: 48.3, Thick: 3, odSize: 48.3, Speed: 50 },
    { Size: 48.3, Thick: 3.2, odSize: 48.3, Speed: 45 },
    { Size: 48.3, Thick: 3.5, odSize: 48.3, Speed: 40 },
    { Size: 48.3, Thick: 4, odSize: 48.3, Speed: 35 },
    { Size: 60.3, Thick: 1.2, odSize: 60.3, Speed: 60 },
    { Size: 60.3, Thick: 1.63, odSize: 60.3, Speed: 70 },
    { Size: 60.3, Thick: 2, odSize: 60.3, Speed: 65 },
    { Size: 60.3, Thick: 2.5, odSize: 60.3, Speed: 50 },
    { Size: 60.3, Thick: 3, odSize: 60.3, Speed: 45 },
    { Size: 60.3, Thick: 3.2, odSize: 60.3, Speed: 40 },
    { Size: 60.3, Thick: 3.5, odSize: 60.3, Speed: 35 },
    { Size: 60.3, Thick: 4, odSize: 60.3, Speed: 30 },
    { Size: 60.3, Thick: 5, odSize: 60.3, Speed: 25 },
    { Size: 76.2, Thick: 1.2, odSize: 76.2, Speed: 50 },
    { Size: 76.2, Thick: 1.63, odSize: 76.2, Speed: 50 },
    { Size: 76.2, Thick: 2, odSize: 76.2, Speed: 50 },
    { Size: 76.2, Thick: 2.5, odSize: 76.2, Speed: 45 },
    { Size: 76.2, Thick: 3, odSize: 76.2, Speed: 40 },
    { Size: 76.2, Thick: 3.2, odSize: 76.2, Speed: 40 },
    { Size: 76.2, Thick: 3.5, odSize: 76.2, Speed: 35 },
    { Size: 76.2, Thick: 4, odSize: 76.2, Speed: 30 },
    { Size: 76.2, Thick: 5, odSize: 76.2, Speed: 25 },
    { Size: 88.9, Thick: 1.63, odSize: 88.9, Speed: 50 },
    { Size: 88.9, Thick: 2, odSize: 88.9, Speed: 45 },
    { Size: 88.9, Thick: 2.5, odSize: 88.9, Speed: 40 },
    { Size: 88.9, Thick: 3, odSize: 88.9, Speed: 35 },
    { Size: 88.9, Thick: 3.2, odSize: 88.9, Speed: 35 },
    { Size: 88.9, Thick: 3.5, odSize: 88.9, Speed: 30 },
    { Size: 88.9, Thick: 4, odSize: 88.9, Speed: 25 },
    { Size: 88.9, Thick: 5, odSize: 88.9, Speed: 20 },
    { Size: 114.3, Thick: 1.63, odSize: 114.3, Speed: 40 },
    { Size: 114.3, Thick: 2, odSize: 114.3, Speed: 40 },
    { Size: 114.3, Thick: 2.5, odSize: 114.3, Speed: 35 },
    { Size: 114.3, Thick: 3, odSize: 114.3, Speed: 30 },
    { Size: 114.3, Thick: 3.2, odSize: 114.3, Speed: 30 },
    { Size: 114.3, Thick: 3.5, odSize: 114.3, Speed: 25 },
    { Size: 114.3, Thick: 4, odSize: 114.3, Speed: 25 },
    { Size: 114.3, Thick: 5, odSize: 114.3, Speed: 20 },
    { Size: 32 * 32, Thick: 1.2, odSize: 41.3, Speed: 50 },
    { Size: 32 * 32, Thick: 1.63, odSize: 41.3, Speed: 60 },
    { Size: 32 * 32, Thick: 2, odSize: 41.3, Speed: 50 },
    { Size: 32 * 32, Thick: 2.5, odSize: 41.3, Speed: 40 },
    { Size: 32 * 32, Thick: 3, odSize: 41.3, Speed: 35 },
    { Size: 38 * 38, Thick: 1.2, odSize: 48.3, Speed: 60 },
    { Size: 38 * 38, Thick: 1.63, odSize: 48.3, Speed: 70 },
    { Size: 38 * 38, Thick: 2, odSize: 48.3, Speed: 65 },
    { Size: 38 * 38, Thick: 2.5, odSize: 48.3, Speed: 55 },
    { Size: 38 * 38, Thick: 3, odSize: 48.3, Speed: 50 },
    { Size: 38 * 38, Thick: 3.2, odSize: 48.3, Speed: 45 },
    { Size: 38 * 38, Thick: 3.5, odSize: 48.3, Speed: 40 },
    { Size: 38 * 38, Thick: 4, odSize: 48.3, Speed: 35 },
    { Size: 48 * 48, Thick: 1.2, odSize: 60.3, Speed: 60 },
    { Size: 48 * 48, Thick: 1.4, odSize: 60.3, Speed: 60 },
    { Size: 48 * 48, Thick: 1.63, odSize: 60.3, Speed: 70 },
    { Size: 48 * 48, Thick: 2, odSize: 60.3, Speed: 65 },
    { Size: 48 * 48, Thick: 2.5, odSize: 60.3, Speed: 50 },
    { Size: 48 * 48, Thick: 3, odSize: 60.3, Speed: 45 },
    { Size: 48 * 48, Thick: 3.2, odSize: 60.3, Speed: 40 },
    { Size: 48 * 48, Thick: 3.5, odSize: 60.3, Speed: 35 },
    { Size: 48 * 48, Thick: 4, odSize: 60.3, Speed: 30 },
    { Size: 48 * 48, Thick: 5, odSize: 60.3, Speed: 25 },
    { Size: 50 * 50, Thick: 1.2, odSize: 63.5, Speed: 60 },
    { Size: 50 * 50, Thick: 1.63, odSize: 63.5, Speed: 70 },
    { Size: 50 * 50, Thick: 2, odSize: 63.5, Speed: 65 },
    { Size: 50 * 50, Thick: 2.5, odSize: 63.5, Speed: 50 },
    { Size: 50 * 50, Thick: 3, odSize: 63.5, Speed: 45 },
    { Size: 50 * 50, Thick: 3.5, odSize: 63.5, Speed: 35 },
    { Size: 50 * 50, Thick: 4, odSize: 63.5, Speed: 30 },
    { Size: 50 * 50, Thick: 5, odSize: 63.5, Speed: 25 },
    { Size: 60 * 60, Thick: 1.2, odSize: 76.2, Speed: 50 },
    { Size: 60 * 60, Thick: 1.63, odSize: 76, Speed: 50 },
    { Size: 60 * 60, Thick: 2, odSize: 76.2, Speed: 50 },
    { Size: 60 * 60, Thick: 2.5, odSize: 76.2, Speed: 45 },
    { Size: 60 * 60, Thick: 3, odSize: 76.2, Speed: 40 },
    { Size: 60 * 60, Thick: 3.2, odSize: 76, Speed: 40 },
    { Size: 60 * 60, Thick: 3.5, odSize: 76.2, Speed: 35 },
    { Size: 60 * 60, Thick: 4, odSize: 76.2, Speed: 30 },
    { Size: 60 * 60, Thick: 5, odSize: 76.2, Speed: 25 },
    { Size: 72 * 72, Thick: 1.63, odSize: 88.9, Speed: 50 },
    { Size: 72 * 72, Thick: 2, odSize: 88.9, Speed: 50 },
    { Size: 72 * 72, Thick: 2.5, odSize: 88.9, Speed: 45 },
    { Size: 72 * 72, Thick: 3, odSize: 88.9, Speed: 45 },
    { Size: 72 * 72, Thick: 3.2, odSize: 88.9, Speed: 40 },
    { Size: 72 * 72, Thick: 3.5, odSize: 88.9, Speed: 40 },
    { Size: 72 * 72, Thick: 4, odSize: 88.9, Speed: 35 },
    { Size: 72 * 72, Thick: 5, odSize: 88.9, Speed: 25 },
    { Size: 75 * 75, Thick: 1.63, odSize: 94, Speed: 50 },
    { Size: 75 * 75, Thick: 2, odSize: 94, Speed: 50 },
    { Size: 75 * 75, Thick: 2.5, odSize: 94, Speed: 45 },
    { Size: 75 * 75, Thick: 3, odSize: 94, Speed: 40 },
    { Size: 75 * 75, Thick: 3.2, odSize: 94, Speed: 40 },
    { Size: 75 * 75, Thick: 3.5, odSize: 94, Speed: 35 },
    { Size: 75 * 75, Thick: 4, odSize: 94, Speed: 30 },
    { Size: 75 * 75, Thick: 5, odSize: 94, Speed: 20 },
    { Size: 91 * 91, Thick: 2, odSize: 114.3, Speed: 40 },
    { Size: 91 * 91, Thick: 2.5, odSize: 114.3, Speed: 35 },
    { Size: 91 * 91, Thick: 3, odSize: 114.3, Speed: 30 },
    { Size: 91 * 91, Thick: 3.5, odSize: 114.3, Speed: 25 },
    { Size: 91 * 91, Thick: 4, odSize: 114.3, Speed: 20 },
    { Size: 91 * 91, Thick: 5, odSize: 114.3, Speed: 15 },
    { Size: 50 * 25, Thick: 1.2, odSize: 48.3, Speed: 50 },
    { Size: 50 * 25, Thick: 1.63, odSize: 48.3, Speed: 70 },
    { Size: 50 * 25, Thick: 2, odSize: 48.3, Speed: 65 },
    { Size: 50 * 25, Thick: 2.5, odSize: 48.3, Speed: 55 },
    { Size: 50 * 25, Thick: 3, odSize: 48.3, Speed: 45 },
    { Size: 58 * 38, Thick: 1.2, odSize: 60.3, Speed: 50 },
    { Size: 58 * 38, Thick: 1.63, odSize: 60.3, Speed: 70 },
    { Size: 58 * 38, Thick: 2, odSize: 60.3, Speed: 65 },
    { Size: 58 * 38, Thick: 2.5, odSize: 60.3, Speed: 55 },
    { Size: 58 * 38, Thick: 3, odSize: 60.3, Speed: 50 },
    { Size: 60 * 40, Thick: 1.6, odSize: 63.5, Speed: 70 },
    { Size: 60 * 40, Thick: 2, odSize: 63.5, Speed: 65 },
    { Size: 60 * 40, Thick: 2.5, odSize: 63.5, Speed: 50 },
    { Size: 60 * 40, Thick: 3, odSize: 63.5, Speed: 45 },
    { Size: 60 * 40, Thick: 3.2, odSize: 63.5, Speed: 45 },
    { Size: 60 * 40, Thick: 3.5, odSize: 63.5, Speed: 40 },
    { Size: 60 * 40, Thick: 4, odSize: 63.5, Speed: 35 },
    { Size: 72 * 24, Thick: 1.2, odSize: 60.3, Speed: 50 },
    { Size: 72 * 24, Thick: 1.63, odSize: 60.3, Speed: 50 },
    { Size: 72 * 24, Thick: 2, odSize: 60.3, Speed: 50 },
    { Size: 72 * 24, Thick: 2.5, odSize: 60.3, Speed: 40 },
    { Size: 75 * 25, Thick: 1.2, odSize: 63.5, Speed: 50 },
    { Size: 75 * 25, Thick: 1.6, odSize: 63.5, Speed: 50 },
    { Size: 75 * 25, Thick: 2, odSize: 63.5, Speed: 50 },
    { Size: 75 * 25, Thick: 2.5, odSize: 63.5, Speed: 40 },
    { Size: 75 * 25, Thick: 3, odSize: 63.5, Speed: 35 },
    { Size: 80 * 40, Thick: 1.63, odSize: 76.2, Speed: 50 },
    { Size: 80 * 40, Thick: 2, odSize: 76.2, Speed: 50 },
    { Size: 80 * 40, Thick: 2.5, odSize: 76.2, Speed: 45 },
    { Size: 80 * 40, Thick: 3, odSize: 76.2, Speed: 40 },
    { Size: 80 * 40, Thick: 3.2, odSize: 76.2, Speed: 40 },
    { Size: 80 * 40, Thick: 3.5, odSize: 76.2, Speed: 35 },
    { Size: 80 * 40, Thick: 4, odSize: 76.2, Speed: 30 },
    { Size: 80 * 40, Thick: 5, odSize: 76.2, Speed: 25 },
    { Size: 95 * 25, Thick: 1.63, odSize: 76.2, Speed: 50 },
    { Size: 95 * 25, Thick: 2, odSize: 76.2, Speed: 50 },
    { Size: 95 * 25, Thick: 2.5, odSize: 76.2, Speed: 45 },
    { Size: 96 * 48, Thick: 1.63, odSize: 88.9, Speed: 50 },
    { Size: 96 * 48, Thick: 2, odSize: 88.9, Speed: 50 },
    { Size: 96 * 48, Thick: 2.5, odSize: 88.9, Speed: 45 },
    { Size: 96 * 48, Thick: 3, odSize: 88.9, Speed: 40 },
    { Size: 96 * 48, Thick: 3.2, odSize: 88.9, Speed: 40 },
    { Size: 96 * 48, Thick: 3.5, odSize: 88.9, Speed: 35 },
    { Size: 96 * 48, Thick: 4, odSize: 88.9, Speed: 30 },
    { Size: 96 * 48, Thick: 5, odSize: 88.9, Speed: 25 },
    { Size: 100 * 50, Thick: 1.63, odSize: 94, Speed: 50 },
    { Size: 100 * 50, Thick: 2, odSize: 94, Speed: 50 },
    { Size: 100 * 50, Thick: 2.5, odSize: 94, Speed: 45 },
    { Size: 100 * 50, Thick: 3, odSize: 94, Speed: 40 },
    { Size: 100 * 50, Thick: 3.2, odSize: 94, Speed: 40 },
    { Size: 100 * 50, Thick: 3.5, odSize: 94, Speed: 35 },
    { Size: 100 * 50, Thick: 4, odSize: 94, Speed: 30 },
    { Size: 100 * 50, Thick: 5, odSize: 94, Speed: 20 },
    { Size: 122 * 60, Thick: 2, odSize: 114.3, Speed: 35 },
    { Size: 122 * 60, Thick: 2.5, odSize: 114.3, Speed: 30 },
    { Size: 122 * 60, Thick: 3, odSize: 114.3, Speed: 30 },
    { Size: 122 * 60, Thick: 3.2, odSize: 114.3, Speed: 30 },
    { Size: 122 * 60, Thick: 3.5, odSize: 114.3, Speed: 25 },
    { Size: 122 * 60, Thick: 4, odSize: 114.3, Speed: 20 },
    { Size: 'Relling', Thick: 1.63, odSize: 60.3, Speed: 50 },
    { Size: 19.05, Thick: 0.8, odSize: 19.05, Speed: 50 },
    { Size: 19.05, Thick: 1, odSize: 19.05, Speed: 50 },
    { Size: 19.05, Thick: 1.2, odSize: 19.05, Speed: 60 },
    { Size: 19.05, Thick: 1.63, odSize: 19.05, Speed: 60 },
    { Size: 19.05, Thick: 2, odSize: 19.05, Speed: 50 },
    { Size: 19.05, Thick: 2.5, odSize: 19.05, Speed: 40 },
    { Size: 25.4, Thick: 0.8, odSize: 25.4, Speed: 50 },
    { Size: 25.4, Thick: 1, odSize: 25.4, Speed: 50 },
    { Size: 25.4, Thick: 1.2, odSize: 25.4, Speed: 50 },
    { Size: 25.4, Thick: 1.63, odSize: 25.4, Speed: 60 },
    { Size: 25.4, Thick: 2, odSize: 25.4, Speed: 50 },
    { Size: 25.4, Thick: 2.5, odSize: 25.4, Speed: 40 },
    { Size: 25.4, Thick: 3, odSize: 25.4, Speed: 35 },
    { Size: 31.75, Thick: 0.8, odSize: 31.75, Speed: 50 },
    { Size: 31.75, Thick: 1, odSize: 31.75, Speed: 50 },
    { Size: 31.75, Thick: 1.2, odSize: 31.75, Speed: 50 },
    { Size: 31.75, Thick: 1.63, odSize: 31.75, Speed: 60 },
    { Size: 31.75, Thick: 2, odSize: 31.75, Speed: 50 },
    { Size: 31.75, Thick: 2.5, odSize: 31.75, Speed: 40 },
    { Size: 31.75, Thick: 3, odSize: 31.75, Speed: 35 },
    { Size: 38.1, Thick: 1.6, odSize: 38.1, Speed: 60 },
    { Size: 38.1, Thick: 2, odSize: 38.1, Speed: 50 },
    { Size: 38.1, Thick: 2.5, odSize: 38.1, Speed: 40 },
    { Size: 38.1, Thick: 3, odSize: 38.1, Speed: 35 },
    { Size: 38.1, Thick: 3.2, odSize: 38.1, Speed: 30 },
    { Size: 38.1, Thick: 3.5, odSize: 38.1, Speed: 30 },
    { Size: 41.3, Thick: 1.2, odSize: 41.3, Speed: 50 },
    { Size: 41.3, Thick: 1.63, odSize: 41.3, Speed: 60 },
    { Size: 41.3, Thick: 2, odSize: 41.3, Speed: 50 },
    { Size: 41.3, Thick: 2.5, odSize: 41.3, Speed: 40 },
    { Size: 41.3, Thick: 3, odSize: 41.3, Speed: 35 },
    { Size: 41.3, Thick: 3.2, odSize: 41.3, Speed: 35 },
    { Size: 41.3, Thick: 3.5, odSize: 41.3, Speed: 35 },
    { Size: 41.3, Thick: 4, odSize: 41.3, Speed: 30 },
    { Size: 15 * 15, Thick: 0.8, odSize: 19.05, Speed: 50 },
    { Size: 15 * 15, Thick: 1, odSize: 19.0, Speed: 50 },
    { Size: 15 * 15, Thick: 1.2, odSize: 19.05, Speed: 60 },
    { Size: 15 * 15, Thick: 1.63, odSize: 19.05, Speed: 60 },
    { Size: 15 * 15, Thick: 2, odSize: 19.05, Speed: 50 },
    { Size: 20 * 20, Thick: 0.8, odSize: 25.4, Speed: 50 },
    { Size: 20 * 20, Thick: 1, odSize: 25.4, Speed: 50 },
    { Size: 20 * 20, Thick: 1.2, odSize: 25.4, Speed: 50 },
    { Size: 20 * 20, Thick: 1.63, odSize: 25.4, Speed: 60 },
    { Size: 20 * 20, Thick: 2, odSize: 25.4, Speed: 50 },
    { Size: 20 * 20, Thick: 2.5, odSize: 25.4, Speed: 40 },
    { Size: 25 * 25, Thick: 0.8, odSize: 31.75, Speed: 50 },
    { Size: 25 * 25, Thick: 1, odSize: 31.75, Speed: 50 },
    { Size: 25 * 25, Thick: 1.2, odSize: 31.75, Speed: 50 },
    { Size: 25 * 25, Thick: 1.63, odSize: 31.75, Speed: 60 },
    { Size: 25 * 25, Thick: 2, odSize: 31.75, Speed: 50 },
    { Size: 25 * 25, Thick: 2.5, odSize: 31.75, Speed: 40 },
    { Size: 25 * 25, Thick: 3, odSize: 31.75, Speed: 35 },
    { Size: 32 * 32, Thick: 1.2, odSize: 41.3, Speed: 50 },
    { Size: 32 * 32, Thick: 1.63, odSize: 41.3, Speed: 60 },
    { Size: 32 * 32, Thick: 2, odSize: 41.3, Speed: 50 },
    { Size: 32 * 32, Thick: 2.5, odSize: 41.3 },
    { Size: 32 * 32, Thick: 3, odSize: 41.3 },
    { Size: 20 * 15, Thick: 0.8, odSize: 22.23 },
    { Size: 26 * 13, Thick: 0.8, odSize: 25.4 },
    { Size: 30 * 20, Thick: 1.63, odSize: 31.75 },
    { Size: 40 * 20, Thick: 1.2, odSize: 38.1 },
    { Size: 40 * 20, Thick: 1.4, odSize: 38.1 },
    { Size: 40 * 20, Thick: 1.63, odSize: 38.1 },
    { Size: 40 * 20, Thick: 2, odSize: 38.1 },
    { Size: 40 * 20, Thick: 2.5, odSize: 38.1 },
    { Size: 80 * 80, Thick: 2, odSize: 101.6 },
    { Size: 80 * 80, Thick: 2.5, odSize: 101.6 },
    { Size: 80 * 80, Thick: 3, odSize: 101.6 },
    { Size: 80 * 80, Thick: 3.5, odSize: 101.6 },
    { Size: 80 * 80, Thick: 4, odSize: 101.6 },
    { Size: 80 * 80, Thick: 5, odSize: 101.6 },
    { Size: 80 * 80, Thick: 6, odSize: 101.6 },
    { Size: 100 * 100, Thick: 2, odSize: 127 },
    { Size: 100 * 100, Thick: 2.5, odSize: 127 },
    { Size: 100 * 100, Thick: 3, odSize: 127 },
    { Size: 100 * 100, Thick: 3.5, odSize: 127 },
    { Size: 100 * 100, Thick: 4, odSize: 127 },
    { Size: 100 * 100, Thick: 5, odSize: 127 },
    { Size: 100 * 100, Thick: 6, odSize: 127 },
    { Size: 132 * 132, Thick: 2, odSize: 165 },
    { Size: 132 * 132, Thick: 2.5, odSize: 165 },
    { Size: 132 * 132, Thick: 3, odSize: 165 },
    { Size: 132 * 132, Thick: 3.5, odSize: 165 },
    { Size: 132 * 132, Thick: 4, odSize: 165 },
    { Size: 132 * 132, Thick: 4.5, odSize: 165 },
    { Size: 132 * 132, Thick: 5, odSize: 165 },
    { Size: 132 * 132, Thick: 6, odSize: 165 },
    { Size: 150 * 150, Thick: 2, odSize: 192 },
    { Size: 150 * 150, Thick: 2.5, odSize: 192 },
    { Size: 150 * 150, Thick: 3, odSize: 192 },
    { Size: 150 * 150, Thick: 3.5, odSize: 192 },
    { Size: 150 * 150, Thick: 4, odSize: 192 },
    { Size: 150 * 150, Thick: 4.5, odSize: 192 },
    { Size: 150 * 150, Thick: 5, odSize: 192 },
    { Size: 150 * 150, Thick: 6, odSize: 192 },
    { Size: 145 * 82, Thick: 2, odSize: 144 },
    { Size: 145 * 82, Thick: 2.5, odSize: 144 },
    { Size: 145 * 82, Thick: 3, odSize: 144 },
    { Size: 145 * 82, Thick: 3.5, odSize: 144 },
    { Size: 145 * 82, Thick: 4, odSize: 144 },
    { Size: 145 * 82, Thick: 4.5, odSize: 144 },
    { Size: 145 * 82, Thick: 5, odSize: 144 },
    { Size: 145 * 82, Thick: 6, odSize: 144 },
    { Size: 200 * 100, Thick: 2, odSize: 192 },
    { Size: 200 * 100, Thick: 2.5, odSize: 192 },
    { Size: 200 * 100, Thick: 3, odSize: 192 },
    { Size: 200 * 100, Thick: 3.5, odSize: 192 },
    { Size: 200 * 100, Thick: 4, odSize: 192 },
    { Size: 200 * 100, Thick: 4.5, odSize: 192 },
    { Size: 200 * 100, Thick: 5, odSize: 192 },
    { Size: 200 * 100, Thick: 6, odSize: 192 },
    { Size: 140, Thick: 2, odSize: 140 },
    { Size: 140, Thick: 2.5, odSize: 140 },
    { Size: 140, Thick: 3, odSize: 140 },
    { Size: 140, Thick: 3.5, odSize: 140 },
    { Size: 140, Thick: 4, odSize: 140 },
    { Size: 140, Thick: 4.5, odSize: 140 },
    { Size: 140, Thick: 5, odSize: 140 },
    { Size: 140, Thick: 6, odSize: 140 },
    { Size: 165, Thick: 1.6, odSize: 165 },
    { Size: 165, Thick: 2, odSize: 165 },
    { Size: 165, Thick: 2.5, odSize: 165 },
    { Size: 165, Thick: 3, odSize: 165 },
    { Size: 165, Thick: 3.5, odSize: 165 },
    { Size: 165, Thick: 4, odSize: 165 },
    { Size: 165, Thick: 4.5, odSize: 165 },
    { Size: 165, Thick: 5, odSize: 165 },
    { Size: 165, Thick: 6, odSize: 165 },
    { Size: 194, Thick: 2, odSize: 194 },
    { Size: 194, Thick: 2.5, odSize: 194 },
    { Size: 194, Thick: 3, odSize: 194 },
    { Size: 194, Thick: 3.5, odSize: 194 },
    { Size: 194, Thick: 4, odSize: 194 },
    { Size: 194, Thick: 4.5, odSize: 194 },
    { Size: 194, Thick: 5, odSize: 194 },
    { Size: 194, Thick: 6, odSize: 194 },
    { Size: 219, Thick: 3, odSize: 219 },
    { Size: 219, Thick: 3.5, odSize: 219 },
    { Size: 219, Thick: 4, odSize: 219 },
    { Size: 219, Thick: 4.5, odSize: 219 },
    { Size: 219, Thick: 5, odSize: 219 },
    { Size: 219, Thick: 6, odSize: 219 },
  ])

  const [selectedSize, setSelectedSize] = useState('')

  const handleSizeChange = (value) => {
    const { odSize, Speed } = updateodSize(value, Thick)
    console.log('Input Value:', value)
    setSelectedSize(value)
    setodSize(odSize)
    setSpeed(Speed)
  }

  useEffect(() => {
    if (selectedSize && Thick) {
      const { odSize, Speed } = updateodSize(selectedSize, Thick)
      setodSize(odSize)
      setSpeed(Speed)
    }
  }, [selectedSize, Thick])

  const updateodSize = (size, thick) => {
    try {
      // const parsedSize = math.evaluate(size) // Evaluate the mathematical e*pression
      const parsedExpression = math.parse(size)
      // Evaluate the parsed expression
      const parsedSize = parsedExpression.evaluate()

      if (!isNaN(parsedSize)) {
        const matchedUser = odData.find(
          (user) => user.Size === parsedSize && user.Thick === parseFloat(thick),
        )

        if (matchedUser) {
          const odSize = matchedUser.odSize ? matchedUser.odSize.toString() : ''
          const Speed = matchedUser.Speed ? matchedUser.Speed.toString() : ''
          return { odSize, Speed }
        }
      }
    } catch (error) {
      // Handle the case where the e*pression is not a valid mathematical e*pression
      console.error('Invalid mathematical e*pression:', error)
    }

    // Reset odSize and speed if no valid match is found
    return { odSize: '', Speed: '' }
  }

  console.log(odSize)
  console.log(Speed)
  // productionPlanNo
  console.log(productionPlanNo)

  useEffect(() => {
    if (selectedSize && Thick && Speed) {
      updateodSize(selectedSize, Thick)
    }
  }, [selectedSize, Thick])

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value
  }

  useEffect(() => {
    const OD = parseFloat(odSize) || 0
    const THICK = parseFloat(Thick) || 0
    const LENGTH = parseFloat(Length)
    const WEIGTH = (OD - THICK) * THICK * LENGTH * 0.02465
    setWeigth(WEIGTH.toFixed(3))
    const SPEED = parseFloat(Speed)
    const PROHR = ((OD - THICK) * THICK * 0.02466 * SPEED * 60) / 1000
    setProdHr(PROHR.toFixed(2))

    const PRIMENOS = parseFloat(PrimeNos)
    const PRIMEWT = WEIGTH * PRIMENOS
    setPrimeWt(PRIMEWT.toFixed(2))

    // Calculate requiredTime
    const PLANMT = parseFloat(PlanMt) || 0
    const REQUIRED_TIME = PLANMT / PROHR
    setTimeRequired(REQUIRED_TIME.toFixed(2))

    // Calculate initial timeAvailable
    const INITIAL_TIME_AVAILABLE = Math.max(WorkHours - REQUIRED_TIME, 0)
    setTimeAvailable(INITIAL_TIME_AVAILABLE.toFixed(2))

    // Calculate updated timeAvailable based on roleChange
    let UPDATED_TIME_AVAILABLE
    if (roleChange) {
      // If roleChange is selected, subtract required time and role change time
      UPDATED_TIME_AVAILABLE = INITIAL_TIME_AVAILABLE - REQUIRED_TIME - parseFloat(roleChange)
    } else {
      // Otherwise, consider initial time available minus required time
      UPDATED_TIME_AVAILABLE = INITIAL_TIME_AVAILABLE
    }

    setTimeAvailable(UPDATED_TIME_AVAILABLE.toFixed(2))

    // setProdFTD(PROFTD.toFi*ed(2))
  }, [
    odSize,
    Thick,
    Weigth,
    WorkHours,
    Length,
    Speed,
    TimeAvailable,
    rolechangetime,
    roleChange,
    TimeRequired,
    PlanMt,
    ProdHr,
  ])

  console.log(Weigth)
  const handleSubmit = async (e) => {
    e.preventDefault() // Prevents the default form submission behavior

    try {
      // Create an object with the data to be sent to the server
      const formData = {
        productionPlanNo: productionPlanNo,
        Plant: Plant,
        Size: selectedSize,
        odSize: odSize,
        Thick: Thick,
        Length: Length,
        Gr: Gr,
        Weigth: Weigth,
        Speed: Speed,
        ProdHr: ProdHr,
        TimeAvailable: TimeAvailable,
        TimeRequired: TimeRequired,
        // SlitNos: SlitNos,
        PlanMt: PlanMt,
        Date: Date,
        roleChange: roleChange,
        rolechangetime: rolechangetime,
        status: 'Pending',
        // Sracp: Scrap,
      }

      // Make API call to save data using A*ios
      const response = await axios.post('http://localhost:5001/api/saveproplan', formData)

      if (response.status === 200) {
        console.log('Data saved successfully:', response.data)
        // Clear all fields
        setSize(selectedSize)
        setproductionPlanNo('')
        setPlant('')
        setodSize('')
        setThick('')
        setLength('')
        setGr('')
        setWeigth('')
        setSpeed('')
        setProdHr('')
        setTimeAvailable('')
        setTimeRequired('')
        setrolechangetime('')
        setRoleChange('')
        // setSlitNos('')
        setPlanMt('')
        setDate('')
        setStatus('')
        // setScrap('')

        // Display success message
        alert('Plan added successfully')
      } else {
        console.error('Failed to save data')
        // Handle error or show a user-friendly message
      }
    } catch (error) {
      console.error('Internal Server Error:', error)
      // Handle error or show a user-friendly message
    }
  }
  // }

  const vars = {
    '--cui-dropdown-bg': 'blue',
  }

  const [selectedPlant, setSelectedPlant] = useState('')

  return (
    <div>
      <div className="row">
        <div className="col-md-3">
          <h4 style={{ marginBottom: '1rem', color: '#002244' }}>Daily Production Plan</h4>
        </div>
        <div className="col-3">
          <NavLink to="/dailyprodplandata">
            <button
              type="button"
              className="form-control"
              style={{
                backgroundColor: '#002244',
                color: 'white',
                marginLeft: '35rem',
              }}
            >
              Plan Data
            </button>
          </NavLink>
        </div>
        {/* </div> */}
      </div>
      <form
        // onSubmit={handleSubmit}
        onSubmit={(e) => {
          e.preventDefault() // Prevents the default form submission behavior
          addEntry() // Add the current entry to the state
        }}
        style={{
          marginBottom: '2rem',
          border: '1p* solid #ccc',
          padding: '20p*',
          borderRadius: '10p*',
          margin: '20p*',
        }}
      >
        <div className="row">
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">Production Plan No</label>
              <input
                type="number"
                className="form-control"
                name="productionPlanNo"
                id="productionPlanNo"
                value={productionPlanNo}
                onChange={(e) => setproductionPlanNo(e.target.value)}
                // required
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="md-3">
              <select
                className="form-control"
                style={{
                  backgroundColor: '#0022',
                  // color: 'white',
                  marginTop: '1.5rem',
                }}
                name="Plant"
                id="Plant"
                value={Plant}
                onChange={(e) => setPlant(e.target.value)}
                // onChange={handleSubmit}
              >
                <option value="">Select Plant</option>
                <option value="TM-01">TM-01</option>
                <option value="TM-02">TM-02</option>
                <option value="TM-03">TM-03</option>
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                name="date"
                id="Date"
                value={Date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">Size</label>
              <select
                className="form-select"
                name="Size"
                id="Size"
                required
                value={selectedSize}
                onChange={(e) => handleSizeChange(e.target.value)}
              >
                <option value="" disabled>
                  Select Od Size
                </option>
                <option value="41.3">41.3</option>
                <option value="32 * 32">32 * 32</option>
                <option value="48.3">48.3</option>
                <option value="60.3">60.3</option>
                <option value="76.2">76.2</option>
                <option value="88.9">88.9</option>
                <option value="114.3">114.3</option>
                <option value="38 * 38">38 * 38</option>
                <option value="48 * 48">48 * 48</option>
                <option value="50 * 50">50 * 50</option>
                <option value="60 * 60">60 * 60</option>
                <option value="72 * 72">72 * 72</option>
                <option value="75 * 75">75 * 75</option>
                <option value="91 * 91">91 * 91</option>
                <option value="50 * 25">50 * 25</option>
                <option value="58 * 38">58 * 38</option>
                <option value="60 * 40">60 * 40</option>
                <option value="72 * 24">72 * 24</option>
                <option value="75 * 25">75 * 25</option>
                <option value="80 * 40">80 * 40</option>
                <option value="95 * 25">95 * 25</option>
                <option value="96 * 48">96 * 48</option>
                <option value="100 * 50">100 * 50</option>
                <option value="122 * 60">122 * 60</option>
                <option value="19.05">19.05</option>
                <option value="25.4">25.4</option>
                <option value="31.75">31.75</option>
                <option value="38.1">38.1</option>
                <option value="15 * 15">15 * 15</option>
                <option value="20 * 20">20 * 20</option>
                <option value="25 * 25">25 * 25</option>
                <option value="20 * 15">20 * 15</option>
                <option value="26 * 13">26 * 13</option>
                <option value="30 * 20">30 * 20</option>
                <option value="40 * 20">40 * 20</option>
                <option value="80 * 80">80 * 80</option>
                <option value="100 * 100">100 * 100</option>
                <option value="132 * 132">132 * 132</option>
                <option value="150 * 150">150 * 150</option>
                <option value="145 * 82">145 * 82</option>
                <option value="200 * 100">200 * 100</option>
                <option value="140">140</option>
                <option value="165">165</option>
                <option value="194">194</option>
                <option value="219">219</option>
                <option value="Relling">Relling</option>
              </select>
            </div>
          </div>

          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">Thickness</label>
              <select
                className="form-control"
                name="Thick"
                id="Thick"
                required
                value={Thick}
                onChange={(e) => setThick(e.target.value)}
              >
                <option value="" disabled>
                  Select Od Size
                </option>
                <option value="0.8">0.8</option>
                <option value="1">1</option>
                <option value="1.2">1.2</option>
                <option value="1.4">1.4</option>
                <option value="1.6">1.6</option>
                <option value="1.63">1.63</option>
                <option value="2">2</option>
                <option value="2.5">2.5</option>
                <option value="3">3</option>
                <option value="3.2">3.2</option>
                <option value="3.5">3.5</option>
                <option value="4">4</option>
                <option value="4.5">4.5</option>
                <option value="5">5</option>
                <option value="6">6</option>
                {/* Add other options as needed */}
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">Od</label>
              <input
                type="number"
                className="form-control"
                name="Od"
                id="Od"
                readOnly
                // placeholder="Od"
                value={odSize}
                onChange={(e) => setodSize(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">Speed</label>
              <input
                type="number"
                className="form-control"
                name="Speed"
                id="Speed"
                readOnly
                // placeholder="Speed"
                value={Speed}
                onChange={(e) => setSpeed(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">Coil Type</label>
              <select
                className="form-control"
                name="CoilType"
                id="CoilType"
                // placeholder="Coil type"
                value={Gr}
                required
                onChange={(e) => setGr(e.target.value)}
              >
                <option value="" disabled selected>
                  Select Coil Type
                </option>

                <option value="HR">HR</option>
                <option value="CR">CR</option>
                <option value="GP">GP</option>
                <option value="CRPO">CRPO</option>
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">Length in Meter</label>
              <input
                type="number"
                className="form-control"
                name="Length"
                id="Length"
                required
                // placeholder="Length"
                value={Length}
                onChange={(e) => setLength(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">Weigth</label>
              <input
                type="number"
                className="form-control"
                name="Weigth"
                id="Weigth"
                readOnly
                required
                value={Weigth}
                onChange={(e) => setWeigth(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">ProdHr</label>
              <input
                type="number"
                className="form-control"
                name="ProdHr"
                id="ProdHr"
                readOnly
                required
                // placeholder="ProdHr"
                value={ProdHr}
                onChange={(e) => setProdHr(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">PlanMt</label>
              <input
                type="number"
                className="form-control"
                name="PlanMt"
                id="PlanMt"
                value={PlanMt}
                onChange={(e) => setPlanMt(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">Select Work Hours</label>
              <select
                className="form-control"
                name="WorkHours"
                id="WorkHours"
                // placeholder="Coil type"
                value={WorkHours}
                required
                onChange={(e) => setWorkHours(e.target.value)}
              >
                <option value="" disabled selected>
                  Select WorkHours
                </option>

                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">Time Available</label>
              <input
                type="number"
                className="form-control"
                name="TimeAvailable"
                id="TimeAvailable"
                readOnly
                required
                value={TimeAvailable}
                onChange={(e) => setTimeAvailable(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <div
            className="row"
            style={{
              // width: '70%',
              marginBottom: '2rem',
              // border: '1p* solid #ccc',
              // padding: '20p*',/
              // borderRadius: '10p*',
              // margin: '20p*',
            }}
          >
            <div className="col-md-4">
              <div className="mb-3">
                <label className="form-label">Time Required</label>
                <input
                  type="number"
                  className="form-control"
                  name="TimeRequired"
                  id="TimeRequired"
                  readOnly
                  // placeholder="TimeRequired"
                  value={TimeRequired}
                  onChange={(e) => setTimeRequired(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <label className="form-label">Role Chnage</label>
                <select
                  className="form-control"
                  name="roleChange"
                  id="roleChange"
                  value={roleChange}
                  // onChange={handleRoleChange}
                  onChange={(e) => setRoleChange(e.target.value)}
                >
                  <option value="" selected>
                    Select Role Change
                  </option>
                  <option value="1.5">Part Role </option>
                  <option value="3">Full Role </option>
                </select>
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <label className="form-label">Role Chnage Time</label>
                <input
                  type="number"
                  className="form-control"
                  name="rolechangetime"
                  id="rolechangetime"
                  // required
                  value={roleChange}
                  onChange={(e) => setrolechangetime(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="mb-3">
              {/* <button
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
              </button> */}
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
                Add Entry
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="col-md-4">
        <div className="mb-3">
          <button
            type="button"
            className="btn"
            style={{
              backgroundColor: '#002244',
              color: 'white',
              paddingLeft: '3rem',
              paddingRight: '3rem',
            }}
            onClick={saveAllEntries}
          >
            Save All Entries
          </button>
        </div>
      </div>
      {status && (
        <div className={`status-message ${status === 'Pending' ? 'pending' : 'error'}`}>
          {status === 'Pending' ? 'Saving entries...' : 'Failed to save entries. Please try again.'}
        </div>
      )}
      {productionPlanTable}
    </div>
  )
}

export default DailyProdPlan
