import React, { useState, useEffect } from 'react'
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react' // Replace 'your-react-bootstrap-library' with the actual library you're using
import axios from 'axios'

const Inventory = () => {
  const [activeKey, setActiveKey] = useState(1)

  const [allMotherCoilData, setAllMotherCoilData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://oshiyameatlbackend.onrender.com/api/getallmothercoildata',
        )
        setAllMotherCoilData(response.data)
        // setMotherCoil(response.data)
        // setSlittingData(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  // slitting api

  const [slittingData, setSlittingData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://oshiyameatlbackend.onrender.com/api/getEntriesy')
        const result = await response.json()
        // Assuming each entry is nested within an "entries" property
        const entries = result.map((item) => item.entries).flat()
        // setData(entries)
        setSlittingData(entries)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <CNav variant="pills" role="tablist" style={{ marginBottom: '1rem' }}>
        <CNavItem role="presentation">
          <CNavLink
            active={activeKey === 1}
            component="button"
            role="tab"
            aria-controls="home-tab-pane"
            aria-selected={activeKey === 1}
            onClick={() => setActiveKey(1)}
            style={{ marginLeft: '1rem' }}
          >
            MotherCoilData
          </CNavLink>
        </CNavItem>
        <CNavItem role="presentation">
          <CNavLink
            active={activeKey === 2}
            component="button"
            role="tab"
            aria-controls="profile-tab-pane"
            aria-selected={activeKey === 2}
            onClick={() => setActiveKey(2)}
            style={{ marginLeft: '1rem' }}
          >
            Slitting Data
          </CNavLink>
        </CNavItem>
        <CNavItem role="presentation">
          <CNavLink
            active={activeKey === 3}
            component="button"
            role="tab"
            aria-controls="contact-tab-pane"
            aria-selected={activeKey === 3}
            onClick={() => setActiveKey(3)}
            style={{ marginLeft: '1rem' }}
          >
            Finish Boards
          </CNavLink>
        </CNavItem>
        {/* <CNavItem role="presentation">
          <CNavLink
            active={activeKey === 4}
            component="button"
            role="tab"
            aria-controls="disabled-tab-pane"
            aria-selected={activeKey === 4}
            onClick={() => setActiveKey(4)}
            style={{ marginLeft: '1rem' }}
          >
            Dispatch
          </CNavLink>
        </CNavItem> */}
      </CNav>
      <CTabContent>
        <CTabPane role="tabpanel" aria-labelledby="home-tab-pane" visible={activeKey === 1}>
          {/* Content for Home tab */}
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
                  {/* <th style={{ backgroundColor: '#002244', color: 'white' }}>Date</th> */}
                  <th style={{ backgroundColor: '#002244', color: 'white' }}>Cuts</th>
                </tr>
              </thead>
              <tbody>
                {allMotherCoilData.map(
                  (coil) =>
                    // Check if coil.Cut is not equal to "full-cut"
                    coil.Cut !== 'full-cut' && (
                      <tr key={coil._id}>
                        <td>{coil.MotherCoilId}</td>
                        {/* <td>{coil.SrNo}</td> */}
                        <td>{coil.CompanyName}</td>
                        <td>{coil.Width}</td>
                        <td>{coil.Thickness}</td>
                        <td>{coil.Weigth}</td>
                        <td>{coil.ActualCoilWidth}</td>
                        <td>{coil.ActualCoilWeigth}</td>
                        {/* <td>{formatDate(coil.Date)}</td> */}
                        <td>{coil.Cut || 'No Cut'}</td>
                      </tr>
                    ),
                )}
              </tbody>
            </table>
          </div>
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="profile-tab-pane" visible={activeKey === 2}>
          <div>
            <h2>All Slitting Data</h2>
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th style={{ backgroundColor: '#002244', color: 'white' }}>MotherCoil No</th>
                  {/* <th style={{ backgroundColor: '#002244', color: 'white' }}>Slitting Sr No</th> */}
                  <th style={{ backgroundColor: '#002244', color: 'white' }}>Slit Id</th>
                  <th style={{ backgroundColor: '#002244', color: 'white' }}>SlitWidth</th>
                  <th style={{ backgroundColor: '#002244', color: 'white' }}>NoOfSlit </th>
                  {/* <th style={{ backgroundColor: '#002244', color: 'white' }}>No of Slit</th> */}
                  <th style={{ backgroundColor: '#002244', color: 'white' }}>Od Size</th>
                  <th style={{ backgroundColor: '#002244', color: 'white' }}>WT/MM</th>
                  <th style={{ backgroundColor: '#002244', color: 'white' }}>Slit Weight</th>
                  <th style={{ backgroundColor: '#002244', color: 'white' }}>Total Weight</th>
                  {/* <th style={{ backgroundColor: '#002244', color: 'white' }}>Trimm</th>
                  <th style={{ backgroundColor: '#002244', color: 'white' }}>Scrap</th>
                  <th style={{ backgroundColor: '#002244', color: 'white' }}>SlitCut</th> */}
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
                    <td>{item.SlitId}</td>
                    <td>{item.SlitWidth}</td>
                    <td>{item.NoOfSlit}</td>
                    <td>{item.OdSize}</td>
                    <td>{item.WTMM}</td>
                    <td>{item.SlitWeigth}</td>
                    <td>{item.TotalWeigth}</td>
                    {/* <td>{item.Trimm}</td>
                    <td>{item.Scrap}</td>
                    <td>{item.Slitcut}</td> */}
                    {/* <td>{item.remainingWeightValue}</td> */}
                    {/* <td>
                <NavLink to={/editdailyplan/${item._id}}>
                  <span>Edit</span>
                </NavLink>
              </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="contact-tab-pane" visible={activeKey === 3}>
          {/* Content for Contact tab */}
          Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out...
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="disabled-tab-pane" visible={activeKey === 4}>
          {/* Content for Disabled tab */}
          Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out...
        </CTabPane>
      </CTabContent>
    </>
  )
}

export default Inventory
