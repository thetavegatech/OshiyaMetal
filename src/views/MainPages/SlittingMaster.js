import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const SlittingMaster = () => {
  const [srNos, setSrNos] = useState([])
  const [selectedSrNo, setSelectedSrNo] = useState('')
  // const [data, setData] = useState();
  const [totalWeightSum, setTotalWeightSum] = useState('')
  const [totalWidhtSum, setTotalWidhtSum] = useState('')

  const [MotherCoilId, setMotherCoilId] = useState(null)
  const [Width, setWidth] = useState(null)
  const [Thickness, setThickness] = useState(null)
  const [Weigth, setWeigth] = useState(null)
  const [SlittingSrNo, setSlittingSrNo] = useState(null)

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
      setMotherCoilId(result.MotherCoilId || null)
      setWidth(result.Width || null)
      setThickness(result.Thickness || null)
      setWeigth(result.Weigth || null)

      // setData(result);
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    if (selectedSrNo) {
      setTotalWeightSum('')
      setTotalWidhtSum('')
      setWeigth('')
      setWidth('')
      fetchData(selectedSrNo)
    }
  }, [selectedSrNo])

  useEffect(() => {
    const fetchTotalWeightSum = async () => {
      try {
        console.log('API Request Start')
        const response = await axios.get(`http://localhost:5001/api/getTotalWeight/${MotherCoilId}`)
        console.log('API Request Success', response.data)
        setTotalWeightSum(response.data.totalWeightSum)
        setTotalWidhtSum(response.data.slitWeightSum)
      } catch (error) {
        console.log('API Request Error', error)
      }
    }

    console.log('useEffect Triggered')
    fetchTotalWeightSum()
  }, [MotherCoilId])

  console.log(totalWeightSum)

  // const [MotherCoilId, setMotherCoilId] = useState('');
  const [SlitWidth, setSlitWidth] = useState('')
  const [GR, setGR] = useState('')
  const [GRNO, setGRNO] = useState('')
  const [NoOfSlit, setNoOfSlit] = useState('')
  const [OdSize, setOdSize] = useState('')
  const [WTMM, setWTMM] = useState('')
  const [SlitWeigth, setSlitWeigth] = useState('')
  const [TotalWeigth, setTotalWeigth] = useState('')
  const [Trimm, setTrimm] = useState('')
  const [Scrap, setScrap] = useState('')
  const [Yeilds, setYeilds] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    const coilWeigth = parseFloat(NoOfSlit) || 0
    const slitWeigth = parseFloat(SlitWeigth) || 0
    const totalWeigth = coilWeigth * slitWeigth
    setTotalWeigth(totalWeigth)
  }, [NoOfSlit, SlitWeigth])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (parseFloat(remainWeigth) <= parseFloat(TotalWeigth)) {
      // Display an error message for 2 seconds
      setSuccessMessage('You have Not Enough Weight to make Sliting!')
      setTimeout(() => {
        setSuccessMessage('')
      }, 3000)
      return
    }
    try {
      const response = await axios.post('http://localhost:5001/api/slittingmaster', {
        MotherCoilId,
        SlittingSrNo,
        GR,
        GRNO,
        SlitWidth,
        NoOfSlit,
        OdSize,
        WTMM,
        SlitWeigth,
        TotalWeigth,
        Trimm,
        Scrap,
        Yeilds,
      })
      console.log(response.data)

      setSuccessMessage('Data saved successfully!')
      setTimeout(() => {
        setSuccessMessage('')
        setTotalWeigth('')
        setSelectedSrNo('')
        setMotherCoilId(null)
        setWidth(null)
        setThickness(null)
        setWeigth(null)
        e.target.reset()
      }, 1000)
      // Handle success, clear form, show success message, etc.
    } catch (error) {
      console.error('Error saving data:', error)
      // Handle error, show error message, etc.
    }
  }

  // const remainWeigth = (Weigth !== null && totalWeightSum !== null ) ? (Weigth - totalWeightSum).toFixed(2) : ''
  // const remainWidth = (Width !== null && totalWidhtSum!== null) ? (Width - totalWidhtSum).toFixed(2) : ''

  const [remainWeigth, setRemainWeight] = useState(
    Weigth !== null && totalWeightSum !== null ? (Weigth - totalWeightSum).toFixed(2) : '',
  )
  const [remainWidth, setRemainWidth] = useState(
    Width !== null && totalWidhtSum !== null ? (Width - totalWidhtSum).toFixed(2) : '',
  )

  useEffect(() => {
    setRemainWeight(
      Weigth !== null && totalWeightSum !== null ? (Weigth - totalWeightSum).toFixed(2) : '',
    )
    setRemainWidth(
      Width !== null && totalWidhtSum !== null ? (Width - totalWidhtSum).toFixed(2) : '',
    )
  }, [Weigth, totalWeightSum, Width, totalWidhtSum])

  const [selectedValue, setSelectedValue] = useState('')

  // Function to handle dropdown selection
  const handleDropdownChange = (event) => {
    const newValue = event.target.value
    setSelectedValue(newValue)
    console.log('Selected Value:', newValue)
  }

  return (
    <div>
      <h4 style={{ marginBottom: '1rem', color: '#002244' }}>Slitting Master</h4>
      {/* {successMessage && <div className="alert alert-success">{successMessage}</div>} */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
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
            <label className="form-label">Sliting Sr No</label>
            <input
              type="number"
              step="any"
              className="form-control"
              name="SlittingSrNo"
              id="SlittingSrNo"
              placeholder="Sliting Sr No"
              value={SlittingSrNo}
              // required
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Cuts</label>
            <select
              className="form-control"
              onChange={handleDropdownChange}
              value={selectedValue}
              style={{ backgroundColor: '#002244', color: 'white' }}
            >
              <option>Select SrNo</option>
              <option value="half-cut">Half Cut</option>
              <option value="full-cut">Full Cut</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Mother Coil No</label>
            <input
              type="number"
              step="any"
              className="form-control"
              name="MotherCoilId"
              id="MotherCoilId"
              placeholder="Mother Coil No"
              value={MotherCoilId}
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">GR</label>
            <input
              type="text"
              step="any"
              className="form-control"
              name="GR"
              id="GR"
              placeholder="GR"
              onChange={(e) => setGR(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">GRNO</label>
            <input
              type="text"
              step="any"
              className="form-control"
              name="GRNO"
              id="GRNO"
              placeholder="GRNO"
              onChange={(e) => setGRNO(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">CoilWidth</label>
            <input
              type="text"
              step="any"
              className="form-control"
              name="CoilWidth"
              id="CoilWidth"
              placeholder="CoilWidth"
              value={Width}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">CoilWeigth</label>
            <input
              type="text"
              step="any"
              className="form-control"
              name="CoilWeigth"
              id="CoilWeigth"
              placeholder="CoilWeigth"
              value={Weigth}
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Thickness</label>
            <input
              type="text"
              step="any"
              className="form-control"
              name="Thickness"
              id="Thickness"
              placeholder="Thickness"
              value={Thickness}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Actual CoilWidth</label>
            <input
              type="text"
              step="any"
              className="form-control"
              name="ActualCoilWidth"
              id="ActualCoilWidth"
              placeholder="Actual CoilWidth"
              // value={remainWidth}
              // value={Thickness}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Actual CoilWeigth</label>
            <input
              type="text"
              step="any"
              className="form-control"
              name="ActualCoilWeigth"
              id="ActualCoilWeigth"
              placeholder="Actual CoilWeigth"
              // value={remainWidth}
              // value={Thickness}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Remaining CoilWidth</label>
            <input
              type="text"
              step="any"
              className="form-control"
              name="RemainingCoilWidth"
              id="RemainingCoilWidth"
              placeholder="Remaining CoilWidth"
              value={remainWidth}
              // value={Thickness}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Remaining CoilWeigth</label>
            <input
              type="text"
              // step="0.01"
              className="form-control"
              name="RemainingCoilWeigth"
              id="RemainingCoilWeigth"
              placeholder="Remaining CoilWeigth"
              value={remainWeigth}
              //  value={remain}
            />
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-4 mb-3">
            <label className="form-label">SlitWidth</label>
            <input
              type="text"
              step="any"
              className="form-control"
              name="SlitWidth"
              id="SlitWidth"
              placeholder="SlitWidth"
              onChange={(e) => setSlitWidth(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">NoOfSlit</label>
            <input
              type="text"
              step="any"
              className="form-control"
              name="NoOfSlit"
              id="NoOfSlit"
              placeholder="NoOfSlit"
              onChange={(e) => setNoOfSlit(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">OdSize</label>
            <input
              type="text"
              step="any"
              className="form-control"
              name="OdSize"
              id="OdSize"
              placeholder="OdSize"
              onChange={(e) => setOdSize(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">WT / MM</label>
            <input
              type="text"
              step="any"
              className="form-control"
              name="WTMM"
              id="WTMM"
              placeholder="WT MM"
              onChange={(e) => setWTMM(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">SlitWeigth</label>
            <input
              type="text"
              step="any"
              className="form-control"
              name="SlitWeigth"
              // /step="any"
              id="SlitWeigth"
              placeholder="SlitWeigth"
              onChange={(e) => setSlitWeigth(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">TotalWeigth</label>
            <input
              type="text"
              step="any"
              className="form-control"
              name="TotalWeigth"
              id="TotalWeigth"
              placeholder="TotalWeigth"
              // onChange={(e) => setTotalWeigth(e.target.value)}
              value={TotalWeigth}
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Trimm</label>
            <input
              type="text"
              step="any"
              className="form-control"
              name="Trimm"
              id="Trimm"
              placeholder="Trimm"
              onChange={(e) => setTrimm(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Scrap</label>
            <input
              type="text"
              step="any"
              className="form-control"
              name="Scrap"
              id="Scrap"
              placeholder="Scrap"
              onChange={(e) => setScrap(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Yeilds</label>
            <input
              type="text"
              step="any"
              className="form-control"
              name="Yeilds"
              id="Yeilds"
              placeholder="Yeilds"
              onChange={(e) => setYeilds(e.target.value)}
              required
            />
          </div>
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
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
    </div>
  )
}

export default SlittingMaster
