import { type NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import NavMenu from "../components/NavMenu";
import { api } from "../utils/api";

const Home: NextPage = () => {
  const getData = api.dbRouter.getALL.useMutation();
  const changeId = (x: number) => {
    sessionStorage.setItem("id", x.toString());
    window.location.href = "/genealogy_chart";
  };
  const verification = api.authRouter.verify.useMutation()
  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token){verification.mutate(token)}
  },[])
  useEffect(() => {
    getData.mutate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
        <NavMenu />
      <main className="mainContent" >
        {getData.data &&
          getData.data.map((e) => (
            <div key={e.id} onClick={() => changeId(e.id)} className="indexDetail">
              {e.id} {e.surname} {e.name} {e.year_of_birth}
            </div>
          ))}
      </main>
    </>
  );
};

export default Home;
