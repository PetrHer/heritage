import React, { useEffect, useState } from "react";
import style from "../styles/GenealogyChart.module.css";
import type { Person } from "@prisma/client";

type ChartDetailProps = {
  person: Person;
  changeId: (arg: number) => void;
  language: string;
};

const ChartDetail = ({ person, changeId, language }: ChartDetailProps) => {
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

  return (
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
  );
};

export default ChartDetail;
