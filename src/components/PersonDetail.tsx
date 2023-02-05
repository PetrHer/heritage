import type { Person } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { api } from "../utils/api";
import style from "../styles/PersonDetail.module.css";

const PersonDetail = ({
  person,
  changeId,
  id,
}: {
  person: Person;
  changeId: (x: number) => void;
  id: number;
}) => {
  const [parents, setParents] = useState(false);
  const [displaySiblings, setDisplaySiblings] = useState(false);
  const motherDB = api.dbRouter.getPerson.useMutation();
  const fatherDB = api.dbRouter.getPerson.useMutation();
  const siblings = api.dbRouter.getSiblings.useMutation();
  const childrenDB = api.dbRouter.getChildren.useMutation();

  useEffect(() => {
    if (!parents && person.mother_id>0) {
      motherDB.mutate(person.mother_id);
    }
    if (!parents && person.father_id>0) {
      fatherDB.mutate(person.father_id);
    }
    if (!parents && person.father_id>0 && person.mother_id>0) {
      siblings.mutate({
        motherId: person.mother_id,
        fatherId: person.father_id,
        personId: person.id,
      });
    }
    childrenDB.mutate(person.id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parents, person.mother_id, person.father_id]);
  const handleClick = (x: boolean) => {
    setParents(x);
  };
  const siblingVisibility = (x: boolean) => {
    setDisplaySiblings(x);
  };
  return (
    <div className="parent">
      <div className={style.content}>
        <div className="col-start-1 col-end-3 flex">
          {childrenDB.data &&
            id == person.id &&
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            childrenDB.data.map((e: Person) => (
              <div
                key={e.id}
                onClick={() => changeId(e.id)}
                className=" w-max bg-[url('/parchment.png')] bg-cover p-1 px-4"
              >
                {e.name} {e.surname}
              </div>
            ))}
        </div>
        <div
          onClick={() => changeId(person.id)}
          className=" w-max bg-[url('/parchment.png')] bg-cover p-1 px-4"
        >
          id : {person.id} <br/> jmeno: {person.name} {person.surname} {"("}{person.birth_surname} {")"}<br/>{" "}
          rok narozeni : {person.year_of_birth}{" "} <br />
          misto narozeni : {person.birth_place} <br />
          rok umrti : {person.year_of_death}
        </div>
        <div className="col-start-2 col-end-3 flex">
          {!displaySiblings &&
            id == person.id &&
            siblings.data &&
            siblings.data.length > 0 && (
              <button onClick={() => siblingVisibility(true)}>+</button>
            )}
          {displaySiblings &&
            id == person.id &&
            siblings.data &&
            siblings.data.length > 0 && (
              <button onClick={() => siblingVisibility(false)}>-</button>
            )}
          {siblings.data &&
            displaySiblings &&
            id == person.id &&
            siblings.data.map((e: Person) => (
              <div
                key={e.id}
                onClick={() => changeId(e.id)}
                className=" w-max bg-[url('/parchment.png')] bg-cover p-1 px-4"
              >
                {e.name}  {e.surname}
              </div>
            ))}
        </div>
      </div>
      {parents && (
        <button onClick={() => handleClick(false)} className="button">
          -
        </button>
      )}
      {!parents && (person.father_id>0 || person.mother_id>0) && (
        <button onClick={() => handleClick(true)} className="button">
          +
        </button>
      )}
      {parents && (
        <div className="flex">
          {motherDB.isSuccess && motherDB.data && (
            <PersonDetail changeId={changeId} person={motherDB.data} id={id} />
          )}
          {fatherDB.isSuccess && fatherDB.data && (
            <PersonDetail changeId={changeId} person={fatherDB.data} id={id} />
          )}
        </div>
      )}
    </div>
  );
};

export default PersonDetail;
