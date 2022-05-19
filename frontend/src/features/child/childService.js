import axios from 'axios'

const API_URL = '/api/child/'

// Add child
const addChild = async (childData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(API_URL, childData, config)

    return response.data
}

// Get chilren
const getChildren = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

// Delete child
const deleteChild = async (childId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete(API_URL + childId, config)

    return response.data
}

const childService = {
    addChild,
    getChildren,
    deleteChild,
}

export default childService