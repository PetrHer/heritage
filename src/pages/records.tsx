import DeleteForm from "../components/DeleteForm";
import InputForm from "../components/InputForm";
import NavMenu from "../components/NavMenu";
import UpdateForm from "../components/UpdateForm";
import Head from "next/head";
import { api } from "../utils/api";
import { useEffect, useState } from "react";

const Records = () => {
  const verification = api.authRouter.verify.useMutation();
  const [execution, setExecution] = useState<boolean>(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      verification.mutate(token);
    }
  }, []);
  return (
    <>
      <Head>
        <title>Herytage</title>
        <meta name="description" content="heritage of Petr Herynek" />
      </Head>
      <NavMenu />
      <div className="flex">
        {!verification.isSuccess && (<div>You need to be logged in.</div>)}
        {verification.isSuccess &&(<InputForm />)}
        <br />
        {verification.isSuccess &&(<DeleteForm />)}
        <br />
        <br />
        {verification.isSuccess &&(<UpdateForm />)}
      </div>
    </>
  );
};

export default Records;
