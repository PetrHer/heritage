import React, { useEffect, useState } from "react";
import NavMenu from "../components/NavMenu";
import PersonDetail from "../components/PersonDetail";
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
