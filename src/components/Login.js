import React from 'react';
import GoogleLogin from 'react-google-login'
import { BrowserRouter as Router,useHistory} from 'react-router-dom'


import '../assets/css/App.css'


function Login() {
    
    const history = useHistory();
    let Repsonse = (response)=>{
          history.push({
            pathname: '/Mainpage',
            state: { detail: response.profileObj }
        });
    }
    return (
        <Router>
        <div className='container'>
            <h1>Conflux</h1>
            <GoogleLogin
                clientId="1091976309647-sc0eo4a1hbrgt5c9332v1mht00vo5ls0.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={Repsonse}
                cookiePolicy={'single_host_origin'}
            />
        </div>
        </Router>
    );
}

export default Login;
