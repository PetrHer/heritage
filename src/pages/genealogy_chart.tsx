import { useEffect, useState } from "react";
import GenealogyChart from "../components/GenealogyChart";
import { api } from "../utils/api";
import PersonDetail from "../components/PersonDetail";
import style from "../styles/PersonDetail.module.css";
import Layout from "../components/Layout";

const PersonChart = () => {
  const [id, setId] = useState<number>();
  const [privileges, setPrivileges] = useState<boolean>(false);
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
    <Layout
      mainContentLanguage={(x: string) => setLanguage(x)}
      setPrivileges={setPrivileges}
    >
      <div>
        <div className="genContent ">
          <div className={style.container}>
            <h1>{translatedContent.detail_header}</h1>
            {id && (
              <PersonDetail
                id={id}
                language={language}
                privileges={privileges}
                setID={(x) => setId(x)}
              />
            )}
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
    </Layout>
  );
};
export default PersonChart;
