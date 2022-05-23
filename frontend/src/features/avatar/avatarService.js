import axios from 'axios'

const API_URL = '/api/avatar/'

// Create avatar
const createAvatar = async (avatarData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(API_URL, avatarData, config)

    return response.data
}

// Get avatars
const getAvatars = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

// Delete avatar
const deleteAvatar = async (avatarId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete(API_URL + avatarId, config)

    return response.data
}

const avatarService = {
    createAvatar,
    getAvatars,
    deleteAvatar,
}

export default avatarService