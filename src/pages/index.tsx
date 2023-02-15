import Head from 'next/head'
import React from 'react'
import NavMenu from '../components/NavMenu'

const Index = () => {
  return (
    <>
    <Head>
      <title>Herytage</title>
      <meta name="description" content="heritage of Petr Herynek" />
    </Head>
      <NavMenu />
    <main className="mainContent" >
    <h1>Welcome</h1>
    </main>
  </>
  )
}

export default Index