import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function EditUser() {
  const { entryId } = useParams()
  const { _id } = useParams()
  console.log('entryId:', entryId)
  console.log('id:', _id)
  const navigate = useNavigate()
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
  // const [entriesArray, setEntriesArray] = useState([])
  const [saveSuccessMessage, setSaveSuccessMessage] = useState('')
  const [SlitSrNo, setSlitSrNo] = useState(1)
  const [combinedId, setcombinedId] = useState()
  const [Slitcut, setSlitcut] = useState('')

  const [entriesArray, setEntriesArray] = useState([])
  const [userData, setUserData] = useState({
    // SlitWidth: '',
    // Slitcut: '',
    MotherCoilId: '',
    // NoOfSlit: '',
    // OdSize: '',
    // WTMM: '',
    // SlitWeigth: '',
    // TotalWeigth: '',
    // Trimm: '',
    // Scrap: '',
  })
  const [address, setAddress] = useState('')

  const handleAddEntry = () => {
    if (!SlitWidth || !NoOfSlit) {
      // Display a message if any required field is missing
      setSaveSuccessMessage('Please Enter all Fields')
      setTimeout(() => {
        setSaveSuccessMessage('')
      }, 2000)
      return
    }

    // Find the maximum SlitSrNo for the current MotherCoilId
    const maxSlitSrNo = entriesArray.reduce((max, entry) => {
      if (entry.MotherCoilId === userData.MotherCoilId && entry.SlitSrNo > max) {
        return entry.SlitSrNo
      }
      return max
    }, 0)

    // If there are no previous entries for the same MotherCoilId, set newSlitSrNo to 1, otherwise increment the maxSlitSrNo
    const newSlitSrNo = maxSlitSrNo > 0 ? maxSlitSrNo + 1 : 1

    console.log('Slitting Sr No:', newSlitSrNo) // Log the Slitting Sr No to the console

    // Combine MotherCoilId and SlitSrNo
    const combinedId = `${userData.MotherCoilId}/${newSlitSrNo}`

    const newEntry = {
      SlitSrNo: newSlitSrNo,
      CombinedId: combinedId, // Combined MotherCoilId and SlitSrNo
      Slitcut: Slitcut,
      // MotherCoilId,
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

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/getEntryByEntryId/${entryId}`)
      console.log('entryId:', entryId)
      const {
        // SlitWidth,
        MotherCoilId,
        // NoOfSlit,
        // OdSize,
        // WTMM,
        // SlitWeigth,
        // TotalWeigth,
        // Trimm,
        // Scrap,
      } = response.data
      setUserData({
        // SlitWidth,
        MotherCoilId,
        // NoOfSlit,
        // OdSize,
        // WTMM,
        // SlitWeigth,
        // TotalWeigth,
        // Trimm,
        // Scrap,
      })
      console.log(
        // SlitWidth,
        MotherCoilId,
        // NoOfSlit,
        // OdSize,
        // WTMM,
        // SlitWeigth,
        // TotalWeigth,
        // Trimm,
        // Scrap,
      )
      setAddress(response.data.address)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const [remainingWeight, setRemainingWeight] = useState(0)
  const handleSaveEntries = async (e) => {
    e.preventDefault()

    if (remainingWeight < 0) {
      // Display a message and return from the function
      setSaveSuccessMessage('You have no RemainingWeight.')
      setTimeout(() => {
        setSaveSuccessMessage('')
      }, 1000)
      return
    }

    try {
      const { MotherCoilId } = userData

      const response = await axios.post('http://localhost:5001/api/saveEntries', {
        MotherCoilId,
      })

      console.log('Saved entries:', response.data)

      // Update state and reset form fields
      // setEntriesArray([])
      setSaveSuccessMessage('Entries saved successfully')
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
    }
  }

  console.log(entriesArray)

  useEffect(() => {
    const coilWeigth = parseFloat(NoOfSlit) || 0
    const slitWeigth = parseFloat(SlitWeigth) || 0
    const totalWeigth = coilWeigth * slitWeigth
    setTotalWeigth(totalWeigth)
  }, [NoOfSlit, SlitWeigth])

  const [totalWeight, setTotalWeight] = useState(0)
  const [totalWidth, setTotalWidth] = useState(0)
  // const [remainingWeight, setRemainingWeight] = useState(0)
  const [remainingWidth, setRemainingWidth] = useState(0)
  const [totalTrimm, setTotalTrimm] = useState(0)
  const [totalScrap, setTotalScrap] = useState(0)

  useEffect(() => {
    const fetchTotalData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/calculateTotal/${userData.MotherCoilId}`,
        )
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
  }, [userData.MotherCoilId]) // Add MotherCoilId to dependency array

  useEffect(() => {
    // Calculate remainingwidth and remainingweight when totalWidth or totalWeight changes
    const remainingWidthValue = actualCoilWidth - totalWidth
    const remainingWeightValue = actualCoilWeigth - totalWeight - totalTrimm - totalScrap

    setRemainingWidth(remainingWidthValue)
    setRemainingWeight(remainingWeightValue)
  }, [totalWidth, totalWeight, actualCoilWidth, actualCoilWeigth, totalTrimm, totalScrap])

  console.log(remainingWeight, remainingWidth)

  return (
    <div
      className="container-lg"
      style={{
        border: '2px solid #ccc',
        backgroundColor: '',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '90%',
      }}
    >
      <div className="tab-content1">
        <form onSubmit={handleSaveEntries} style={{ marginLeft: '12%' }}>
          <div className="row g-2">
            <div className="row">
              <div className="col-md-2">
                <label>Mother Coil Id</label>
                <input
                  type="string"
                  className="form-control"
                  name="MotherCoilId"
                  id="MotherCoilId"
                  // value={userData.MotherCoilId}
                  // onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Cuts</label>
                <select
                  className="form-control"
                  // onChange={handleDropdownChange}
                  value={userData.Slitcut}
                  // onChange={handleInputChange}
                  onChange={(e) => setSlitcut(e.target.value)}
                  style={{ backgroundColor: '#0022', color: 'black' }}
                >
                  <option>Select SrNo</option>
                  <option value="half-cut">Half Cut</option>
                  <option value="full-cut">Full Cut</option>
                </select>
              </div>
            </div>
            <div className="row">
              {/* <div className="col-md-2">
                <label>Mother Coil Id</label>
                <input
                  type="string"
                  className="form-control"
                  value={MotherCoilId}
                  onChange={(e) => setMotherCoilId(e.target.value)}
                  required
                />
              </div> */}

              <div className="col-md-2">
                <label>Slit Width</label>
                <input
                  type="string"
                  className="form-control"
                  value={SlitWidth}
                  // onChange={handleInputChange}
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
                  // onChange={handleInputChange}
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
                  // onChange={handleInputChange}
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
                  // onChange={handleInputChange}
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
                  // onChange={handleInputChange}
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
                  // onChange={handleInputChange}
                  onChange={(e) => setTotalWeigth(e.target.value)}
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
                  // onChange={handleInputChange}
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
                  // onChange={handleInputChange}
                  onChange={(e) => setScrap(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="col-md-8 " style={{ marginTop: '20px' }}>
              <button
                className="btn btn-primary"
                style={{ width: '30%', marginBottom: '10px' }}
                type="submit"
                onClick={handleSaveEntries}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
