import { useEffect, useRef } from "react";
import { api } from "../utils/api";
import Layout from "../components/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const List = () => {
  const getData = api.dbRouter.getAll.useMutation();
  const surname = useRef<HTMLInputElement>(null);
  const { t } = useTranslation("list");
  const changeId = (x: number) => {
    sessionStorage.setItem("id", x.toString());
    window.location.href = "/genealogy_chart";
  };
  const verification = api.authRouter.verify.useMutation();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      verification.mutate(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getData.mutate({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const searchBySurname = () => {
    if (surname.current?.value) {
      getData.mutate({ surname: surname.current.value });
    }
  };
  if (getData.isSuccess) {
    getData.data.sort((a, b) => {
      if (a.surname < b.surname) {
        return -1;
      }
      if (a.surname > b.surname) {
        return 1;
      }
      return 0;
    });
  }

  const searchByInitials = (initials: string) => {
    getData.mutate({ initials: initials });
  };
  return (
    <Layout>
      <main className="mainContent">
        {getData.data &&
          getData.data.map((e) => (
            <div
              key={e.id}
              onClick={() => changeId(e.id)}
              className="indexDetail"
            >
              {e.id} {e.surname} {e.name} {e.year_of_birth}
            </div>
          ))}
        <div className="col-start-3 col-end-4 row-start-1 row-end-4 grid grid-cols-2 p-2">
          <div className="col-start-1 col-end-2">
            <div className="m-1 w-40">{t("labelSearch")}</div>
            <input
              className="m-1 w-40 rounded-md border border-black px-1"
              ref={surname}
              type="text"
            />
            <br />
            <button onClick={searchBySurname} className="buttons">
              {t("buttonSearch")}
            </button>
          </div>
          <div className="col-start-2 col-end-3">
            <div>{t("labelInitials")}</div>
            <button
              className="m-1 underline"
              onClick={() => searchByInitials("ABCČDĎEF")}
            >
              A-F
            </button>
            <button
              className="m-1 underline"
              onClick={() => searchByInitials("GHIJK")}
            >
              G-K
            </button>
            <button
              className="m-1 underline"
              onClick={() => searchByInitials("LMNŇOPQRŘ")}
            >
              L-R
            </button>
            <button
              className="m-1 underline"
              onClick={() => searchByInitials("SŠTUVWXYZŽ")}
            >
              S-Z
            </button>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default List;
export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      ...(await serverSideTranslations(locale, ["list", "navmenu"])),
      // Will be passed to the page component as props
    },
  };
}
