import axios from 'axios'

const API_URL = '/api/parent/'

// Register parent
const register = async (parentData) => {
  const response = await axios.post(API_URL, parentData)

  if (response.data) {
    localStorage.setItem('parent', JSON.stringify(response.data))
  }

  return response.data
}

// Login parent
const login = async (parentData) => {
  const response = await axios.post(API_URL + 'login', parentData)

  if (response.data) {
    localStorage.setItem('parent', JSON.stringify(response.data))
  }

  return response.data
}

// Logout parent
const logout = () => {
  localStorage.removeItem('parent')
}

const authService = {
  register,
  logout,
  login,
}

export default authService