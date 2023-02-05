import { useRef } from "react";
import DeleteForm from "../components/DeleteForm";
import InputForm from "../components/InputForm";
import NavMenu from "../components/NavMenu";
import UpdateForm from "../components/UpdateForm";
import { api } from "../utils/api";

const records = () => {
  return (
    <>
      <NavMenu />
      <div className="flex">
        <InputForm />
        <br />
        <DeleteForm />
        <br />
        <br />
        <UpdateForm />
      </div>
    </>
  );
};

export default records;
