import axios from 'axios';
import {useState} from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';
import { onKeyDownLogin } from '../utils/helperFunctions';

const Login = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLoginForm, setIsLoginForm] =  useState(true);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const handleLogin = async () => {
    
        try {
            const res = await axios.post(
                BASE_URL + "/login", 
                {
                    emailId,
                    password,
                },
                { withCredentials: true} // This is important to include cookies in the request
            );
            dispatch(addUser(res.data));
            navigate("/");
        } catch (error) {
            setError(error?.response?.data);
            console.error("Login failed", error);
        }
    };

    const handleSignUp = async () => {
        try {
            const res = await axios.post(
                BASE_URL + "/signup",
                { firstName, lastName, emailId, password },
                { withCredentials: true }
            );
            dispatch(addUser(res.data?.data));
            navigate("/profile");
        } catch (err) {
            setError(err?.response?.data); 
        }
    };

  return (
    <div className='flex justify-center my-20'>
        <div className="card bg-base-200 w-96 shadow-sm">
            <div className="card-body" onKeyDown={(e) => onKeyDownLogin(e)}>
                <h2 className="card-title justify-center">
                    {isLoginForm ? "Login" : "Sign Up"}
                </h2>
                    <div>
                    {!isLoginForm && <>
                        <label className='form-control w-full max-w-xs my-4'>
                                <div className='label'>
                                    <span className='label-text'>First Name</span>
                                </div>
                            <input 
                                type="text" 
                                value={firstName} 
                                className="input"
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </label>
                        <label className='form-control w-full max-w-xs my-4'>
                                <div className='label'>
                                    <span className='label-text'>Last Name</span>
                                </div>
                            <input 
                                type="text"
                                value={lastName}
                                className="input"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </label>
                        </>}
                        <label className='form-control w-full max-w-xs my-4'>
                                <div className='label'>
                                    <span className='label-text'>Email Id</span>
                                </div>
                            <input 
                                type="text" 
                                value={emailId} 
                                className="input"
                                onChange={(e) => setEmailId(e.target.value)}
                            />
                        </label>
                        <label className='form-control w-full max-w-xs my-4'>
                                <div className='label'>
                                    <span className='label-text'>Password</span>
                                </div>
                            <input 
                                type="password"
                                value={password}
                                className="input"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                    </div>
                <p className='text-red-500'>{error}</p>
                <div className="card-actions justify-center">
                    <button id="login-btn"
                        className="btn btn-primary"
                        onClick={isLoginForm ? handleLogin : handleSignUp}
                        onKeyDown={(e) => onKeyDownLogin(e)}>
                            {isLoginForm ? "Login" : "Sign Up"}
                    </button>
                </div>
                <p className='m-auto cursor-pointer' onClick={() => setIsLoginForm(value => !value)}>
                    {isLoginForm 
                    ? "New User? Sign Up Here" 
                    : "Existing User? Login Here"}
                </p>
            </div>
        </div>
    </div>
  )
}

export default Login;