import { useEffect, useRef, useState } from "react";
import { api } from "../utils/api";
import styles from "../styles/DeleteForm.module.css";

const DeleteForm = ({ language }: { language: string }) => {
  const deletion = api.dbRouter.deletePerson.useMutation();
  const [translatedContent, setTranslatedContent] = useState<{
    header: string;
    id_to_search: string;
    search: string;
    id: string;
    name: string;
    surname: string;
    year: string;
    delete: string;
    alert: string;
  }>({
    name: "Jméno :",
    surname: "Příjmení :",
    header: "Smazání záznamu z databáze",
    id_to_search: "ID ke smazání :",
    id: "ID :",
    search: "Hledat",
    year: "Rok narození :",
    delete: "Smazat",
    alert: "Smazán záznam s ID ",
  });
  // eslint-disable-next-line react-hooks/rules-of-hooks
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
          header: "Delete record from database",
          id_to_search: "ID to delete :",
          id: "ID :",
          search: "Search",
          year: "Year of birth :",
          delete: "Delete",
          alert: "Deleted record with ID ",
        });
        break;

      case "cz":
        setTranslatedContent({
          name: "Jméno :",
          surname: "Příjmení :",
          header: "Smazání záznamu z databáze",
          id_to_search: "ID ke smazání :",
          id: "ID :",
          search: "Hledat",
          year: "Rok narození :",
          delete: "Smazat",
          alert: "Smazán záznam s ID ",
        });
        break;
    }
  }, [language]);

  return (
    <div className={styles.container}>
      <h1 className="col-start-1 col-end-3">{translatedContent.header}</h1>
      {!search.data && (
        <>
          <div>{translatedContent.id_to_search} </div>
          <input type="number" className="border" ref={personToDelete} />
          <button onClick={findPerson} className="buttons">
            {translatedContent.search}
          </button>
        </>
      )}
      {search.data && (
        <>
          <div>{translatedContent.id} </div>
          <div>{search.data.id}</div>
          <div>{translatedContent.name} </div>
          <div>{search.data.name}</div>
          <div>{translatedContent.surname} </div>
          <div>{search.data.surname}</div>
          <div>{translatedContent.year}</div>
          <div>{search.data.year_of_birth}</div>
          <button onClick={deletePerson} className="buttons">
            {translatedContent.delete}
          </button>
        </>
      )}
    </div>
  );
};

export default DeleteForm;
