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
  return (
    <div>
      <NavMenu />
      <div>username :</div>
      <input className="border" ref={username} type="text" />
      <br />
      <div>password :</div>
      <input ref={password} className="border" type="password" />
      <br />
      <button onClick={login} className='border'>login</button>
    </div>
  );
};

export default Login;
