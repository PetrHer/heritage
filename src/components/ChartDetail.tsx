import style from "../styles/GenealogyChart.module.css";
import type { Person } from "@prisma/client";
import { useTranslation } from "next-i18next";
import { useDispatch } from "react-redux";
import { setId } from "../utils/redux/idSlice";

type ChartDetailProps = {
  person: Person;
};

const ChartDetail = ({ person }: ChartDetailProps) => {
  const { t } = useTranslation("chartDetail");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const dispatch = useDispatch();
    const changeId = (x: number) => {
     // eslint-disable-next-line @typescript-eslint/no-unsafe-call
     dispatch(setId(x));
     };
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
