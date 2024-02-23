import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

const SlittingMaster = () => {
  const [srNos, setSrNos] = useState([])
  const [selectedSrNo, setSelectedSrNo] = useState('')
  const [MotherCoilId, setMotherCoilId] = useState('')
  const [thickness, setThickness] = useState('')
  const [actualCoilWidth, setActualCoilWidth] = useState('')
  const [actualCoilWeigth, setActualCoilWeigth] = useState('')
  const [SlitWidth, setSlitWidth] = useState('')
  const [NoOfSlit, setNoOfSlit] = useState('')
  const [OdSize, setOdSize] = useState('')
  const [WTMM, setWTMM] = useState('')
  const [SlitWeigth, setSlitWeigth] = useState('')
  const [TotalWeigth, setTotalWeigth] = useState('')
  const [Trimm, setTrimm] = useState(0)
  const [Scrap, setScrap] = useState(0)
  const [entriesArray, setEntriesArray] = useState([])
  const [saveSuccessMessage, setSaveSuccessMessage] = useState('')
  const [SlitSrNo, setSlitSrNo] = useState(1)
  const [combinedId, setcombinedId] = useState()
  const [Slitcut, setSlitcut] = useState('')

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/allSrNos')
        setSrNos(response.data)
      } catch (error) {
        console.error('Error fetching SrNos:', error)
      }
    }

    fetchData1()
  }, [])

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value
    setSelectedSrNo(selectedValue)
  }

  const fetchData = async (selected) => {
    try {
      const response = await fetch(`http://localhost:5001/api/data/srno/${selected}`)
      const result = await response.json()
      setMotherCoilId(result.MotherCoilId || '')
      setThickness(result.Thickness || '')
      setActualCoilWeigth(result.ActualCoilWeigth)
      setActualCoilWidth(result.ActualCoilWidth)
      // Set other state variables as needed
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    if (selectedSrNo) {
      fetchData(selectedSrNo)
    }
  }, [selectedSrNo])

  const handleSaveEntries = async () => {
    if (remainingWeight < 0) {
      // Display a message and return from the function
      setSaveSuccessMessage('You have no RemainingWeight.')
      setTimeout(() => {
        setSaveSuccessMessage('')
      }, 1000)
      return
    }

    try {
      // Add Slitting Sr No to each entry before saving
      const entriesWithSrNo = entriesArray.map((entry) => ({
        ...entry,
        Slitcut: Slitcut,
        SlitSrNo: entry.SlitSrNo || 0, // Use 0 if Slitting Sr No is not set
      }))

      const response = await axios.post('http://localhost:5001/api/saveEntries', entriesWithSrNo)
      console.log('Saved entries:', response.data)
      // Handle the response as needed (e.g., display a success message)
      setEntriesArray([])
      setSaveSuccessMessage('Entries saved successfully')

      // Reset Slitting Sr No for the next entry
      setSlitSrNo(0)

      // Clear other form fields and state variables
      setSelectedSrNo('')
      setSlitcut(Slitcut)
      setMotherCoilId('')
      setThickness('')
      setActualCoilWeigth('')
      setActualCoilWidth('')
      setSlitWidth('')
      setNoOfSlit('')
      setOdSize('')
      setWTMM('')
      setSlitWeigth('')
      setTotalWeigth('')
      setTrimm('')
      setScrap('')

      setTimeout(() => {
        setSaveSuccessMessage('')
      }, 2000)
    } catch (error) {
      console.error('Error saving entries:', error)
      // Handle the error (e.g., display an error message)
    }
  }

  console.log(entriesArray)

  useEffect(() => {
    const coilWeigth = parseFloat(NoOfSlit) || 0
    const slitWeigth = parseFloat(SlitWeigth) || 0
    const totalWeigth = coilWeigth * slitWeigth
    setTotalWeigth(totalWeigth)
  }, [NoOfSlit, SlitWeigth])

  // useEffect(() => {
  //   calculateTotalWeight()
  // }, [entriesArray])

  // const calculateTotalWeight = () => {
  //   const sum = entriesArray.reduce((accumulator, entry) => {
  //     return accumulator + parseFloat(entry.TotalWeigth) || 0
  //   }, 0)

  //   setTotalWeightSum(sum)
  // }

  // const [totalSlitWidth, setTotalSlitWidth] = useState(0)

  // const calculateTotalSlitWidth = () => {
  //   const sum = entriesArray.reduce((accumulator, entry) => {
  //     return accumulator + (parseFloat(entry.NoOfSlit) || 0) * (parseFloat(entry.SlitWidth) || 0)
  //   }, 0)

  //   setTotalSlitWidth(sum)
  // }

  // useEffect(() => {
  //   calculateTotalSlitWidth()
  // }, [entriesArray])

  // console.log(totalWeightSum, totalSlitWidth)

  // const [remainingCoilWidth, setRemainingCoilWidth] = useState(0)
  // const [remainingCoilWeight, setRemainingCoilWeight] = useState(0)

  // const calculateRemainingValues = () => {
  //   const updatedRemainingCoilWidth = parseFloat(actualCoilWidth) - totalSlitWidth
  //   const updatedRemainingCoilWeight = parseFloat(actualCoilWeigth) - totalWeightSum

  //   setRemainingCoilWidth(updatedRemainingCoilWidth)
  //   setRemainingCoilWeight(updatedRemainingCoilWeight)
  // }}

  const [totalWeight, setTotalWeight] = useState('')
  const [totalWidth, setTotalWidth] = useState('')
  const [remainingWeight, setRemainingWeight] = useState('')
  const [remainingWidth, setRemainingWidth] = useState('')
  const [totalTrimm, setTotalTrimm] = useState('')
  const [totalScrap, setTotalScrap] = useState('')

  useEffect(() => {
    const fetchTotalData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/calculateTotal/${MotherCoilId}`)
        const data = response.data

        // Update state with fetched data
        setTotalWeight(data.totalWeight)
        setTotalWidth(data.totalWidth)
        setTotalTrimm(data.totalTrimm)
        setTotalScrap(data.totalScrap)
      } catch (error) {
        console.error('Error fetching total data:', error)
      }
    }

    // Fetch data when the component mounts
    fetchTotalData()
  }, [MotherCoilId]) // Add MotherCoilId to dependency array

  const handleAddEntry = () => {
    if (!SlitWidth || !NoOfSlit) {
      // Display a message if any required field is missing
      setSaveSuccessMessage('Please Enter all Fields')
      setTimeout(() => {
        setSaveSuccessMessage('')
      }, 2000)
      return
    }

    // If the cut is "Full Cut", set remaining value to 0 and add the remaining coil weight to the scrap
    if (Slitcut === 'full-cut') {
      setRemainingWeight(0)

      // Calculate the remaining coil weight
      const remainingCoilWeight =
        parseFloat(actualCoilWeigth) - totalWeight - totalTrimm - totalScrap

      // Add the remaining coil weight to the scrap using the updated Scrap value
      setScrap((prevScrap) => parseFloat(prevScrap) + remainingCoilWeight)
    } else {
      // If the cut is not "Full Cut," calculate the remaining values
      const remainingWidthValue = actualCoilWidth - totalWidth
      const remainingWeightValue = actualCoilWeigth - totalWeight - totalTrimm - totalScrap

      setRemainingWidth(remainingWidthValue)
      setRemainingWeight(remainingWeightValue)
    }

    // Find the maximum SlitSrNo for the current MotherCoilId
    const maxSlitSrNo = entriesArray.reduce((max, entry) => {
      if (entry.MotherCoilId === MotherCoilId && entry.SlitSrNo > max) {
        return entry.SlitSrNo
      }
      return max
    }, 0)

    // If there are no previous entries for the same MotherCoilId, set newSlitSrNo to 1, otherwise increment the maxSlitSrNo
    const newSlitSrNo = maxSlitSrNo > 0 ? maxSlitSrNo + 1 : 1

    console.log('Slitting Sr No:', newSlitSrNo) // Log the Slitting Sr No to the console
    // Combine MotherCoilId and SlitSrNo
    const combinedId = `${MotherCoilId}/${newSlitSrNo}`

    const newEntry = {
      SlitSrNo: newSlitSrNo,
      CombinedId: combinedId, // Combined MotherCoilId and SlitSrNo
      Slitcut: Slitcut,
      MotherCoilId,
      SlitWidth,
      NoOfSlit,
      OdSize,
      WTMM,
      SlitWeigth,
      TotalWeigth,
      Trimm,
      Scrap,
    }

    setEntriesArray((prevEntries) => [...prevEntries, newEntry])

    // Clear the form fields
    setSlitWidth('')
    setSlitcut(Slitcut)
    setcombinedId('')
    setNoOfSlit('')
    setOdSize('')
    setWTMM('')
    setSlitWeigth('')
    setTotalWeigth('')
    setScrap('')
    setTrimm('')
  }

  const calculateTotalWeight = (currentIndex) => {
    return entriesArray
      .filter((entry, index) => index < currentIndex)
      .reduce((accumulator, entry) => accumulator + parseFloat(entry.TotalWeigth) || 0, 0)
  }

  useEffect(() => {
    // Calculate remainingwidth and remainingweight when totalWidth or totalWeight changes
    const remainingWidthValue = actualCoilWidth - totalWidth
    const remainingWeightValue = actualCoilWeigth - totalWeight - totalTrimm - totalScrap
    // calculateRemainingValues()
    setRemainingWidth(remainingWidthValue)
    setRemainingWeight(remainingWeightValue)
  }, [totalWidth, totalWeight, actualCoilWidth, actualCoilWeigth, totalTrimm, totalScrap])

  console.log(remainingWeight, remainingWidth)

  return (
    <div>
      <div className="row">
        <div className="col-3">
          <h4 style={{ marginBottom: '1rem', color: '#002244' }}>Slitting Master</h4>
        </div>
        <div className="col-3">
          <NavLink to="/slittingdata">
            <button
              type="submit"
              className="form-control"
              // className="btn"
              style={{
                backgroundColor: '#002244',
                color: 'white',
                marginLeft: '35rem',
                // paddingLeft: '3rem',
                // paddingRight: '3rem',
              }}
            >
              Slitting Data
            </button>
          </NavLink>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 mb-3">
          <label className="form-label">Sr No</label>
          <select
            id="srNoSelect"
            className="form-control"
            value={selectedSrNo}
            onChange={handleSelectChange}
            style={{ fontWeight: 'bold' }}
          >
            <option value="">Select SrNo</option>
            {srNos.map((srNo) => (
              <option key={srNo} value={srNo}>
                {srNo}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Cuts</label>
          <select
            className="form-control"
            required
            // onChange={handleDropdownChange}
            value={Slitcut}
            onChange={(e) => setSlitcut(e.target.value)}
            style={{ backgroundColor: '#0022', color: 'black' }}
          >
            {/* <option>Select SrNo</option> */}
            <option value="half-cut">Half Cut</option>
            <option value="full-cut">Full Cut</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col-md-2">
          <label>Mother Coil Id</label>
          <input
            type="string"
            className="form-control"
            value={MotherCoilId}
            // onChange={(e) => setMotherCoilId(e.target.value)}
            required
          />
        </div>

        <div className="col-md-2">
          <label>Thickness</label>
          <input
            type="string"
            className="form-control"
            value={thickness}
            // onChange={(e) => setMotherCoilId(e.target.value)}
            required
          />
        </div>

        <div className="col-md-2">
          <label>ActualCoilWidth</label>
          <input
            type="string"
            className="form-control"
            value={actualCoilWidth}
            // onChange={(e) => setMotherCoilId(e.target.value)}
            required
          />
        </div>

        <div className="col-md-2">
          <label>ActualCoilWeigth</label>
          <input
            type="string"
            className="form-control"
            value={actualCoilWeigth}
            // onChange={(e) => setMotherCoilId(e.target.value)}
            required
          />
        </div>

        {/* <div className="col-md-2">
          <label>RemainingCoilWidth</label>
          <input
            type="string"
            className="form-control"
            value={remainingWidth}
            // onChange={(e) => setMotherCoilId(e.target.value)}
            // required
          />
        </div> */}

        <div className="col-md-2">
          <label>RemainingCoilWeigth</label>
          <input
            type="string"
            className="form-control"
            // value={remainingWeight < 0 ? 0 : remainingWeight}
            value={
              remainingWeight < 0 || (remainingWeight > 0 && remainingWeight < 10)
                ? 0
                : remainingWeight
            }
            // value={remainingWeight}
            // onChange={(e) => setMotherCoilId(e.target.value)}
            required
          />
        </div>

        <div className="row mt-5">
          <h4>Add Slits Data</h4>
        </div>

        <div className="row">
          <div className="col-md-2">
            <label>Mother Coil Id</label>
            <input
              type="string"
              className="form-control"
              value={MotherCoilId}
              onChange={(e) => setMotherCoilId(e.target.value)}
              required
            />
          </div>

          <div className="col-md-2">
            <label>Slit Width</label>
            <input
              type="string"
              className="form-control"
              value={SlitWidth}
              onChange={(e) => setSlitWidth(e.target.value)}
              required
            />
          </div>

          <div className="col-md-2">
            <label>No of Slit</label>
            <input
              type="string"
              className="form-control"
              value={NoOfSlit}
              onChange={(e) => setNoOfSlit(e.target.value)}
              required
            />
          </div>

          <div className="col-md-2">
            <label>OD Size</label>
            <input
              type="string"
              step="any"
              className="form-control"
              value={OdSize}
              onChange={(e) => setOdSize(e.target.value)}
              required
            />
          </div>

          <div className="col-md-2">
            <label>WT / MM</label>
            <input
              type="string"
              step="any"
              className="form-control"
              value={WTMM}
              onChange={(e) => setWTMM(e.target.value)}
              required
            />
          </div>

          <div className="col-md-2">
            <label>Slit Weight</label>
            <input
              type="string"
              step="any"
              className="form-control"
              value={SlitWeigth}
              onChange={(e) => setSlitWeigth(e.target.value)}
              required
            />
          </div>

          <div className="col-md-2">
            <label>Total Weight</label>
            <input
              type="string"
              step="any"
              className="form-control"
              value={TotalWeigth}
              // onChange={(e) => setTotalWeigth(e.target.value)}
              required
            />
          </div>

          <div className="col-md-2">
            <label>Trimm</label>
            <input
              type="string"
              step="any"
              className="form-control"
              value={Trimm}
              onChange={(e) => setTrimm(e.target.value)}
              required
            />
          </div>

          <div className="col-md-2">
            <label>Scrap</label>
            <input
              type="string"
              step="any"
              className="form-control"
              value={Scrap}
              onChange={(e) => setScrap(e.target.value)}
              required
            />
          </div>

          <div className="col-md-2 mt-4">
            <button
              className="btn btn-primary"
              style={{ paddingLeft: '2rem', paddingRight: '2rem' }}
              onClick={handleAddEntry}
            >
              Add
            </button>
          </div>
        </div>

        {/* <div className="col-md-2 mt-2">
          <button className="btn btn-primary" onClick={handleAddEntry}>
            Add
          </button>
        </div> */}

        <div className="col-md-4 mt-4 ">
          <button
            className="btn btn-success"
            style={{ paddingLeft: '2rem', paddingRight: '2rem' }}
            onClick={handleSaveEntries}
          >
            Save Slits
          </button>
        </div>

        <div className="row mt-3">
          <div className="col-md-12">
            <h3>Slittings :</h3>
            <table className="table">
              <thead className="table-dark">
                <tr>
                  <th>Mother Coil Id</th>
                  <td>Slit Sr No</td>
                  <th>Slit Width</th>
                  <th>No of Slit</th>
                  <th>OD Size</th>
                  <th>WT / MM</th>
                  <th>Slit Weight</th>
                  <th>Total Weight</th>
                  <th>Slit cut</th>
                  <th>Scrap</th>
                  <th>remaining weight</th>
                </tr>
              </thead>
              <tbody>
                {entriesArray.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.MotherCoilId}</td>
                    <td>{entry.CombinedId}</td>
                    <td>{entry.SlitWidth}</td>
                    <td>{entry.NoOfSlit}</td>
                    <td>{entry.OdSize}</td>
                    <td>{entry.WTMM}</td>
                    <td>{entry.SlitWeigth}</td>
                    <td>{entry.TotalWeigth}</td>
                    <td>{entry.Slitcut}</td>
                    <td>{entry.Scrap}</td>
                    {/* <td>
                      {parseFloat(actualCoilWeigth) - entry.TotalWeigth - totalTrimm - totalScrap}
                    </td> */}
                    <td>
                      {parseFloat(actualCoilWeigth) -
                        calculateTotalWeight(index + 1) -
                        totalTrimm -
                        totalScrap}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-12">
          <h3>{saveSuccessMessage}</h3>
          {/* ... (rest of your component) */}
        </div>
      </div>
      {remainingWeight < 0 && (
        <div className="alert alert-danger" role="alert">
          You have no RemainingWeight.
        </div>
      )}

      {remainingWeight > 0 && remainingWeight < 10 && (
        <div className="alert alert-danger" role="alert">
          You have no RemainingWeight.
        </div>
      )}
    </div>
  )
}

export default SlittingMaster
