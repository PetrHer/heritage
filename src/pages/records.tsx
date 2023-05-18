import DeleteForm from "../components/DeleteForm";
import InputForm from "../components/InputForm";
import UpdateForm from "../components/UpdateForm";
import { api } from "../utils/api";
import { useEffect } from "react";
import Layout from "../components/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useSelector } from "react-redux";
import type { RootState } from "../utils/redux/store";

const Records = () => {
  const verification = api.authRouter.verify.useMutation();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const privileges:boolean = useSelector((state:RootState) => state.privileges.privileges);

  const { t } = useTranslation("records");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      verification.mutate(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div className="records">
        <div className="flex ">
          {!verification.isSuccess && <div>{t('notLogged')}</div>}
          {verification.isSuccess && !privileges && (
            <div>{t('noRights')}</div>
          )}
          {verification.isSuccess && privileges && <InputForm />}
          <br />
          {verification.isSuccess && privileges && <DeleteForm  />}
          <br />
          <br />
          {verification.isSuccess && privileges && <UpdateForm />}
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

