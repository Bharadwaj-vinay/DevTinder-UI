import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {removeUser} from '../utils/feedSlice';
import { BASE_URL } from '../utils/constants';

const UserCard = ({user}) => {
    const {firstName, lastName, photoUrl, age, gender, about, _id} = user;
    const dispatch = useDispatch();

    const handleSendRequest = async (status, userId) => {
        try {
            const res = await axios.post(
                BASE_URL + "/request/send/" + status + "/" + userId,
                {},
                {withCredentials: true}
            );
            dispatch(removeUser(userId));
        } catch (err) {
            //TODO:
        }
    };

    return (
        <div className="card bg-base-300 w-96 shadow-sm py-5">
            <figure>
                <img
                src={photoUrl}
                alt="Photo" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                <p>{about}</p>
                <div className="card-actions justify-center my-4">
                    <button className="btn btn-primary"
                        onClick={() => handleSendRequest("interested", _id)}>
                        Interested
                    </button>
                    <button className="btn btn-secondary"
                        onClick={() => handleSendRequest("ignore", _id)} 
                    >
                        Ignore
                    </button>
                </div>
            </div>
        </div>);
}

export default UserCard;