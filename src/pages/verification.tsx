import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "../utils/api";
import Layout from "../components/Layout";

const Verification = () => {
  const router = useRouter();
  const passResToken = (router.query.passwordToken as string) || "";
  const verifyEmail = api.authRouter.verifyEmail.useMutation();
  useEffect(() => {
    verifyEmail.mutate(passResToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passResToken]);
  if (verifyEmail.isSuccess) {
    localStorage.setItem("token", verifyEmail.data);
    window.location.href = "/";
  }
  return (
    <Layout>
      <div>verification</div>
      {verifyEmail.isError && <div>{verifyEmail.error.message}</div>}
    </Layout>
  );
};

export default Verification;
