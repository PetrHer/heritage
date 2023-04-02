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
    <>
      <div className={style.buttonContainerChildren}>
        {childrenDB.data && childrenDB.data.length > 0 && !displayChildren && (
          <button
            className={style.buttonPlus}
            onClick={() => setDisplayChildren(true)}
          />
        )}
        {childrenDB.data && childrenDB.data.length > 0 && displayChildren && (
          <button
            className={style.buttonMinus}
            onClick={() => setDisplayChildren(false)}
          />
        )}
      </div>
      {childrenDB.data && childrenDB.data.length > 0 && displayChildren && (
        <div className={style.childrenContainer}>
          {childrenDB.data.map((e: Person) => (
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
    </>
  );
};

export default Children;
