import type { Person } from "@prisma/client";
import { useEffect, useState } from "react";
import style from "../styles/GenealogyChart.module.css";
import { api } from "../utils/api";

type SiblingsProps = { person: Person; changeId: (arg: number) => void };

const Siblings = ({ person, changeId }: SiblingsProps) => {
  const [displaySiblings, setDisplaySiblings] = useState(false);
  const siblings = api.dbRouter.getSiblings.useMutation();

  useEffect(() => {
    if (person.father_id > 0 && person.mother_id > 0) {
      siblings.mutate({
        motherId: person.mother_id,
        fatherId: person.father_id,
        personId: person.id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [person.mother_id, person.father_id]);
  const siblingVisibility = (x: boolean) => {
    setDisplaySiblings(x);
  };
  return (
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
  );
};

export default Siblings;
