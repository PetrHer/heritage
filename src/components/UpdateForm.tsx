import type { Person } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { api } from "../utils/api";
import styles from "../styles/UpdateForm.module.css";
import { useTranslation } from "next-i18next";
import { numberTypes } from "../utils/functions";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../utils/redux/store";
import { setIdToUpdate } from "../utils/redux/idToUpdateSlice";

const UpdateForm = () => {
  const orderedKeys = ["name", "surname", "year_of_birth", "year_of_death", "birth_place", "birth_surname", "father_id", "mother_id", "description", "partner_id"];
  const idInput = useRef<HTMLInputElement>(null);
  const [personData, setPersonData] = useState<Person>({
    id: 0,
    name: "",
    surname: "",
    birth_surname: "",
    year_of_birth: null,
    year_of_death: null,
    birth_place: "",
    father_id: null,
    mother_id: null,
    description: "",
    image: "",
    partner_id: null,
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
    if (numberTypes.includes(event.target.name)) {
      setPersonData({
        ...personData,
        [event.target.name]: Number(event.target.value),
      });
    } else {
      setPersonData({ ...personData, [event.target.name]: event.target.value });
    }
  };
  const search = api.dbRouter.getPersonRecords.useMutation();
  const dispatch = useDispatch();
  const idToUpdate:number = useSelector((state:RootState) => state.idToUpdate.idToUpdate);
  const findPersonById = () => {
    if (idInput.current?.value) {
      dispatch(setIdToUpdate(Number(idInput.current.value)))
    }
  };
  const findPerson = ()=> {
      search.mutate(idToUpdate) 
  }
  useEffect(() => {
      if (idToUpdate!=0) {
        findPerson()
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idToUpdate]);
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
      <button onClick={findPersonById} className="buttons">
        {t("search_button")}
      </button>
      {search.data && (
        <>
          <div className="col-start-1 col-end-3">ID : {search.data.id}</div>
          {orderedKeys.map((key) => (
            <React.Fragment key={key}>
              <div>{t(key)}</div>
              <input
                className="border"
                name={key}
                type={numberTypes.includes(key) ? "number" : ""}
                value={personData[key as keyof Person] || ""}
                onChange={handleChange}
              />
            </React.Fragment>
          ))}
          <button onClick={updatePersonInDB} className="buttons">
            {t("update_button")}
          </button>
        </>
      )}
    </div>
  );
};

export default UpdateForm;
