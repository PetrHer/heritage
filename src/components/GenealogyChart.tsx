import type { Person } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { api } from "../utils/api";
import style from "../styles/GenealogyChart.module.css";

const GenealogyChart = ({
  person,
  changeId,
  id,
  language,
}: {
  person: Person;
  changeId: (x: number) => void;
  id: number;
  language: string;
}) => {
  const [parents, setParents] = useState(false);
  const [displaySiblings, setDisplaySiblings] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(false);
  const motherDB = api.dbRouter.getPerson.useMutation();
  const fatherDB = api.dbRouter.getPerson.useMutation();
  const siblings = api.dbRouter.getSiblings.useMutation();
  const childrenDB = api.dbRouter.getChildren.useMutation();
  const [translatedContent, setTranslatedContent] = useState<{
    name: string;
    year_of_birth: string;
    birth_place: string;
  }>({
    name: "Jméno : ",
    year_of_birth: "Rok narození : ",
    birth_place: "Místo narození : ",
  });
  useEffect(() => {
    switch (language) {
      case "en":
        setTranslatedContent({
          name: "Name : ",
          year_of_birth: "Year of birth : ",
          birth_place: "Place of birth : ",
        });
        break;

      case "cz":
        setTranslatedContent({
          name: "Jméno : ",
          year_of_birth: "Rok narození : ",
          birth_place: "Místo narození : ",
        });
        break;
    }
  }, [language]);

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
        {id == person.id && (
          <div className="col-start-1 col-end-3 flex items-center justify-center">
            {childrenDB.data &&
              childrenDB.data.length > 0 &&
              !displayChildren && (
                <button
                  className={style.buttonPlus}
                  onClick={() => setDisplayChildren(true)}
                ></button>
              )}
            {childrenDB.data &&
              childrenDB.data.length > 0 &&
              displayChildren && (
                <>
                  <button
                    className={style.buttonMinus}
                    onClick={() => setDisplayChildren(false)}
                  ></button>
                  {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    childrenDB.data.map((e: Person) => (
                      <div
                        key={e.id}
                        onClick={() => changeId(e.id)}
                        className={style.detail}
                      >
                        {e.name} {e.surname}
                      </div>
                    ))
                  }
                </>
              )}
          </div>
        )}
        <div onClick={() => changeId(person.id)} className={style.detail}>
          <div>ID : {person.id}</div>
          <div>
            {translatedContent.name} {person.name} {person.surname}
          </div>
          <div>
            {translatedContent.year_of_birth} {person.year_of_birth}
          </div>
          <div>
            {translatedContent.birth_place} {person.birth_place}
          </div>
        </div>
        {id == person.id && (
                      <div className={style.siblingContainer}>
          
            {!displaySiblings && siblings.data && siblings.data.length > 0 && (
              <button
                className={style.buttonPlus}
                onClick={() => siblingVisibility(true)}
              ></button>
            )}
            {displaySiblings && siblings.data && siblings.data.length > 0 && (
              <button
                className={style.buttonMinus}
                onClick={() => siblingVisibility(false)}
              ></button>
            )}

              {siblings.data &&
                displaySiblings &&
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
        )}
        <div className={style.buttonContainer}>
          {parents && (
            <button
              onClick={() => handleClick(false)}
              className={style.buttonMinus}
            ></button>
          )}
          {!parents && (person.father_id > 0 || person.mother_id > 0) && (
            <button
              onClick={() => handleClick(true)}
              className={style.buttonPlus}
            ></button>
          )}
        </div>
      </div>
      {parents && (
        <div className="float-left flex h-full">
          {motherDB.isSuccess && motherDB.data && (
            <GenealogyChart
              language={language}
              changeId={changeId}
              person={motherDB.data}
              id={id}
            />
          )}
          {fatherDB.isSuccess && fatherDB.data && (
            <GenealogyChart
              language={language}
              changeId={changeId}
              person={fatherDB.data}
              id={id}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default GenealogyChart;
