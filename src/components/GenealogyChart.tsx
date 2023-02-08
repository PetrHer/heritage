import type { Person } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { api } from "../utils/api";
import style from "../styles/GenealogyChart.module.css";

const GenealogyChart = ({
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
  const [displayChildren, setDisplayChildren] = useState(false)
  const motherDB = api.dbRouter.getPerson.useMutation();
  const fatherDB = api.dbRouter.getPerson.useMutation();
  const siblings = api.dbRouter.getSiblings.useMutation();
  const childrenDB = api.dbRouter.getChildren.useMutation();

  useEffect(() => {
    if (!parents && person.mother_id > 0) {
      motherDB.mutate(person.mother_id);
    }
    if (!parents && person.father_id > 0) {
      fatherDB.mutate(person.father_id);
    }
    if (!parents && person.father_id > 0 && person.mother_id > 0) {
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
        <div className="col-start-1 col-end-3 flex justify-center items-center">
        {childrenDB.data && childrenDB.data.length>0 && !displayChildren  && id == person.id && (<button className={style.buttonPlus} onClick={()=>setDisplayChildren(true)}></button>)}
        {childrenDB.data && childrenDB.data.length>0 && id == person.id && displayChildren && (<>

          <button className={style.buttonMinus} onClick={()=>setDisplayChildren(false)}></button>
            {// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              childrenDB.data.map((e: Person) => (
                <div
                  key={e.id}
                  onClick={() => changeId(e.id)}
                  className={style.detail}
                >
                  {e.name} {e.surname}
                </div>
              ))}
              </>
        )}
          </div>
        <div onClick={() => changeId(person.id)} className={style.detail}>
          id : {person.id} <br /> jmeno: {person.name} {person.surname} <br />{" "}
          <div>rok narozeni : {person.year_of_birth}</div>
          <div>misto narozeni : {person.birth_place}</div>
        </div>
        <div className="col-start-2 col-end-3 flex items-center">
          {!displaySiblings &&
            id == person.id &&
            siblings.data &&
            siblings.data.length > 0 && (
              <button className={style.buttonPlus} onClick={() => siblingVisibility(true)}></button>
            )}
          {displaySiblings &&
            id == person.id &&
            siblings.data &&
            siblings.data.length > 0 && (
              <button className={style.buttonMinus} onClick={() => siblingVisibility(false)}></button>
            )}
          {siblings.data &&
            displaySiblings &&
            id == person.id &&
            siblings.data.map((e: Person) => (
              <div
                key={e.id}
                onClick={() => changeId(e.id)}
                className={style.detail}
              >
                {e.name} {e.surname}
              </div>
            ))}
        </div>
        <div className={style.buttonContainer}>
          {parents && (
            <button onClick={() => handleClick(false)} className={style.buttonMinus}>
            </button>
          )}
          {!parents && (person.father_id > 0 || person.mother_id > 0) && (
            <button onClick={() => handleClick(true)} className={style.buttonPlus}>
            </button>
          )}
        </div>
      </div>
      {parents && (
        <div className="flex h-full justify-items-start">
          {motherDB.isSuccess && motherDB.data && (
            <GenealogyChart changeId={changeId} person={motherDB.data} id={id} />
          )}
          {fatherDB.isSuccess && fatherDB.data && (
            <GenealogyChart changeId={changeId} person={fatherDB.data} id={id} />
          )}
        </div>
      )}
    </div>
  );
};

export default GenealogyChart;
