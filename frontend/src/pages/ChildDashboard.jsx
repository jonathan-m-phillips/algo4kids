import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { reset } from '../features/auth/authSlice'
// import ChildData from '../components/ChildData'
// import { getChild } from '../features/child/childSlice'

function ChildDashboard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { parent } = useSelector((state) => state.auth)
    const { children, isLoading, isError, message } = useSelector(
        (state) => state.children
    )

    let child = null
    children.forEach(c => {
        if (window.location.href.includes(c._id)) {
            child = c
            console.log(child)
        } else {
            console.log("error")
        }
    })

    useEffect(() => {
        if (isError) {
            console.log(message)
        }

        if (!parent) {
            navigate('/login')
        }

        if (children.length === 0) {
            navigate('/')
        }

        return () => {
            dispatch(reset())
        }
    }, [parent, children, navigate, isError, message, dispatch])


    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className='content'>
                {children.length > 0 ? (
                    <div className='children'>
                        <h1>{child.username}</h1>
                    </div>
                ) : (
                    <h1>You does not have access to this child page</h1>
                )}
            </section>
        </>
    )
}

export default ChildDashboard