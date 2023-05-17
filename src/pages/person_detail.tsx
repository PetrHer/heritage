import { useState } from "react";
import PersonDetail from "../components/PersonDetail";
import PersonSearch from "../components/PersonSearch";
import PersonImage from "../components/PersonImage";
import Layout from "../components/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../utils/redux/store";
import { setId } from "../utils/redux/idSlice";

const Detail = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const id:number = useSelector((state:RootState) => state.id.id);
  const [photo, setPhoto] = useState<string>("");
  const [info, setInfo] = useState<string>("");
  const [privileges, setPrivileges] = useState<boolean>(false);
  const { t } = useTranslation("detail");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const dispatch = useDispatch();
  const search = (arg: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    dispatch(setId(Number(arg)));
  };

  return (
    <Layout setPrivileges={setPrivileges}>
      <div className="mainContent">
        {photo && id && (
          <div className="row-end-10 col-start-1 col-end-2 row-start-1 flex flex-col items-center justify-items-center">
            <PersonImage photo={photo} />
          </div>
        )}
        <div className="row-end-11 row-end-10 col-start-2 col-end-3 row-start-1">
          {id && (
            <PersonDetail
              privileges={privileges}
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
