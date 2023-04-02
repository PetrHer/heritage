import style from "../styles/GenealogyChart.module.css";
import type { Person } from "@prisma/client";
import { useTranslation } from "next-i18next";

type ChartDetailProps = {
  person: Person;
  changeId: (arg: number) => void;
};

const ChartDetail = ({ person, changeId }: ChartDetailProps) => {
  const { t } = useTranslation("chartDetail");
  return (
    <div onClick={() => changeId(person.id)} className={style.detail}>
      <div>ID : {person.id}</div>
      <div>
        {t('name')} {person.name} {person.surname}
      </div>
      <div>
        {t('year_of_birth')} {person.year_of_birth}
      </div>
      <div>
        {t('birth_place')} {person.birth_place}
      </div>
    </div>
  );
};

export default ChartDetail;
