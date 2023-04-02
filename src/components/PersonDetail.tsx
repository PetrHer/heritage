/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-empty-function */
import { useEffect } from "react";
import { api } from "../utils/api";
import PropTypes from "prop-types";
import { useTranslation } from "next-i18next";

type PersonDetailProps = {
  id: number;
  setPhoto: (arg: string) => void;
  setInfo: (arg: string) => void;
  setID: (arg: number) => void;
  privileges: boolean;
};

const PersonDetail = ({
  id,
  setPhoto = () => {},
  setInfo = () => {},
  setID,
  privileges,
}: PersonDetailProps) => {

  const { t } = useTranslation("personDetail");
  const getPersonDetail = api.dbRouter.getPerson.useMutation();
  useEffect(() => {
    if (id) {
      getPersonDetail.mutate(Number(id));
      getChildrenInDetail.mutate(id);
    }
  }, [id]);
  const verification = api.authRouter.verify.useMutation();
  const getChildrenInDetail = api.dbRouter.getChildren.useMutation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      verification.mutate(token);
    }
    getChildrenInDetail.mutate(id);
  }, []);
  useEffect(() => {
    if (getPersonDetail.data?.image) {
      setPhoto(getPersonDetail.data.image);
    } else {
      setPhoto("");
    }
    if (getPersonDetail.data?.description) {
      setInfo(getPersonDetail.data.description);
    } else {
      setInfo("");
    }
  }, [getPersonDetail.data]);


  const selectPerson = (selecteId: number) => {
    sessionStorage.setItem("id", selecteId.toString());
    setID(selecteId);
  };

  const updatePerson = (arg: string) => {
    sessionStorage.setItem("updateID", arg);
    window.location.href = "/records";
  };
  if (getChildrenInDetail.isSuccess) {
    getChildrenInDetail.data.sort((a, b) => a.id - b.id);
  }

  return (
    <>
      {verification.isSuccess && (
        <div>
          {getPersonDetail.isError && <div>{t('not_found')} </div>}
          {getPersonDetail.data && (
            <>
              <div>ID : {getPersonDetail.data.id}</div>
              <div>
                {t('name')} {getPersonDetail.data.name}
              </div>
              <div>
                {t('surname')} {getPersonDetail.data.surname}
              </div>
              {getPersonDetail.data.year_of_birth && (
                <div>
                  {t('year_of_birth')}{" "}
                  {getPersonDetail.data.year_of_birth}
                </div>
              )}
              {getPersonDetail.data.year_of_death && (
                <div>
                  {t('year_of_death')}{" "}
                  {getPersonDetail.data.year_of_death}
                </div>
              )}
              {getPersonDetail.data.birth_place && (
                <div>
                  {t('birth_place')}{" "}
                  {getPersonDetail.data.birth_place}
                </div>
              )}
              {getPersonDetail.data.birth_surname && (
                <div>
                  {t('birth_surname')}{" "}
                  {getPersonDetail.data.birth_surname}
                </div>
              )}
              {getPersonDetail.data.mother_id != 0 && (
                <div>
                  {t('mother_id')}{" "}
                  <span
                    className="cursor-pointer font-bold text-blue-700 underline"
                    onClick={() => selectPerson(getPersonDetail.data.mother_id)}
                  >
                    {getPersonDetail.data.mother_id}
                  </span>
                </div>
              )}
              {getPersonDetail.data.father_id != 0 && (
                <div>
                  {t('father_id')}{" "}
                  <span
                    className="cursor-pointer font-bold text-blue-700 underline"
                    onClick={() => selectPerson(getPersonDetail.data.father_id)}
                  >
                    {getPersonDetail.data.father_id}
                  </span>
                </div>
              )}
              {getChildrenInDetail.data &&
                getChildrenInDetail.data.length > 0 && (
                  <>
                    <span>{t('children')}</span>
                    {getChildrenInDetail.data.map((e) => (
                      <span
                        className="cursor-pointer font-bold text-blue-700 underline"
                        onClick={() => selectPerson(e.id)}
                        style={{ margin: "1px" }}
                        key={e.id}
                      >
                        {e.id}
                      </span>
                    ))}
                    <br />
                  </>
                )}
              {privileges && (
                <button
                  onClick={() =>
                    updatePerson(getPersonDetail.data.id.toString())
                  }
                  style={{ backgroundImage: `url('/edit-button.png')` }}
                  className="h-4 w-4 bg-contain"
                ></button>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default PersonDetail;

PersonDetail.defaultProps = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setPhoto: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setInfo: () => {},
};
PersonDetail.propTypes = {
  setPhoto: PropTypes.func,
  setInfo: PropTypes.func,
};
