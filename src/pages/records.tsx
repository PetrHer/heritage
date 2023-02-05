import DeleteForm from "../components/DeleteForm";
import InputForm from "../components/InputForm";
import NavMenu from "../components/NavMenu";
import UpdateForm from "../components/UpdateForm";
import Head from "next/head";
import { api } from "../utils/api";
import { useEffect } from "react";

const Records = () => {
  const verification = api.authRouter.verify.useMutation();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      verification.mutate(token);
    }
  }, []);
  if (!verification.isSuccess) {
    alert("you need to be logged in");
    window.location.href = "/login";
  }
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

export default Records;
