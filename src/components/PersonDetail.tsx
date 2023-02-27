import { useEffect } from "react";
import { api } from "../utils/api";

const PersonDetail = ({id}:{id:number|undefined}) => {
  const getPersonDetail = api.dbRouter.getPerson.useMutation();
  useEffect(() => {
    if (id) {
      getPersonDetail.mutate(Number(id));
    }
  }, [id]);
  const verification = api.authRouter.verify.useMutation();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      verification.mutate(token);
    }
  }, []);
  return (
    <>
      {verification.isSuccess &&(<div >
        {getPersonDetail.isError && (<div>Not found.</div>)}
        {getPersonDetail.data && (
          <>
            <div>id : {getPersonDetail.data.id}</div>
            <div>jmeno : {getPersonDetail.data.name}</div>
            <div>prijmeni : {getPersonDetail.data.surname}</div>
            {getPersonDetail.data.year_of_birth && (
              <div>rok narozeni : {getPersonDetail.data.year_of_birth}</div>
            )}
            {getPersonDetail.data.year_of_death && (
              <div>rok umrti : {getPersonDetail.data.year_of_death}</div>
            )}
            {getPersonDetail.data.birth_place && (
              <div>misto narozeni : {getPersonDetail.data.birth_place}</div>
            )}
            {getPersonDetail.data.birth_surname && (
              <div>rodne prijmeni : {getPersonDetail.data.birth_surname}</div>
            )}
            {getPersonDetail.data.mother_id && (
              <div>id matky : {getPersonDetail.data.mother_id}</div>
            )}
            {getPersonDetail.data.father_id && (
              <div>id otce : {getPersonDetail.data.father_id}</div>
            )}
          </>
        )}
      </div>)}
    </>
  );
};

export default PersonDetail;
