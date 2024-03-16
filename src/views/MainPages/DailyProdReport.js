import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'

const DailyProdReport = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [date, setDate] = useState('')
  const [size, setSize] = useState('')
  const [od, setOd] = useState('')
  const [odSize, setodSize] = useState('')
  const [thick, setThick] = useState('')
  const [length, setLength] = useState('')
  const [gr, setGr] = useState('')
  const [Weigth, setWeigth] = useState('')
  const [speed, setSpeed] = useState('')
  const [prodHr, setProdHr] = useState('')
  const [timeAvailable, setTimeAvailable] = useState('')
  const [timeRequired, setTimeRequired] = useState('')
  const [slitNos, setSlitNos] = useState('')
  const [planMt, setPlanMt] = useState('')
  const [primeNos, setPrimeNos] = useState('')
  const [primeWt, setPrimeWt] = useState('')
  const [pq2, setPQ2] = useState('')
  const [pq2Wt, setPQ2Wt] = useState('')
  const [open, setOpen] = useState('')
  const [openWt, setOpenWt] = useState('')
  const [joint, setJoint] = useState('')
  const [jointWt, setJointWt] = useState('')
  const [cq, setCQ] = useState('')
  const [cqWt, setCQWt] = useState('')
  const [odTrim, setOdTrim] = useState('')
  const [testEnd, setTestEnd] = useState('')
  const [coilTrim, setCoilTrim] = useState('')
  const [prodFTD, setProdFTD] = useState('')
  const [yeilds, setYeilds] = useState('')
  const [target, setTarget] = useState('')
  const [Scrap, setScrap] = useState('')
  const [combinedIds, setCombinedIds] = useState([])
  // const [productionPlanNos, setProductionPlanNos] = useState([]);
  const [filteredProductionPlanNos, setFilteredProductionPlanNos] = useState([])

  // State for the selected combined ID
  // setOtherData
  const [selectedCombinedId, setSelectedCombinedId] = useState('')
  const [selectedProductionPlanNo, setSelectedProductionPlanNo] = useState('')
  const [productionPlanNos, setProductionPlanNos] = useState('')
  const [OtherData, setOtherData] = useState('')
  const [dailyProductionData, setDailyProductionData] = useState({
    // ... other fields
    Size: '',
    odSize: '',
    Thick: '',
    Length: '',
    Gr: '',
    Weigth: '',
    Speed: '',
    ProdHr: '',
    TimeAvailable: '',
    TimeRequired: '',
    SlitNos: '',
    PlanMt: '',
  })

  useEffect(() => {
    const fetchProductionPlanNos = async () => {
      try {
        const response = await axios.get(
          'https://oshiyameatlbackend.onrender.com/api/getPendingProductionPlanNos',
        )
        const allProductionPlanNos = response.data
        setProductionPlanNos(allProductionPlanNos)
        // Filter production plan numbers based on status 'pending'
        const pendingPlanNos = allProductionPlanNos.filter((plan) => plan.status === 'Pending')
        setFilteredProductionPlanNos(pendingPlanNos)
      } catch (error) {
        console.error('Error fetching production plan numbers:', error)
      }
    }

    fetchProductionPlanNos()
  }, [])

  useEffect(() => {
    // Fetch combined IDs when the component mounts
    const fetchCombinedIds = async () => {
      try {
        const response = await axios.get(
          'https://oshiyameatlbackend.onrender.com/api/getCombinedIds',
        )
        setCombinedIds(response.data) // Assuming the API returns an array of combined IDs
      } catch (error) {
        console.error('Error fetching combined IDs:', error)
      }
    }

    fetchCombinedIds()
  }, [])

  // useEffect(() => {
  //   // Fetch production plan numbers when the component mounts
  //   const fetchProductionPlanNos = async () => {
  //     try {
  //       const response = await axios.get('https://oshiyameatlbackend.onrender.com/api/getProductionPlanNos')
  //       setProductionPlanNo(response.data) // Assuming the API returns an array of production plan numbers
  //     } catch (error) {
  //       console.error('Error fetching production plan numbers:', error)
  //     }
  //   }

  //   fetchProductionPlanNos()
  // }, [])

  const [NoOfSlit, setNoOfSlit] = useState(0)
  const [remainingSlits, setRemainingSlits] = useState('')
  const [slitValue, setSlitValue] = useState('')
  // Assuming you have a state variable to store valid combined IDs
  const [validCombinedIds, setValidCombinedIds] = useState([])

  // Modify your handleCombinedIdChange function
  const handleCombinedIdChange = async (e) => {
    const SlitId = e.target.value
    setSelectedCombinedId(SlitId)

    try {
      // Make API call to fetch data based on the selected combined ID
      const response = await axios.get(
        `https://oshiyameatlbackend.onrender.com/api/getEntryByCombinedId/${SlitId}`,
      )

      // Check if the fetched data has NoOfSlit greater than 0
      if (response.data.NoOfSlit > 0) {
        // Update state with the fetched data
        setOtherData(response.data) // Adjust accordingly based on your data structure

        // Set actual number of slits
        setNoOfSlit(response.data.NoOfSlit)

        console.log('Actual Number of Slits:', response.data.NoOfSlit)

        // Add the combinedId to the list of valid combined IDs if not already present
        if (!validCombinedIds.includes(SlitId)) {
          setValidCombinedIds((prevIds) => [...prevIds, SlitId])
        }
      } else {
        // Handle the case where NoOfSlit is not greater than 0
        console.log('No data available for the selected combined ID.')

        // Show an alert for not having slits
        alert('No slits available for the selected combined ID.')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      // Handle error or show a user-friendly message
    }
  }

  const handleProductionPlanNoChange = async (e) => {
    const productionPlanNo = e.target.value
    setSelectedProductionPlanNo(productionPlanNo)

    try {
      // Make API call to fetch data based on the selected productionPlanNo
      const response = await axios.get(
        `https://oshiyameatlbackend.onrender.com/api/dailyproplan/${productionPlanNo}`,
      )
      const {
        Size,
        odSize,
        Thick,
        Length,
        Gr,
        Weigth,
        Speed,
        ProdHr,
        TimeAvailable,
        TimeRequired,
        SlitNos,
        PlanMt,
      } = response.data
      setDailyProductionData({
        Size,
        odSize,
        Thick,
        Length,
        Gr,
        Weigth,
        Speed,
        ProdHr,
        TimeAvailable,
        TimeRequired,
        SlitNos,
        PlanMt /*... other fields */,
      })
      // Update state with the fetched data
      const planData = response.data // Assuming the response contains the required data
      setDate(planData.date)
      setSize(planData.size)

      console.log('Production Plan Data:', planData)
    } catch (error) {
      console.error('Error fetching data:', error)
      // Handle error or show a user-friendly message
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target

    if (name === 'SlitNos') {
      // Ensure that value is always a number
      const slitValue = parseFloat(value) || 0

      // Calculate remaining number of slits
      // const remainingSlits = NoOfSlit - slitValue

      // console.log(remainingSlits)
      // setRemainingSlits(remainingSlits)
      // setSlitNos(slitValue)

      setSlitNos(slitValue)
    } else {
      // Update the state for the 'Size' field
      setSize(value)
      setodSize(value)
      setThick(value)
      setLength(value)
      setGr(value)
      setWeigth(value)
      setSpeed(value)
      setProdHr(value)
      setPlanMt(value)

      // Update the rest of the state using setDailyProductionData
      setDailyProductionData((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    }
  }

  // New useEffect to fetch data when selectedProductionPlanNo changes
  useEffect(() => {
    if (selectedProductionPlanNo) {
      handleProductionPlanNoChange({ target: { value: selectedProductionPlanNo } })
    }
  }, [selectedProductionPlanNo])

  useEffect(() => {
    // const PRIMENOS = parseFloat(primeNos)
    // const PRIMEWT = parseFloat(Weigth) * PRIMENOS
    // setPrimeWt(PRIMEWT.toFixed(2))
    const PRIMENOS = parseFloat(primeNos)
    const PRIMEWT = parseFloat(dailyProductionData.Weigth) * PRIMENOS
    setPrimeWt(PRIMEWT.toFixed(2))

    // const PQ2 = parseFloat(pq2)
    // const PQ2WT = WEIGTH * PQ2
    // setPQ2Wt(PQ2WT)

    const OPEN = parseFloat(open)
    const OPENWT = parseFloat(dailyProductionData.Weigth) * OPEN
    setOpenWt(OPENWT)

    const JOINT = parseFloat(joint)
    const JOINTWT = parseFloat(dailyProductionData.Weigth) * JOINT
    setJointWt(JOINTWT)

    const CQ = parseFloat(cq)
    const CQWT = parseFloat(dailyProductionData.Weigth) * CQ
    setCQWt(CQWT)

    const ODTRIM = parseFloat(odTrim)
    const TESTEND = parseFloat(testEnd)
    const COILTRIM = parseFloat(coilTrim)

    const PROFTD = PRIMEWT + OPENWT + JOINTWT + CQWT + ODTRIM + TESTEND + COILTRIM
    setProdFTD(PROFTD.toFixed(2))

    const YEILDS = (PRIMEWT / PROFTD) * 100
    setYeilds(YEILDS.toFixed(2))
  }, [od, thick, length, speed, primeNos, pq2, open, joint, cq, odTrim, prodFTD, yeilds])

  const handleSubmit = async (e) => {
    e.preventDefault() // Prevents the default form submission behavior

    try {
      // Create an object with the data to be sent to the server
      const formData = {
        selectedProductionPlanNo,
        selectedCombinedId,
        Size: dailyProductionData.Size,
        odSize: dailyProductionData.odSize,
        Thick: dailyProductionData.Thick,
        Length: dailyProductionData.Length,
        Gr: dailyProductionData.Gr,
        Weigth: dailyProductionData.Weigth,
        Speed: dailyProductionData.Speed,
        ProdHr: dailyProductionData.ProdHr,
        SlitNos: slitNos,
        ActualSlits: NoOfSlit,
        RemainingSlits: remainingSlits,
        PlanMt: dailyProductionData.PlanMt,
        PrimeNos: primeNos,
        PrimeWt: primeWt,
        PQ2: pq2,
        PQ2Wt: pq2Wt,
        Open: open,
        OpenWt: openWt,
        Joint: joint,
        JointWt: jointWt,
        CQ: cq,
        CQWt: cqWt,
        OdTrim: odTrim,
        TestEnd: testEnd,
        CoilTrim: coilTrim,
        ProdFTD: prodFTD,
        Yeilds: yeilds,
        Target: target,
        Date: date,
        Scrap: Scrap,
      }

      // Make API call to update the status and save data using Axios
      const response = await axios.post(
        'https://oshiyameatlbackend.onrender.com/api/saveproreport',
        formData,
      )

      if (response.status === 200) {
        console.log('Data saved successfully:', response.data)

        // Update the status to 'complete'
        await axios.put(
          `https://oshiyameatlbackend.onrender.com/updateProductionPlanStatus/${selectedProductionPlanNo}`,
          {
            status: 'Complete',
          },
        )

        const remainingSlits = NoOfSlit - slitNos
        console.log('Remaining Slits:', remainingSlits)
        console.log('Remaining slitNos:', slitNos)
        console.log('Remaining NoOfSlit:', NoOfSlit)
        // Use the state update function and provide a callback to ensure the correct value
        setNoOfSlit((prevNoOfSlit) => {
          console.log('Before update - NoOfSlit:', prevNoOfSlit)
          console.log('After update - NoOfSlit:', remainingSlits)
          return remainingSlits
        })

        await axios.put(
          `https://oshiyameatlbackend.onrender.com/api/updateNoOfSlits/${selectedCombinedId}`,
          {
            NoOfSlit: remainingSlits,
          },
        )

        // Clear all fields
        setSize(dailyProductionData.Size)
        setodSize(dailyProductionData.odSize)
        setThick(dailyProductionData.Thick)
        setLength(dailyProductionData.Length)
        setGr(dailyProductionData.Gr)
        setWeigth(dailyProductionData.Weigth)
        setSpeed(dailyProductionData.Speed)
        setProdHr(dailyProductionData.ProdHr)
        setSlitNos('')
        setNoOfSlit('')
        setRemainingSlits('')
        setPlanMt(dailyProductionData.PlanMt)
        setPrimeNos('')
        setPrimeWt('')
        setPQ2('')
        setPQ2Wt('')
        setOpen('')
        setOpenWt('')
        setJoint('')
        setJointWt('')
        setCQ('')
        setCQWt('')
        setOdTrim('')
        setTestEnd('')
        setCoilTrim('')
        setProdFTD('')
        setYeilds('')
        setTarget('')
        setDate('')
        setScrap('')

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

  return (
    <div>
      <div className="row">
        <div className="col-3">
          <h4 style={{ marginBottom: '1rem', color: '#002244' }}>Daily Production Report</h4>
        </div>
        <div className="col-3">
          <NavLink to="/dailyprodreportdata">
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
              Report Data
            </button>
          </NavLink>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        style={
          {
            // marginBottom: '2rem',
            // border: '1px solid #ccc',
            // padding: '20px',
            // borderRadius: '10px',
            // margin: '20px',
          }
        }
      >
        <div className="row">
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">Production Plan No</label>
              <select
                name="selectedProductionPlanNo"
                id="selectedProductionPlanNo"
                className="form-select"
                value={selectedProductionPlanNo}
                onChange={handleProductionPlanNoChange}
              >
                <option value="" disabled>
                  Select Production Plan No
                </option>
                {/* Check if productionPlanNos is an array before mapping */}
                {Array.isArray(productionPlanNos) &&
                  // Array.status === 'Pending' &&
                  productionPlanNos.map((productionPlanNo) => (
                    <option key={productionPlanNo} value={productionPlanNo}>
                      {productionPlanNo}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">MotherCoil No/ SlitNo</label>
              <select
                name="selectedCombinedId"
                id="selectedCombinedId"
                className="form-select"
                value={selectedCombinedId}
                onChange={handleCombinedIdChange}
              >
                <option value="" disabled>
                  Select Combined ID
                </option>
                {combinedIds.map((slitId) => (
                  <option key={slitId} value={slitId}>
                    {slitId}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">Size</label>
              <input
                type="text"
                required
                className="form-control col-sm-4"
                name="size"
                id="size"
                value={dailyProductionData.Size}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">Od</label>
              <input
                type="number"
                className="form-control"
                name="odSize"
                id="odSize"
                placeholder="Od"
                value={dailyProductionData.odSize}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">Thick</label>
              <input
                type="number"
                className="form-control"
                name="Thick"
                id="Thick"
                required
                value={dailyProductionData.Thick}
                onChange={handleInputChange}
              />
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
                placeholder="Length"
                value={dailyProductionData.Length}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">Gr</label>
              <input
                type="text"
                className="form-control"
                name="Gr"
                id="Gr"
                placeholder="Gr"
                value={dailyProductionData.Gr}
                onChange={handleInputChange}
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
                value={dailyProductionData.Weigth}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">Speed</label>
              <input
                type="number"
                className="form-control"
                name="Speed"
                id="Speed"
                placeholder="Speed"
                value={dailyProductionData.Speed}
                onChange={handleInputChange}
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
                placeholder="ProdHr"
                value={dailyProductionData.ProdHr}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">PlanMt</label>
              <input
                type="number"
                className="form-control"
                name="PlanMt"
                id="PlanMt"
                value={dailyProductionData.PlanMt}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="row"></div>
        <div className="row" style={{ marginTop: '5rem' }}>
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">SlitNos</label>
              <input
                type="number"
                className="form-control"
                name="SlitNos"
                id="SlitNos"
                placeholder="SlitNos"
                value={slitNos}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">PrimeNos</label>
              <input
                type="number"
                className="form-control"
                name="PrimeNos"
                id="PrimeNos"
                placeholder="PrimeNos"
                value={primeNos}
                onChange={(e) => setPrimeNos(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">PrimeWt</label>
              <input
                type="number"
                readOnly
                className="form-control"
                name="PrimeWt"
                id="PrimeWt"
                placeholder="PrimeWt"
                value={primeWt}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          {/* <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">PQ2</label>
              <input
                type="number"
                className="form-control"
                name="PQ2"
                id="PQ2"
                required
                value={pq2}
                onChange={(e) => setPQ2(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">PQ2Wt</label>
              <input
                type="number"
                className="form-control"
                name="PQ2Wt"
                id="PQ2Wt"
                placeholder="PQ2Wt"
                value={pq2Wt}
                onChange={(e) => setPQ2Wt(e.target.value)}
              />
            </div>
          </div> */}
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">Open</label>
              <input
                type="number"
                className="form-control"
                name="Open"
                id="Open"
                placeholder="Open"
                value={open}
                onChange={(e) => setOpen(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">OpenWt</label>
              <input
                type="number"
                readOnly
                className="form-control"
                name="OpenWt"
                id="OpenWt"
                value={openWt}
                onChange={(e) => setOpenWt(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">Joint</label>
              <input
                type="number"
                className="form-control"
                name="Joint"
                id="Joint"
                placeholder="Joint"
                value={joint}
                onChange={(e) => setJoint(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">JointWt</label>
              <input
                type="number"
                readOnly
                className="form-control"
                name="JointWt"
                id="JointWt"
                placeholder="JointWt"
                value={jointWt}
                onChange={(e) => setJointWt(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">CQ</label>
              <input
                type="number"
                className="form-control"
                name="CQ"
                id="CQ"
                value={cq}
                onChange={(e) => setCQ(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">CQWt</label>
              <input
                type="number"
                readOnly
                className="form-control"
                name="CQWt"
                id="CQWt"
                placeholder="CQWt"
                value={cqWt}
                onChange={(e) => setCQWt(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">OdTrim</label>
              <input
                type="number"
                className="form-control"
                name="OdTrim"
                id="OdTrim"
                placeholder="OdTrim"
                value={odTrim}
                onChange={(e) => setOdTrim(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">TestEnd</label>
              <input
                type="number"
                className="form-control"
                name="TestEnd"
                id="TestEnd"
                required
                value={testEnd}
                onChange={(e) => setTestEnd(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">CoilTrim</label>
              <input
                type="number"
                className="form-control"
                name="CoilTrim"
                id="CoilTrim"
                placeholder="CoilTrim"
                value={coilTrim}
                onChange={(e) => setCoilTrim(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">Yeilds %</label>
              <input
                type="text"
                // readOnly
                className="form-control"
                name="Yeilds"
                id="Yeilds"
                value={yeilds}
                onChange={(e) => setYeilds(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">ProdFTD</label>
              <input
                type="number"
                className="form-control"
                name="ProdFTD"
                id="ProdFTD"
                placeholder="ProdFTD"
                value={prodFTD}
                onChange={(e) => setProdFTD(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">Target</label>
              <input
                type="number"
                className="form-control"
                name="Target"
                id="Target"
                placeholder="Target"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">Scrap</label>
              <input
                type="number"
                className="form-control"
                name="Scrap"
                id="Scrap"
                required
                value={Scrap}
                onChange={(e) => setScrap(e.target.value)}
              />
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

export default DailyProdReport
