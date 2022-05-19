import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ChildForm from '../components/ChildForm'
import ChildData from '../components/ChildData'
import Spinner from '../components/Spinner'
import { getChildren } from '../features/child/childSlice'
import { reset } from '../features/auth/authSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { parent } = useSelector((state) => state.auth)
  const { children, isLoading, isError, message } = useSelector(
    (state) => state.children
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!parent) {
      navigate('/login')
    }

    dispatch(getChildren())

    return () => {
      dispatch(reset())
    }
  }, [parent, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {parent && parent.name}</h1>
        <p>Dashboard</p>
      </section>

      {/* This shows all the children data */}
      <section className='content'>
        {children.length > 0 ? (
          <div className='children'>
            {children.map((child) => (
              <ChildData key={child._id} child={child} />
            ))}
          </div>
        ) : (
          <ChildForm />
        )}
      </section>
    </>
  )
}

export default Dashboard