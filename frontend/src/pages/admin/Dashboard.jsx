import { React, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../../components/Spinner'
import { reset } from '../../features/admin/adminSlice'

function Dashboard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { admin, isLoading, isError, message } = useSelector((state) => state.admin)

    useEffect(() => {
        if (isError) {
            console.log(message)
        }

        if (!admin) {
            navigate('/login-admin')
        }

        return () => {
            dispatch(reset())
        }
    }, [admin, isError, message, navigate, dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className='heading'>
                <h1>Hello, {admin.firstName}</h1>
                <p>Dashboard</p>
            </section>
        </>
    )
}

export default Dashboard