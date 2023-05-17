import type { Person } from "@prisma/client";
import React, { useState } from "react";
import { api } from "../utils/api";
import style from "../styles/GenealogyChart.module.css";
import Siblings from "./Siblings";
import Children from "./Children";
import ChartDetail from "./ChartDetail";
import Partner from "./Partner";

type GenealogyChartProps = {
  person: Person;
  id: number;
};

const GenealogyChart = ({ person, id }: GenealogyChartProps) => {
  const [parents, setParents] = useState(false);
  const motherDB = api.dbRouter.getPerson.useQuery(person.mother_id);
  const fatherDB = api.dbRouter.getPerson.useQuery(person.father_id);
  const handleClick = (x: boolean) => {
    setParents(x);
  };
  return (
    <div className="parent">
      <div className={style.content}>
        {id == person.id && <Children />}
        <ChartDetail person={person} />
        {id == person.id && <Siblings person={person} />}
        <div className={style.buttonContainer}>
          {parents && (
            <button
              onClick={() => handleClick(false)}
              className={style.buttonMinus}
            ></button>
          )}
          {!parents && (person.father_id || person.mother_id) && (
            <button
              onClick={() => handleClick(true)}
              className={style.buttonPlus}
            ></button>
          )}
        </div>
        {id == person.id && person.partner_id && <Partner />}
      </div>
      {parents && (
        <div className="float-left flex h-full">
          {motherDB.isSuccess && motherDB.data && (
            <GenealogyChart person={motherDB.data} id={id} />
          )}
          {fatherDB.isSuccess && fatherDB.data && (
            <GenealogyChart person={fatherDB.data} id={id} />
          )}
        </div>
      )}
    </div>
  );
};

export default GenealogyChart;
