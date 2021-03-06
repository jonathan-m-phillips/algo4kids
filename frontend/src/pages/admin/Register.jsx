import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register, reset } from '../../features/admin/adminSlice'
import Spinner from '../../components/Spinner'

function Register() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password2: '',
        firstName: '',
        lastName: ''
    })

    const { email, password, password2, firstName,
        lastName } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { admin, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.admin
    )

    useEffect(() => {
        if (isSuccess || admin) {
            navigate('/admin')
        }

        dispatch(reset())
    }, [admin, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (password !== password2 && email.includes('@thirdandmrkt.com')) {
            toast.error('Passwords do not match')
        } else if (!email.includes('@thirdandmrkt.com')) {
            toast.error('You do not have authority to create an admin account.')
            navigate('/register')
        } else if (isError) {
            toast.error(message)
        } else {

            const adminData = {
                email,
                password,
                firstName,
                lastName
            }

            dispatch(register(adminData))
        }
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className='heading'>
                <h1>
                    <FaUser /> Register admin
                </h1>
                <p>Please create an admin account</p>
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