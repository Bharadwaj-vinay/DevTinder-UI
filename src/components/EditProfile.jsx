import {useState} from 'react'
import axios from 'axios';
import UserCard from './UserCard';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({user}) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age);
    const [about, setAbout] = useState(user.about);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [gender, setGender] = useState(user.gender);
    const [error, setError] = useState("");
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    const saveProfile = async () => {
        setError('');
        try {
            const res = await axios.patch(BASE_URL + '/profile/edit', {
                firstName,
                lastName,
                age,
                about,
                photoUrl,
                gender,
            }, {withCredentials: true});

            dispatch(addUser(res.data.data));
            setShow(true);
            setTimeout(() => setShow(false), 2000);
        } catch (err) {
            setError(err.response.data);
        }
    };

    return (<>
        <div className='flex justify-center my-10'>
            <div className='flex justify-center mx-10'>
            <div className="card bg-base-200 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title justify-center">Edit Profile</h2>
                        <div>
                            <label className='form-control w-full max-w-xs my-2'>
                                <div className='label'>
                                    <span className='label-text'>First Name</span>
                                </div>
                                <input
                                    type="text" 
                                    value={firstName} 
                                    className="input input-bordered w-full max-w-xs"
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </label>
                            <label className='form-control w-full max-w-xs my-2'>
                                <div className='label'>
                                    <span className='label-text'>Last Name</span>
                                </div>
                                <input
                                    type="text" 
                                    value={lastName} 
                                    className="input input-bordered w-full max-w-xs"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </label>
                            <label className='form-control w-full max-w-xs my-2'>
                                <div className='label'>
                                    <span className='label-text'>About</span>
                                </div>
                                <input
                                    type="text" 
                                    value={about} 
                                    className="input input-bordered w-full max-w-xs"
                                    onChange={(e) => setAbout(e.target.value)}
                                />
                            </label>
                            <label className='form-control w-full max-w-xs my-2'>
                                <div className='label'>
                                    <span className='label-text'>Age</span>
                                </div>
                                <input
                                    type="number" 
                                    value={age} 
                                    className="input input-bordered w-full max-w-xs"
                                    onChange={(e) => setAge(e.target.value)}
                                />
                            </label>
                            <label className='form-control w-full max-w-xs my-2'>
                                <div className='label'>
                                    <span className='label-text'>Gender</span>
                                </div>
                                <input
                                    type="text" 
                                    value={gender} 
                                    className="input input-bordered w-full max-w-xs"
                                    onChange={(e) => setGender(e.target.value)}
                                />
                            </label>
                            <label className='form-control w-full max-w-xs my-2'>
                                <div className='label'>
                                    <span className='label-text'>Photo</span>
                                </div>
                                <input
                                    type="text" 
                                    value={photoUrl} 
                                    className="input input-bordered w-full max-w-xs"
                                    onChange={(e) => setPhotoUrl(e.target.value)}
                                />
                            </label>
                        </div>
                        <p className='bg-color-red'>{error}</p>
                    <div className="card-actions flex justify-center">
                        <button id="login-btn" onClick={saveProfile} className="btn btn-primary">
                            Save Profile
                        </button>
                    </div>
                </div>
            </div>
            </div>
            <UserCard user={{firstName, lastName, age, about, photoUrl, gender}}/>
        </div>
        {show &&<div className="toast toast-top toast-start">
            <div className="alert alert-success">
                <span>Profile saved successfully.</span>
            </div>
        </div>}
    </>
        )
};

export default EditProfile;