import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

const WeightMaster = () => {
  const [RST, setRST] = useState('')
  const [EnterDate, setEnterDate] = useState('')
  const [VehicalName, setVehicalName] = useState('')
  const [Material, setMaterial] = useState('')
  const [Contains, setContains] = useState('')
  const [GrossKGS, setGrossKGS] = useState('')
  const [TareKG, setTareKG] = useState('')
  const [NetKGS, setNetKGS] = useState('')
  const [Charges, setCharges] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    const grosskg = parseFloat(GrossKGS) || 0
    const tarekg = parseFloat(TareKG) || 0
    const netkg = grosskg - tarekg
    setNetKGS(netkg)
  }, [GrossKGS, TareKG])

  const submitHandle = (e) => {
    e.preventDefault()

    axios
      .post('https://oshiyameatlbackend.onrender.com/api/weightmaster', {
        RST,
        EnterDate,
        VehicalName,
        Material,
        Contains,
        GrossKGS,
        TareKG,
        NetKGS,
        Charges,
        Image,
      })
      .then((response) => {
        console.log(response)
        setSuccessMessage('Data saved successfully!')
        resetForm()
        const fetchData = async () => {
          try {
            const response = await fetch(
              'https://oshiyameatlbackend.onrender.com/api/getweightdata',
            )
            const result = await response.json()
            setData(result)
          } catch (error) {
            console.error('Error fetching data:', error)
          }
        }
        fetchData()
        setTimeout(() => {
          setSuccessMessage('')
        }, 1000)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Update NetKGS when GrossKGS or TareKG changes
  // useEffect(() => {
  //   if(GrossKGS && TareKG){
  //     setNetKGS(GrossKGS - TareKG)
  //   }
  // },[])

  const [data, setData] = useState([])

  useEffect(() => {
    // Fetch data from your API endpoint
    const fetchData = async () => {
      try {
        const response = await fetch('https://oshiyameatlbackend.onrender.com/api/getweightdata')
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const [Image, setImage] = useState('')
  function convertToBse64(e) {
    console.log(e)
    let reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      console.log(reader.result) // base64encoded string
      setImage(reader.result)
    }
    reader.onerror = (err) => {
      console.log(err)
    }
  }

  const resetForm = () => {
    setRST('')
    setEnterDate('')
    setVehicalName('')
    setMaterial('')
    setContains('')
    setGrossKGS('')
    setTareKG('')
    setNetKGS('')
    setCharges('')
    setImage('')
  }

  return (
    <div>
      <h4 style={{ marginBottom: '1rem', color: '#002244' }}>Weigth Master</h4>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <form onSubmit={submitHandle}>
        <div className="row">
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">RST</label>
              <input
                type="number"
                className="form-control"
                name="RST"
                id="RST"
                placeholder="RST"
                value={RST}
                onChange={(e) => setRST(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">Date</label>
              <input
                type="Date"
                className="form-control"
                name="EnterDate"
                id="EnterDate"
                placeholder="Date"
                value={EnterDate}
                onChange={(e) => setEnterDate(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">VehicalNo</label>
              <input
                type="text"
                className="form-control"
                name="VehicalNo"
                id="VehicalNo"
                placeholder="VehicalNo"
                value={VehicalName}
                onChange={(e) => setVehicalName(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">Material</label>
              <input
                type="text"
                className="form-control"
                name="Material"
                id="Material"
                placeholder="Material"
                value={Material}
                onChange={(e) => setMaterial(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">Contains</label>
              <input
                type="text"
                className="form-control"
                name="Contains"
                id="Contains"
                placeholder="Contains"
                value={Contains}
                onChange={(e) => setContains(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">GrossKGS</label>
              <input
                type="number"
                className="form-control"
                name="GrossKGS"
                id="GrossKGS"
                placeholder="GrossKGS"
                value={GrossKGS}
                onChange={(e) => setGrossKGS(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">Tare KG</label>
              <input
                type="number"
                className="form-control"
                name="TareKG"
                id="TareKG"
                placeholder="TareKG"
                value={TareKG}
                onChange={(e) => setTareKG(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">NetKGS</label>
              <input
                type="number"
                className="form-control"
                name="NetKGS"
                id="NetKGS"
                placeholder="NetKGS"
                value={NetKGS}
                required
              />
            </div>
          </div>
          {/* <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">Invoice</label>
              <input
                type="number"
                className="form-control"
                name="Charges"
                id="Charges"
                placeholder="Charges"
                value={Charges}
                onChange={(e) => setCharges(e.target.value)}
                required
              />
            </div>
          </div> */}
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label" htmlFor="attachment">
                Attachment:
              </label>
              <input
                type="file"
                id="Image"
                name="Image"
                className="form-control col-sm-6"
                onChange={convertToBse64}
              ></input>
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
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th style={{ backgroundColor: '#002244', color: 'white' }}>RST</th>
              <th style={{ backgroundColor: '#002244', color: 'white' }}>EnterDate</th>
              <th style={{ backgroundColor: '#002244', color: 'white' }}>VehicleNo</th>
              <th style={{ backgroundColor: '#002244', color: 'white' }}>Material</th>
              <th style={{ backgroundColor: '#002244', color: 'white' }}>Contains</th>
              <th style={{ backgroundColor: '#002244', color: 'white' }}>GrossKGS</th>
              <th style={{ backgroundColor: '#002244', color: 'white' }}>TareKGS</th>
              <th style={{ backgroundColor: '#002244', color: 'white' }}>NetKGS</th>
              <th style={{ backgroundColor: '#002244', color: 'white' }}>Image</th>
              {/* <th>Date</th> */}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item.RST}</td>
                <td>{new Date(item.EnterDate).toLocaleDateString()}</td>
                <td>{item.VehicalName}</td>
                <td>{item.Material}</td>
                <td>{item.Contains}</td>
                <td>{item.GrossKGS}</td>
                <td>{item.TareKG ? item.TareKG : '-'}</td>
                <td>{item.NetKGS}</td>
                <td style={{ textAlign: 'center' }}>
                  <NavLink to={`/WeightMasterImage/${item._id}`}>
                    <img src={item.Image} height={50} width={50} />
                  </NavLink>
                </td>
                {/* <td>{new Date(item.Date).toLocaleString()}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default WeightMaster
