import { useRef } from "react";
import DeleteForm from "../components/DeleteForm";
import InputForm from "../components/InputForm";
import NavMenu from "../components/NavMenu";
import UpdateForm from "../components/UpdateForm";
import Head from "next/head";

const records = () => {
  return (
    <>
      <Head>
        <title>Herytage</title>
        <meta name="description" content="heritage of Petr Herynek" />
      </Head>
      <NavMenu />
      <div className="flex">
        <InputForm />
        <br />
        <DeleteForm />
        <br />
        <br />
        <UpdateForm />
      </div>
    </>
  );
};

export default records;
