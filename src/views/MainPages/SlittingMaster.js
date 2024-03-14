// import React from 'react'
// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import { NavLink } from 'react-router-dom'

// const SlittingMaster = () => {
//   const [srNos, setSrNos] = useState([])
//   const [selectedSrNo, setSelectedSrNo] = useState('')
//   const [MotherCoilId, setMotherCoilId] = useState('')
//   const [thickness, setThickness] = useState('')
//   const [width, setWidth] = useState('')
//   const [weight, setWeigth] = useState('')
//   const [grade, setGrade] = useState('')
//   const [coiltype, setCoiltype] = useState('')

//   const [actualCoilWidth, setActualCoilWidth] = useState('')
//   const [actualCoilWeigth, setActualCoilWeigth] = useState('')
//   const [SlitWidth, setSlitWidth] = useState('')
//   const [NoOfSlit, setNoOfSlit] = useState('')
//   const [OdSize, setOdSize] = useState('')
//   const [WTMM, setWTMM] = useState('')
//   const [SlitWeigth, setSlitWeigth] = useState('')
//   const [TotalWeigth, setTotalWeigth] = useState('')
//   const [Trimm, setTrimm] = useState('')
//   const [Scrap, setScrap] = useState('')
//   const [entriesArray, setEntriesArray] = useState([])
//   const [saveSuccessMessage, setSaveSuccessMessage] = useState('')
//   const [SlitSrNo, setSlitSrNo] = useState(1)
//   const [combinedId, setcombinedId] = useState()
//   const [Slitcut, setSlitcut] = useState('full-cut')
//   const [totalTrimm, setTotalTrimm] = useState('')
//   const [totalScrap, setTotalScrap] = useState('')

//   useEffect(() => {
//     const fetchData1 = async () => {
//       try {
//         const response = await axios.get('http://localhost:5001/api/allSrNos')
//         setSrNos(response.data)
//       } catch (error) {
//         console.error('Error fetching SrNos:', error)
//       }
//     }

//     fetchData1()
//   }, [])

//   const handleSelectChange = (event) => {
//     const selectedValue = event.target.value
//     setSelectedSrNo(selectedValue)
//   }
//   const fetchData = async (selected) => {
//     try {
//       const response = await fetch(`http://localhost:5001/api/data/srno/${selected}`)
//       const result = await response.json()
//       setMotherCoilId(result.MotherCoilId || '')
//       setThickness(result.Thickness || '')
//       setWidth(result.Width || '')
//       setWeigth(result.Weigth || '')
//       setActualCoilWeigth(result.ActualCoilWeigth)
//       setActualCoilWidth(result.ActualCoilWidth)
//       // Set other state variables as needed
//     } catch (error) {
//       console.error('Error fetching data:', error)
//     }
//   }

//   useEffect(() => {
//     if (selectedSrNo) {
//       fetchData(selectedSrNo)
//     }
//   }, [selectedSrNo])

//   const [slitsData, setSlitsData] = useState([])
//   const [slitEntriesId, setSlitEntriesId] = useState(1)

//   const handleAddSlitsData = () => {
//     if (!MotherCoilId || !SlitWidth || !NoOfSlit) {
//       // Show a message to enter the required data
//       console.log('Please enter all required data.')
//       return
//     }
//     const newEntry = {
//       SlitId: `${MotherCoilId}/${slitEntriesId}`,
//       MotherCoilId,
//       SlitWidth,
//       NoOfSlit,
//       // Trimm,
//       // Scrap,
//     }

//     // Increment the ID for the next entry
//     setSlitEntriesId(slitEntriesId + 1)

//     // Add the new entry to the slitsData array
//     setSlitsData([...slitsData, newEntry])

//     setTotalSlitWidthNoOfSlit((prevSum) => prevSum + parseFloat(SlitWidth) * parseFloat(NoOfSlit))

//     // setTotalTrimm((prevTotalTrimm) => prevTotalTrimm + parseFloat(Trimm))
//     // setTotalScrap((prevTotalScrap) => prevTotalScrap + parseFloat(Scrap))

//     // Clear the input fields after adding the entry
//     // setMotherCoilId('')
//     setSlitWidth('')
//     setNoOfSlit('')
//     // setTrimm(0)
//     // setScrap(0)
//   }

//   const [dataItem, setDataItem] = useState(null)
//   const handletrimmscrap = () => {
//     if (!Trimm || !Scrap) {
//       // Show a message to enter both Trimm and Scrap data
//       console.log('Please enter both Trimm and Scrap data.')
//       return
//     }
//     const newItem = { Trimm, Scrap }

//     // Update the single data item
//     setDataItem(newItem)

//     // Clear input fields after adding data
//     setTrimm('')
//     setScrap('')
//   }

//   console.log(slitsData)
//   const [totalSlitWidthNoOfSlit, setTotalSlitWidthNoOfSlit] = useState(0)
//   //   const [Wtmm , setWtmm] = useState(0)

//   const [showUpdatedTable, setShowUpdatedTable] = useState(false)
//   const [totaloftotalweight, setTotalofTotalweight] = useState(0)

//   // let totaloftotalweight = 0
//   const handleCalculateSum = async () => {
//     // Calculate WTMM for each object
//     const result = calculateSum(slitsData)
//     const calwtmm = (actualCoilWeigth - dataItem.Trimm - dataItem.Scrap) / result

//     let totaltotal = 0

//     // Update the slitsData array with the calculated WTMM for each object
//     const updatedSlitsData = slitsData.map((entry) => ({
//       ...entry,
//       WTMM: calwtmm.toFixed(2), // Limit to 2 decimal places
//     }))

//     // Calculate and add SlitWeigth, TotalWeigth, and OdSize for each object
//     const finalSlitsData = updatedSlitsData.map((entry) => {
//       const slitWidth = parseFloat(entry.SlitWidth)
//       const noOfSlit = parseFloat(entry.NoOfSlit)

//       if (!isNaN(slitWidth) && !isNaN(noOfSlit)) {
//         const slitWeigth = (calwtmm * slitWidth).toFixed(2)
//         const totalWeigth = (slitWeigth * noOfSlit).toFixed(2)
//         const odSize = (slitWidth / 3.142 + thickness / 2).toFixed(2)

//         totaltotal += parseFloat(totalWeigth)
//         setTotalofTotalweight(totaltotal)
//         return {
//           ...entry,
//           SlitWeigth: slitWeigth,
//           TotalWeigth: totalWeigth,
//           OdSize: odSize,
//         }
//       } else {
//         return entry // If any of the required fields is not a valid number, return the original entry
//       }
//     })

//     // Set the updated slitsData array to the state
//     setShowUpdatedTable(true)
//     setSlitsData(finalSlitsData)

//     // Send the data to the backend API
//     // try {
//     //   await axios.post('http://localhost:5001/api/updatebymothercoil', {
//     //     motherCoilId: selectedSrNo, // Use selectedSrNo or MotherCoilId based on your requirement
//     //     cut: Slitcut,
//     //   })

//     //   console.log('Data updated successfully.')
//     //   // Add any additional logic or UI updates after successfully updating the data
//     // } catch (error) {
//     //   console.error('Error updating data:', error)
//     //   // Handle errors or display error messages to the user
//     // }
//   }

//   console.log(totaloftotalweight)

//   const calculateSum = (data) => {
//     return data.reduce((sum, entry) => {
//       const slitWidth = parseFloat(entry.SlitWidth)
//       const noOfSlit = parseFloat(entry.NoOfSlit)

//       if (!isNaN(slitWidth) && !isNaN(noOfSlit)) {
//         sum += slitWidth * noOfSlit
//       }

//       return sum
//     }, 0)
//   }

//   const handleSaveData = async () => {
//     try {
//       // Make sure to adjust the API endpoint and payload based on your backend requirements
//       const response = await axios.post('http://localhost:5001/api/saveEntries', {
//         MotherCoilId: selectedSrNo, // Use selectedSrNo or MotherCoilId based on your requirement
//         entries: slitsData,
//       })

//       console.log('Data saved successfully:', response.data)
//       setSaveSuccessMessage('Data saved successfully')

//       const res = await axios.post('http://localhost:5001/api/updatebymothercoil', {
//         motherCoilId: selectedSrNo, // Use selectedSrNo or MotherCoilId based on your requirement
//         cut: Slitcut,
//         Trimm: dataItem.Trimm,
//         Scrap: dataItem.Scrap,
//         UsedWeigth: totaloftotalweight,
//       })

//       console.log('Data saved successfully:', res.data)
//       setSaveSuccessMessage('Data saved successfully')

//       // Handle the response or update UI based on your requirements

//       setMotherCoilId('')
//       setSlitWidth('')
//       setNoOfSlit('')
//       setTrimm(0)
//       setScrap(0)

//       // Clear the slitsData array
//       setSlitsData([])

//       // Clear fetch data
//       setThickness('')
//       setWidth('')
//       setWeigth('')
//       setActualCoilWidth('')
//       setActualCoilWeigth('')
//       setTotalofTotalweight('')
//       setDataItem(null)

//       // Clear selectedSrNo
//       setSelectedSrNo('')
//     } catch (error) {
//       console.error('Error saving data:', error)
//       // Handle errors or display error messages to the user
//       setSaveSuccessMessage('Error saving data')
//     }
//   }

//   return (
//     <div>
//       <div className="row">
//         <div className="col-3">
//           <h4 style={{ marginBottom: '1rem', color: '#002244' }}>Slitting Master</h4>
//         </div>
//         <div className="col-3">
//           <NavLink to="/slittingdata" style={{ textDecoration: 'none' }}>
//             <button
//               // type="submit"
//               className="form-control"
//               // className="btn"
//               style={{
//                 backgroundColor: '#002244',
//                 color: 'white',
//                 marginLeft: '35rem',
//                 // paddingLeft: '3rem',
//                 // paddingRight: '3rem',
//               }}
//             >
//               Slitting Data
//             </button>
//           </NavLink>
//         </div>
//       </div>
//       <div className="row">
//         <div className="col-md-4 mb-3">
//           <label className="form-label">Sr No</label>
//           <select
//             id="srNoSelect"
//             className="form-control"
//             value={selectedSrNo}
//             onChange={handleSelectChange}
//             style={{ fontWeight: 'bold' }}
//           >
//             <option value="">Select SrNo</option>
//             {srNos.map((srNo) => (
//               <option key={srNo} value={srNo}>
//                 {srNo}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="col-md-4 mb-3">
//           <label className="form-label">Cuts</label>
//           <select
//             className="form-control"
//             required
//             // onChange={handleDropdownChange}
//             value={Slitcut}
//             onChange={(e) => setSlitcut(e.target.value)}
//             style={{ backgroundColor: '#0022', color: 'black' }}
//           >
//             <option>Select SrNo</option>
//             <option value="full-cut">Full Cut</option>
//             <option value="half-cut">Half Cut</option>
//           </select>
//         </div>
//       </div>
//       <div className="row">
//         <div className="col-md-2">
//           <label>Thickness</label>
//           <input
//             type="string"
//             className="form-control"
//             value={thickness}
//             // onChange={(e) => setMotherCoilId(e.target.value)}
//             required
//           />
//         </div>
//         <div className="col-md-2">
//           <label>Width</label>
//           <input
//             type="string"
//             className="form-control"
//             value={width}
//             // onChange={(e) => setMotherCoilId(e.target.value)}
//             required
//           />
//         </div>
//         <div className="col-md-2">
//           <label>Weight</label>
//           <input
//             type="string"
//             className="form-control"
//             value={weight}
//             // onChange={(e) => setMotherCoilId(e.target.value)}
//             required
//           />
//         </div>

//         <div className="col-md-2">
//           <label>ActualCoilWidth</label>
//           <input
//             type="string"
//             className="form-control"
//             value={actualCoilWidth}
//             // onChange={(e) => setMotherCoilId(e.target.value)}
//             required
//           />
//         </div>

//         <div className="col-md-2">
//           <label>ActualCoilWeigth</label>
//           <input
//             type="string"
//             className="form-control"
//             value={actualCoilWeigth}
//             // onChange={(e) => setMotherCoilId(e.target.value)}
//             required
//           />
//         </div>

//         {/* <div className="col-md-2">
//           <label>RemainingCoilWeigth</label>
//           <input
//             type="string"
//             className="form-control"
//             // value={remainingWeight < 0 ? 0 : remainingWeight}
//             value={
//               remainingWeight < 0 || (remainingWeight > 0 && remainingWeight < 10)
//                 ? 0
//                 : remainingWeight
//             }
//             // value={remainingWeight}
//             // onChange={(e) => setMotherCoilId(e.target.value)}
//             required
//           />
//         </div> */}
//       </div>
//       <div className="row mt-5">
//         <h4>Add Slits Data</h4>
//       </div>
//       <div className="row">
//         <div className="col-md-2">
//           <label>Mother Coil Id</label>
//           <input
//             type="string"
//             className="form-control"
//             value={MotherCoilId}
//             onChange={(e) => setMotherCoilId(e.target.value)}
//             required
//           />
//         </div>

//         <div className="col-md-2">
//           <label>Slit Width</label>
//           <input
//             type="string"
//             className="form-control"
//             value={SlitWidth}
//             onChange={(e) => setSlitWidth(e.target.value)}
//             required
//           />
//         </div>

//         <div className="col-md-2">
//           <label>No of Slit</label>
//           <input
//             type="string"
//             className="form-control"
//             value={NoOfSlit}
//             onChange={(e) => setNoOfSlit(e.target.value)}
//             required
//           />
//         </div>
//         {/* <div className="col-md-2">
//           <label>Trimm</label>
//           <input
//             type="string"
//             step="any"
//             className="form-control"
//             value={Trimm}
//             onChange={(e) => setTrimm(e.target.value)}
//             required
//           />
//         </div>

//         <div className="col-md-2">
//           <label>Scrap</label>
//           <input
//             type="string"
//             step="any"
//             className="form-control"
//             value={Scrap}
//             onChange={(e) => setScrap(e.target.value)}
//             required
//           />
//         </div> */}
//         <div className="col-md-2" style={{ marginTop: '1.5rem' }}>
//           <button type="button" className="btn btn-primary" onClick={handleAddSlitsData}>
//             Add
//           </button>
//         </div>
//       </div>
//       <div className="row mt-4">
//         <h4>Slits Data Entries</h4>
//       </div>
//       {showUpdatedTable ? (
//         // Show the updated table
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Slit id</th>
//               {/* <th>Mother Coil Id</th> */}
//               <th>Slit Width</th>
//               <th>No of Slit</th>
//               <th>Od Size</th>
//               <th>WTMM</th>
//               <th>Slit Weight</th>
//               <th>Total Weight</th>
//               {/* <th>Trimm</th>
//               <th>Scrap</th> */}
//             </tr>
//           </thead>
//           <tbody>
//             {slitsData.map((entry, index) => (
//               <tr key={index}>
//                 <td>{entry.SlitId}</td>
//                 {/* <td>{entry.MotherCoilId}</td> */}
//                 <td>{entry.SlitWidth}</td>
//                 <td>{entry.NoOfSlit}</td>
//                 <td>{entry.OdSize || 0}</td>
//                 <td>{entry.WTMM}</td>
//                 <td>{entry.SlitWeigth || 0}</td>
//                 <td>{entry.TotalWeigth || 0}</td>
//                 {/* <td>{entry.Trimm}</td>
//                 <td>{entry.Scrap}</td> */}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         // Show the initial table
//         <table className="table bordered" style={{ width: '40%' }}>
//           <thead>
//             <tr>
//               <th>Slit id</th>
//               {/* <th>Mother Coil Id</th> */}
//               <th>Slit Width</th>
//               <th>No of Slit</th>
//               {/* <th>Trimm</th>
//               <th>Scrap</th> */}
//             </tr>
//           </thead>
//           <tbody>
//             {slitsData.map((entry, index) => (
//               <tr key={index}>
//                 <td>{entry.SlitId}</td>
//                 {/* <td>{entry.MotherCoilId}</td> */}
//                 <td>{entry.SlitWidth}</td>
//                 <td>{entry.NoOfSlit}</td>
//                 {/* <td>{entry.Trimm}</td>
//                 <td>{entry.Scrap}</td> */}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       <div className="row">
//         <div className="col-md-2">
//           <label> Total Trimm</label>
//           <input
//             type="string"
//             step="any"
//             className="form-control"
//             value={Trimm}
//             onChange={(e) => setTrimm(e.target.value)}
//             required
//           />
//         </div>

//         <div className="col-md-2">
//           <label> Total Scrap</label>
//           <input
//             type="string"
//             step="any"
//             className="form-control"
//             value={Scrap}
//             onChange={(e) => setScrap(e.target.value)}
//             required
//           />
//         </div>
//         <div className="col-md-2" style={{ marginTop: '1.5rem' }}>
//           <button type="button" className="btn btn-primary" onClick={handletrimmscrap}>
//             Add
//           </button>
//         </div>
//         <div className="col">
//           {dataItem && (
//             <table className="table">
//               <thead>
//                 <tr>
//                   <th> Total Trimm</th>
//                   <th> Total Scrap</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>{dataItem.Trimm}</td>
//                   <td>{dataItem.Scrap}</td>
//                 </tr>
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>

//       <div className="row" style={{ margin: '1rem' }}>
//         <div className="col-md-2">
//           <button type="button" className="btn btn-success" onClick={handleCalculateSum}>
//             Calculate Data
//           </button>
//         </div>
//         <div className="col-md-2">
//           <button type="button" className="btn btn-success" onClick={handleSaveData}>
//             Save data
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SlittingMaster
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

const SlittingMaster = () => {
  const [srNos, setSrNos] = useState([])
  const [selectedSrNo, setSelectedSrNo] = useState('')
  const [MotherCoilId, setMotherCoilId] = useState('')
  const [thickness, setThickness] = useState('')
  const [width, setWidth] = useState('')
  const [weight, setWeigth] = useState('')
  const [grade, setGrade] = useState('')
  const [coiltype, setCoiltype] = useState('')

  const [actualCoilWidth, setActualCoilWidth] = useState('')
  const [actualCoilWeigth, setActualCoilWeigth] = useState('')
  const [SlitWidth, setSlitWidth] = useState('')
  const [NoOfSlit, setNoOfSlit] = useState('')
  const [OdSize, setOdSize] = useState('')
  const [WTMM, setWTMM] = useState('')
  const [SlitWeigth, setSlitWeigth] = useState('')
  const [TotalWeigth, setTotalWeigth] = useState('')
  const [Trimm, setTrimm] = useState('')
  const [Scrap, setScrap] = useState('')
  const [entriesArray, setEntriesArray] = useState([])
  const [saveSuccessMessage, setSaveSuccessMessage] = useState('')
  const [SlitSrNo, setSlitSrNo] = useState(1)
  const [combinedId, setcombinedId] = useState()
  const [Slitcut, setSlitcut] = useState('full-cut')
  const [totalTrimm, setTotalTrimm] = useState('')
  const [totalScrap, setTotalScrap] = useState('')

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/allSrNos')
        setSrNos(response.data)
      } catch (error) {
        console.error('Error fetching SrNos:', error)
      }
    }

    fetchData1()
  }, [])

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value
    setSelectedSrNo(selectedValue)
  }
  const fetchData = async (selected) => {
    try {
      const response = await fetch(`http://localhost:5001/api/data/srno/${selected}`)
      const result = await response.json()
      setMotherCoilId(result.MotherCoilId || '')
      setThickness(result.Thickness || '')
      setWidth(result.Width || '')
      setWeigth(result.Weigth || '')
      setActualCoilWeigth(result.ActualCoilWeigth)
      setActualCoilWidth(result.ActualCoilWidth)
      // Set other state variables as needed
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    if (selectedSrNo) {
      fetchData(selectedSrNo)
    }
  }, [selectedSrNo])

  const [slitsData, setSlitsData] = useState([])
  const [slitEntriesId, setSlitEntriesId] = useState(1)

  const handleAddSlitsData = () => {
    if (!MotherCoilId || !SlitWidth || !NoOfSlit) {
      // Show a message to enter the required data
      console.log('Please enter all required data.')
      return
    }
    const newEntry = {
      SlitId: `${MotherCoilId}/${slitEntriesId}`,
      MotherCoilId,
      SlitWidth,
      NoOfSlit,
      // Trimm,
      // Scrap,
    }

    // Increment the ID for the next entry
    setSlitEntriesId(slitEntriesId + 1)

    // Add the new entry to the slitsData array
    setSlitsData([...slitsData, newEntry])

    setTotalSlitWidthNoOfSlit((prevSum) => prevSum + parseFloat(SlitWidth) * parseFloat(NoOfSlit))

    // setTotalTrimm((prevTotalTrimm) => prevTotalTrimm + parseFloat(Trimm))
    // setTotalScrap((prevTotalScrap) => prevTotalScrap + parseFloat(Scrap))

    // Clear the input fields after adding the entry
    // setMotherCoilId('')
    setSlitWidth('')
    setNoOfSlit('')
    // setTrimm(0)
    // setScrap(0)
  }

  const [dataItem, setDataItem] = useState(null)
  const handletrimmscrap = () => {
    if (!Trimm || !Scrap) {
      // Show a message to enter both Trimm and Scrap data
      console.log('Please enter both Trimm and Scrap data.')
      return
    }
    const newItem = { Trimm, Scrap }

    // Update the single data item
    setDataItem(newItem)

    // Clear input fields after adding data
    setTrimm('')
    setScrap('')
  }

  console.log(slitsData)
  const [totalSlitWidthNoOfSlit, setTotalSlitWidthNoOfSlit] = useState(0)
  //   const [Wtmm , setWtmm] = useState(0)

  const [showUpdatedTable, setShowUpdatedTable] = useState(false)
  const [totaloftotalweight, setTotalofTotalweight] = useState(0)

  // let totaloftotalweight = 0
  const handleCalculateSum = async () => {
    // Calculate WTMM for each object
    const result = calculateSum(slitsData)
    const calwtmm = (actualCoilWeigth - dataItem.Trimm - dataItem.Scrap) / result

    let totaltotal = 0

    // Update the slitsData array with the calculated WTMM for each object
    const updatedSlitsData = slitsData.map((entry) => ({
      ...entry,
      WTMM: calwtmm.toFixed(2), // Limit to 2 decimal places
    }))

    // Calculate and add SlitWeigth, TotalWeigth, and OdSize for each object
    const finalSlitsData = updatedSlitsData.map((entry) => {
      const slitWidth = parseFloat(entry.SlitWidth)
      const noOfSlit = parseFloat(entry.NoOfSlit)

      if (!isNaN(slitWidth) && !isNaN(noOfSlit)) {
        const slitWeigth = (calwtmm * slitWidth).toFixed(2)
        const totalWeigth = (slitWeigth * noOfSlit).toFixed(2)
        const odSize = (slitWidth / 3.142 + thickness / 2).toFixed(2)

        totaltotal += parseFloat(totalWeigth)
        setTotalofTotalweight(totaltotal)
        return {
          ...entry,
          SlitWeigth: slitWeigth,
          TotalWeigth: totalWeigth,
          OdSize: odSize,
        }
      } else {
        return entry // If any of the required fields is not a valid number, return the original entry
      }
    })

    // Set the updated slitsData array to the state
    setShowUpdatedTable(true)
    setSlitsData(finalSlitsData)

    // Send the data to the backend API
    // try {
    //   await axios.post('http://localhost:5001/api/updatebymothercoil', {
    //     motherCoilId: selectedSrNo, // Use selectedSrNo or MotherCoilId based on your requirement
    //     cut: Slitcut,
    //   })

    //   console.log('Data updated successfully.')
    //   // Add any additional logic or UI updates after successfully updating the data
    // } catch (error) {
    //   console.error('Error updating data:', error)
    //   // Handle errors or display error messages to the user
    // }
  }

  console.log(totaloftotalweight)

  const calculateSum = (data) => {
    return data.reduce((sum, entry) => {
      const slitWidth = parseFloat(entry.SlitWidth)
      const noOfSlit = parseFloat(entry.NoOfSlit)

      if (!isNaN(slitWidth) && !isNaN(noOfSlit)) {
        sum += slitWidth * noOfSlit
      }

      return sum
    }, 0)
  }

  const handleSaveData = async () => {
    try {
      // Make sure to adjust the API endpoint and payload based on your backend requirements
      const response = await axios.post('http://localhost:5001/api/saveEntries', {
        MotherCoilId: selectedSrNo, // Use selectedSrNo or MotherCoilId based on your requirement
        entries: slitsData,
      })

      console.log('Data saved successfully:', response.data)
      setSaveSuccessMessage('Data saved successfully')

      const res = await axios.post('http://localhost:5001/api/updatebymothercoil', {
        motherCoilId: selectedSrNo, // Use selectedSrNo or MotherCoilId based on your requirement
        cut: Slitcut,
        Trimm: dataItem.Trimm,
        Scrap: dataItem.Scrap,
        UsedWeigth: totaloftotalweight,
      })

      console.log('Data saved successfully:', res.data)
      setSaveSuccessMessage('Data saved successfully')

      // Handle the response or update UI based on your requirements

      setMotherCoilId('')
      setSlitWidth('')
      setNoOfSlit('')
      setTrimm(0)
      setScrap(0)

      // Clear the slitsData array
      setSlitsData([])

      // Clear fetch data
      setThickness('')
      setWidth('')
      setWeigth('')
      setActualCoilWidth('')
      setActualCoilWeigth('')
      setTotalofTotalweight('')
      setDataItem(null)

      // Clear selectedSrNo
      setSelectedSrNo('')
    } catch (error) {
      console.error('Error saving data:', error)
      // Handle errors or display error messages to the user
      setSaveSuccessMessage('Error saving data')
    }
  }

  return (
    <div>
      <div className="row">
        <div className="col-3">
          <h4 style={{ marginBottom: '1rem', color: '#002244' }}>Slitting Master</h4>
        </div>
        <div className="col-3">
          <NavLink to="/slittingdata" style={{ textDecoration: 'none' }}>
            <button
              // type="submit"
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
              Slitting Data
            </button>
          </NavLink>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 mb-3">
          <label className="form-label">Sr No</label>
          <select
            required
            id="srNoSelect"
            className="form-control"
            value={selectedSrNo}
            onChange={handleSelectChange}
            style={{ fontWeight: 'bold' }}
          >
            <option value="">Select SrNo</option>
            {srNos.map((srNo) => (
              <option key={srNo} value={srNo}>
                {srNo}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Cuts</label>
          <select
            className="form-control"
            required
            // onChange={handleDropdownChange}
            value={Slitcut}
            onChange={(e) => setSlitcut(e.target.value)}
            style={{ backgroundColor: '#0022', color: 'black' }}
          >
            <option>Select SrNo</option>
            <option value="full-cut">Full Cut</option>
            <option value="half-cut">Half Cut</option>
          </select>
          {Slitcut === '' && <div style={{ color: 'red' }}>Please select a cut.</div>}
        </div>
      </div>
      <div className="row">
        <div className="col-md-2">
          <label>Thickness</label>
          <input
            type="string"
            className="form-control"
            value={thickness}
            // onChange={(e) => setMotherCoilId(e.target.value)}
            required
          />
        </div>
        <div className="col-md-2">
          <label>Width</label>
          <input
            type="string"
            className="form-control"
            value={width}
            // onChange={(e) => setMotherCoilId(e.target.value)}
            required
          />
        </div>
        <div className="col-md-2">
          <label>Weight</label>
          <input
            type="string"
            className="form-control"
            value={weight}
            // onChange={(e) => setMotherCoilId(e.target.value)}
            required
          />
        </div>

        <div className="col-md-2">
          <label>ActualCoilWidth</label>
          <input
            type="string"
            className="form-control"
            value={actualCoilWidth}
            // onChange={(e) => setMotherCoilId(e.target.value)}
            required
          />
        </div>

        <div className="col-md-2">
          <label>ActualCoilWeigth</label>
          <input
            type="string"
            className="form-control"
            value={actualCoilWeigth}
            // onChange={(e) => setMotherCoilId(e.target.value)}
            required
          />
        </div>

        {/* <div className="col-md-2">
          <label>RemainingCoilWeigth</label>
          <input
            type="string"
            className="form-control"
            // value={remainingWeight < 0 ? 0 : remainingWeight}
            value={
              remainingWeight < 0 || (remainingWeight > 0 && remainingWeight < 10)
                ? 0
                : remainingWeight
            }
            // value={remainingWeight}
            // onChange={(e) => setMotherCoilId(e.target.value)}
            required
          />
        </div> */}
      </div>
      <div className="row mt-5">
        <h4>Add Slits Data</h4>
      </div>
      <div className="row">
        <div className="col-md-2">
          <label>Mother Coil Id</label>
          <input
            type="string"
            className="form-control"
            value={MotherCoilId}
            onChange={(e) => setMotherCoilId(e.target.value)}
            required
          />
        </div>

        <div className="col-md-2">
          <label>Slit Width</label>
          <input
            type="string"
            className="form-control"
            value={SlitWidth}
            onChange={(e) => setSlitWidth(e.target.value)}
            required
          />
        </div>

        <div className="col-md-2">
          <label>No of Slit</label>
          <input
            type="string"
            className="form-control"
            value={NoOfSlit}
            onChange={(e) => setNoOfSlit(e.target.value)}
            required
          />
        </div>
        {/* <div className="col-md-2">
          <label>Trimm</label>
          <input
            type="string"
            step="any"
            className="form-control"
            value={Trimm}
            onChange={(e) => setTrimm(e.target.value)}
            required
          />
        </div>

        <div className="col-md-2">
          <label>Scrap</label>
          <input
            type="string"
            step="any"
            className="form-control"
            value={Scrap}
            onChange={(e) => setScrap(e.target.value)}
            required
          />
        </div> */}
        <div className="col-md-2" style={{ marginTop: '1.5rem' }}>
          <button required type="button" className="btn btn-primary" onClick={handleAddSlitsData}>
            Add
          </button>
        </div>
      </div>
      <div className="row mt-4">
        <h4>Slits Data Entries</h4>
      </div>
      {showUpdatedTable ? (
        // Show the updated table
        <table className="table">
          <thead>
            <tr>
              <th>Slit id</th>
              {/* <th>Mother Coil Id</th> */}
              <th>Slit Width</th>
              <th>No of Slit</th>
              <th>Od Size</th>
              <th>WTMM</th>
              <th>Slit Weight</th>
              <th>Total Weight</th>
              {/* <th>Trimm</th>
              <th>Scrap</th> */}
            </tr>
          </thead>
          <tbody>
            {slitsData.map((entry, index) => (
              <tr key={index}>
                <td>{entry.SlitId}</td>
                {/* <td>{entry.MotherCoilId}</td> */}
                <td>{entry.SlitWidth}</td>
                <td>{entry.NoOfSlit}</td>
                <td>{entry.OdSize || 0}</td>
                <td>{entry.WTMM}</td>
                <td>{entry.SlitWeigth || 0}</td>
                <td>{entry.TotalWeigth || 0}</td>
                {/* <td>{entry.Trimm}</td>
                <td>{entry.Scrap}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        // Show the initial table
        <table className="table bordered" style={{ width: '40%' }}>
          <thead>
            <tr>
              <th>Slit id</th>
              {/* <th>Mother Coil Id</th> */}
              <th>Slit Width</th>
              <th>No of Slit</th>
              {/* <th>Trimm</th>
              <th>Scrap</th> */}
            </tr>
          </thead>
          <tbody>
            {slitsData.map((entry, index) => (
              <tr key={index}>
                <td>{entry.SlitId}</td>
                {/* <td>{entry.MotherCoilId}</td> */}
                <td>{entry.SlitWidth}</td>
                <td>{entry.NoOfSlit}</td>
                {/* <td>{entry.Trimm}</td>
                <td>{entry.Scrap}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="row">
        <div className="col-md-2">
          <label> Total Trimm</label>
          <input
            type="string"
            step="any"
            className="form-control"
            value={Trimm}
            onChange={(e) => setTrimm(e.target.value)}
            required
          />
        </div>

        <div className="col-md-2">
          <label> Total Scrap</label>
          <input
            type="string"
            step="any"
            className="form-control"
            value={Scrap}
            onChange={(e) => setScrap(e.target.value)}
            required
          />
        </div>
        <div className="col-md-2" style={{ marginTop: '1.5rem' }}>
          <button required type="button" className="btn btn-primary" onClick={handletrimmscrap}>
            Add
          </button>
        </div>
        <div className="col">
          {dataItem && (
            <table className="table">
              <thead>
                <tr>
                  <th> Total Trimm</th>
                  <th> Total Scrap</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{dataItem.Trimm}</td>
                  <td>{dataItem.Scrap}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="row" style={{ margin: '1rem' }}>
        <div className="col-md-2">
          <button required type="button" className="btn btn-success" onClick={handleCalculateSum}>
            Calculate Data
          </button>
        </div>
        <div className="col-md-2">
          <button required type="button" className="btn btn-success" onClick={handleSaveData}>
            Save data
          </button>
        </div>
      </div>
    </div>
  )
}

export default SlittingMaster
