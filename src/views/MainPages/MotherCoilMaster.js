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
  const [slittingData, setSlittingData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/getallmothercoildata')
        setData(response.data)
        setMotherCoil(response.data)
        setSlittingData(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' }
    return new Intl.DateTimeFormat('en-GB', options).format(new Date(dateString))
  }

  const submitHandle = (e) => {
    e.preventDefault()
    const MotherCoilId = e.target.MotherCoilId.value
    const SrNo = e.target.SrNo.value
    const CompanyName = e.target.CompanyName.value
    const Width = e.target.Width.value
    const Thickness = e.target.Thickness.value
    const Weigth = e.target.Weigth.value
    const ActualCoilWidth = e.target.ActualCoilWidth.value
    const ActualCoilWeigth = e.target.ActualCoilWeigth.value
    const Grade = e.target.Grade.value
    const CoilType = e.target.CoilType.value
    const RemainingWeigth = 0
    const UsedWeigth = 0

    axios
      .post('http://localhost:5001/api/mothercoils', {
        MotherCoilId: MotherCoilId,
        SrNo: SrNo,
        CompanyName: CompanyName,
        Width: Width,
        Thickness: Thickness,
        Weigth: Weigth,
        RemainingWeigth: RemainingWeigth,
        UsedWeigth: UsedWeigth,
        ActualCoilWidth: ActualCoilWidth,
        ActualCoilWeigth: ActualCoilWeigth,
        Grade: Grade,
        CoilType: CoilType,
      })
      .then((response) => {
        console.log(response)
        setSuccessMessage('Data saved successfully!')

        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:5001/api/getallmothercoildata')
            setSlittingData(response.data)
          } catch (error) {
            console.error('Error fetching data:', error)
          }
        }

        fetchData()

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

  const handleFilterData = () => {
    const filteredByDate = data.filter((coil) => {
      const coilDate = new Date(coil.Date)
      return !searchQuery || coil.SrNo.toString().includes(searchQuery)
    })

    setFilteredData(filteredByDate)
  }

  useEffect(() => {
    setFilteredData(data.filter((coil) => coil.SrNo.toString().includes(searchQuery)))
  }, [searchQuery, data])

  const handleExportToExcel = () => {
    const dataToExport = motherCoil || []
    // const dataToExport = motherCoil
    // const excelData = filteredData.map((coil) => ({
    const exportData = dataToExport.map((coil) => ({
      MotherCoilId: coil.MotherCoilId,
      SrNo: coil.SrNo,
      CompanyName: coil.CompanyName,
      Width: coil.Width,
      Thickness: coil.Thickness,
      Weigth: coil.Weigth,
      Date: formatDate(coil.Date),
    }))

    if (exportData.length === 0) {
      console.error('No data to export.')
      return
    }

    // const excelFileName = 'MotherCoilData'

    const dataSet = [
      {
        columns: [
          { title: 'MotherCoilId', style: { font: { sz: '18', bold: true } } },
          { title: 'SrNo', style: { font: { sz: '18', bold: true } } },
          { title: 'CompanyName', style: { font: { sz: '18', bold: true } } },
          { title: 'Width', style: { font: { sz: '18', bold: true } } },
          { title: 'Thickness', style: { font: { sz: '18', bold: true } } },
          { title: 'Weigth', style: { font: { sz: '18', bold: true } } },
          { title: 'Date', style: { font: { sz: '18', bold: true } } },
        ],
      },
    ]

    const ws = XLSX.utils.json_to_sheet(exportData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'ReportData')
    XLSX.writeFile(wb, 'reportdata.xlsx')
  }

  const handleSearch = () => {
    const searchTermLowerCase = searchTerm.toLowerCase()
    const filteredData = data.filter((item) => {
      const motherCoilId = String(item.MotherCoilId).toLowerCase()
      return motherCoilId.includes(searchTermLowerCase)
    })

    setSlittingData(filteredData)
  }

  return (
    <div>
      <h4 style={{ marginBottom: '1rem', color: '#002244' }}>Mother Coil Master</h4>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <form onSubmit={submitHandle}>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Mother Coil No</label>
            <input
              type="number"
              className="form-control"
              name="MotherCoilId"
              id="MotherCoilId"
              placeholder="MotherCoilId"
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Sr. No</label>
            <input
              type="number"
              className="form-control"
              name="SrNo"
              id="SrNo"
              placeholder="Sr. No"
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Company Name</label>
            <input
              type="text"
              className="form-control"
              name="CompanyName"
              id="CompanyName"
              placeholder="Company Name"
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Width</label>
            <input
              type="text"
              className="form-control"
              name="Width"
              id="Width"
              placeholder="Width"
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Thickness</label>
            <select className="form-control" name="Thickness" id="Thickness" required>
              <option>Select Thickness</option>
              <option value="2.00">2.00</option>
              <option value="1.20">1.20</option>
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Weigth</label>
            <input
              type="number"
              className="form-control"
              name="Weigth"
              id="Weigth"
              placeholder="Weigth"
              required
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
            <label className="form-label">Grade</label>
            <input
              type="text"
              step="any"
              className="form-control"
              name="Grade"
              id="Grade"
              placeholder="Grade"
              // onChange={(e) => setGR(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Coil Type</label>
            <select
              className="form-control"
              name="CoilType"
              id="CoilType"
              // placeholder="Coil type"
              // onChange={(e) => setGRNO(e.target.value)}
            >
              <option value="" disabled selected>
                Select Coil Type
              </option>

              <option value="HR">HR</option>
              <option value="Option1">CR</option>
              <option value="Option2">GP</option>
              <option value="Option3">CRPO</option>
            </select>
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
      <div>
        <h4 style={{ marginTop: '2rem', color: '#002244' }}>Mother Coil Data</h4>
        <div className="col">
          <div className="row">
            {/* <div className="col-md-3 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by SrNo"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div> */}
            {/* <div className="col-md-3 mb-3">
              <label>Start Date</label>
              <input type="Date" className="form-control" />
            </div>
            <div className="col-md-3 mb-3">
              <label>End Date</label>
              <input type="Date" className="form-control" />
            </div> */}
            <div className="col" style={{ marginBottom: '1rem', marginLeft: '39rem' }}>
              {data.length > 0 && (
                <div>
                  <input
                    type="text"
                    placeholder="Search MotherCoilNo"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ marginLeft: '5rem' }}
                  />
                  <button
                    className="btn"
                    style={{
                      backgroundColor: '#002244',
                      color: 'white',
                    }}
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                  <button
                    className="btn"
                    style={{
                      backgroundColor: '#002244',
                      color: 'white',
                      // marginTop: '1.5rem',
                      marginLeft: '2rem',
                    }}
                    onClick={handleExportToExcel}
                  >
                    Export To Excel
                  </button>
                </div>
              )}
            </div>
            {/* <div className="col-md-4 mb-3">
              <button
                className="btn"
                style={{ backgroundColor: '#002244', color: 'white', marginTop: '1.5rem' }}
                onClick={handleFilterData}
              >
                Filter Data
              </button>
              {motherCoil.length > 0 && (
                <button
                  className="btn"
                  style={{
                    backgroundColor: '#002244',
                    color: 'white',
                    marginTop: '1.5rem',
                    marginLeft: '2rem',
                  }}
                  onClick={handleExportToExcel}
                >
                  Export To Excel
                </button>
              )}
            </div> */}
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>MotherCoilId</th>
                {/* <th style={{ backgroundColor: '#002244', color: 'white' }}>SrNo</th> */}
                <th style={{ backgroundColor: '#002244', color: 'white' }}>CompanyName</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>Width</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>Thickness</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>Weigth</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>ActualCoilWidth</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>ActualCoilWeigth</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {slittingData.map((coil) => (
                <tr key={coil._id}>
                  <td>{coil.MotherCoilId}</td>
                  {/* <td>{coil.SrNo}</td> */}
                  <td>{coil.CompanyName}</td>
                  <td>{coil.Width}</td>
                  <td>{coil.Thickness}</td>
                  <td>{coil.Weigth}</td>
                  <td>{coil.ActualCoilWidth}</td>
                  <td>{coil.ActualCoilWeigth}</td>
                  <td>{formatDate(coil.Date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default MotherCoilMaster
