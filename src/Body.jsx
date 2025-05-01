import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavBar from './NavBar'
import Footer from './Footer'
import { BASE_URL } from './utils/constants';
import axios from 'axios';
import { addUser } from './utils/userSlice';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
            withCredentials: true
        });
      
      dispatch(addUser(res.data));
    }
    catch (error) {
      if (error.status === 401) {
        // Handle unauthorized access, e.g., redirect to login
        navigate("/login");
      }
      // Optionally, you can handle other types of errors or log the error for debugging purposes here
      console.error("Error fetching user data", error);
    }
  };
  // Fetch user data when the component mounts so that the user is available in the store
  // so that the user can stay logged in upon page refresh

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
        <NavBar />
        <Outlet />
        <Footer />
    </>
  )
}

export default Body
