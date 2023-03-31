import { useEffect, useState } from "react";
import { api } from "../utils/api";
import style from "../styles/GenealogyChart.module.css";
import type { Person } from "@prisma/client";

type ChildrenProps = { personId: number; changeId: (arg: number) => void };

const Children = ({ personId, changeId }: ChildrenProps) => {
  const [displayChildren, setDisplayChildren] = useState(false);
  const childrenDB = api.dbRouter.getChildren.useMutation();

  useEffect(() => {
    childrenDB.mutate(personId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="col-start-1 col-end-3 flex items-center justify-center">
      {childrenDB.data && childrenDB.data.length > 0 && !displayChildren && (
        <button
          className={style.buttonPlus}
          onClick={() => setDisplayChildren(true)}
        ></button>
      )}
      {childrenDB.data && childrenDB.data.length > 0 && displayChildren && (
        <>
          <button
            className={style.buttonMinus}
            onClick={() => setDisplayChildren(false)}
          ></button>
          {childrenDB.data.map((e: Person) => (
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
  );
};

export default Children;
