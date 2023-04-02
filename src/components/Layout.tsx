/* eslint-disable @typescript-eslint/no-empty-function */
import Head from "next/head";
import type  { ReactNode } from "react";
import NavMenu from "./NavMenu";
import PropTypes from "prop-types";

type LayoutProps = {
  children: ReactNode;
  setPrivileges: (arg: boolean) => void;
};

const Layout = ({
  children,
  setPrivileges = () => {},
}: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Herytage</title>
        <meta name="description" content="heritage of Petr Herynek" />
        <link rel="icon" type="image/png" href="/parchment-icon.png" />
      </Head>
      <NavMenu setPrivileges={setPrivileges} />
      <main>
        {children}
      </main>
    </>
  );
};

export default Layout;

Layout.defaultProps = {
  mainContentLanguage: () => {},
  setPrivileges: () => {},
};
Layout.propTypes = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  mainContentLanguage: PropTypes.func,
  setPrivileges: PropTypes.func,
  children: PropTypes.node.isRequired,
};
