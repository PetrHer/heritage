import type { Person } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { api } from "../utils/api";
import style from "../styles/GenealogyChart.module.css";
import Siblings from "./Siblings";
import Children from "./Children";
import ChartDetail from "./ChartDetail";

type GenealogyChartProps = {
  person: Person;
  changeId: (x: number) => void;
  id: number;
  language: string;
};

const GenealogyChart = ({
  person,
  changeId,
  id,
  language,
}: GenealogyChartProps) => {
  const [parents, setParents] = useState(false);
  const motherDB = api.dbRouter.getPerson.useMutation();
  const fatherDB = api.dbRouter.getPerson.useMutation();

  useEffect(() => {
    if (!parents && person.mother_id > 0) {
      motherDB.mutate(person.mother_id);
    }
    if (!parents && person.father_id > 0) {
      fatherDB.mutate(person.father_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parents, person.mother_id, person.father_id]);
  const handleClick = (x: boolean) => {
    setParents(x);
  };
  return (
    <div className="parent">
      <div className={style.content}>
        {id == person.id && (
          <Children changeId={changeId} personId={person.id} />
        )}
        <ChartDetail changeId={changeId} language={language} person={person} />
        {id == person.id && <Siblings changeId={changeId} person={person} />}
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
