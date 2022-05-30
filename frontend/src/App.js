import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'

import AdminRegister from './pages/admin/Register'
import AdminDashboard from './pages/admin/Dashboard'
import AdminLogin from './pages/admin/Login'

import ParentRegister from './pages/parent/Register'
import ParentLogin from './pages/parent/Login'
import ParentDashboard from './pages/parent/Dashboard'

import ChildDashboard from './pages/child/Dashboard'

// import AvatarDashboard from './pages/AvatarDashboard'

function App() {

  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/register-admin' element={<AdminRegister />} />
            <Route path='/login-admin' element={<AdminLogin />} />
            <Route path='/admin' element={<AdminDashboard />} />
            <Route path='/register' element={<ParentRegister />} />
            <Route path='/login' element={<ParentLogin />} />
            <Route path='/' element={<ParentDashboard />} />
            <Route path='/:id' element={<ChildDashboard />} />
            {/* <Route path='/avatar/:id' element={<AvatarDashboard />} /> */}
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App;
