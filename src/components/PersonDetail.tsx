import { useEffect } from "react";
import { api } from "../utils/api";
import PropTypes from 'prop-types';

const PersonDetail = ({id,setPhoto=()=>{},setInfo=()=>{}}:{id:number|undefined,setPhoto:(arg:string)=>void,setInfo:(arg:string)=>void}) => {
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
  useEffect(()=>{
    if (getPersonDetail.data?.image){setPhoto(getPersonDetail.data.image)}
    else {setPhoto('')}
    if (getPersonDetail.data?.description){setInfo(getPersonDetail.data.description)}
        else {setInfo('')}
  },[getPersonDetail.data])
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
            {getPersonDetail.data.mother_id!=0 && (
              <div>id matky : {getPersonDetail.data.mother_id}</div>
            )}
            {getPersonDetail.data.father_id!=0 && (
              <div>id otce : {getPersonDetail.data.father_id}</div>
            )}
          </>
        )}
      </div>)}
    </>
  );
};

export default PersonDetail;

PersonDetail.defaultProps = {
  setPhoto:()=>{},
  setInfo:()=>{}
}
PersonDetail.propTypes = {
  setPhoto:PropTypes.func,
  setInfo:PropTypes.func
}