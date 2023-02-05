import type { Person } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { api } from "../utils/api";
import styles from "../styles/UpdateForm.module.css";

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
  });

  const updating = api.dbRouter.updatePerson.useMutation();
  const updatePersonInDB = () => {
    updating.mutate(personData);
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
  const search = api.dbRouter.getPerson.useMutation();
  const findPerson = () => {
    if (idInput.current?.value) search.mutate(Number(idInput.current.value));
  };

  useEffect(() => {
    if (search.data) setPersonData(search.data);
  }, [search.data]);

  if (updating.isSuccess) {
    window.location.reload();
  }
  return (
    <div className={styles.container}>
      <h1 className="col-start-1 col-end-3">Upraveni zaznamu v databazi.</h1>
      <div>ID k update : </div>
      <input className="border" type="number" ref={idInput}></input>
      <button onClick={findPerson} className="w-16 border col-start-1 col-end-3">
        search
      </button>
      {search.data && (
        <>
          <div className="col-start-1 col-end-3">ID : {search.data.id}</div>
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
            value={personData.birth_surname || undefined}
            onChange={handleChange}
          ></input>
          <div>Rok narozeni : </div>
          <input
            className="border"
            type="number"
            name="year_of_birth"
            value={personData.year_of_birth || undefined}
            onChange={handleChange}
          ></input>
          <div>Rok umrti : </div>
          <input
            className="border"
            type="number"
            name="year_of_death"
            value={personData.year_of_death || undefined}
            onChange={handleChange}
          ></input>
          <div>Misto narozeni : </div>
          <input
            className="border"
            name="birth_place"
            value={personData.birth_place || undefined}
            onChange={handleChange}
          ></input>
          <div>Mother id </div>
          <input
            className="border"
            type="number"
            name="mother_id"
            value={personData.mother_id || undefined}
            onChange={handleChange}
          ></input>
          <div>Father id </div>
          <input
            className="border"
            type="number"
            name="father_id"
            value={personData.father_id || undefined}
            onChange={handleChange}
          ></input>
          <button onClick={updatePersonInDB} className="w-16 border">
            update
          </button>
        </>
      )}
    </div>
  );
};

export default UpdateForm;
