/* eslint-disable @typescript-eslint/no-misused-promises */
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import NavMenu from "../components/NavMenu";
import PersonDetail from "../components/PersonDetail";
import Image from "next/image";
import { api } from "../utils/api";
import { uploadImage } from "../utils/uploader";

const Detail = () => {
  const [id, setId] = useState<number>();
  const searchId = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<string>("");
  const [info, setInfo] = useState<string>("");
  const filePath = useRef<HTMLInputElement>(null);
  const [disableCheck, setDisableCheck] = useState<boolean>(true);
  const [language, setLanguage] = useState<string>("cz");
  const [translatedContent, setTranslatedContent] = useState<{
    change_button: string;
    select_button: string;
    selected: string;
    not_selected: string;
    upload_button: string;
    search_header: string;
    search_button: string;
    info: string;
  }>({
    change_button: "Změnit",
    select_button: "Vybrat",
    selected: "Soubor vybrán.",
    not_selected: "Soubor nevybrán.",
    upload_button: "Nahrát",
    search_header: "Vyhledat podle ID",
    search_button: "Hledat",
    info: "Popis :",
  });

  const search = () => {
    if (searchId.current?.value) {
      setId(Number(searchId.current.value));
      sessionStorage.setItem("id", searchId.current.value);
    }
  };
  useEffect(() => {
    if (sessionStorage.getItem("id")) {
      setId(Number(sessionStorage.getItem("id")));
    }
    const lang = sessionStorage.getItem("lang");
    if (lang) {
      setLanguage(lang);
    }
  }, []);
  const handleClick = () => {
    if (filePath.current) {
      filePath.current.click();
    }
  };

  const uploader = api.dbRouter.uploadImage.useMutation();

  const uploadPic = async () => {
    if (filePath.current?.files && filePath.current.files[0] && id) {
      const file = filePath.current.files[0];
      const path = await uploadImage(file, file.name);
      if (path?.data.publicUrl) {
        uploader.mutate({ filePath: path.data.publicUrl, id: id });
      }
    }
  };
  if (uploader.isSuccess) {
    window.location.reload();
  }
  const selectedPics = () => {
    if (filePath.current?.files) {
      setDisableCheck(false);
    } else {
      setDisableCheck(true);
    }
  };
  useEffect(() => {
    switch (language) {
      case "cz":
        setTranslatedContent({
          change_button: "Změnit",
          select_button: "Vybrat",
          selected: "Soubor vybrán.",
          not_selected: "Soubor nevybrán.",
          upload_button: "Nahrát",
          search_header: "Vyhledat podle ID",
          search_button: "Hledat",
          info: "Popis :",
        });
        break;

      case "en":
        setTranslatedContent({
          change_button: "Change",
          select_button: "Select",
          selected: "File selected.",
          not_selected: "File not selected.",
          upload_button: "Upload",
          search_header: "Search by ID",
          search_button: "Search",
          info: "Description :",
        });
        break;
    }
  }, [language]);

  return (
    <>
      <Head>
        <title>Herytage</title>
        <meta name="description" content="heritage of Petr Herynek" />
      </Head>
      <NavMenu mainContentLanguage={(x: string) => setLanguage(x)} />
      <div className="mainContent">
        {photo && (
          <div className="flex flex-col items-center justify-items-center">
            <Image
              src={photo}
              alt={"profile image"}
              width={400}
              height={400}
              className="m-1 w-1/2"
            />
            <button className="buttons" onClick={handleClick}>
              {translatedContent.select_button}
            </button>
            <span>
              {filePath.current &&
              filePath.current.files &&
              filePath.current?.files[0]
                ? translatedContent.selected
                : translatedContent.not_selected}
            </span>

            <button
              disabled={disableCheck ? true : false}
              onClick={uploadPic}
              className="buttons"
            >
              {translatedContent.change_button}
            </button>
            <input
              id="files"
              ref={filePath}
              onChange={selectedPics}
              type="file"
              className="m-1"
              style={{ visibility: "hidden" }}
            />
          </div>
        )}
        <div className="row-end-11 col-start-2 col-end-3 row-start-1 ">
          {id && (
            <PersonDetail
              language={language}
              id={id}
              setPhoto={(x: string) => setPhoto(x)}
              setInfo={(x: string) => setInfo(x)}
            />
          )}
        </div>
        {info && (
          <div className="row-start-11 row-end-21 col-start-2 col-end-3">
            <h2>{translatedContent.info}</h2>
            <div>{info}</div>
          </div>
        )}
        <div className="col-start-3 col-end-4 row-start-1 row-end-4">
          <div className="m-1 w-32">{translatedContent.search_header}</div>
          <input
            ref={searchId}
            className="m-1 w-28 rounded-md border border-black px-1"
            type="number"
          />
          <br />
          <button onClick={search} className="buttons">
            {translatedContent.select_button}
          </button>
        </div>
      </div>
    </>
  );
};

export default Detail;
