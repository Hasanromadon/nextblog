import React, { useState } from 'react';
import Cookie from 'js-cookie';
import { unauthPage } from '../../middlewares/authorizationPage';
import Router from 'next/router';
export async function getServerSideProps(ctx) {
  // get cookies from server not browser
  await unauthPage(ctx);

  return {
    props: {},
  };
}

export default function Login() {
  const [fields, setFields] = useState({
    email: '',
    password: '',
  });

  const [status, setStatus] = useState();

  async function loginHandler(e) {
    e.preventDefault();

    const loginReq = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(fields),
      headers: {
        'content-Type': 'application/json',
      },
    });
    if (!loginReq.ok) return setStatus('error' + loginReq.status);
    const loginRes = await loginReq.json();
    setStatus('success');

    Cookie.set('token', loginRes.token);
    Router.push('/posts'); //redirect in browser
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
      <span>status: {status}</span>
      <h1>Login</h1>
      <form onSubmit={loginHandler.bind(this)}>
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
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}
