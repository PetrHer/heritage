import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/NavMenu.module.css";
import { api } from "../utils/api";

const NavMenu = () => {
  const [selected,setSelected]=useState<boolean>(false)
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = '/';
  };
  const verification = api.authRouter.verify.useMutation();
  useEffect(()=>{
    if (sessionStorage.getItem('id')){setSelected(true)}
  },[])
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      verification.mutate(token);
    }
  }, []);
  return (
    <header className={styles.navigation}>
      <>
        <Link className={styles.linkItem} href={"/"}>
          HOME
        </Link>
        <Link className={styles.linkItem} href={"/list"}>
          LIST
        </Link>
        {selected && (<Link className={styles.linkItem} href={"/genealogy_chart"}>
          GENEALOGY
        </Link>)}
        {selected && verification.isSuccess && (<Link className={styles.linkItem} href={"/person_detail"}>
          DETAIL
        </Link>)}
        {verification.isSuccess && (<Link className={styles.linkItem} href={"/records"}>
          RECORDS
        </Link>)}
        {!verification.isSuccess && (
          <Link className={styles.linkItem} href={"/login"}>
            LOGIN
          </Link>
        )}
        {!verification.isSuccess && (
          <Link className={styles.linkItem} href={"/registration"}>
            REGISTRATION
          </Link>
        )}
        {verification.isSuccess && verification.data && (<div className={styles.linkItem}> Logged as {verification.data as string}</div>)}
        {verification.isSuccess && <button className={styles.linkItem} onClick={logout}>LOGOUT</button>}
      </>
    </header>
  );
};

export default NavMenu;
