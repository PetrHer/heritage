import React, { useRef } from "react";
import NavMenu from "../components/NavMenu";
import { api } from "../utils/api";

const Registration = () => {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmed_password = useRef<HTMLInputElement>(null);
  const reg = api.authRouter.registration.useMutation();
  const register = () => {
    if (
      username.current?.value &&
      password.current?.value &&
      confirmed_password.current?.value
    )
      reg.mutate({
        username: username.current.value,
        password: password.current.value,
        confirmed_password: confirmed_password.current.value,
      });
  };
  if (reg.isError) {
    alert(reg.error.message);
  }
  if (reg.isSuccess) {
    window.location.href = "/login";
  }
  return (
    <>
      <NavMenu />
      <div className="registration">
        <div>username :</div>
        <input className="border" ref={username} type="text" />
        <br />
        <div>password :</div>
        <input className="border" ref={password} type="password" />
        <br />
        <div>confirm password : </div>
        <input className="border" ref={confirmed_password} type="password" />
        <br />
        <button
          onClick={register}
          className="w-16 rounded-xl border border-black bg-blue-300"
        >
          register
        </button>
      </div>
    </>
  );
};

export default Registration;
