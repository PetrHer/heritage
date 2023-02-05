import React, { useEffect, useRef, useState } from "react";
import InputForm from "../components/InputForm";
import NavMenu from "../components/NavMenu";
import PersonDetail from "../components/PersonDetail";
import UpdateForm from "../components/UpdateForm";
import { api } from "../utils/api";
import Head from "next/head";

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
  }, [id]);
  return (
    <>
      <Head>
        <title>Herytage</title>
        <meta name="description" content="heritage of Petr Herynek" />
      </Head>
      <div>
        <NavMenu />
        {response.data && (
          <PersonDetail
            changeId={changeId}
            person={response.data}
            id={response.data.id}
          />
        )}
      </div>
    </>
  );
};
export default PersonId;
