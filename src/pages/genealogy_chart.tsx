import React, { useEffect, useState } from "react";
import NavMenu from "../components/NavMenu";
import GenealogyChart from "../components/GenealogyChart";
import { api } from "../utils/api";
import Head from "next/head";
import PersonDetail from "../components/PersonDetail";
import style from "../styles/PersonDetail.module.css";

const PersonId = () => {
  const [id, setId] = useState<number>();
  const [translatedContent, setTranslatedContent] = useState<{
    detail_header: string;
  }>({ detail_header: "Vítejte" });
  const [language, setLanguage] = useState<string>("cz");

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
  useEffect(() => {
    switch (language) {
      case "cz":
        setTranslatedContent({ detail_header: "Údaje :" });
        break;

      case "en":
        setTranslatedContent({ detail_header: "Detail :" });
        break;
    }
  }, [language]);

  return (
    <div >
      <Head>
        <title>Herytage</title>
        <meta name="description" content="heritage of Petr Herynek" />
      </Head>
      <NavMenu mainContentLanguage={(x: string) => setLanguage(x)} />
      <div className="genContent ">
        <div className={style.container}>
          <h1>{translatedContent.detail_header}</h1>
          <PersonDetail id={id} language={language} />
        </div>
        {response.data && (
          <GenealogyChart
            language={language}
            changeId={changeId}
            person={response.data}
            id={response.data.id}
          />
        )}
      </div>
    </div>
  );
};
export default PersonId;
