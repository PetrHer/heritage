import { Person } from "@prisma/client";
import { NextApiRequest } from "next";
import React, { useEffect, useRef, useState } from "react";
import { number } from "yargs";
import PersonDetail from "../components/PersonDetail";
import { api } from "../utils/api";

const PersonId = () => {
  const [id, setId] = useState<number>();
  const [selectedPerson, setSelectedPerson] = useState<Person>();
  const nameInput = useRef<HTMLInputElement>(null);
  const fatherInput = useRef<HTMLInputElement>(null);
  const motherInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setId(Number(sessionStorage.getItem("id")));
  }, []);
  const changeId = (x: number) => {
    sessionStorage.setItem("id", x.toString());
    setId(x);
  };
  const creation = api.dbRouter.addPerson.useMutation();
  const putPersonInDB = () => {
    if (nameInput.current?.value)
      creation.mutate({
        name: nameInput.current.value,
        mother_id: Number(motherInput.current?.value),
        father_id: Number(fatherInput.current?.value),
      });
  };
  const response = api.dbRouter.getPerson.useMutation();
  useEffect(() => {
    if (id) response.mutate(id);
  }, [id]);
  return (
    <div>
      {response.data && (
        <PersonDetail
          changeId={changeId}
          person={response.data}
          id={response.data.id}
        />
      )}
      <button onClick={() => changeId(1)}>1</button>
      <button onClick={() => changeId(2)}>2</button>
      <button onClick={() => changeId(3)}>3</button>
      <br />
      <label>
        Add (name) <input className="border" ref={nameInput}></input>
      </label>
      <label>
        Mother id{" "}
        <input className="border" type="number" ref={motherInput}></input>
      </label>
      <label>
        Father id{" "}
        <input className="border" type="number" ref={fatherInput}></input>
      </label>
      <button onClick={putPersonInDB}>Create</button>
    </div>
  );
};
export default PersonId;
