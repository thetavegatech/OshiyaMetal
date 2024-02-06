import React, { useState, useEffect } from 'react'
import * as XLSX from 'xlsx'

const DailyProdReportData = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [motherCoil, setMotherCoil] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://oshiyameatlbackend.onrender.com/api/getdailyproreportdata',
        ) // Replace with your actual API endpoint
        const result = await response.json()
        setData(result)
        setLoading(false)
        setFilteredData(result)
        setMotherCoil(result)
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
      PQ2: item.PQ2,
      PQ2Wt: item.PQ2Wt,
      Open: item.Open,
      OpenWt: item.OpenWt,
      Joint: item.Joint,
      JointWt: item.JointWt,
      CQ: item.CQ,
      CQWt: item.CQWt,
      OdTrim: item.OdTrim,
      TestEnd: item.TestEnd,
      CoilTrim: item.CoilTrim,
      ProdFTD: item.ProdFTD,
      Yeilds: item.Yeilds,
      Target: item.Target,
      Scrap: item.Scrap,
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

  return (
    <div>
      {/* <h4>Daily Production Report Data </h4> */}
      <div className="row">
        <div className="col">
          <h4 style={{ marginBottom: '1rem', color: '#002244' }}>Daily Production Report Data </h4>
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
                  marginBottom: 'rem',
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
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>Date</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>Size</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>Od</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>Thick</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>Length</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>Gr</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>Weigth</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>Speed</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>ProdHr</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>TimeAvailable</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>TimeRequired</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>SlitNos</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>PlanMt</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>PrimeNos</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>PrimeWt</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>PQ2</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>PQ2Wt</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>Open</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>OpenWt</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>Joint</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>JointWt</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>CQ</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>CQWt</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>OdTrim</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>TestEnd</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>CoilTrim</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>ProdFTD</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>Yeilds%</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>Target</th>
                <th style={{ backgroundColor: '#002244', color: 'white' }}>Scrap</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item._id.$oid}>
                  <td>{new Date(item.Date).toLocaleDateString()}</td>
                  <td>{item.Size}</td>
                  <td>{item.Od}</td>
                  <td>{item.Thick}</td>
                  <td>{item.Length}</td>
                  <td>{item.Gr}</td>
                  <td>{item.Weigth}</td>
                  <td>{item.Speed}</td>
                  <td>{item.ProdHr}</td>
                  <td>{item.TimeAvailable}</td>
                  <td>{item.TimeRequired}</td>
                  <td>{item.SlitNos}</td>
                  <td>{item.PlanMt}</td>
                  <td>{item.PrimeNos}</td>
                  <td>{item.PrimeWt}</td>
                  <td>{item.PQ2}</td>
                  <td>{item.PQ2Wt}</td>
                  <td>{item.Open}</td>
                  <td>{item.OpenWt}</td>
                  <td>{item.Joint}</td>
                  <td>{item.JointWt}</td>
                  <td>{item.CQ}</td>
                  {/* <td>{item.CQWt.toFixed(2)}</td> */}
                  <td>{item.CQWt}</td>
                  <td>{item.OdTrim}</td>
                  <td>{item.TestEnd}</td>
                  <td>{item.CoilTrim}</td>
                  <td>{item.ProdFTD}</td>
                  <td>{item.Yeilds}%</td>
                  <td>{item.Target}</td>
                  <td>{item.Scrap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default DailyProdReportData
