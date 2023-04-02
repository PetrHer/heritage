import Layout from "../components/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Index = () => {
  const { t } = useTranslation("common");

  return (
    <Layout>
      <main className="indexContent">
        <h1 className="text-3xl">{t("header")} </h1>
        <div>
          {t("mainContent")}
          <br />
          Petr Herynek
        </div>
      </main>
    </Layout>
  );
};

export default Index;

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      ...(await serverSideTranslations(locale, ["common", "navmenu"])),
      // Will be passed to the page component as props
    },
  };
}
