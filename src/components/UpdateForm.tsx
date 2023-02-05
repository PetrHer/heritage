import { useRef } from "react";
import { api } from "../utils/api";

const UpdateForm = () => {
    const nameInput = useRef<HTMLInputElement>(null);
    const idInput = useRef<HTMLInputElement>(null);
    const surnameInput = useRef<HTMLInputElement>(null);
    const birthSurnameInput = useRef<HTMLInputElement>(null);
    const birthYearInput = useRef<HTMLInputElement>(null);
    const deathYearInput = useRef<HTMLInputElement>(null);
    const birthPlaceInput = useRef<HTMLInputElement>(null);
    const fatherInput = useRef<HTMLInputElement>(null);
    const motherInput = useRef<HTMLInputElement>(null);

    const updating = api.dbRouter.updatePerson.useMutation()
    const updatePersonInDB = () => {
      if (idInput.current?.value && nameInput.current?.value && surnameInput.current?.value)
      updating.mutate({
        id:Number(idInput.current.value),
          birthSurname: birthSurnameInput.current?.value,
          birthYear: birthYearInput.current?.value,
          surname: surnameInput.current.value,
          name: nameInput.current.value,
          mother_id: Number(motherInput.current?.value),
          father_id: Number(fatherInput.current?.value),
          birthPlace:birthPlaceInput.current?.value,
          deathYear:deathYearInput.current?.value,
        });
      
    };
    const search = api.dbRouter.getPerson.useMutation()
    const findPerson = () => {
       if (idInput.current?.value) search.mutate(Number(idInput.current.value))
    }
   if (updating.isSuccess) {window.location.reload()}
  return (
    <div className="flex flex-col">
            <label>
        ID k update : <input className="border" type='number'  ref={idInput}></input>
      </label>
      <button onClick={findPerson} className='w-6'>search</button>
      {search.data && (<>
      <div>ID : {search.data.id}</div>
      <label>
        Jmeno : <input className="border" value={search.data?.name} ref={nameInput}></input>
      </label>
      <label>
        Prijmeni : <input className="border" value={search.data?.surname} ref={surnameInput}></input>
      </label>
      <label>
        Rodne prijmeni :{" "}
        <input className="border" value={search.data?.birth_surname || undefined} ref={birthSurnameInput}></input>
      </label>
      <label>
        Rok narozeni :{" "}
        <input className="border" type="number" value={search.data?.year_of_birth || undefined} ref={birthYearInput}></input>
      </label>
      <label>
        Rok umrti :{" "}
        <input className="border" type="number" value={search.data?.year_of_death || undefined} ref={deathYearInput}></input>
      </label>
      <label>
        Misto narozeni :{" "}
        <input className="border"  value={search.data?.birth_place || undefined} ref={birthPlaceInput}></input>
      </label>
      <label>
        Mother id{" "}
        <input className="border" type="number" value={search.data?.mother_id || undefined} ref={motherInput}></input>
      </label>
      <label>
        Father id{" "}
        <input className="border" type="number" value={search.data?.father_id || undefined} ref={fatherInput}></input>
      </label>
      <button onClick={updatePersonInDB} className='w-6'>update</button></>)}
    </div>
  )
}

export default UpdateForm