import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register, reset } from '../features/parent/parentSlice'
import Spinner from '../components/Spinner'

function Register() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password2: '',
        firstName: '',
        lastName: '',
        age: '',
    })

    const { email, password, password2, firstName,
        lastName, age } = formData

    // Breaking the Address object outside of the Parent object
    // and then will be adding to the Parent later
    const [addressData, setAddressData] = useState({
        street: '',
        city: '',
        state: '',
        zipcode: '',
    })

    const { street, city, state, zipcode } = addressData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { parent, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.parents
    )

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || parent) {
            navigate('/')
        }

        dispatch(reset())
    }, [parent, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onAddressChange = (e) => {
        setAddressData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (password !== password2) {
            toast.error('Passwords do not match')
        } else {

            // Created to store addressData in parentData
            const addressData = {
                street,
                city,
                state,
                zipcode
            }

            const parentData = {
                email,
                password,
                firstName,
                lastName,
                age,
                Address: {
                    street: addressData.street,
                    city: addressData.city,
                    state: addressData.state,
                    zipcode: addressData.zipcode
                }
            }

            dispatch(register(parentData))
        }
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className='heading'>
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Please create an account</p>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input
                            type='email'
                            className='form-control'
                            id='email'
                            name='email'
                            value={email}
                            placeholder='Enter your email'
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            className='form-control'
                            id='password'
                            name='password'
                            value={password}
                            placeholder='Enter password'
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            className='form-control'
                            id='password2'
                            name='password2'
                            value={password2}
                            placeholder='Confirm password'
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='text'
                            className='form-control'
                            id='firstName'
                            name='firstName'
                            value={firstName}
                            placeholder='Enter your first name'
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='text'
                            className='form-control'
                            id='lastName'
                            name='lastName'
                            value={lastName}
                            placeholder='Enter your last name'
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='text'
                            className='form-control'
                            id='age'
                            name='age'
                            value={age}
                            placeholder='Enter your age'
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='text'
                            className='form-control'
                            id='Address-street'
                            name='street'
                            value={street}
                            placeholder='Enter your street'
                            onChange={onAddressChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='text'
                            className='form-control'
                            id='Address-city'
                            name='city'
                            value={city}
                            placeholder='Enter your city'
                            onChange={onAddressChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='text'
                            className='form-control'
                            id='Address-state'
                            name='state'
                            value={state}
                            placeholder='Enter your state'
                            onChange={onAddressChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='text'
                            className='form-control'
                            id='Address-zipcode'
                            name='zipcode'
                            value={zipcode}
                            placeholder='Enter your zipcode'
                            onChange={onAddressChange}
                        />
                    </div>
                    <div className='form-group'>
                        <button type='submit' className='btn btn-block'>
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register