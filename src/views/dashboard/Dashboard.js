// import React, { useState, useEffect } from 'react'
// // import { CCard, CCardBody, CCol, CCardHeader, CRow } from '@coreui/react'
// import {
//   CChartBar,
//   CChartDoughnut,
//   CChartLine,
//   CChartPie,
//   CChartPolarArea,
//   CChartRadar,
// } from '@coreui/react-chartjs'
// import { DocsCallout } from 'src/components'
// import {
//   CAvatar,
//   CButton,
//   CButtonGroup,
//   CCard,
//   CCardBody,
//   CCardFooter,
//   CCardHeader,
//   CCol,
//   CProgress,
//   CRow,
//   CTable,
//   CTableBody,
//   CTableDataCell,
//   CTableHead,
//   CTableHeaderCell,
//   CTableRow,
// } from '@coreui/react'
// // import { CChartLine } from '@coreui/react-chartjs'
// import { getStyle, hexToRgba } from '@coreui/utils'
// import CIcon from '@coreui/icons-react'
// import {
//   cibCcAmex,
//   cibCcApplePay,
//   cibCcMastercard,
//   cibCcPaypal,
//   cibCcStripe,
//   cibCcVisa,
//   cibGoogle,
//   cibFacebook,
//   cibLinkedin,
//   cifBr,
//   cifEs,
//   cifFr,
//   cifIn,
//   cifPl,
//   cifUs,
//   cibTwitter,
//   cilCloudDownload,
//   cilPeople,
//   cilUser,
//   cilUserFemale,
// } from '@coreui/icons'

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   LineChart,
//   Line,
// } from 'recharts'

// import avatar1 from 'src/assets/images/avatars/1.jpg'
// import avatar2 from 'src/assets/images/avatars/2.jpg'
// import avatar3 from 'src/assets/images/avatars/3.jpg'
// import avatar4 from 'src/assets/images/avatars/4.jpg'
// import avatar5 from 'src/assets/images/avatars/5.jpg'
// import avatar6 from 'src/assets/images/avatars/6.jpg'

// import WidgetsBrand from '../widgets/WidgetsBrand'
// import WidgetsDropdown from '../widgets/WidgetsDropdown'
// import BreakDown from './../production/ProductionBD'
// import axios from 'axios'
// import { useLocation } from 'react-router-dom'

// const Dashboard = () => {
//   const location = useLocation()
//   const { username, userRoll } = location.state || {}

//   const [breakdownType, setbreakdownType] = useState([])

//   const [formattedChartData, setFormattedChartData] = useState([])

//   const [lineChartData, setLineChartData] = useState([])
//   const [lineChartLabels, setLineChartLabels] = useState([])

//   const [assets, setAssets] = useState([])
//   const [totalTasks, setTotalTasks] = useState(0)

//   const [breakdowns, setBreakdowns] = useState([])
//   const [totalBreakdown, setTotalBreakdown] = useState(0)

//   const [todaysTaskCount, setTodaysTaskCount] = useState(0)
//   const today = new Date()
//   const formattedToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
//     2,
//     '0',
//   )}-${String(today.getDate()).padStart(2, '0')}`
//   const todaysScheduledAssets = assets.filter((asset) => asset.nextDate === formattedToday)
//   const todaysScheduledAssetsok = assets.filter(
//     (asset) => asset.nextDate === formattedToday && asset.status === 'Completed',
//   )
//   const todaysScheduledAssetsnok = assets.filter(
//     (asset) => asset.nextDate === formattedToday && asset.status === 'Pending',
//   )

//   const aggregateDataByLineName = (data) => {
//     return data.reduce((acc, curr) => {
//       if (!acc[curr.LineName]) {
//         acc[curr.LineName] = 1
//       } else {
//         acc[curr.LineName]++
//       }
//       return acc
//     }, {})
//   }

//   const convertToLineChartData = (aggregatedData) => {
//     return Object.entries(aggregatedData).map(([key, value]) => ({
//       lineName: key,
//       value: value,
//     }))
//   }

//   const convertToLineChartLabels = (aggregatedData) => {
//     return Object.keys(aggregatedData)
//   }

//   // const [user, setUser] = useState({
//   //   username: '',
//   //   userRoll: '',
//   // })

//   // useEffect(() => {
//   //   // Make an API request to fetch user information
//   //   axios
//   //     .get('http://192.168.29.137:5000/getAlluser') // Replace with your API endpoint
//   //     .then((response) => {
//   //       const userData = response.data
//   //       setUser({
//   //         username: userData.username,
//   //         userRoll: userData.userRoll,
//   //       })
//   //     })
//   //     .catch((error) => {
//   //       console.error('Error fetching user info:', error)
//   //     })
//   // }, [])

//   // const [loggedInUsername, setLoggedInUsername] = useState('')
//   // useEffect(() => {
//   //   axios
//   //     .get('http://localhost:5000/users/:username') // Replace with your server endpoint
//   //     .then((response) => {
//   //       setLoggedInUsername(response.data.username)
//   //     })
//   //     .catch((error) => {
//   //       console.error('Error fetching username:', error)
//   //     })
//   // }, [])
//   const fetchData = async (url, callback) => {
//     try {
//       const response = await axios.get(url)
//       callback(response.data)
//     } catch (error) {
//       console.error(`Error fetching data from ${url}: `, error)
//     }
//   }

//   const aggregateData = (data) => {
//     return data.reduce((acc, curr) => {
//       acc[curr.BreakdownType] = (acc[curr.BreakdownType] || 0) + 1
//       return acc
//     }, {})
//   }

//   const convertToChartData = (aggregatedData) => {
//     return Object.entries(aggregatedData).map(([key, value]) => ({
//       breakdownType: key,
//       value: value,
//     }))
//   }

//   const setBreakdownAndTotal = (data) => {
//     setBreakdowns(data)
//     setTotalBreakdown(data.length)
//   }

//   useEffect(() => {
//     fetchData('http://192.168.29.93:5000/getBreakdownData', (data) => {
//       const aggregatedByLineName = aggregateData(data)
//       const lineChartData = convertToChartData(aggregatedByLineName)
//       const lineChartLabels = convertToChartData(aggregatedByLineName)
//       setLineChartData(lineChartData)
//       setLineChartLabels(lineChartLabels)
//     })
//   }, [])

//   useEffect(() => {
//     fetchData('http://192.168.29.93:5000/getBreakdownData', (data) => {
//       const aggregated = aggregateData(data)
//       const chartData = convertToChartData(aggregated)
//       setFormattedChartData(chartData)
//     })
//   }, [])

//   useEffect(() => {
//     fetchData('http://192.168.29.93:5000/getBreakdownData', setBreakdownAndTotal)
//   }, [])

//   useEffect(() => {
//     fetchData('http://192.168.29.93:5000/getAllData', (data) => {
//       setAssets(data)
//       setTotalTasks(data.length)
//     })
//   }, [])

//   useEffect(() => {
//     fetchData(`http://192.168.29.93:5000/getAllData?nextDate=${formattedToday}`, (data) => {
//       setTodaysTaskCount(data.length)
//     })
//   }, [])

//   return (
//     <>
//       <div style={{ marginLeft: '70%' }}>
//         {/* <h5>Welcome to the Dashboard, {username}!</h5> */}
//         {/* <p>User Role: {userRoll}</p> */}
//       </div>
//       <WidgetsDropdown />
//       <CCard className="mb-4"></CCard>
//       {/* <div>
//         <p>Username: {user.username}</p>
//         <p>User Roll: {user.userRoll}</p>
//       </div> */}
//       <CRow>
//         {/* <CCol xs={12}>
//           <DocsCallout
//             name="Chart"
//             href="components/chart"
//             content="React wrapper component for Chart.js 3.0, the most popular charting library."
//           />
//         </CCol> */}

//         <CCol xs={12} lg={6}>
//           <CCard className="mb-4">
//             <CCardHeader>BreakDown Type Wise Chart</CCardHeader>
//             <CCardBody>
//               {/* <CChartBar data={formattedChartData} labels="months" /> */}
//               <BarChart
//                 width={window.innerWidth >= 992 ? 500 : 300}
//                 height={300}
//                 data={formattedChartData}
//                 margin={{
//                   // top: 5,
//                   // right: 30,
//                   left: 5,
//                 }}
//               >
//                 {/* <CartesianGrid strokeDasharray="3 3" /> */}
//                 <XAxis dataKey="breakdownType" />
//                 <YAxis />
//                 <Tooltip />
//                 {/* <Legend /> */}
//                 <Bar
//                   dataKey="value"
//                   fill="#8884d8"
//                   // name="My First dataset" // Add the label here
//                   backgroundColor="rgba(255,255,255,.2)" // Add the background color here
//                   borderColor="rgba(255,255,255,.55)" // Add the border color here
//                 />
//               </BarChart>
//             </CCardBody>
//           </CCard>
//         </CCol>
//         <CCol xs={12} lg={6}>
//           <CCard className="mb-4">
//             <CCardHeader>LineName Wise Chart</CCardHeader>
//             <CCardBody>
//               <LineChart
//                 width={window.innerWidth >= 992 ? 500 : 300}
//                 height={300}
//                 data={lineChartData}
//                 margin={{
//                   top: 5,
//                   // right: 30,
//                   // left: -10,
//                 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="lineName" />
//                 <YAxis data={lineChartData} />
//                 <Tooltip />
//                 <Legend />
//                 <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
//                 <Line type="monotone" dataKey="value" stroke="#82ca9d" />
//               </LineChart>
//             </CCardBody>
//           </CCard>
//         </CCol>

//         <CCol xs={12} lg={6}>
//           <CCard className="mb-4">
//             <CCardHeader>BreakDown Doughnut Chart</CCardHeader>
//             <CCardBody>
//               <CChartDoughnut
//                 data={{
//                   labels: formattedChartData.map((item) => item.breakdownType), // Assuming your API response has a 'label' field
//                   datasets: [
//                     {
//                       backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
//                       data: formattedChartData.map((item) => item.value), // Assuming your API response has a 'value' field
//                     },
//                   ],
//                 }}
//               />
//             </CCardBody>
//           </CCard>
//         </CCol>
//         <CCol xs={12} lg={6}>
//           <CCard className="mb-4 p">
//             <CCardHeader>Line wise Pie Chart</CCardHeader>
//             <CCardBody>
//               <CChartPie
//                 data={{
//                   labels: lineChartData.map((item) => item.lineName), // Assuming your API response has a 'LineName' field
//                   datasets: [
//                     {
//                       data: lineChartData.map((item) => item.value), // Assuming your API response has a 'value' field
//                       backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Specify the colors
//                       hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Specify the hover colors
//                     },
//                   ],
//                 }}
//               />
//             </CCardBody>
//           </CCard>
//         </CCol>
//       </CRow>
//     </>
//   )
// }

// export default Dashboard

import React from 'react'

const Dashboard = () => {
  return <h2>Dashboard</h2>
}

export default Dashboard
