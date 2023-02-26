import React, { useState }  from 'react';
import './Login.css';
import PropTypes from 'prop-types';

async function loginUser(credentials) {
    return fetch('https://backend-hackthon.herokuapp.com/login', {
      method: 'POST',
    //   mode: 'no-cors',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
      body: JSON.stringify(credentials)
    }).catch(error => {
        window.alert(error);
        return;
    })
      .then(data => data.json())
}




export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
          username,
          password
        });
        setToken(token);
    }

  return(
    <div id = "login-main">
    <div className="login-wrapper">
    <h1>Please Log In</h1>
    <form onSubmit={handleSubmit}>
        <div className='row-wrapper'>
      <label>
        <p>Username</p>
        <input type="text" onChange={e => setUserName(e.target.value)}/>
      </label>
      <label>
        <p>Password</p>
        <input type="password" onChange={e => setPassword(e.target.value)}/>
      </label>
      <div>
        <button id="login-bnt" type="submit">Login</button>
      </div>
      </div>
    </form>
    <div id='slogan'>
    <h2 className='slogan'>Finance can be complex</h2>
    <h2 className='slogan'>We are here to help!</h2>
    </div>
    </div>
    <img id='login-image' src='https://img.freepik.com/free-vector/woman-investing-getting-profit_74855-11229.jpg?w=2000&t=st=1674091042~exp=1674091642~hmac=b592c0d28db2d8ecaf3d99536dc456e00c7fdc069394561f55a050925d6c6bbc' alt="decorative"></img>
    </div>
  )
}
Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }