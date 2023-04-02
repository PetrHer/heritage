import { useEffect, useState } from "react";
import { api } from "../utils/api";
import styles from "../styles/InputForm.module.css";
import { useTranslation } from "next-i18next";
type Character = {
  name: "";
  surname: string;
  year_of_birth: number | undefined;
  year_of_death: string;
  birth_place: string;
  birth_surname: string;
  father_id: number | undefined;
  mother_id: number | undefined;
  description: string;
  partner_id: number | undefined;
};

const InputForm = () => {
  const [personData, setPersonData] = useState<Character>({
    name: "",
    surname: "",
    year_of_birth: undefined,
    year_of_death: "",
    birth_place: "",
    birth_surname: "",
    father_id: undefined,
    mother_id: undefined,
    description: "",
    partner_id: undefined,
  });
  const { t } = useTranslation("inputForm");
  const creation = api.dbRouter.addPerson.useMutation();
  const putPersonInDB = () => {
    const token = localStorage.getItem("token");
    if (token) {
      creation.mutate({ ...personData, token: token });
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      event.target.name == "mother_id" ||
      event.target.name == "father_id" ||
      event.target.name == "year_of_birth" ||
      event.target.name == "partner_id"
    ) {
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
      setPersonData({
        name: "",
        surname: "",
        year_of_birth: 0,
        year_of_death: "",
        birth_place: "",
        birth_surname: "",
        father_id: 0,
        mother_id: 0,
        description: "",
        partner_id: undefined,
      });
    }
  }, [creation.isSuccess]);

  return (
    <div className={styles.container}>
      <h1 className="col-start-1 col-end-3">{t("header")}</h1>
      <div>{t("name")}</div>
      <input
        className="border"
        name="name"
        value={personData.name}
        onChange={handleChange}
      />
      <div>{t("surname")} </div>
      <input
        className="border"
        name="surname"
        value={personData.surname}
        onChange={handleChange}
      />
      <div>{t("birth_surname")}</div>
      <input
        className="border"
        name="birth_surname"
        value={personData.birth_surname}
        onChange={handleChange}
      />
      <div>{t("year_of_birth")}</div>
      <input
        className="border"
        type="number"
        name="year_of_birth"
        value={personData.year_of_birth}
        onChange={handleChange}
      />
      <div>{t("year_of_death")} </div>
      <input
        className="border"
        type="number"
        name="year_of_death"
        value={personData.year_of_death}
        onChange={handleChange}
      />
      <div>{t("birth_place")} </div>
      <input
        className="border"
        name="birth_place"
        value={personData.birth_place}
        onChange={handleChange}
      />
      <div>{t("mother_id")} </div>
      <input
        className="border"
        type="number"
        name="mother_id"
        value={personData.mother_id}
        onChange={handleChange}
      />
      <div>{t("father_id")} </div>
      <input
        className="border"
        type="number"
        name="father_id"
        value={personData.father_id}
        onChange={handleChange}
      />
      <div>{t("partner_id")} </div>
      <input
        className="border"
        type="number"
        name="partner_id"
        value={personData.partner_id}
        onChange={handleChange}
      />
      <div>{t("description")} </div>
      <input
        className="border"
        type="text-area"
        name="description"
        value={personData.description}
        onChange={handleChange}
      />
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
