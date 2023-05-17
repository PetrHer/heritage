import type { Person } from "@prisma/client";
import {  useState } from "react";
import style from "../styles/GenealogyChart.module.css";
import { api } from "../utils/api";
import { useDispatch } from "react-redux";
import { setId } from "../utils/redux/idSlice";

type SiblingsProps = { person: Person };

const Siblings = ({ person }: SiblingsProps) => {
   const [displaySiblings, setDisplaySiblings] = useState(false);
  const siblings = api.dbRouter.getSiblings.useQuery({
    motherId: person.mother_id,
    fatherId: person.father_id,
    personId: person.id,
  });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      const dispatch = useDispatch();
      const changeId = (x: number) => {
       // eslint-disable-next-line @typescript-eslint/no-unsafe-call
       dispatch(setId(x));
       };


  const siblingVisibility = (x: boolean) => {
    setDisplaySiblings(x);
  };
  return (
    <div className={style.siblingContainer}>
      {!displaySiblings && siblings.data && siblings.data.length > 0 && (
        <button
          className={style.buttonPlus}
          onClick={() => siblingVisibility(true)}
        />
      )}
      {displaySiblings && siblings.data && siblings.data.length > 0 && (
        <button
          className={style.buttonMinus}
          onClick={() => siblingVisibility(false)}
        />
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
  );
};

export default Siblings;
