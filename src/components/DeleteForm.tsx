import { useRef } from "react";
import { api } from "../utils/api";
import styles from "../styles/DeleteForm.module.css";

const DeleteForm = () => {
  const deletion = api.dbRouter.deletePerson.useMutation();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const personToDelete = useRef<HTMLInputElement>(null);
  const deletePerson = () => {
    if (search.data?.id) {
      deletion.mutate(search.data.id);
    }
    window.location.reload();
  };
  const search = api.dbRouter.getPerson.useMutation();
  const findPerson = () => {
    if (personToDelete.current?.value)
      search.mutate(Number(personToDelete.current.value));
  };
  return (
    <div className={styles.container}>
      <h1 className="col-start-1 col-end-3">Smazani zaznamu z databaze.</h1>
      {!search.data && (
        <>
          <div>ID ke smazani : </div>
          <input type="number" className="border" ref={personToDelete} />
          <button onClick={findPerson} className="w-16 border col-start-1 col-end-3">
            search
          </button>
        </>
      )}
      {search.data && (
        <>
          <div>ID : </div>
          <div>{search.data.id}</div>
          <div>Jmeno : </div>
          <div>{search.data.name}</div>
          <div>Prijmeni : </div>
          <div>{search.data.surname}</div>
          <button onClick={deletePerson} className="w-16 col-start-1 col-end-3">
            delete
          </button>
        </>
      )}
    </div>
  );
};

export default DeleteForm;
