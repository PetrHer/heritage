import { useEffect, useRef, useState } from "react";
import { api } from "../utils/api";
import { czechAlphabet } from "../utils/functions";
import { useTranslation } from "next-i18next";
type PersonSearchProps = {
  search: (arg: string) => void;
};

const PersonSearch = ({ search }: PersonSearchProps) => {
  const [disableSearch, setDisableSearch] = useState<boolean>(true);
  const searchId = useRef<HTMLInputElement>(null);
  const { t } = useTranslation("personSearch");
  const [letterToSearch, setLetterToSearch] = useState<string>("");

  const searchValueCheck = () => {
    if (searchId.current?.value) {
      setDisableSearch(false);
    } else {
      setDisableSearch(true);
    }
  };
  const personArray = api.dbRouter.getAll.useMutation();
  useEffect(() => {
    if (letterToSearch) {
      personArray.mutate({ initials: letterToSearch });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [letterToSearch]);
  if (personArray.isSuccess) {
    personArray.data.sort((a, b) => a.id - b.id);
  }
  return (
    <>
      <div className="m-1 w-32">{t("search_header")}</div>
      <input
        onChange={() => searchValueCheck()}
        ref={searchId}
        className="m-1 w-28 rounded-md border border-black px-1"
        type="number"
      />
      <br />
      <button
        disabled={disableSearch ? true : false}
        onClick={() => {
          if (searchId.current?.value) search(searchId.current.value);
        }}
        className="buttons"
      >
        {t("search_button")}
      </button>
      <div className="m-1">
        <h2>{t("list")}</h2>
        {czechAlphabet.map((e: string) => (
          <span
            className="m-0.25 cursor-pointer text-blue-700 underline"
            style={{ margin: "1px" }}
            key={e}
            onClick={() => setLetterToSearch(e)}
          >
            {e}
            {e == "Ň" && <br />}
          </span>
        ))}
        {personArray.data &&
          personArray.data.map((e) => (
            <div key={e.id}>
              <span
                className="m-0.25 cursor-pointer text-blue-700 underline"
                onClick={() => search(e.id.toString())}
              >
                {e.id}
              </span>{" "}
              {e.surname} {e.name}
            </div>
          ))}
      </div>
    </>
  );
};

export default PersonSearch;
