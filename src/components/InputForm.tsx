import { useEffect, useState } from "react";
import { api } from "../utils/api";
import styles from "../styles/InputForm.module.css";
import { useTranslation } from "next-i18next";
import React from "react";
import type { Character} from "../utils/functions";
import { numberTypes } from "../utils/functions";


const InputForm = () => {
  const baseState:Character = {
    name: "",
    surname: "",
    year_of_birth: undefined,
    year_of_death: undefined,
    birth_place: "",
    birth_surname: "",
    father_id: undefined,
    mother_id: undefined,
    description: "",
    partner_id: undefined,
  }
  const [personData, setPersonData] = useState<Character>(baseState);
  const { t } = useTranslation("inputForm");
  const creation = api.dbRouter.addPerson.useMutation();
  const putPersonInDB = () => {
    const token = localStorage.getItem("token");
    if (token) {
      creation.mutate({ ...personData, token: token });
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
  useEffect(() => {
    if (creation.isSuccess) {
      setPersonData(baseState);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creation.isSuccess]);

  return (
    <div className={styles.container}>
      <h1 className="col-start-1 col-end-3">{t("header")}</h1>
      {Object.keys(personData).map((key) => (
        <React.Fragment key={key}>
          <div>{t(key)}</div>
          <input
            className="border"
            name={key}
            type={(numberTypes.includes(key))? "number" : ""}
            value={personData[key as keyof Character]}
            onChange={handleChange}
          />
        </React.Fragment>
      ))}
      <button onClick={putPersonInDB} className="buttons">
        {t("create_button")}
      </button>
      {creation.isSuccess && creation.data && (
        <div>
          {creation.data.name} {creation.data.surname} {t("succes")}{" "}
          {creation.data.id}
        </div>
      )}
    </div>
  );
};

export default InputForm;
