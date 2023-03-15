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

const InputForm = ({language}:{language:string}) => {
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
  const [translatedContent, setTranslatedContent] = useState<{
    name: string;
    surname: string;
    birth_surname:string;
    year_of_birth:string;
    year_of_death:string;
    birth_place:string;
    mother_id:string;
    father_id:string;
    description:string;
    create_button:string;
    header:string;
    succes:string;
  }>({
    name: 'Jméno :',
    surname: 'Příjmení :',
    birth_surname:'Rodné příjmení :',
    year_of_birth:'Rok narození :',
    year_of_death:'Rok úmrtí :',
    birth_place:'Místo narození :',
    mother_id:'ID matky :',
    father_id:'ID otce :',
    description:'Popis :',
    create_button:'Přidat',
    header:'Přidání záznamu do databáze',
    succes:' úspěšně přidán/a do databáze s ID ',
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
  useEffect(()=>{
    switch (language) {
      case 'en':
        setTranslatedContent({
          name: 'Name :',
          surname: 'Surname :',
          birth_surname:'Birth surname :',
          year_of_birth:'Year of birth :',
          year_of_death:'Year of death :',
          birth_place:'Place of birth :',
          mother_id:'ID of mother :',
          father_id:'ID of father :',
          description:'Description :',
          create_button:'Add',
          header:'Add record to database',
          succes:' succesfully added to database with ID ',
        })
        break;
    
      case 'cz':
        setTranslatedContent({
          name: 'Jméno :',
          surname: 'Příjmení :',
          birth_surname:'Rodné příjmení :',
          year_of_birth:'Rok narození :',
          year_of_death:'Rok úmrtí :',
          birth_place:'Místo narození :',
          mother_id:'ID matky :',
          father_id:'ID otce :',
          description:'Popis :',
          create_button:'Přidat',
          header:'Přidání záznamu do databáze',
          succes:' úspěšně přidán/a do databáze s ID ',
        })
        break;
    }
  },[language])

  return (
    <div className={styles.container}>
      <h1 className="col-start-1 col-end-3">{translatedContent.header}</h1>
      <div>{translatedContent.name}</div>
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
      <div>{translatedContent.birth_surname}</div>
      <input
        className="border"
        name="birth_surname"
        value={personData.birth_surname}
        onChange={handleChange}
      ></input>
      <div>{translatedContent.year_of_birth}</div>
      <input
        className="border"
        type="number"
        name="year_of_birth"
        value={personData.year_of_birth}
        onChange={handleChange}
      ></input>
      <div>{translatedContent.year_of_death} </div>
      <input
        className="border"
        type="number"
        name="year_of_death"
        value={personData.year_of_death}
        onChange={handleChange}
      ></input>
      <div>{translatedContent.birth_place} </div>
      <input
        className="border"
        name="birth_place"
        value={personData.birth_place}
        onChange={handleChange}
      ></input>
      <div>{translatedContent.mother_id} </div>
      <input
        className="border"
        type="number"
        name="mother_id"
        value={personData.mother_id}
        onChange={handleChange}
      ></input>
      <div>{translatedContent.father_id} </div>
      <input
        className="border"
        type="number"
        name="father_id"
        value={personData.father_id}
        onChange={handleChange}
      ></input>
            <div>{translatedContent.description} </div>
      <input
        className="border"
        type="text-area"
        name="description"
        value={personData.description}
        onChange={handleChange}
      ></input>
      <button onClick={putPersonInDB} className="buttons">
        {translatedContent.create_button}
      </button>
      {creation.isSuccess && creation.data && (
        <div>
          {creation.data.name} {creation.data.surname} {translatedContent.succes} {creation.data.id}
        </div>
      )}
    </div>
  );
};

export default InputForm;
