/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-empty-function */
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/NavMenu.module.css";
import { api } from "../utils/api";
import Image from "next/image";
import PropTypes from "prop-types";
import { useTranslation } from "next-i18next";
import { useRouter } from 'next/router'

type NavMenuProps = {
  setPrivileges: (arg: boolean) => void;
};

const NavMenu = ({ setPrivileges = () => {} }: NavMenuProps) => {
  const [selected, setSelected] = useState<boolean>(false);
  const [priv, setPriv] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showLang, setShowLang] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  const router = useRouter()
  const { t,i18n } = useTranslation("navmenu");
  const verification = api.authRouter.verify.useMutation();
  const privilegesCheck = api.authRouter.privilegeCheck.useMutation();
  useEffect(() => {
    if (sessionStorage.getItem("id")) {
      setSelected(true);
    }
    if(i18n.language){setSelectedImage(`/${i18n.language}.png`)}
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      verification.mutate(token);
    }
  }, []);
  useEffect(() => {
    if (verification.isSuccess) {
      privilegesCheck.mutate(verification.data as string);
    }
  }, [verification.data]);
  useEffect(() => {
    if (privilegesCheck.data?.privileges?.privileges) {
      setPriv(privilegesCheck.data.privileges.privileges);
      setPrivileges(privilegesCheck.data.privileges.privileges);
    }
  }, [privilegesCheck.data]);

  const selectLanguage = async(locale: string) => {
    const { pathname, asPath, query } = router
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    await router.push({ pathname, query }, asPath, { locale: locale })
    setSelectedImage(`/${locale}.png`);
  };

  return (
    <header className={styles.navigation}>
      <>
        <Link className={styles.linkItem} href={"/"}>
          {t("home")}
        </Link>
        <Link className={styles.linkItem} href={"/list"}>
          {t("list")}
        </Link>
         <Link className={styles.linkItem} href={"/genealogy_chart"}>
            {t("genealogy")}
          </Link>
        { verification.isSuccess && (
          <Link className={styles.linkItem} href={"/person_detail"}>
            {t("detail")}
          </Link>
        )}
        {verification.isSuccess && priv && (
          <Link className={styles.linkItem} href={"/records"}>
            {t("records")}
          </Link>
        )}
        {!verification.isSuccess && (
          <Link className={styles.linkItem} href={"/login"}>
            {t("login")}
          </Link>
        )}
        {!verification.isSuccess && (
          <Link className={styles.linkItem} href={"/registration"}>
            {t("registration")}
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
                {t("signout")}
              </button>
            )}
          </div>
        )}
        <div
          className={styles.languages}
          onMouseEnter={() => setShowLang(true)}
          onMouseLeave={() => setShowLang(false)}
        >
          <Image src={selectedImage} alt={""} width={20} height={20} />
          {showLang && (
            <>
              <Image
                src={"/cz.png"}
                alt={""}
                width={20}
                height={20}
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={() => selectLanguage("cz")}
                className="my-1"
              />
              <Image
                src={"/english.png"}
                alt={""}
                width={20}
                height={20}
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
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
  setPrivileges: () => {},
};
NavMenu.propTypes = {
  setPrivileges: PropTypes.func,
};
