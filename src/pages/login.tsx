import Head from "next/head";
import React, { useRef } from "react";
import NavMenu from "../components/NavMenu";
import { api } from "../utils/api";

const Login = () => {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const loginMethod = api.authRouter.login.useMutation();
  const login = () => {
    if (username.current?.value && password.current?.value) {
      loginMethod.mutate({
        username: username.current.value,
        password: password.current.value,
      });
    }
  };
  if (loginMethod.isSuccess && loginMethod.data) {
    localStorage.setItem("token", loginMethod.data);
    window.location.href = "/";
  }
  if (loginMethod.isError) {
    alert(loginMethod.error.message);
  }
  return (<>
    <Head>
      <title>Herytage</title>
      <meta name="description" content="heritage of Petr Herynek" />
    </Head>
    <NavMenu />
    <div className="login">
      <div>username :</div>
      <input className="border" test-id='username' ref={username} type="text" />
      <br />
      <div>password :</div>
      <input ref={password} test-id='password' className="border" type="password" />
      <br />
      <button onClick={login} test-id='signin' className='w-16 border border-black rounded-xl bg-blue-300'>login</button>
    </div>
  </>
  );
};

export default Login;
