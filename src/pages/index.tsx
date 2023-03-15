import Head from "next/head";
import React, { useState, useEffect } from "react";
import NavMenu from "../components/NavMenu";

const Index = () => {
  const [translatedContent, setTranslatedContent] = useState<{
    header: string;
  }>({ header: "Vítejte" });
  const [language, setLanguage] = useState<string>("cz");

  useEffect(() => {
    const lang = sessionStorage.getItem("lang");
    if (lang) {
      setLanguage(lang);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    switch (language) {
      case "cz":
        setTranslatedContent({ header: "Vítejte" });
        break;

      case "en":
        setTranslatedContent({ header: "Welcome" });
        break;
    }
  }, [language]);

  return (
    <>
      <Head>
        <title>Herytage</title>
        <meta name="description" content="heritage of Petr Herynek" />
      </Head>
      <NavMenu mainContentLanguage={(x: string) => setLanguage(x)} />
      <main className="indexContent">
        <h1 className="text-3xl">{translatedContent.header} </h1>
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
