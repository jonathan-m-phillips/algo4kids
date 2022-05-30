import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addChild } from '../../features/child/childSlice'

function ChildForm() {
    const [childData, setChildData] = useState({
        username: '',
        ageGroup: '',
        gender: '',
    })

    const { username, ageGroup, gender } = childData

    const dispatch = useDispatch()

    const onChange = (e) => {
        setChildData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const childData = {
            username,
            ageGroup,
            gender,
        }

        dispatch(addChild(childData))
        setChildData({
            username: '',
            ageGroup: '',
            gender: '',
        })
    }

    return (
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="text">
                        Add your child
                    </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={username}
                        placeholder='Enter username'
                        onChange={onChange}
                    />
                    <input
                        type="text"
                        name="ageGroup"
                        id="ageGroup"
                        value={ageGroup}
                        placeholder='Enter your age group'
                        onChange={onChange}
                    />
                    <input
                        type="text"
                        name="gender"
                        id="gender"
                        value={gender}
                        placeholder='Enter your gender'
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-block" type="submit">
                        Add Child
                    </button>
                </div>
            </form>
        </section>
    )
}

export default ChildForm