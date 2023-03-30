import Head from "next/head";
import React, { useState, useEffect } from "react";
import NavMenu from "../components/NavMenu";

const Index = () => {
  const [translatedContent, setTranslatedContent] = useState<{
    header: string;
    mainContent:string;
  }>({ header: "Vítejte",
  mainContent:`Vítejte v mém projektu rodokmenu, inspirovaném zájmem mé matky o mapování naší rodinné historie. 
  Tato webová stránka je poctou za její neúnavné úsilí o odhalení příběhů našich předků a zachování jejich odkazu pro budoucí generace. 
  Jak pracuji na tomto projektu, neustále mě ohromuje hloubka a složitost našeho rodokmenu a mnoho fascinujících postav, které ho obývají. 
  Doufám, že tím, že budu sdílet historii naší rodiny tímto způsobem, budu moci uctít lásku mé matky k genealogii a inspirovat další, aby prozkoumali své vlastní rodinné dějiny. 
  Tak se mnou pojďte na tuto cestu a objevme společně skryté poklady naší minulosti.` });
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
        setTranslatedContent({ header: "Vítejte", mainContent:`Vítejte v mém projektu Herytage, inspirovaném koníčkem mé matky o mapování naší rodinné historie. 
        Tato webová stránka je nástroj, který má pomoci ukládat a organizovat záznamy našich předků a zachování jejich odkazu pro budoucí generace. 
        Jak pracuji na tomto projektu, neustále mě ohromuje hloubka a složitost našeho rodokmenu a fascinující postavy v něm. 
        Doufám, že tím, že budu sdílet historii naší rodiny tímto způsobem, inspirovuji další, aby prozkoumali své vlastní rodinné dějiny. 
        Tak se mnou pojďte na tuto cestu a objevme společně skryté poklady naší minulosti.` });
        break;

      case "en":
        setTranslatedContent({
          header: "Welcome",
          mainContent: `Welcome to my project Herytage, inspired by my mother's hobby for tracing our family history. 
          This website is a tool to help her with her efforts to manage and save records of our ancestors, and to preserve their legacy for future generations. 
          As I work on this project, I am continually amazed by the depth and complexity of our family tree, and the many fascinating characters who populate its branches. 
          I hope that by sharing our family's history in this way, I can inspire others to explore their own family histories. 
          So come along with me on this journey, and let's discover the hidden gems of our past together.`,
        });
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
          {translatedContent.mainContent}
          <br />
          Petr Herynek
        </div>
      </main>
    </>
  );
};

export default Index;
