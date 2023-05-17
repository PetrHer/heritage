import { useState } from "react";
import { api } from "../utils/api";
import style from "../styles/GenealogyChart.module.css";
import type { Person } from "@prisma/client";
import { useDispatch, useSelector } from "react-redux";
import { setId } from "../utils/redux/idSlice";
import type { RootState } from "../utils/redux/store";

const Children = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const id: number = useSelector((state: RootState) => state.id.id);
  const [displayChildren, setDisplayChildren] = useState(false);
  const childrenDB = api.dbRouter.getChildren.useQuery(id);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const dispatch = useDispatch();
  const changeId = (x: number) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    dispatch(setId(x));
  };
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
