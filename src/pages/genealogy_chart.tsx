import React, { useEffect, useState } from "react";
import NavMenu from "../components/NavMenu";
import GenealogyChart from "../components/GenealogyChart";
import { api } from "../utils/api";
import Head from "next/head";
import PersonDetail from "../components/PersonDetail";
import style from "../styles/PersonDetail.module.css";

const PersonId = () => {
  const [id, setId] = useState<number>();

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
    <div>
      <Head>
        <title>Herytage</title>
        <meta name="description" content="heritage of Petr Herynek" />
      </Head>
      <NavMenu />
      <div className="genContent " >
        <div className={style.container}>
        <h1>Detail</h1>
          <PersonDetail id={id} />
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
  );
};
export default PersonId;
