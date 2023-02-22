import React, { useRef } from "react";
import NavMenu from "../components/NavMenu";
import { api } from "../utils/api";

const Registration = () => {
  const username = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmed_password = useRef<HTMLInputElement>(null);
  const reg = api.authRouter.registration.useMutation();
  const register = () => {
    if (
      username.current?.value &&
      password.current?.value &&
      confirmed_password.current?.value &&
      email.current?.value
    )
      reg.mutate({
        username: username.current.value,
        password: password.current.value,
        confirmed_password: confirmed_password.current.value,
        email: email.current.value
      });
  };
  if (reg.isError) {
    alert(reg.error.message);
  }
  return (
    <>
      <NavMenu />
      <div className="registration">
        {!reg.isSuccess && (<> <div>username :</div>
          <input className="border" ref={username} type="text" />
          <br />
          <div>email :</div>
          <input type="email" className="border" ref={email} />
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
          </button></>)}
          {reg.isSuccess && (<div>Registration succesfull, verification email sent.</div>)}
      </div>
    </>
  );
};

export default Registration;
