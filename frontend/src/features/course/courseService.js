import axios from 'axios'

const API_URL = '/api/course/'

// Add course
const addCourse = async (courseData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(API_URL, courseData, config)

    return response.data
}

// Get courses
const getCourses = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

// Delete course
const deleteCourse = async (courseId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete(API_URL + courseId, config)

    return response.data
}

const courseService = {
    addCourse,
    getCourses,
    deleteCourse,
}

export default courseService