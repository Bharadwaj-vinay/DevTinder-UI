import {useEffect} from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {addFeed} from './utils/feedSlice';
import { BASE_URL } from './utils/constants';

const Feed = () => {
    const dispatch = useDispatch();
    const feedData = useSelector(store => store.feed);

    const getFeed = async () => {
        if(!feedData) {
            try {
                const res = await axios.get(BASE_URL + "/user/feed", {
                    withCredentials: true,
                });
                console.log(res);
                dispatch(addFeed(res.data));
            } catch (err) {
                //TODO: add error page
            }
        }
    };

    useEffect(() => {
        getFeed();
    }, []);


  return (
    <div>Feed</div>
  )
}

export default Feed