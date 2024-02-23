import React from 'react'

const Login = React.lazy(() => import('./views/pages/login/Login'))
const Logout = React.lazy(() => import('./views/pages/Logout'))

// ./layout/DefaultLayout
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const WeightMaster = React.lazy(() => import('./views/MainPages/WeightMaster'))
const MotherCoilMaster = React.lazy(() => import('./views/MainPages/MotherCoilMaster'))
const SlittingMaster = React.lazy(() => import('./views/MainPages/SlittingMaster'))
const SlittingData = React.lazy(() => import('./views/MainPages/SlittingData'))
const DailyProdPlan = React.lazy(() => import('./views/MainPages/DailyProdPlan'))
const DailyProdPlanData = React.lazy(() => import('./views/MainPages/DailyProdPlanData'))
const DailyProdReport = React.lazy(() => import('./views/MainPages/DailyProdReport'))
const DailyProdReportData = React.lazy(() => import('./views/MainPages/DailyProdReportData'))
const WeightMasterImage = React.lazy(() => import('./views/MainPages/WeightMasterImage'))
const Editdailyplan = React.lazy(() => import('./views/MainPages/Editdailyplan'))
// const Editdailypaln = React.lazy(() => import('./views/MainPages/editdailypaln'))

// const editasset = React.lazy(() => import('./views/assetTable/EditAsset'))

// Base

//Forms

// Icons

// Notifications

const routes = [
  { path: '/login', exact: true, name: 'Login', element: Login },
  { path: '/logout', exact: true, name: 'Logout', element: Logout },

  { path: '/', exact: true, name: 'Home' },

  {
    path: '/dashboard',
    name: 'Dashboard',
    element: Dashboard,
  },
  {
    path: '/weigthmaster',
    name: 'WeightMaster',
    element: WeightMaster,
  },
  {
    path: '/mothercoil',
    name: 'mothercoil',
    element: MotherCoilMaster,
  },
  {
    path: '/slittingmaster',
    name: 'slittingmaster',
    element: SlittingMaster,
  },
  {
    path: '/slittingdata',
    name: 'slittingdata',
    element: SlittingData,
  },
  {
    path: '/dailyprodplan',
    name: 'dailyprodplan',
    element: DailyProdPlan,
  },
  {
    path: '/dailyprodplandata',
    name: 'dailyprodreport',
    element: DailyProdPlanData,
  },
  {
    path: '/dailyprodreport',
    name: 'DailyProdReport',
    element: DailyProdReport,
  },
  {
    path: '/dailyprodreportdata',
    name: 'DailyProdReportData',
    element: DailyProdReportData,
  },
  { path: '/WeightMasterImage/:id', name: 'WeightMasterImage', element: WeightMasterImage },
  { path: '/editdailyplan', name: 'Editdailyplan', element: Editdailyplan },
]

export default routes
