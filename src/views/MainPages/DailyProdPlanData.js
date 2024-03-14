import React, { useState, useEffect } from 'react'
import * as XLSX from 'xlsx'
import { NavLink } from 'react-router-dom'

const DailyProdPlanData = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [motherCoil, setMotherCoil] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [WorkHours, setWorkHours] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/getdailyproplandata') // Replace with your actual API endpoint
        const result = await response.json()
        setData(result)
        setMotherCoil(result)
        setFilteredData(result)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' }
    return new Intl.DateTimeFormat('en-GB', options).format(new Date(dateString))
  }

  const handleExportToExcel = () => {
    const dataToExport = motherCoil || []
    // const dataToExport = motherCoil
    // const excelData = filteredData.map((coil) => ({
    const exportData = dataToExport.map((item) => ({
      Date: formatDate(item.Date),
      Size: item.Size,
      Od: item.Od,
      Thick: item.Thick,
      Length: item.Length,
      Gr: item.Gr,
      Weigth: item.Weigth,
      Speed: item.Speed,
      ProdHr: item.ProdHr,
      TimeAvailable: item.TimeAvailable,
      TimeRequired: item.TimeRequired,
      SlitNos: item.SlitNos,
      PlanMt: item.PlanMt,
      PrimeNos: item.PrimeNos,
      PrimeWt: item.PrimeWt,
      status: item.status,
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
    const filteredByDate = data.filter((item) => {
      const formattedDate = formatDate(item.Date).toLowerCase()
      return formattedDate.includes(searchTermLowerCase)
    })

    setFilteredData(filteredByDate)
  }
  useEffect(() => {
    // Update filteredData based on the search term
    const filteredByDate = data.filter((item) => {
      const formattedDate = formatDate(item.Date).toLowerCase()
      return formattedDate.includes(searchTerm.toLowerCase())
    })

    setFilteredData(filteredByDate)
  }, [data, searchTerm])

  return (
    <div>
      <div className="row">
        <div className="col">
          <h4 style={{ marginBottom: '1rem', color: '#002244' }}>Daily Production Plan Data </h4>
        </div>
        <div className="col" style={{ marginRight: 'rem' }}>
          {/* <label>Filter Data</label> */}
          {data.length > 0 && (
            <div>
              <input
                type="text"
                placeholder="Search by Date"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginLeft: '5rem' }}
              />
              <button
                className="btn"
                style={{
                  backgroundColor: '#002244',
                  color: 'white',
                  marginBottom: 'rem',
                  marginLeft: 'rem',
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
      </div>
      {filteredData && Array.isArray(filteredData) ? (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>Plant</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>Plan No</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>Date</th>
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
                <th style={{ backgroundColor: '#002244', color: 'white' }}>TimeRequired</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>TimeAvailable</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>WorkHours</th>
                {/* <th style={{ backgroundColor: '#002244', color: 'white' }}>SlitNos</th> */}
                {/* <th style={{ backgroundColor: '#002244', color: 'white' }}>PlanMt</th> */}
                <th style={{ backgroundColor: '#002244', color: 'white' }}>Role Change Time</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((entry, index) => (
                <tr key={index._id}>
                  <td>{entry.Plant}</td>
                  {/* <td>{entry.productionPlanNo}</td> */}
                  <td>{new Date(entry.Date).toLocaleDateString()}</td>
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
                  {/* <td>{item.TimeAvailable}</td> */}
                  <td>{entry.TimeRequired}</td>
                  <td>{entry.TimeAvailable}</td>
                  <td>{entry.WorkHours}</td>
                  <td>
                    {entry.roleChange === '1.5' ? 'Part Role' : ''}
                    {entry.roleChange === '3' ? 'Full Role' : ''}{' '}
                  </td>
                  <td>{entry.status}</td>
                  {/* <td>
                    <NavLink
                      to={`/dailyprodreport/${filteredData._id}`}
                      style={{ color: '#000080' }}
                    >
                      <button>Edit</button>
                    </NavLink>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No data to display</p>
      )}
      {/* )} */}
    </div>
  )
}
export default DailyProdPlanData
