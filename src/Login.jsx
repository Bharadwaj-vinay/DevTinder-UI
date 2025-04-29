import React from 'react'

const Login = () => {
  return (
    <div className='flex justify-center my-20'>
        <div className="card bg-base-200 w-96 shadow-sm">
            <div className="card-body">
                <h2 className="card-title justify-center">Login</h2>
                    <div>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Email ID</legend>
                            <input type="text" className="input"/>
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Password</legend>
                            <input type="password" className="input"/>
                        </fieldset>
                    </div>
                <div className="card-actions justify-center">
                    <button className="btn btn-primary">Login</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login