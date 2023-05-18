/* eslint-disable @typescript-eslint/no-empty-function */
import Head from "next/head";
import type  { ReactNode } from "react";
import NavMenu from "./NavMenu";
import PropTypes from "prop-types";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({
  children,
}: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Herytage</title>
        <meta name="description" content="heritage of Petr Herynek" />
        <link rel="icon" type="image/png" href="/parchment-icon.png" />
      </Head>
      <NavMenu/>
      <main>
        {children}
      </main>
    </>
  );
};

export default Layout;

Layout.defaultProps = {
};
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
