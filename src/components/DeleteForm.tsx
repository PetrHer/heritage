import { useRef } from "react";
import { api } from "../utils/api";

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
    <div>
      {!search.data &&(<><label>
        ID ke smazani :{" "}
        <input type="number" className="border" ref={personToDelete} />
      </label>
      <br />
      <button onClick={findPerson} className="w-6">
        search
      </button></>)}
      {search.data && (
        <>
          <div>ID : {search.data.id}</div>
          <div>Jmeno : {search.data.name}</div>
          <div>Prijmeni : {search.data.surname}</div>
          <br />
          <button onClick={deletePerson} className="w-6">
            delete
          </button>
        </>
      )}
    </div>
  );
};

export default DeleteForm;
