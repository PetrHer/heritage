import { useEffect, useState } from "react";
import PersonDetail from "../components/PersonDetail";
import PersonSearch from "../components/PersonSearch";
import PersonImage from "../components/PersonImage";
import Layout from "../components/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Detail = () => {
  const [id, setId] = useState<number>();
  const [photo, setPhoto] = useState<string>("");
  const [info, setInfo] = useState<string>("");
  const [privileges, setPrivileges] = useState<boolean>(false);
  const { t } = useTranslation("detail");
  const search = (arg: string) => {
    setId(Number(arg));
    sessionStorage.setItem("id", arg);
  };
  useEffect(() => {
    if (sessionStorage.getItem("id")) {
      setId(Number(sessionStorage.getItem("id")));
    }
  }, []);
  return (
    <Layout setPrivileges={setPrivileges}>
      <div className="mainContent">
        {photo && id && (
          <div className="row-end-10 col-start-1 col-end-2 row-start-1 flex flex-col items-center justify-items-center">
            <PersonImage photo={photo} id={id} />
          </div>
        )}
        <div className="row-end-11 row-end-10 col-start-2 col-end-3 row-start-1">
          {id && (
            <PersonDetail
              privileges={privileges}
              setID={(x) => setId(x)}
              id={id}
              setPhoto={(x: string) => setPhoto(x)}
              setInfo={(x: string) => setInfo(x)}
            />
          )}
        </div>
        {info && (
          <div className="row-start-11 row-end-21 col-start-2 col-end-3">
            <h2>{t("info")}</h2>
            <div>{info}</div>
          </div>
        )}
        <div className="col-start-3 col-end-4 row-start-1 ">
          <PersonSearch search={search} />
        </div>
      </div>
    </Layout>
  );
};

export default Detail;

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      ...(await serverSideTranslations(locale, [
        "detail",
        "navmenu",
        "personImage",
        "personDetail",
        "personSearch",
      ])),
      // Will be passed to the page component as props
    },
  };
}
