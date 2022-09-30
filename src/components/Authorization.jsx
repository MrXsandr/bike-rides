import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Authorization({ setCurrUser }) {
  const navigate = useNavigate();
  const [err, setErr] = useState('');
  const [input, setInput] = useState({
    email: '',
    password: '',
  });
  const inputHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    fetch('/api/v1/auth/authorization', { // поменять на начало адреса как в апироутер
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    })
      .then((res) => res.json())
      .then((data) => setCurrUser(data))
      .then(navigate('/')); // для редиректа на главную
  };

  return (
    <Form onSubmit={submitHandler}>
      <div className="login-box">
        <h2>SignUp</h2>

        <div className="user-box">
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            value={input.email}
            onChange={inputHandler}
          />
          <label>Username</label>
        </div>
        <div className="user-box">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={input.password}
            onChange={inputHandler}
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
