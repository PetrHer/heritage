import { useRef } from "react";
import { api } from "../utils/api";

const InputForm = () => {
  const nameInput = useRef<HTMLInputElement>(null);
  const surnameInput = useRef<HTMLInputElement>(null);
  const birthSurnameInput = useRef<HTMLInputElement>(null);
  const birthYearInput = useRef<HTMLInputElement>(null);
  const deathYearInput = useRef<HTMLInputElement>(null);
  const birthPlaceInput = useRef<HTMLInputElement>(null);
  const fatherInput = useRef<HTMLInputElement>(null);
  const motherInput = useRef<HTMLInputElement>(null);
  const creation = api.dbRouter.addPerson.useMutation();
  const putPersonInDB = () => {
    if (nameInput.current?.value && surnameInput.current?.value)
      creation.mutate({
        birthSurname: birthSurnameInput.current?.value,
        birthYear: birthYearInput.current?.value,
        surname: surnameInput.current.value,
        name: nameInput.current.value,
        mother_id: Number(motherInput.current?.value),
        father_id: Number(fatherInput.current?.value),
        birthPlace:birthPlaceInput.current?.value,
        deathYear:deathYearInput.current?.value,
      });
    else alert("name and surname required");
  };
  return (
    <div className="flex flex-col">
      <label>
        Jmeno : <input className="border" ref={nameInput}></input>
      </label>
      <label>
        Prijmeni : <input className="border" ref={surnameInput}></input>
      </label>
      <label>
        Rodne prijmeni :{" "}
        <input className="border" ref={birthSurnameInput}></input>
      </label>
      <label>
        Rok narozeni :{" "}
        <input className="border" type="number" ref={birthYearInput}></input>
      </label>
      <label>
        Rok umrti :{" "}
        <input className="border" type="number" ref={deathYearInput}></input>
      </label>
      <label>
        Misto narozeni :{" "}
        <input className="border" type="number" ref={birthPlaceInput}></input>
      </label>
      <label>
        Mother id{" "}
        <input className="border" type="number" ref={motherInput}></input>
      </label>
      <label>
        Father id{" "}
        <input className="border" type="number" ref={fatherInput}></input>
      </label>
      <button onClick={putPersonInDB} className='w-6'>Create</button>
    </div>
  );
};

export default InputForm;
