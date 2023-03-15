import Head from "next/head";
import React, { useRef, useState, useEffect } from "react";
import NavMenu from "../components/NavMenu";
import { api } from "../utils/api";

const Login = () => {
  const [translatedContent, setTranslatedContent] = useState<{
    username: string;
    password: string;
    login_button: string;
  }>({
    username: "Uživatelské jméno :",
    password: "Heslo :",
    login_button: "Přihlásit",
  });
  const [language, setLanguage] = useState<string>("cz");
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
  useEffect(() => {
    switch (language) {
      case "cz":
        setTranslatedContent({
          username: "Uživatelské jméno :",
          password: "Heslo :",
          login_button: "Přihlásit",
        });
        break;

      case "en":
        setTranslatedContent({
          username: "Username :",
          password: "Password :",
          login_button: "Sign in",
        });
        break;
    }
  }, [language]);
  return (
    <>
      <Head>
        <title>Herytage</title>
        <meta name="description" content="heritage of Petr Herynek" />
      </Head>
      <NavMenu mainContentLanguage={(x: string) => setLanguage(x)} />
      <div className="login">
        <div>{translatedContent.username}</div>
        <input
          className="border"
          test-id="username"
          ref={username}
          type="text"
        />
        <br />
        <div>{translatedContent.password}</div>
        <input
          ref={password}
          test-id="password"
          className="border"
          type="password"
        />
        <br />
        <button
          onClick={login}
          test-id="signin"
          className="w-20 rounded-xl border border-black bg-blue-300"
        >
          {translatedContent.login_button}
        </button>
      </div>
    </>
  );
};

export default Login;
