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

  return (
    <div className='flex justify-center my-20'>
        <div className="card bg-base-200 w-96 shadow-sm">
            <div className="card-body" onKeyDown={(e) => onKeyDownLogin(e)}>
                <h2 className="card-title justify-center">Login</h2>
                    <div>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Email ID</legend>
                            <input 
                                type="text" 
                                value={emailId} 
                                className="input"
                                onChange={(e) => setEmailId(e.target.value)}
                            />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Password</legend>
                            <input 
                                type="password"
                                value={password}
                                className="input"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </fieldset>
                    </div>
                <p className='text-red-500'>{error}</p>
                <div className="card-actions justify-center">
                    <button id="login-btn"
                        className="btn btn-primary"
                        onClick={handleLogin}
                        onKeyDown={(e) => onKeyDownLogin(e)}>
                            Login
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login;