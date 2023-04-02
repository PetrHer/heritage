import { useRef, useState } from "react";
import Image from "next/image";
import { api } from "../utils/api";
import { uploadImage } from "../utils/uploader";
import { useTranslation } from "next-i18next";

type PersonImageProps = { photo: string; id: number };

const PersonImage = ({ photo, id }: PersonImageProps) => {

  const { t } = useTranslation("personImage");
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
        {t('select_button')}
      </button>
      <span>
        {filePath.current &&
        filePath.current.files &&
        filePath.current?.files[0]
          ? t('selected')
          : t('not_selected')}
      </span>

      <button
        disabled={disableUpload ? true : false}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={uploadPic}
        className="buttons"
      >
        {t('change_button')}
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
  );
};

export default PersonImage;
