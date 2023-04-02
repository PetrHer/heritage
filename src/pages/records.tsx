import DeleteForm from "../components/DeleteForm";
import InputForm from "../components/InputForm";
import UpdateForm from "../components/UpdateForm";
import { api } from "../utils/api";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Records = () => {
  const verification = api.authRouter.verify.useMutation();
  const [priv, setPriv] = useState<boolean>(false);
  const privilegesCheck = api.authRouter.privilegeCheck.useMutation();

  const { t } = useTranslation("records");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      verification.mutate(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (verification.isSuccess) {
      privilegesCheck.mutate(verification.data as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verification.data]);

  useEffect(() => {
    if (privilegesCheck.data?.privileges?.privileges) {
      setPriv(privilegesCheck.data.privileges.privileges);
    }
  }, [privilegesCheck.data]);

  return (
    <Layout>
      <div className="records">
        <div className="flex ">
          {!verification.isSuccess && <div>{t('notLogged')}</div>}
          {verification.isSuccess && !priv && (
            <div>{t('noRights')}</div>
          )}
          {verification.isSuccess && priv && <InputForm />}
          <br />
          {verification.isSuccess && priv && <DeleteForm  />}
          <br />
          <br />
          {verification.isSuccess && priv && <UpdateForm />}
        </div>
      </div>
    </Layout>
  );
};

export default Records;
export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      ...(await serverSideTranslations(locale, ["records", "navmenu","inputForm","deleteForm","updateForm"])),
      // Will be passed to the page component as props
    },
  };
}

