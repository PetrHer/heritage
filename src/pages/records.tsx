import DeleteForm from "../components/DeleteForm";
import InputForm from "../components/InputForm";
import NavMenu from "../components/NavMenu";
import UpdateForm from "../components/UpdateForm";
import Head from "next/head";
import { api } from "../utils/api";
import { useEffect, useState } from "react";

const Records = () => {
  const verification = api.authRouter.verify.useMutation();
  const [priv,setPriv]=useState<boolean>(false)
  const privilegesCheck = api.authRouter.privilegeCheck.useMutation()
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      verification.mutate(token);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(()=>{
    if (verification.isSuccess){privilegesCheck.mutate(verification.data as string)}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[verification.data])
  useEffect(()=>{
    if (privilegesCheck.data?.privileges?.privileges) {setPriv(privilegesCheck.data.privileges.privileges)}
  },[privilegesCheck.data])
  return (
    <div className='records'>
      <Head>
        <title>Herytage</title>
        <meta name="description" content="heritage of Petr Herynek" />
      </Head>
      <NavMenu />
      <div className="flex " >
        {!verification.isSuccess && (<div>You need to be logged in.</div>)}
        {verification.isSuccess && !priv && (<div>You don{`'`}t have rights.</div>)}
        {verification.isSuccess && priv && (<InputForm />)}
        <br />
        {verification.isSuccess && priv &&(<DeleteForm />)}
        <br />
        <br />
        {verification.isSuccess && priv &&(<UpdateForm />)}
      </div>
    </div>
  );
};

export default Records;
