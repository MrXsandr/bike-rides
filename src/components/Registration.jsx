import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function Registration({ setCurrUser }) {
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const changeHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    fetch('api/v1/auth/registration', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
      .then((res) => res.json())
      .then((data) => setCurrUser(data))
      .then(navigate('/'));
  };

  return (
    <Form onSubmit={submitHandler}>

      <div className="login-box">
        <h2>SignUp</h2>
        <div className="user-box">
          <input
            name="name"
            type="text"
            placeholder="Enter name"
            onChange={changeHandler}
            value={input.name}
          />
          <label>Username</label>
        </div>
        <div className="user-box">
          <input
            name="email"
            type="email"
            placeholder="Enter email"
            onChange={changeHandler}
            value={input.email}
          />
          <label>Username</label>
        </div>
        <div className="user-box">
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={changeHandler}
            value={input.password}
          />
          <label>Password</label>
        </div>
        <div className="wrap">
          <button className="glow-on-hover">Submit</button>
        </div>
      </div>

    </Form>

  );
}

export default Registration;
