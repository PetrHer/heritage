import { useEffect, useState } from "react";
import GenealogyChart from "../components/GenealogyChart";
import { api } from "../utils/api";
import PersonDetail from "../components/PersonDetail";
import style from "../styles/PersonDetail.module.css";
import Layout from "../components/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const PersonChart = () => {
  const [id, setId] = useState<number>();
  const [privileges, setPrivileges] = useState<boolean>(false);
 const { t } = useTranslation("genealogy_chart");
  useEffect(() => {
    setId(Number(sessionStorage.getItem("id")));
  }, []);
  const changeId = (x: number) => {
    sessionStorage.setItem("id", x.toString());
    setId(x);
  };

  const response = api.dbRouter.getPerson.useMutation();
  useEffect(() => {
    if (id) response.mutate(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);


  return (
    <Layout
      setPrivileges={setPrivileges}
    >
      <div>
        <div className="genContent ">
          <div className={style.container}>
            <h1>{t('detail_header')}</h1>
            {id && (
              <PersonDetail
                id={id}
                privileges={privileges}
                setID={(x) => setId(x)}
              />
            )}
          </div>
          {response.data && (
            <GenealogyChart
              changeId={changeId}
              person={response.data}
              id={response.data.id}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};
export default PersonChart;
export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      ...(await serverSideTranslations(locale, ["genealogy_chart", "navmenu","personDetail","chartDetail"])),
      // Will be passed to the page component as props
    },
  };
}
