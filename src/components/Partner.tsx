import React, { useEffect, useState } from "react";
import { api } from "../utils/api";
import style from "../styles/GenealogyChart.module.css";

type PartnerProps = { id: number; changeId: (arg: number) => void };
const Partner = ({ id,changeId }: PartnerProps) => {
  const [showPartner, setShowPartner] = useState<boolean>(false);
  const getPartner = api.dbRouter.getPerson.useMutation();
  useEffect(() => {
    getPartner.mutate(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <div className={style.partnerContainer}>
      {getPartner.data && !showPartner && (
        <button onClick={() => setShowPartner(true)} className={style.buttonPlus} />
      )}
      {getPartner.data && showPartner && (
        <>
          <div className={style.detail} onClick={() => changeId(id)}>
            {getPartner.data.name} {getPartner.data.surname}
          </div>
          <button onClick={() => setShowPartner(false)} className={style.buttonMinus}/>
        </>
      )}
    </div>
  );
};

export default Partner;
