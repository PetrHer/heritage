import Head from "next/head";
import React from "react";
import NavMenu from "../components/NavMenu";

const Index = () => {
  return (
    <>
      <Head>
        <title>Herytage</title>
        <meta name="description" content="heritage of Petr Herynek" />
      </Head>
      <NavMenu />
      <main className="indexContent">
        <h1 className="text-3xl">Welcome</h1>
        <div>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean id
          metus id velit ullamcorper pulvinar. Mauris dictum facilisis augue.
          Maecenas sollicitudin. Class aptent taciti sociosqu ad litora torquent
          per conubia nostra, per inceptos hymenaeos. Pellentesque sapien.
          Quisque tincidunt scelerisque libero. Curabitur sagittis hendrerit
          ante. Integer in sapien. Curabitur vitae diam non enim vestibulum
          interdum. Nulla non lectus sed nisl molestie malesuada. Aenean id
          metus id velit ullamcorper pulvinar. Nullam feugiat, turpis at
          pulvinar vulputate, erat libero tristique tellus, nec bibendum odio
          risus sit amet ante. Praesent id justo in neque elementum ultrices.
          Donec vitae arcu. Etiam egestas wisi a erat. Etiam commodo dui eget
          wisi. Nullam at arcu a est sollicitudin euismod. Aliquam in lorem sit
          amet leo accumsan lacinia. Morbi scelerisque luctus velit. Mauris
          elementum mauris vitae tortor. Curabitur vitae diam non enim
          vestibulum interdum. Morbi leo mi, nonummy eget tristique non, rhoncus
          non leo. Proin mattis lacinia justo. Phasellus rhoncus. Duis risus.
          Curabitur sagittis hendrerit ante. Suspendisse sagittis ultrices
          augue.
        </div>
      </main>
    </>
  );
};

export default Index;
