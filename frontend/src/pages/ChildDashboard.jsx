import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { reset } from '../features/auth/authSlice'
import { getAvatars } from '../features/avatar/avatarSlice'
import AvatarForm from '../components/AvatarForm'
import AvatarData from '../components/AvatarData'

function ChildDashboard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { parent } = useSelector((state) => state.auth)
    const { children } = useSelector((state) => state.children)
    const { avatars, isLoading, isError, message } = useSelector(
        (state) => state.avatars
    )

    const currLocation = window.location.href

    // if child id is in parameter
    let child = null
    children.forEach(c => {
        if (currLocation.includes(c._id)) {
            child = c
        }
    })

    // if child id is in avatar
    let avatar = null
    avatars.forEach(a => {
        if (currLocation.includes(a.child)) {
            avatar = a
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

        dispatch(getAvatars())

        return () => {
            dispatch(reset())
        }
    }, [parent, children, navigate, isError, message, dispatch])


    if (isLoading) {
        return <Spinner />
    }


    // if child exists then display child
    if (children.length > 0) {

        // If avatar exists already display avatar
        if (avatar) {
            return (
                <div>
                    <div className='child'>
                        <h1>{child.username}</h1>
                    </div>
                    <div>
                        <div >
                            <AvatarData key={avatar._id} avatar={avatar} />
                        </div>
                    </div>
                </div>
            )

            // If avatar does not exist then create one
        } else {
            return (
                <div>
                    <div className='child'>
                        <h1>{child.username}</h1>
                    </div>
                    <div>
                        <AvatarForm />
                    </div>
                </div>
            )
        }

        // If child does not exist for user then return no child present
    } else {
        return (
            <h1>No Child Present</h1>
        )
    }
}

export default ChildDashboard