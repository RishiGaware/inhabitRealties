import './App.css'
import { Routes, Route } from 'react-router-dom';
import { Container, Box } from '@chakra-ui/react'

import Header from './components/Header/Header';
import Home from './routes/Home';
import PropertyDetails from './routes/PropertyDetails';
import Footer from './components/Footer'
import HouseProvider from './context/HouseContext';
import HouseDetails from './components/PropertyDetails/HouseDetails';
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Features from './pages/common/Features'
import AboutUs from './pages/common/AboutUs'
import Contact from './pages/common/Contact'
import Dashboard from './pages/common/dashboard/Dashboard';
import UserManagement from './pages/admin/UserManagement';
import RoleManagement from './pages/admin/RoleManagement';
import Reports from './pages/admin/Reports';
import AddLead from './pages/lead/AddLead';
import ViewLeads from './pages/lead/ViewLeads';
import LeadQualification from './pages/lead/LeadQualification';
import CustomerProfiles from './pages/customers/CustomerProfiles';
import CustomerDocuments from './pages/customers/Documents';
import SiteVisits from './pages/customers/SiteVisits';
import Inventory from './pages/bookings/Inventory';
import BookedUnits from './pages/bookings/BookedUnits';
import PaymentStatus from './pages/bookings/PaymentStatus';
import Installments from './pages/payments/Installments';
import PaymentHistory from './pages/payments/PaymentHistory';
import DuePayments from './pages/payments/DuePayments';
import Referrals from './pages/postSale/Referrals';
import Rewards from './pages/postSale/Rewards';
import Points from './pages/postSale/Points';
import MyBookings from './pages/client/MyBookings';
import ClientDocuments from './pages/client/Documents';
import ClientPayments from './pages/client/Payments';
import ClientReferrals from './pages/client/Referrals';
import PropertyMaster from './pages/property/PropertyMaster';
import PropertyTypes from './pages/property/PropertyTypes';
import DashboardLayout from './components/navigation/DashboardLayout';

const MainLayout = ({ children }) => {
  return (
    <>
      <Box w="100vw" position="relative" left="50%" right="50%" marginLeft="-50vw" marginRight="-50vw">
        <Header />
      </Box>
      <Box w="100vw" position="relative" left="50%" right="50%" marginLeft="-50vw" marginRight="-50vw">
        {children}
      </Box>
      <Box w="100vw" position="relative" left="50%" right="50%" marginLeft="-50vw" marginRight="-50vw">
        <Footer />
      </Box>
    </>
  )
}

const AuthLayout = ({ children }) => {
  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      {children}
    </div>
  )
}

const App = () => {
  return (
    <HouseProvider>
      <Routes>
        {/* Auth Routes */}
        <Route path='/login' element={
          <AuthLayout>
            <Login />
          </AuthLayout>
        } />
        <Route path='/register' element={
          <AuthLayout>
            <Register />
          </AuthLayout>
        } />

        {/* Main Routes */}
        <Route path='/' element={<MainLayout><Home /></MainLayout>} />
        <Route path='/features' element={<MainLayout><Features /></MainLayout>} />
        <Route path='/about' element={<MainLayout><AboutUs /></MainLayout>} />
        <Route path='/contact' element={<MainLayout><Contact /></MainLayout>} />
        <Route path='property-details' element={<MainLayout><PropertyDetails /></MainLayout>} />
        {/* <Route path='/dashboard' element={<DashboardLayout><Dashboard /></DashboardLayout>} /> */}
        <Route path='/admin/user-management' element={<DashboardLayout><UserManagement /></DashboardLayout>} />
        <Route path='/admin/role-management' element={<DashboardLayout><RoleManagement /></DashboardLayout>} />
        <Route path='/admin/reports' element={<DashboardLayout><Reports /></DashboardLayout>} />
        <Route path='/lead-management/add-lead' element={<DashboardLayout><AddLead /></DashboardLayout>} />
        <Route path='/lead-management/view-leads' element={<DashboardLayout><ViewLeads /></DashboardLayout>} />
        <Route path='/lead-management/lead-qualification' element={<DashboardLayout><LeadQualification /></DashboardLayout>} />
        <Route path='/customer-management/customer-profiles' element={<DashboardLayout><CustomerProfiles /></DashboardLayout>} />
        <Route path='/customer-management/documents' element={<DashboardLayout><CustomerDocuments /></DashboardLayout>} />
        <Route path='/customer-management/site-visits' element={<DashboardLayout><SiteVisits /></DashboardLayout>} />
        <Route path='/bookings/inventory' element={<DashboardLayout><Inventory /></DashboardLayout>} />
        <Route path='/bookings/booked-units' element={<DashboardLayout><BookedUnits /></DashboardLayout>} />
        <Route path='/bookings/payment-status' element={<DashboardLayout><PaymentStatus /></DashboardLayout>} />
        <Route path='/payments/installments' element={<DashboardLayout><Installments /></DashboardLayout>} />
        <Route path='/payments/payment-history' element={<DashboardLayout><PaymentHistory /></DashboardLayout>} />
        <Route path='/payments/due-payments' element={<DashboardLayout><DuePayments /></DashboardLayout>} />
        <Route path='/post-sale/referrals' element={<DashboardLayout><Referrals /></DashboardLayout>} />
        <Route path='/post-sale/rewards' element={<DashboardLayout><Rewards /></DashboardLayout>} />
        <Route path='/post-sale/points' element={<DashboardLayout><Points /></DashboardLayout>} />
        <Route path='/client-portal/my-bookings' element={<DashboardLayout><MyBookings /></DashboardLayout>} />
        <Route path='/client-portal/documents' element={<DashboardLayout><ClientDocuments /></DashboardLayout>} />
        <Route path='/client-portal/payments' element={<DashboardLayout><ClientPayments /></DashboardLayout>} />
        <Route path='/client-portal/referrals' element={<DashboardLayout><ClientReferrals /></DashboardLayout>} />
        <Route path='/property/master' element={<DashboardLayout><PropertyMaster /></DashboardLayout>} />
        <Route path='/property/types' element={<DashboardLayout><PropertyTypes /></DashboardLayout>} />
        <Route path="*" element={<DashboardLayout><main style={{ padding: "1rem" }}><p>There's nothing here!</p></main></DashboardLayout>} />
      </Routes>
    </HouseProvider>
  )
}

export default App