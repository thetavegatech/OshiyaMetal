import React, { useState, useEffect } from 'react'
import * as XLSX from 'xlsx'
import { NavLink } from 'react-router-dom'

const SlittingData = () => {
  const [data, setData] = useState([])
  // const [slittingData, setslittingData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [slittingData, setSlittingData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/getEntries')
        const result = await response.json()

        // Assuming each entry is nested within an "entries" property
        const entries = result.map((item) => item.entries).flat()
        setData(entries)
        setSlittingData(entries)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const handleExportToExcel = () => {
    const dataToExport = slittingData || []
    // const dataToExport = motherCoil
    // const excelData = filteredData.map((coil) => ({
    const exportData = dataToExport.map((item) => ({
      MotherCoilId: item.MotherCoilId,
      GR: item.GR,
      GRNO: item.GRNO,
      SlitWidth: item.SlitWidth,
      NoOfSlit: item.NoOfSlit,
      OdSize: item.OdSize,
      WTMM: item.WTMM,
      SlitWeigth: item.SlitWeigth,
      TotalWeigth: item.TotalWeigth,
      Trimm: item.TotalWeigth,
      remainingWeight: item.remainingWeight,
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
    <div className="table-responsive">
      <div className="row">
        <div className="col">
          <h4 style={{ marginBottom: '1rem', color: '#002244' }}>Slitting Data Report</h4>
        </div>
        <div className="col">
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
      </div>
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th style={{ backgroundColor: '#002244', color: 'white' }}>MotherCoil No</th>
            {/* <th style={{ backgroundColor: '#002244', color: 'white' }}>Slitting Sr No</th> */}
            <th style={{ backgroundColor: '#002244', color: 'white' }}>combinedId</th>
            <th style={{ backgroundColor: '#002244', color: 'white' }}>SlitWidth</th>
            <th style={{ backgroundColor: '#002244', color: 'white' }}>NoOfSlit </th>
            {/* <th style={{ backgroundColor: '#002244', color: 'white' }}>No of Slit</th> */}
            <th style={{ backgroundColor: '#002244', color: 'white' }}>Od Size</th>
            <th style={{ backgroundColor: '#002244', color: 'white' }}>WT/MM</th>
            <th style={{ backgroundColor: '#002244', color: 'white' }}>Slit Weight</th>
            <th style={{ backgroundColor: '#002244', color: 'white' }}>Total Weight</th>
            <th style={{ backgroundColor: '#002244', color: 'white' }}>Trimm</th>
            <th style={{ backgroundColor: '#002244', color: 'white' }}>Scrap</th>
            <th style={{ backgroundColor: '#002244', color: 'white' }}>SlitCut</th>
            {/* <th style={{ backgroundColor: '#002244', color: 'white' }}>remaining weight</th> */}

            {/* <th>Scrap</th>
            <th>Yields</th> */}
            {/* <th>Date</th> */}
          </tr>
        </thead>
        <tbody>
          {slittingData.map((item) => (
            <tr key={item._id}>
              <td>{item.MotherCoilId}</td>
              <td>{item.combinedId}</td>
              <td>{item.SlitWidth}</td>
              <td>{item.NoOfSlit}</td>
              <td>{item.OdSize}</td>
              <td>{item.WTMM}</td>
              <td>{item.SlitWeigth}</td>
              <td>{item.TotalWeigth}</td>
              <td>{item.Trimm}</td>
              <td>{item.Scrap}</td>
              <td>{item.Slitcut}</td>
              {/* <td>{item.remainingWeightValue}</td> */}
              {/* <td>
                <NavLink to={`/editdailyplan/${item._id}`}>
                  <span>Edit</span>
                </NavLink>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SlittingData
