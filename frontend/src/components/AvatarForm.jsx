import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createAvatar } from '../features/avatar/avatarSlice'

function AvatarForm() {
    const [avatarData, setAvatarData] = useState({
        child: '',
        bodyType: '',
        clothing: '',
        face: '',
        mouth: '',
        nose: '',
        eyes: '',
        skinColor: '',
        accessories: '',
        hairColor: '',
        hairStyle: '',
    })

    const { child, bodyType, clothing,
        face, mouth, nose,
        eyes, skinColor, accessories,
        hairColor, hairStyle } = avatarData

    const dispatch = useDispatch()

    const onChange = (e) => {
        setAvatarData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const currLocation = window.location.href
    const getId = currLocation.split("/", 4)
    const childId = getId[3]

    const onSubmit = (e) => {
        e.preventDefault()

        const avatarData = {
            child: childId,
            bodyType,
            clothing,
            face,
            mouth,
            nose,
            eyes,
            skinColor,
            accessories,
            hairColor,
            hairStyle,
        }

        dispatch(createAvatar(avatarData))
        setAvatarData({
            bodyType: '',
            clothing: '',
            face: '',
            mouth: '',
            nose: '',
            eyes: '',
            skinColor: '',
            accessories: '',
            hairColor: '',
            hairStyle: '',
        })
    }

    return (
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="text">
                        Create your avatar
                    </label>
                    {/* <input
                        type="hidden"
                        name="createdBy"
                        id="createdBy"
                        value={child}
                        onChange={onChange}
                    /> */}
                    <input
                        type="text"
                        name="bodyType"
                        id="bodyType"
                        value={bodyType}
                        placeholder='Choose Body Type'
                        onChange={onChange}
                    />
                    <input
                        type="text"
                        name="clothing"
                        id="clothing"
                        value={clothing}
                        placeholder='Choose clothing'
                        onChange={onChange}
                    />
                    <input
                        type="text"
                        name="face"
                        id="face"
                        value={face}
                        placeholder='Choose face'
                        onChange={onChange}
                    />
                    <input
                        type="text"
                        name="mouth"
                        id="mouth"
                        value={mouth}
                        placeholder='Choose mouth'
                        onChange={onChange}
                    />
                    <input
                        type="text"
                        name="nose"
                        id="nose"
                        value={nose}
                        placeholder='Choose nose'
                        onChange={onChange}
                    />
                    <input
                        type="text"
                        name="eyes"
                        id="eyes"
                        value={eyes}
                        placeholder='Choose eyes'
                        onChange={onChange}
                    />
                    <input
                        type="text"
                        name="skinColor"
                        id="skinColor"
                        value={skinColor}
                        placeholder='Choose skinColor'
                        onChange={onChange}
                    />
                    <input
                        type="text"
                        name="accessories"
                        id="accessories"
                        value={accessories}
                        placeholder='Choose accessories'
                        onChange={onChange}
                    />
                    <input
                        type="text"
                        name="hairColor"
                        id="hairColor"
                        value={hairColor}
                        placeholder='Choose hairColor'
                        onChange={onChange}
                    />
                    <input
                        type="text"
                        name="hairStyle"
                        id="hairStyle"
                        value={hairStyle}
                        placeholder='Choose hairStyle'
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-block" type="submit">
                        Create Avatar
                    </button>
                </div>
            </form>
        </section>
    )
}

export default AvatarForm