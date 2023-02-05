import type { Person } from "@prisma/client";
import { type NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import NavMenu from "../components/NavMenu";

import PersonDetail from "../components/PersonDetail";
import { api } from "../utils/api";

const Home: NextPage = () => {
  const getData = api.dbRouter.getALL.useMutation();
  const changeId = (x: number) => {
    sessionStorage.setItem("id", x.toString());
    window.location.href = "/person_id";
  };
  useEffect(() => {
    getData.mutate();
  }, []);
  if (getData.isSuccess){getData.data.sort((a,b)=>a.id-b.id)}
  return (
    <>
      <Head>
        <title>Heritage</title>
        <meta name="description" content="Generated by create-t3-app" />
      </Head>
      <main className="flex min-h-screen flex-col items-center ">
        <NavMenu />
        {getData.data &&
          getData.data.map((e) => (
            <div key={e.id} onClick={() => changeId(e.id)}>
              {e.id} {e.name} {e.surname} {e.year_of_birth}
            </div>
          ))}
      </main>
    </>
  );
};

export default Home;
