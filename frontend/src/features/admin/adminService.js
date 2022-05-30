import axios from 'axios'

const API_URL = '/api/admin/'

// Register admin
const register = async (adminData) => {
  const response = await axios.post(API_URL + 'register-admin', adminData)

  if (response.data) {
    localStorage.setItem('admin', JSON.stringify(response.data))
  }

  return response.data
}

// Login admin
const login = async (adminData) => {
  const response = await axios.post(API_URL + 'login-admin', adminData)

  if (response.data) {
    localStorage.setItem('admin', JSON.stringify(response.data))
  }

  return response.data
}

// Logout admin
const logout = () => {
  localStorage.removeItem('admin')
}

const adminService = {
  register,
  logout,
  login,
}

export default adminService