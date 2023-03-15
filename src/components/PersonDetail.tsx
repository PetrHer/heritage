/* eslint-disable @typescript-eslint/no-empty-function */
import { useEffect, useState } from "react";
import { api } from "../utils/api";
import PropTypes from "prop-types";

const PersonDetail = ({
  id,
  setPhoto = () => {},
  setInfo = () => {},
  language,
}: {
  id: number | undefined;
  setPhoto: (arg: string) => void;
  setInfo: (arg: string) => void;
  language: string;
}) => {
  const [translatedContent, setTranslatedContent] = useState<{
    name: string;
    surname: string;
    birth_surname: string;
    year_of_birth: string;
    year_of_death: string;
    birth_place: string;
    mother_id: string;
    father_id: string;
    not_found: string;
  }>({
    name: "Jméno : ",
    surname: "Příjmení : ",
    birth_surname: "Rodné příjmení : ",
    year_of_birth: "Rok narození : ",
    year_of_death: "Rok úmrtí : ",
    birth_place: "Místo narození : ",
    mother_id: "ID matky : ",
    father_id: "ID otce : ",
    not_found: "Záznam nenalezen.",
  });
  const getPersonDetail = api.dbRouter.getPerson.useMutation();
  useEffect(() => {
    if (id) {
      getPersonDetail.mutate(Number(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const verification = api.authRouter.verify.useMutation();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      verification.mutate(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getPersonDetail.data]);

  useEffect(() => {
    switch (language) {
      case "en":
        setTranslatedContent({
          name: "Name : ",
          surname: "Surname : ",
          birth_surname: "Birth surname : ",
          year_of_birth: "Year of birth : ",
          year_of_death: "Year of death : ",
          birth_place: "Place of birth : ",
          mother_id: "ID of mother : ",
          father_id: "ID of father : ",
          not_found: "Record not found.",
        });
        break;

      case "cz":
        setTranslatedContent({
          name: "Jméno : ",
          surname: "Příjmení : ",
          birth_surname: "Rodné příjmení : ",
          year_of_birth: "Rok narození : ",
          year_of_death: "Rok úmrtí : ",
          birth_place: "Místo narození : ",
          mother_id: "ID matky : ",
          father_id: "ID otce : ",
          not_found: "Záznam nenalezen.",
        });
        break;
    }
  }, [language]);

  return (
    <>
      {verification.isSuccess && (
        <div>
          {getPersonDetail.isError && <div>{translatedContent.not_found} </div>}
          {getPersonDetail.data && (
            <>
              <div>ID : {getPersonDetail.data.id}</div>
              <div>
                {translatedContent.name} {getPersonDetail.data.name}
              </div>
              <div>
                {translatedContent.surname} {getPersonDetail.data.surname}
              </div>
              {getPersonDetail.data.year_of_birth && (
                <div>
                  {translatedContent.year_of_birth}{" "}
                  {getPersonDetail.data.year_of_birth}
                </div>
              )}
              {getPersonDetail.data.year_of_death && (
                <div>
                  {translatedContent.year_of_death}{" "}
                  {getPersonDetail.data.year_of_death}
                </div>
              )}
              {getPersonDetail.data.birth_place && (
                <div>
                  {translatedContent.birth_place}{" "}
                  {getPersonDetail.data.birth_place}
                </div>
              )}
              {getPersonDetail.data.birth_surname && (
                <div>
                  {translatedContent.birth_surname}{" "}
                  {getPersonDetail.data.birth_surname}
                </div>
              )}
              {getPersonDetail.data.mother_id != 0 && (
                <div>
                  {translatedContent.mother_id} {getPersonDetail.data.mother_id}
                </div>
              )}
              {getPersonDetail.data.father_id != 0 && (
                <div>
                  {translatedContent.father_id} {getPersonDetail.data.father_id}
                </div>
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
