import DeleteForm from "../components/DeleteForm";
import InputForm from "../components/InputForm";
import UpdateForm from "../components/UpdateForm";
import { api } from "../utils/api";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";

const Records = () => {
  const verification = api.authRouter.verify.useMutation();
  const [priv, setPriv] = useState<boolean>(false);
  const privilegesCheck = api.authRouter.privilegeCheck.useMutation();
  const [language, setLanguage] = useState<string>("cz");
  const [translatedContent, setTranslatedContent] = useState<{
    notLogged: string;
    noRights: string;
  }>({
    notLogged: "Musíte být přihlášeni.",
    noRights: "Nemáte oprávnění pro úpravu záznamů.",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      verification.mutate(token);
    }
    const lang = sessionStorage.getItem("lang");
    if (lang) {
      setLanguage(lang);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (verification.isSuccess) {
      privilegesCheck.mutate(verification.data as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verification.data]);

  useEffect(() => {
    if (privilegesCheck.data?.privileges?.privileges) {
      setPriv(privilegesCheck.data.privileges.privileges);
    }
  }, [privilegesCheck.data]);

  useEffect(() => {
    switch (language) {
      case "cz":
        setTranslatedContent({
          notLogged: "Musíte být přihlášeni.",
          noRights: "Nemáte oprávnění pro úpravu záznamů.",
        });
        break;

      case "en":
        setTranslatedContent({
          notLogged: "You need to be logged in.",
          noRights: "You don't have rights for updating records.",
        });
        break;
    }
  }, [language]);
  return (
    <Layout mainContentLanguage={(x: string) => setLanguage(x)}>
      <div className="records">
        <div className="flex ">
          {!verification.isSuccess && <div>{translatedContent.notLogged}</div>}
          {verification.isSuccess && !priv && (
            <div>{translatedContent.noRights}</div>
          )}
          {verification.isSuccess && priv && <InputForm language={language} />}
          <br />
          {verification.isSuccess && priv && <DeleteForm language={language} />}
          <br />
          <br />
          {verification.isSuccess && priv && <UpdateForm language={language} />}
        </div>
      </div>
    </Layout>
  );
};

export default Records;
