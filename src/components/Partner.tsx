import React, {  useState } from "react";
import { api } from "../utils/api";
import style from "../styles/GenealogyChart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setId } from "../utils/redux/idSlice";
import type { RootState } from "../utils/redux/store";


const Partner = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const id:number = useSelector((state:RootState) => state.id.id);
  const [showPartner, setShowPartner] = useState<boolean>(false);
  const getPartner = api.dbRouter.getPartner.useQuery(id);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const dispatch = useDispatch();
    const changeId = (x: number) => {
     // eslint-disable-next-line @typescript-eslint/no-unsafe-call
     dispatch(setId(x));
     };

  return (
    <div className={style.partnerContainer}>
      {getPartner.data && !showPartner && (
        <button onClick={() => setShowPartner(true)} className={style.buttonPlus} />
      )}
      {getPartner.data && showPartner && (
        <>
          <div className={style.detail} onClick={() => changeId(getPartner.data.id)}>
            {getPartner.data.name} {getPartner.data.surname}
          </div>
          <button onClick={() => setShowPartner(false)} className={style.buttonMinus}/>
        </>
      )}
    </div>
  );
};

export default Partner;
