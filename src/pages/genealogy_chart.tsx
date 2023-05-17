import { useEffect, useState } from "react";
import GenealogyChart from "../components/GenealogyChart";
import { api } from "../utils/api";
import PersonDetail from "../components/PersonDetail";
import style from "../styles/PersonDetail.module.css";
import Layout from "../components/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import {  useSelector } from 'react-redux';
import type {RootState}  from '../utils/redux/store';

const PersonChart = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
  const id:number = useSelector((state:RootState) => state.id.id);
  const [privileges, setPrivileges] = useState<boolean>(false);
 const { t } = useTranslation("genealogy_chart");

  const response = api.dbRouter.getPerson.useQuery(id);
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
                privileges={privileges}
              />
            )}
          </div>
          {response.data && (
            <GenealogyChart
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
