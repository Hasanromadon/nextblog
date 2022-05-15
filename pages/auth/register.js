import React, { useState } from 'react';
export default function Register() {
  const [fields, setFields] = useState({
    email: '',
    password: '',
  });

  async function registerHandler(e) {
    e.preventDefault();

    const registerReq = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(fields),
      headers: {
        'content-Type': 'application/json',
      },
    });
    const registerRes = await registerReq.json();
    console.log(fields);
    console.log(registerRes);
  }

  function fieldHandler(e) {
    const name = e.target.getAttribute('name');
    setFields({
      ...fields,
      [name]: e.target.value,
    });
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={registerHandler.bind(this)}>
        <input
          name="email"
          type="email"
          onChange={fieldHandler.bind(this)}
          placeholder="Email"
        />
        <br />
        <input
          name="password"
          onChange={fieldHandler.bind(this)}
          type="password"
          placeholder="Password"
        />
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}
