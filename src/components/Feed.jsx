import {useEffect} from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import UserCard from './UserCard';
import {addFeed} from '../utils/feedSlice';
import { BASE_URL } from '../utils/constants';

const Feed = () => {
    const dispatch = useDispatch();
    const feedData = useSelector(store => store.feed);

    const getFeed = async () => {
        if(!feedData) {
            try {
                const res = await axios.get(BASE_URL + "/user/feed", {
                    withCredentials: true,
                });

                dispatch(addFeed(res.data));
            } catch (err) {
                //TODO: add error page
            }
        }
    };

    useEffect(() => {
        getFeed();
    }, []);


  return (!feedData?.data?.length ? <h1 className='flex justify-center my-10  '>No users Found!</h1> :  
    <div className='flex justify-center my-10'>
        <UserCard user={feedData.data[0]}/>
    </div>
  )
}

export default Feed;