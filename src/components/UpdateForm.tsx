import type { Person } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { api } from "../utils/api";
import styles from "../styles/UpdateForm.module.css";
import { useTranslation } from "next-i18next";

const UpdateForm = () => {
  const idInput = useRef<HTMLInputElement>(null);
  const [personData, setPersonData] = useState<Person>({
    id: 0,
    name: "",
    surname: "",
    birth_surname: "",
    year_of_birth: 0,
    year_of_death: "",
    birth_place: "",
    father_id: 0,
    mother_id: 0,
    description: "",
    image: "",
  });
  const { t } = useTranslation("updateForm");
  const updating = api.dbRouter.updatePerson.useMutation();
  const updatePersonInDB = () => {
    const token = localStorage.getItem("token");
    if (token) {
      updating.mutate({ ...personData, token: token });
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      event.target.name == "mother_id" ||
      event.target.name == "father_id" ||
      event.target.name == "year_of_birth"
    ) {
      setPersonData({
        ...personData,
        [event.target.name]: Number(event.target.value),
      });
    } else {
      setPersonData({ ...personData, [event.target.name]: event.target.value });
    }
  };
  const search = api.dbRouter.getPerson.useMutation();
  const findPerson = () => {
    if (idInput.current?.value) search.mutate(Number(idInput.current.value));
  };
  useEffect(() => {
    if (sessionStorage.getItem("updateID")) {
      search.mutate(Number(sessionStorage.getItem("updateID")));
      sessionStorage.removeItem("updateID");
    }
  }, []);
  useEffect(() => {
    if (search.data) setPersonData(search.data);
  }, [search.data]);

  if (updating.isSuccess) {
    if (search.data?.id) {
      alert(t("alert") + search.data.id.toString());
    }
    window.location.reload();
  }
  return (
    <div className={styles.container}>
      <h1 className="col-start-1 col-end-3">{t("header")}</h1>
      <div>{t("search_id")} </div>
      <input className="border" type="number" ref={idInput}></input>
      <button onClick={findPerson} className="buttons">
        {t("search_button")}
      </button>
      {search.data && (
        <>
          <div className="col-start-1 col-end-3">ID : {search.data.id}</div>
          <div>{t("name")} </div>
          <input
            className="border"
            name="name"
            value={personData.name}
            onChange={handleChange}
          ></input>
          <div>{t("surname")} </div>
          <input
            className="border"
            name="surname"
            value={personData.surname}
            onChange={handleChange}
          ></input>
          <div>{t("birth_surname")} </div>
          <input
            className="border"
            name="birth_surname"
            value={personData.birth_surname || ""}
            onChange={handleChange}
          ></input>
          <div>{t("year_of_birth")} </div>
          <input
            className="border"
            type="number"
            name="year_of_birth"
            value={personData.year_of_birth || ""}
            onChange={handleChange}
          ></input>
          <div>{t("year_of_death")} </div>
          <input
            className="border"
            type="number"
            name="year_of_death"
            value={personData.year_of_death || ""}
            onChange={handleChange}
          ></input>
          <div>{t("birth_place")} </div>
          <input
            className="border"
            name="birth_place"
            value={personData.birth_place || ""}
            onChange={handleChange}
          ></input>
          <div>{t("mother_id")} </div>
          <input
            className="border"
            type="number"
            name="mother_id"
            value={personData.mother_id || ""}
            onChange={handleChange}
          ></input>
          <div>{t("father_id")} </div>
          <input
            className="border"
            type="number"
            name="father_id"
            value={personData.father_id || ""}
            onChange={handleChange}
          ></input>
          <div>{t("description")}</div>
          <input
            className="border"
            type="text"
            name="description"
            value={personData.description || ""}
            onChange={handleChange}
          ></input>
          <button onClick={updatePersonInDB} className="buttons">
            {t("update_button")}
          </button>
        </>
      )}
    </div>
  );
};

export default UpdateForm;
