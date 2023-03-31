import { useRef, useState, useEffect } from "react";
import { api } from "../utils/api";
import Layout from "../components/Layout";

const Registration = () => {
  const [translatedContent, setTranslatedContent] = useState<{
    username: string;
    password: string;
    confirm_password: string;
    registration_button: string;
    succes: string;
  }>({
    username: "Uživatelské jméno :",
    password: "Heslo :",
    confirm_password: "Potvrdit heslo :",
    registration_button: "Přihlásit",
    succes: "Registrace úspěšná, potvrzovací email byl odeslán.",
  });
  const [language, setLanguage] = useState<string>("cz");
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
        email: email.current.value,
      });
  };
  if (reg.isError) {
    alert(reg.error.message);
  }
  useEffect(() => {
    switch (language) {
      case "cz":
        setTranslatedContent({
          username: "Uživatelské jméno :",
          password: "Heslo :",
          registration_button: "Registrovat se",
          confirm_password: "Potvrdit heslo :",
          succes: "Registrace úspěšná, potvrzovací email byl odeslán.",
        });
        break;

      case "en":
        setTranslatedContent({
          username: "Username :",
          password: "Password :",
          registration_button: "Sign up",
          confirm_password: "Confirm password :",
          succes: "Registration succesfull, verification email has been sent.",
        });
        break;
    }
  }, [language]);
  return (
    <Layout mainContentLanguage={(x: string) => setLanguage(x)}>
      <div className="registration">
        {!reg.isSuccess && (
          <>
            {" "}
            <div>{translatedContent.username}</div>
            <input className="border" ref={username} type="text" />
            <br />
            <div>Email :</div>
            <input type="email" className="border" ref={email} />
            <br />
            <div>{translatedContent.password}</div>
            <input className="border" ref={password} type="password" />
            <br />
            <div>{translatedContent.confirm_password}</div>
            <input
              className="border"
              ref={confirmed_password}
              type="password"
            />
            <br />
            <button
              onClick={register}
              className="w-28 rounded-xl border border-black bg-blue-300"
            >
              {translatedContent.registration_button}
            </button>
          </>
        )}
        {reg.isSuccess && <div>{translatedContent.succes}</div>}
      </div>
    </Layout>
  );
};

export default Registration;
