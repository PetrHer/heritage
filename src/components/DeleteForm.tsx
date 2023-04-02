import { useRef } from "react";
import { api } from "../utils/api";
import styles from "../styles/DeleteForm.module.css";
import { useTranslation } from "next-i18next";

const DeleteForm = () => {
  const deletion = api.dbRouter.deletePerson.useMutation();
  const { t } = useTranslation("deleteForm");
  const personToDelete = useRef<HTMLInputElement>(null);
  const deletePerson = () => {
    if (search.data?.id) {
      const token = localStorage.getItem("token");
      if (token) {
        deletion.mutate({ id: search.data.id, token: token });
      }
    }
  };
  const search = api.dbRouter.getPerson.useMutation();
  const findPerson = () => {
    if (personToDelete.current?.value)
      search.mutate(Number(personToDelete.current.value));
  };

  if (deletion.isSuccess) {
    if (search.data?.id) {
      alert(t("alert") + search.data.id.toString());
    }
    window.location.reload();
  }

  return (
    <div className={styles.container}>
      <h1 className="col-start-1 col-end-3">{t("header")}</h1>
      {!search.data && (
        <>
          <div>{t("id_to_search")} </div>
          <input type="number" className="border" ref={personToDelete} />
          <button onClick={findPerson} className="buttons">
            {t("search")}
          </button>
        </>
      )}
      {search.data && (
        <>
          <div>{t("id")} </div>
          <div>{search.data.id}</div>
          <div>{t("name")} </div>
          <div>{search.data.name}</div>
          <div>{t("surname")} </div>
          <div>{search.data.surname}</div>
          <div>{t("year")}</div>
          <div>{search.data.year_of_birth}</div>
          <button onClick={deletePerson} className="buttons">
            {t("delete")}
          </button>
        </>
      )}
    </div>
  );
};

export default DeleteForm;
