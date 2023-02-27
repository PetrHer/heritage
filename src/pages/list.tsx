import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import NavMenu from "../components/NavMenu";
import { api } from "../utils/api";

const Home: NextPage = () => {
  const getData = api.dbRouter.getAll.useMutation();
  const surname = useRef<HTMLInputElement>(null)
  const changeId = (x: number) => {
    sessionStorage.setItem("id", x.toString());
    window.location.href = "/genealogy_chart";
  };
  const verification = api.authRouter.verify.useMutation()
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) { verification.mutate(token) }
  }, [])
  useEffect(() => {
    getData.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const searchBySurname = () => {
    if (surname.current?.value) { getData.mutate(surname.current.value) }
  }
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
        <div className="col-start-3 col-end-4 row-start-1 row-end-4 p-2">
          <div className='w-40 m-1'>Search by surname : </div>
          <input className='border border-black w-40 m-1 px-1 rounded-md' ref={surname} type="text" /> 
          <br />
          <button onClick={searchBySurname} className='border border-black m-1 px-2 rounded-xl bg-blue-300'>Search</button>
        </div>
      </main>
    </>
  );
};

export default Home;
