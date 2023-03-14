import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import NavMenu from "../components/NavMenu";
import { api } from "../utils/api";

const Home: NextPage = () => {
  const getData = api.dbRouter.getAll.useMutation();
  const surname = useRef<HTMLInputElement>(null);
  const [language, setLanguage] = useState<string>("cz");
  const [translatedContent, setTranslatedContent] = useState<{
    labelSearch: string;
    buttonSearch: string;
  }>({ labelSearch: "Vyhledat podle příjmení", buttonSearch: "Hledat" });

  const changeId = (x: number) => {
    sessionStorage.setItem("id", x.toString());
    window.location.href = "/genealogy_chart";
  };
  const verification = api.authRouter.verify.useMutation();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      verification.mutate(token);
    }
    const lang = sessionStorage.getItem('lang')
    if (lang){
      setLanguage(lang)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getData.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(()=>{
    switch (language) {
      case 'en':
        setTranslatedContent({
          labelSearch:'Search by surname',
          buttonSearch:'Search'
        })
        break;
        case 'cz':
          setTranslatedContent({
            labelSearch:"Vyhledat podle příjmení",
            buttonSearch:'Hledat'
          })
          break;
      default:
        break;
    }
  },[language])
  const searchBySurname = () => {
    if (surname.current?.value) {
      getData.mutate(surname.current.value);
    }
  };
  if (getData.isSuccess) {
    getData.data.sort((a, b) => {
      if (a.surname < b.surname) {
        return -1;
      }
      if (a.surname > b.surname) {
        return 1;
      }
      return 0;
    });
  }
  return (
    <>
      <Head>
        <title>Herytage</title>
        <meta name="description" content="heritage of Petr Herynek" />
      </Head>
      <NavMenu mainContentLanguage={(x:string)=>setLanguage(x)} />
      <main className="mainContent">
        {getData.data &&
          getData.data.map((e) => (
            <div
              key={e.id}
              onClick={() => changeId(e.id)}
              className="indexDetail"
            >
              {e.id} {e.surname} {e.name} {e.year_of_birth}
            </div>
          ))}
        <div className="col-start-3 col-end-4 row-start-1 row-end-4 p-2">
          <div className="m-1 w-40">{translatedContent.labelSearch}</div>
          <input
            className="m-1 w-40 rounded-md border border-black px-1"
            ref={surname}
            type="text"
          />
          <br />
          <button onClick={searchBySurname} className="buttons">
            {translatedContent.buttonSearch}
          </button>
        </div>
      </main>
    </>
  );
};

export default Home;
