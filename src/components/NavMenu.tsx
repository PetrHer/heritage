import Link from "next/link";
import { useEffect, useState } from "react";
import Verification from "../pages/verification";
import styles from "../styles/NavMenu.module.css";
import { api } from "../utils/api";

const NavMenu = () => {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href='/';
  };
  const verification = api.authRouter.verify.useMutation();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      verification.mutate(token);
    }
  }, []);
  return (
    <header className={styles.navigation}>
      <Link className={styles.linkItem} href={"/"}>
        HOME
      </Link>
      <Link className={styles.linkItem} href={"/list"}>
        LIST
      </Link>
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
      {verification.isSuccess && verification.data && verification.data.username && (<div className={styles.linkItem}> Logged as {verification.data.username}</div>)}
      {verification.isSuccess && <button className={styles.linkItem} onClick={logout}>LOGOUT</button>}
    </header>
  );
};

export default NavMenu;
