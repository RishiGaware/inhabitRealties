
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
        <Route path='/' element={
          <MainLayout>
            <Home />
          </MainLayout>
        } />
        <Route path='/features' element={
          <MainLayout>
            <Features />
          </MainLayout>
        } />
        <Route path='/about' element={
          <MainLayout>
            <AboutUs />
          </MainLayout>
        } />
        <Route path='/contact' element={
          <MainLayout>
            <Contact />
          </MainLayout>
        } />
        <Route path='property-details' element={
          <MainLayout>
            <PropertyDetails />
          </MainLayout>
        }>
          <Route path=":propertyId" element={<HouseDetails />} />
        </Route>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path="*" element={
          <MainLayout>
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          </MainLayout>
        } />
      </Routes>
    </HouseProvider>
  )
}

export default App