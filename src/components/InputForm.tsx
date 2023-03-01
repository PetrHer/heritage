import { useEffect, useState } from "react";
import { api } from "../utils/api";
import styles from "../styles/InputForm.module.css";
type Character = {
  name: "";
  surname: string;
  year_of_birth: number;
  year_of_death: string;
  birth_place: string;
  birth_surname: string;
  father_id: number;
  mother_id: number;
  description:string;
};

const InputForm = () => {
  const [personData, setPersonData] = useState<Character>({
    name: "",
    surname: "",
    year_of_birth: 0,
    year_of_death: "",
    birth_place: "",
    birth_surname: "",
    father_id: 0,
    mother_id: 0,
    description:''
  });
  const creation = api.dbRouter.addPerson.useMutation();
  const putPersonInDB = () => {
    const token = localStorage.getItem("token");
    if (token){creation.mutate({...personData,token:token});}
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name == "mother_id" || event.target.name == "father_id" || event.target.name == "year_of_birth") {
      setPersonData({
        ...personData,
        [event.target.name]: Number(event.target.value),
      });
    } else {
      setPersonData({ ...personData, [event.target.name]: event.target.value });
    }
  };
  useEffect(()=>{
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
        description:''
      });
    }
  },[creation.isSuccess])

  return (
    <div className={styles.container}>
      <h1 className="col-start-1 col-end-3">Vytvoreni zaznamu v databazi</h1>
      <div>Jmeno : </div>
      <input
        className="border"
        name="name"
        value={personData.name}
        onChange={handleChange}
      ></input>
      <div>Prijmeni : </div>
      <input
        className="border"
        name="surname"
        value={personData.surname}
        onChange={handleChange}
      ></input>
      <div>Rodne prijmeni : </div>
      <input
        className="border"
        name="birth_surname"
        value={personData.birth_surname}
        onChange={handleChange}
      ></input>
      <div>Rok narozeni : </div>
      <input
        className="border"
        type="number"
        name="year_of_birth"
        value={personData.year_of_birth}
        onChange={handleChange}
      ></input>
      <div>Rok umrti : </div>
      <input
        className="border"
        type="number"
        name="year_of_death"
        value={personData.year_of_death}
        onChange={handleChange}
      ></input>
      <div>Misto narozeni : </div>
      <input
        className="border"
        name="birth_place"
        value={personData.birth_place}
        onChange={handleChange}
      ></input>
      <div>Mother id </div>
      <input
        className="border"
        type="number"
        name="mother_id"
        value={personData.mother_id}
        onChange={handleChange}
      ></input>
      <div>Father id </div>
      <input
        className="border"
        type="number"
        name="father_id"
        value={personData.father_id}
        onChange={handleChange}
      ></input>
            <div>Description </div>
      <input
        className="border"
        type="text-area"
        name="description"
        value={personData.description}
        onChange={handleChange}
      ></input>
      <button onClick={putPersonInDB} className="buttons">
        Create
      </button>
      {creation.isSuccess && creation.data && (
        <div>
          {creation.data.name} {creation.data.surname} uspesne pridan/a do
          databaze.
        </div>
      )}
    </div>
  );
};

export default InputForm;
