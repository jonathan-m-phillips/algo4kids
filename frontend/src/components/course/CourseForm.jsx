import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addCourse } from '../../features/course/courseSlice'

function CourseForm() {
    const [courseData, setCourseData] = useState({
        courseName: '',
        description: '',
        video: '',
        miniQuiz: '',
    })

    const { courseName, description, video, miniQuiz } = courseData

    const dispatch = useDispatch()

    const onChange = (e) => {
        setCourseData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const courseData = {
            courseName,
            description,
            video,
            miniQuiz,
        }

        dispatch(addCourse(courseData))
        setCourseData({
            courseName: '',
            description: '',
            video: '',
            miniQuiz: '',
        })
    }

    return (
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="text">
                        Creste a new course
                    </label>
                    <input
                        type="text"
                        name="courseName"
                        id="courseName"
                        value={courseName}
                        placeholder='Course name'
                        onChange={onChange}
                    />
                    <input
                        type="textarea"
                        name="description"
                        id="description"
                        value={description}
                        placeholder='Enter a course description'
                        onChange={onChange}
                    />
                    <input
                        type="text"
                        name="video"
                        id="video"
                        value={video}
                        placeholder='This is where we will eventually upload mp4 files'
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-block" type="submit">
                        Create Course
                    </button>
                </div>
            </form>
        </section>
    )
}

export default CourseForm