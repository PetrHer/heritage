import { useRef } from "react";
import { api } from "../utils/api";
import Layout from "../components/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Registration = () => {
  const { t } = useTranslation("registration");
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
  return (
    <Layout >
      <div className="registration">
        {!reg.isSuccess && (
          <>
            {" "}
            <div>{t('username')}</div>
            <input className="border" ref={username} type="text" />
            <br />
            <div>Email :</div>
            <input type="email" className="border" ref={email} />
            <br />
            <div>{t('password')}</div>
            <input className="border" ref={password} type="password" />
            <br />
            <div>{t('confirm_password')}</div>
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
              {t('registration_button')}
            </button>
          </>
        )}
        {reg.isSuccess && <div>{t('succes')}</div>}
      </div>
    </Layout>
  );
};

export default Registration;
export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      ...(await serverSideTranslations(locale, ["registration", "navmenu"])),
      // Will be passed to the page component as props
    },
  };
}

