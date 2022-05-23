// import { useDispatch } from 'react-redux'
// import { deleteGoal } from '../features/goals/goalSlice'

function AvatarData({ avatar }) {
    // const dispatch = useDispatch()

    return (
        <div className="avatar">
            <div>
                <h2>{avatar.bodyType}</h2>
                {/* {new Date(avatar.createdAt).toLocaleString('en-US')} */}
            </div>
            {/* <button onClick={() => dispatch(deleteGoal(goal._id))} className="close">X</button> */}
        </div>
    )
}

export default AvatarData