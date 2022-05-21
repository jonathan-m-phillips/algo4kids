// import { useDispatch } from 'react-redux'
// import { deleteGoal } from '../features/goals/goalSlice'

function ChildData({ child }) {
    // const dispatch = useDispatch()

    return (
        <div className="child">
            <div>
                <h2>{child.username}</h2>
                {new Date(child.createdAt).toLocaleString('en-US')}
            </div>
            {/* <button onClick={() => dispatch(deleteGoal(goal._id))} className="close">X</button> */}
        </div>
    )
}

export default ChildData