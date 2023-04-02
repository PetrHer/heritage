import  { useRef } from "react";
import { api } from "../utils/api";
import Layout from "../components/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Login = () => {
  const { t } = useTranslation("login");
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
    <Layout>
      <div className="login">
        <div>{t('username')}</div>
        <input
          className="border"
          test-id="username"
          ref={username}
          type="text"
        />
        <br />
        <div>{t('password')}</div>
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
          {t('login_button')}
        </button>
      </div>
    </Layout>
  );
};

export default Login;

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      ...(await serverSideTranslations(locale, ["login", "navmenu"])),
      // Will be passed to the page component as props
    },
  };
}
