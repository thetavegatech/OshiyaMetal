import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
// import { CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react'

const DailyProdPlan = () => {
  const [Date, setDate] = useState('')
  const [Size, setSize] = useState('')
  const [odSize, setOdSize] = useState('')
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
  // const [cq, setCQ] = useState('')
  // const [cqWt, setCQWt] = useState('')
  // const [odTrim, setOdTrim] = useState('')
  // const [testEnd, setTestEnd] = useState('')
  // const [coilTrim, setCoilTrim] = useState('')
  // const [prodFTD, setProdFTD] = useState('')
  // const [yeilds, setYeilds] = useState('')
  // const [target, setTarget] = useState('')
  // const [Scrap, setScrap] = useState('')
  // const [srNos, setSrNos] = useState([])
  // const [selectedSrNo, setSelectedSrNo] = useState('')

  const [odData, setod] = useState([
    { Size: 41.3, Thick: 1.2, odSize: 41.3, Speed: 50 },
    { Size: 41.3, Thick: 1.63, odSize: 43.3, Speed: 60 },
    { Size: 41.3, Thick: 2, odSize: 42.3, Speed: 50 },
    { Size: 41.3, Thick: 2.5, odSize: 41.3, Speed: 40 },
    { Size: 41.3, Thick: 3, odSize: 41.3, Speed: 35 },
  ])
  const [selectedSlitWidth, setSelectedSlitWidth] = useState('')

  const handleSlitWidthChange = (value) => {
    const { odSize, Speed } = updateOdSize(value, Thick)
    setSelectedSlitWidth(value)
    setOdSize(odSize)
    setSpeed(Speed)
  }

  useEffect(() => {
    if (selectedSlitWidth && Thick) {
      const { odSize, Speed } = updateOdSize(selectedSlitWidth, Thick)
      setOdSize(odSize)
      setSpeed(Speed)
    }
  }, [selectedSlitWidth, Thick])

  const updateOdSize = (size, thick) => {
    const matchedUser = odData.find(
      (user) => user.Size === parseFloat(size) && user.Thick === parseFloat(thick),
    )

    if (matchedUser) {
      const odSize = matchedUser.odSize ? matchedUser.odSize.toString() : ''
      const Speed = matchedUser.Speed ? matchedUser.Speed.toString() : '' // Use 'Speed' instead of 'speed'
      return { odSize, Speed }
    } else {
      return { odSize: '', Speed: '' } // Reset OdSize and speed if no match is found
    }
  }

  console.log(odSize)
  console.log(Speed)

  useEffect(() => {
    if (selectedSlitWidth && Thick && Speed) {
      updateOdSize(selectedSlitWidth, Thick)
    }
  }, [selectedSlitWidth, Thick])

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

    // Calculate timeAvailable
    // const TIME_AVAILABLE = Math.max(8 - REQUIRED_TIME)
    // setTimeAvailable(TIME_AVAILABLE.toFixed(2))

    // Calculate initial timeAvailable
    const INITIAL_TIME_AVAILABLE = Math.max(8 - REQUIRED_TIME, 0)
    setTimeAvailable(INITIAL_TIME_AVAILABLE.toFixed(2))

    // Calculate timeAvailable considering role change
    // const ROLE_CHANGE_TIME = parseFloat(roleChange) || 0
    // const UPDATED_TIME_AVAILABLE = Math.max(INITIAL_TIME_AVAILABLE - ROLE_CHANGE_TIME, 0)
    // setTimeAvailable(UPDATED_TIME_AVAILABLE.toFixed(2))

    // Calculate timeAvailable
    // const TIME_AVAILABLE = parseFloat(timeAvailable) || 0
    const ROLE_CHANGE_TIME = parseFloat(roleChange) || 0
    const UPDATED_TIME_AVAILABLE = INITIAL_TIME_AVAILABLE - REQUIRED_TIME - ROLE_CHANGE_TIME
    setrolechangetime(UPDATED_TIME_AVAILABLE.toFixed(2))

    // const PQ2 = parseFloat(pq2)
    // const PQ2WT = WEIGTH * PQ2
    // setPQ2Wt(PQ2WT)

    // const OPEN = parseFloat(Open)
    // setOpenWt(OPENWT)

    // const JOINT = parseFloat(joint)
    // const JOINTWT = WEIGTH * JOINT
    // setJointWt(JOINTWT)

    // const CQ = parseFloat(cq)
    // const CQWT = WEIGTH * CQ
    // setCQWt(CQWT)

    // const ODTRIM = parseFloat(odTrim)
    // const TESTEND = parseFloat(testEnd)
    // const COILTRIM = parseFloat(coilTrim)

    // const PROFTD = PRIMEWT + OPENWT + JOINTWT + CQWT + ODTRIM + TESTEND + COILTRIM

    // setProdFTD(PROFTD.toFixed(2))
  }, [
    odSize,
    Thick,
    Weigth,
    Length,
    Speed,
    TimeAvailable,
    rolechangetime,
    roleChange,
    TimeRequired,
    // PrimeNos,
    // pq2,
    // open,
    // joint,
    // cq,
    // odTrim,
    // prodFTD,
    PlanMt,
    ProdHr,
  ])

  console.log(Weigth)
  const handleSubmit = async (e) => {
    e.preventDefault() // Prevents the default form submission behavior

    try {
      // Create an object with the data to be sent to the server
      const formData = {
        Size: selectedSlitWidth,
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
        // PrimeNos: PrimeNos,
        // PrimeWt: PrimeWt,
        // PQ2: pq2,
        // PQ2Wt: pq2Wt,
        // Open: open,
        // OpenWt: openWt,
        // Joint: joint,
        // JointWt: jointWt,
        // CQ: cq,
        // CQWt: cqWt,
        // OdTrim: odTrim,
        // TestEnd: testEnd,
        // CoilTrim: coilTrim,
        // ProdFTD: prodFTD,
        // Yeilds: yeilds,
        // Target: target,
        Date: Date,
        roleChange: roleChange,
        rolechangetime: rolechangetime,
        // Sracp: Scrap,
      }

      // Make API call to save data using Axios
      const response = await axios.post('http://localhost:5001/api/saveproplan', formData)

      if (response.status === 200) {
        console.log('Data saved successfully:', response.data)
        // Clear all fields
        setSize(selectedSlitWidth)
        setOdSize('')
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
        // setPrimeNos('')
        // setPrimeWt('')
        // setPQ2('')
        // setPQ2Wt('')
        // setOpen('')
        // setOpenWt('')
        // setJoint('')
        // setJointWt('')
        // setCQ('')
        // setCQWt('')
        // setOdTrim('')
        // setTestEnd('')
        // setCoilTrim('')
        // setProdFTD('')
        // setYeilds('')
        // setTarget('')
        setDate('')
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

  const vars = {
    '--cui-dropdown-bg': 'blue',
  }

  const [selectedPlant, setSelectedPlant] = useState('')

  // const handlePlantChange = (event) => {
  //   setSelectedPlant(event.target.value)
  //   console.log(selectedPlant)
  // }

  return (
    <div>
      <div className="row">
        <div className="col-3">
          <h4 style={{ marginBottom: '1rem', color: '#002244' }}>Daily Production Plan</h4>
        </div>
        <div className="col-3">
          <select
            className="form-control"
            style={{
              backgroundColor: '#002244',
              color: 'white',
              marginLeft: '0%',
              marginLeft: '16rem',
            }}
            // value={selectedPlant}
            // onChange={handlePlantChange}
          >
            <option value="">Select Plant</option>
            <option value="TM-01">TM-01</option>
            <option value="TM-02">TM-02</option>
            <option value="TM-03">TM-03</option>
          </select>
        </div>
        {/* <div className="row">
          <div className="col-md-4"> */}
        <div className="col-3">
          <NavLink to="/dailyprodplandata">
            <button
              type="submit"
              className="form-control"
              // className="btn"
              style={{
                backgroundColor: '#002244',
                color: 'white',
                marginLeft: '16rem',
                // paddingLeft: '3rem',
                // paddingRight: '3rem',
              }}
            >
              Plan Data
            </button>
          </NavLink>
        </div>
        {/* </div> */}
      </div>
      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: '2rem',
          border: '1px solid #ccc',
          padding: '20px',
          borderRadius: '10px',
          margin: '20px',
        }}
      >
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
              <label className="form-label">Thickness</label>
              <input
                type="number"
                className="form-control"
                name="Thick"
                id="Thick"
                required
                value={Thick}
                onChange={(e) => setThick(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">Size</label>
              <input
                type="text"
                className="form-control"
                name="Size"
                id="Size"
                // placeholder="Size"
                value={selectedSlitWidth}
                onChange={(e) => handleSlitWidthChange(e.target.value)}
              />
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
                // placeholder="Od"
                value={odSize}
                onChange={(e) => setOdSize(e.target.value)}
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
              <label className="form-label">Length</label>
              <input
                type="number"
                className="form-control"
                name="Length"
                id="Length"
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
              <label className="form-label">Time Available</label>
              <input
                type="number"
                className="form-control"
                name="TimeAvailable"
                id="TimeAvailable"
                required
                value={TimeAvailable}
                onChange={(e) => setTimeAvailable(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">Time Required</label>
              <input
                type="number"
                className="form-control"
                name="TimeRequired"
                id="TimeRequired"
                // placeholder="TimeRequired"
                value={TimeRequired}
                onChange={(e) => setTimeRequired(e.target.value)}
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
              // border: '1px solid #ccc',
              // padding: '20px',/
              // borderRadius: '10px',
              // margin: '20px',
            }}
          >
            <div className="col-md-4">
              <div className="mb-3">
                <label className="form-label">Role Chnage</label>
                <select
                  className="form-control"
                  name="roleChange"
                  id="roleChange"
                  value={roleChange}
                  onChange={(e) => setRoleChange(e.target.value)}
                >
                  <option value="" disabled selected>
                    Select Role Change
                  </option>
                  <option value="1.5">Part Role</option>
                  <option value="3">Full Role</option>
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
                  required
                  value={rolechangetime}
                  onChange={(e) => setrolechangetime(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="mb-3">
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
        </div>
      </form>
    </div>
  )
}

export default DailyProdPlan
