import { useEffect, useRef, useState } from 'react'
import Image from "next/image";
import { api } from '../utils/api';
import { uploadImage } from '../utils/uploader';

const PersonImage = ({photo,id,language}:{photo:string,id:number,language:string}) => {
    const [translatedContent, setTranslatedContent] = useState<{
        change_button: string;
        select_button: string;
        selected: string;
        not_selected: string;
        upload_button: string;
      }>({
        change_button: "Změnit",
        select_button: "Vybrat",
        selected: "Soubor vybrán.",
        not_selected: "Soubor nevybrán.",
        upload_button: "Nahrát",
      });
      const filePath = useRef<HTMLInputElement>(null);
      const [disableUpload, setDisableUpload] = useState<boolean>(true);


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
          setDisableUpload(false);
        } else {
          setDisableUpload(true);
        }
      };
      const handleClick = () => {
        if (filePath.current) {
          filePath.current.click();
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
            });
            break;
    
          case "en":
            setTranslatedContent({
              change_button: "Change",
              select_button: "Select",
              selected: "File selected.",
              not_selected: "File not selected.",
              upload_button: "Upload",
            });
            break;
        }
      }, [language]);

  return (
    <>
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
              disabled={disableUpload ? true : false}
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
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
    </>
  )
}

export default PersonImage