import {useEffect} from 'react'
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests } from '../utils/requestSlice';

const Requests = () => {
    const dispatch = useDispatch();
    const requestsData = useSelector(store => store.requests);

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received", {
                withCredentials: true,
            });

            dispatch(addRequests(res.data.data));
        } catch (err) {
            //TODO: Handle error
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    return (!requestsData?.length ? <h1>No Requests Found!</h1> :
        <div className='text-center my-10'>
            <h1 className='text-bold text-white text-3xl'>Requests</h1>
            {requestsData.map((request, i) => {
                const {firstName, lastName, photoUrl, age, gender, about} = request.fromUserId;
                return(
                    <div key={firstName + i} className='flex m-4 p-4 justify-between rounded-lg bg-base-300 w-1/2 mx-auto'>
                        <div>
                            <img alt="photo" className="w-20 h-20" src={photoUrl}/>
                        </div>
                        <div className='text-left mx-4'>
                            <h2 className='font-bold text-xl'>{firstName + " " + lastName}</h2>
                            {age && gender && <p>{age + ", " + gender}</p>}
                            <p>{about}</p>
                        </div>
                        <div>
                            <button className="btn btn-primary mx-2">Accept</button>
                            <button className="btn btn-secondary mx-2">Reject</button>
                        </div>
                    </div>)
            })}
        </div>)
}

export default Requests;