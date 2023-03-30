import type { Person } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { api } from "../utils/api";
import styles from "../styles/UpdateForm.module.css";

const UpdateForm = ({ language }: { language: string }) => {
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
  const [translatedContent, setTranslatedContent] = useState<{
    name: string;
    surname: string;
    birth_surname: string;
    year_of_birth: string;
    year_of_death: string;
    birth_place: string;
    mother_id: string;
    father_id: string;
    description: string;
    update_button: string;
    header: string;
    succes: string;
    search_button: string;
    search_id: string;
    alert: string;
  }>({
    name: "Jméno :",
    surname: "Příjmení :",
    birth_surname: "Rodné příjmení :",
    year_of_birth: "Rok narození :",
    year_of_death: "Rok úmrtí :",
    birth_place: "Místo narození :",
    mother_id: "ID matky :",
    father_id: "ID otce :",
    description: "Popis :",
    update_button: "Upravit",
    header: "Úprava záznamu v databázi",
    succes: " úspěšně upraven.",
    search_id: "ID k úpravě :",
    search_button: "Hledat",
    alert: "Úspěšně upraven záznam s ID ",
  });

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
  useEffect(()=>{
    if (sessionStorage.getItem('updateID')){
      search.mutate(Number(sessionStorage.getItem('updateID')))
      sessionStorage.removeItem('updateID')
    }
  },[])
  useEffect(() => {
    if (search.data) setPersonData(search.data);
  }, [search.data]);

  if (updating.isSuccess) {
    if (search.data?.id) {
      alert(translatedContent.alert + search.data.id.toString());
    }
    window.location.reload();
  }
  useEffect(() => {
    switch (language) {
      case "en":
        setTranslatedContent({
          name: "Name :",
          surname: "Surname :",
          birth_surname: "Birth surname :",
          year_of_birth: "Year of birth :",
          year_of_death: "Year of death :",
          birth_place: "Place of birth :",
          mother_id: "ID of mother :",
          father_id: "ID of father :",
          description: "Description :",
          update_button: "Update",
          header: "Update record in database",
          succes: " succesfully updated.",
          search_id: "ID to update :",
          search_button: "Search",
          alert: "Succesfully updated record with ID ",
        });
        break;

      case "cz":
        setTranslatedContent({
          name: "Jméno :",
          surname: "Příjmení :",
          birth_surname: "Rodné příjmení :",
          year_of_birth: "Rok narození :",
          year_of_death: "Rok úmrtí :",
          birth_place: "Místo narození :",
          mother_id: "ID matky :",
          father_id: "ID otce :",
          description: "Popis :",
          update_button: "Upravit",
          header: "Úprava záznamu v databázi",
          succes: " úspěšně upraven.",
          search_id: "ID k úpravě :",
          search_button: "Hledat",
          alert: "Úspěšně upraven záznam s ID ",
        });
        break;
    }
  }, [language]);
  return (
    <div className={styles.container}>
      <h1 className="col-start-1 col-end-3">{translatedContent.header}</h1>
      <div>{translatedContent.search_id} </div>
      <input className="border" type="number" ref={idInput}></input>
      <button onClick={findPerson} className="buttons">
        {translatedContent.search_button}
      </button>
      {search.data && (
        <>
          <div className="col-start-1 col-end-3">ID : {search.data.id}</div>
          <div>{translatedContent.name} </div>
          <input
            className="border"
            name="name"
            value={personData.name}
            onChange={handleChange}
          ></input>
          <div>{translatedContent.surname} </div>
          <input
            className="border"
            name="surname"
            value={personData.surname}
            onChange={handleChange}
          ></input>
          <div>{translatedContent.birth_surname} </div>
          <input
            className="border"
            name="birth_surname"
            value={personData.birth_surname || ""}
            onChange={handleChange}
          ></input>
          <div>{translatedContent.year_of_birth} </div>
          <input
            className="border"
            type="number"
            name="year_of_birth"
            value={personData.year_of_birth || ""}
            onChange={handleChange}
          ></input>
          <div>{translatedContent.year_of_death} </div>
          <input
            className="border"
            type="number"
            name="year_of_death"
            value={personData.year_of_death || ""}
            onChange={handleChange}
          ></input>
          <div>{translatedContent.birth_place} </div>
          <input
            className="border"
            name="birth_place"
            value={personData.birth_place || ""}
            onChange={handleChange}
          ></input>
          <div>{translatedContent.mother_id} </div>
          <input
            className="border"
            type="number"
            name="mother_id"
            value={personData.mother_id || ""}
            onChange={handleChange}
          ></input>
          <div>{translatedContent.father_id} </div>
          <input
            className="border"
            type="number"
            name="father_id"
            value={personData.father_id || ""}
            onChange={handleChange}
          ></input>
          <div>{translatedContent.description}</div>
          <input
            className="border"
            type="text"
            name="description"
            value={personData.description || ""}
            onChange={handleChange}
          ></input>
          <button onClick={updatePersonInDB} className="buttons">
            {translatedContent.update_button}
          </button>
        </>
      )}
    </div>
  );
};

export default UpdateForm;
