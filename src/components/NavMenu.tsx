/* eslint-disable @typescript-eslint/no-empty-function */
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/NavMenu.module.css";
import { api } from "../utils/api";
import Image from "next/image";
import PropTypes from "prop-types";

type NavMenuProps = {
  mainContentLanguage: (arg: string) => void;
  setPrivileges: (arg: boolean) => void;
};

const NavMenu = ({
  mainContentLanguage = () => {},
  setPrivileges = () => {},
}: NavMenuProps) => {
  const [selected, setSelected] = useState<boolean>(false);
  const [priv, setPriv] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showLang, setShowLang] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("cz");
  const [translatedContent, setTranslatedContent] = useState<{
    home: string;
    list: string;
    genealogy: string;
    detail: string;
    records: string;
    login: string;
    registration: string;
    signout: string;
    image: string;
  }>({
    home: "ÚVOD",
    list: "SEZNAM",
    genealogy: "RODOKMEN",
    detail: "ÚDAJE",
    records: "ZÁZNAMY",
    login: "PŘIHLÁŠENÍ",
    registration: "REGISTRACE",
    signout: "Odhlásit",
    image: "/czech.png",
  });
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  const verification = api.authRouter.verify.useMutation();
  const privilegesCheck = api.authRouter.privilegeCheck.useMutation();
  useEffect(() => {
    if (sessionStorage.getItem("id")) {
      setSelected(true);
    }
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      verification.mutate(token);
    }
    const lang = sessionStorage.getItem("lang");
    if (lang) {
      setLanguage(lang);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (verification.isSuccess) {
      privilegesCheck.mutate(verification.data as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verification.data]);
  useEffect(() => {
    if (privilegesCheck.data?.privileges?.privileges) {
      setPriv(privilegesCheck.data.privileges.privileges);
      setPrivileges(privilegesCheck.data.privileges.privileges);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [privilegesCheck.data]);

  useEffect(() => {
    switch (language) {
      case "en":
        setTranslatedContent({
          home: "HOME",
          list: "LIST",
          genealogy: "GENEALOGY",
          detail: "DETAIL",
          records: "RECORDS",
          login: "SIGN IN",
          registration: "REGISTRATION",
          signout: "SIGN OUT",
          image: "/english.png",
        });
        break;
      case "cz":
        setTranslatedContent({
          home: "ÚVOD",
          list: "SEZNAM",
          genealogy: "RODOKMEN",
          detail: "ÚDAJE",
          records: "ZÁZNAMY",
          login: "PŘIHLÁSIT",
          registration: "REGISTRACE",
          signout: "Odhlásit",
          image: "/czech.png",
        });
        break;
      default:
        break;
    }
  }, [language]);

  const selectLanguage = (lang: string) => {
    setLanguage(lang);
    sessionStorage.setItem("lang", lang);
    mainContentLanguage(lang);
  };

  return (
    <header className={styles.navigation}>
      <>
        <Link className={styles.linkItem} href={"/"}>
          {translatedContent.home}
        </Link>
        <Link className={styles.linkItem} href={"/list"}>
          {translatedContent.list}
        </Link>
        {selected && (
          <Link className={styles.linkItem} href={"/genealogy_chart"}>
            {translatedContent.genealogy}
          </Link>
        )}
        {selected && verification.isSuccess && (
          <Link className={styles.linkItem} href={"/person_detail"}>
            {translatedContent.detail}
          </Link>
        )}
        {verification.isSuccess && priv && (
          <Link className={styles.linkItem} href={"/records"}>
            {translatedContent.records}
          </Link>
        )}
        {!verification.isSuccess && (
          <Link className={styles.linkItem} href={"/login"}>
            {translatedContent.login}
          </Link>
        )}
        {!verification.isSuccess && (
          <Link className={styles.linkItem} href={"/registration"}>
            {translatedContent.registration}
          </Link>
        )}
        {verification.isSuccess && verification.data && (
          <div
            className={styles.dropDownMenu}
            onMouseEnter={() => setShowMenu(true)}
            onMouseLeave={() => setShowMenu(false)}
          >
            <div className={styles.linkItem}>{verification.data as string}</div>
            {showMenu && (
              <button
                className={styles.linkItem}
                style={{ border: "1px solid black" }}
                onClick={logout}
              >
                {translatedContent.signout}
              </button>
            )}
          </div>
        )}
        <div
          className={styles.languages}
          onMouseEnter={() => setShowLang(true)}
          onMouseLeave={() => setShowLang(false)}
        >
          <Image
            src={translatedContent.image}
            alt={""}
            width={20}
            height={20}
          />
          {showLang && (
            <>
              <Image
                src={"/czech.png"}
                alt={""}
                width={20}
                height={20}
                onClick={() => selectLanguage("cz")}
                className="my-1"
              />
              <Image
                src={"/english.png"}
                alt={""}
                width={20}
                height={20}
                onClick={() => selectLanguage("en")}
                className="my-1"
              />
            </>
          )}
        </div>
      </>
    </header>
  );
};

export default NavMenu;

NavMenu.defaultProps = {
  mainContentLanguage: () => {},
  setPrivileges: () => {},
};
NavMenu.propTypes = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  mainContentLanguage: PropTypes.func,
  setPrivileges: PropTypes.func,
};
