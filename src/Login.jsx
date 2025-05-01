import axios from 'axios';
import {useState} from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from './utils/userSlice';

const Login = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleLogin = async () => {
        try {
            const res = await axios.post(
                "http://localhost:7777/login", 
                {
                    emailId,
                    password,
                },
                { withCredentials: true} // This is important to include cookies in the request
            );
            dispatch(addUser(res.data));
        } catch (error) {
            console.error("Login failed", error);
        }
    };

  return (
    <div className='flex justify-center my-20'>
        <div className="card bg-base-200 w-96 shadow-sm">
            <div className="card-body">
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
                <div className="card-actions justify-center">
                    <button 
                        className="btn btn-primary"
                        onClick={handleLogin}
                        >
                        Login</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login