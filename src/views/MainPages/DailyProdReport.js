import React, { useState, useEffect } from 'react'
import axios from 'axios'

const DailyProdReport = () => {
  const [date, setDate] = useState('')
  const [size, setSize] = useState('')
  const [od, setOd] = useState('')
  const [thick, setThick] = useState('')
  const [length, setLength] = useState('')
  const [gr, setGr] = useState('')
  const [weigth, setWeigth] = useState('')
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

  useEffect(() => {
    const OD = parseFloat(od) || 0
    const THICK = parseFloat(thick) || 0
    const LENGTH = parseFloat(length)
    const WEIGTH = (OD - THICK) * THICK * LENGTH * 0.02465
    setWeigth(WEIGTH.toFixed(3))
    const SEPPD = parseFloat(speed)
    const PROHR = ((OD - THICK) * THICK * 0.02466 * SEPPD * 60) / 1000
    setProdHr(PROHR.toFixed(2))

    const PRIMENOS = parseFloat(primeNos)
    const PRIMEWT = WEIGTH * PRIMENOS
    setPrimeWt(PRIMEWT.toFixed(2))

    const PQ2 = parseFloat(pq2)
    const PQ2WT = WEIGTH * PQ2
    setPQ2Wt(PQ2WT)

    const OPEN = parseFloat(open)
    const OPENWT = WEIGTH * OPEN
    setOpenWt(OPENWT)

    const JOINT = parseFloat(joint)
    const JOINTWT = WEIGTH * JOINT
    setJointWt(JOINTWT)

    const CQ = parseFloat(cq)
    const CQWT = WEIGTH * CQ
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
        Size: size,
        Od: od,
        Thick: thick,
        Length: length,
        Gr: gr,
        Weigth: weigth,
        Speed: speed,
        ProdHr: prodHr,
        TimeAvailable: timeAvailable,
        TimeRequired: timeRequired,
        SlitNos: slitNos,
        PlanMt: planMt,
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

      // Make API call to save data using Axios
      const response = await axios.post(
        'https://oshiyameatlbackend.onrender.com/api/saveproreport',
        formData,
      )

      if (response.status === 200) {
        console.log('Data saved successfully:', response.data)
        // Clear all fields
        setSize('')
        setOd('')
        setThick('')
        setLength('')
        setGr('')
        setWeigth('')
        setSpeed('')
        setProdHr('')
        setTimeAvailable('')
        setTimeRequired('')
        setSlitNos('')
        setPlanMt('')
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
      <h4 style={{ marginBottom: '1rem', color: '#002244' }}>Daily Production Report</h4>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                name="date"
                id="Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
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
                placeholder="Size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">Od</label>
              <input
                type="number"
                className="form-control"
                name="Od"
                id="Od"
                placeholder="Od"
                value={od}
                onChange={(e) => setOd(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">Thick</label>
              <input
                type="number"
                className="form-control"
                name="Thick"
                id="Thick"
                required
                value={thick}
                onChange={(e) => setThick(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">Length</label>
              <input
                type="number"
                className="form-control"
                name="Length"
                id="Length"
                placeholder="Length"
                value={length}
                onChange={(e) => setLength(e.target.value)}
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
                value={gr}
                onChange={(e) => setGr(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">Weigth</label>
              <input
                type="number"
                className="form-control"
                name="Weigth"
                id="Weigth"
                required
                value={weigth}
                onChange={(e) => setWeigth(e.target.value)}
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
                placeholder="Speed"
                value={speed}
                onChange={(e) => setSpeed(e.target.value)}
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
                value={prodHr}
                onChange={(e) => setProdHr(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">TimeAvailable</label>
              <input
                type="number"
                className="form-control"
                name="TimeAvailable"
                id="TimeAvailable"
                required
                value={timeAvailable}
                onChange={(e) => setTimeAvailable(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">TimeRequired</label>
              <input
                type="number"
                className="form-control"
                name="TimeRequired"
                id="TimeRequired"
                placeholder="TimeRequired"
                value={timeRequired}
                onChange={(e) => setTimeRequired(e.target.value)}
              />
            </div>
          </div>
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
                onChange={(e) => setSlitNos(e.target.value)}
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
                value={planMt}
                onChange={(e) => setPlanMt(e.target.value)}
                required
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
                className="form-control"
                name="PrimeWt"
                id="PrimeWt"
                placeholder="PrimeWt"
                value={primeWt}
                onChange={(e) => setPrimeWt(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
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
          </div>
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
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">Yeilds %</label>
              <input
                type="text"
                className="form-control"
                name="Yeilds"
                id="Yeilds"
                value={yeilds}
                onChange={(e) => setYeilds(e.target.value)}
                required
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
