import { useEffect, useState } from "react";
import PersonDetail from "../components/PersonDetail";
import PersonSearch from "../components/PersonSearch";
import PersonImage from "../components/PersonImage";
import Layout from "../components/Layout";

const Detail = () => {
  const [id, setId] = useState<number>();
  const [photo, setPhoto] = useState<string>("");
  const [info, setInfo] = useState<string>("");
  const [language, setLanguage] = useState<string>("cz");
  const [privileges, setPrivileges] = useState<boolean>(false);
  const [translatedContent, setTranslatedContent] = useState<{
    info: string;
  }>({
    info: "Popis :",
  });

  const search = (arg: string) => {
    setId(Number(arg));
    sessionStorage.setItem("id", arg);
  };
  useEffect(() => {
    if (sessionStorage.getItem("id")) {
      setId(Number(sessionStorage.getItem("id")));
    }
    const lang = sessionStorage.getItem("lang");
    if (lang) {
      setLanguage(lang);
    }
  }, []);
  useEffect(() => {
    switch (language) {
      case "cz":
        setTranslatedContent({
          info: "Popis :",
        });
        break;

      case "en":
        setTranslatedContent({
          info: "Description :",
        });
        break;
    }
  }, [language]);
  return (
    <Layout
      mainContentLanguage={(x: string) => setLanguage(x)}
      setPrivileges={setPrivileges}
    >
      <div className="mainContent">
        {photo && id && (
          <div className="row-end-10 col-start-1 col-end-2 row-start-1 flex flex-col items-center justify-items-center">
            <PersonImage language={language} photo={photo} id={id} />
          </div>
        )}
        <div className="row-end-11 row-end-10 col-start-2 col-end-3 row-start-1">
          {id && (
            <PersonDetail
              privileges={privileges}
              setID={(x) => setId(x)}
              language={language}
              id={id}
              setPhoto={(x: string) => setPhoto(x)}
              setInfo={(x: string) => setInfo(x)}
            />
          )}
        </div>
        {info && (
          <div className="row-start-11 row-end-21 col-start-2 col-end-3">
            <h2>{translatedContent.info}</h2>
            <div>{info}</div>
          </div>
        )}
        <div className="col-start-3 col-end-4 row-start-1 ">
          <PersonSearch search={search} language={language} />
        </div>
      </div>
    </Layout>
  );
};

export default Detail;
