import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Main from '../features/main/Main'
const IndexPage: NextPage = () => {

  return (
    <div className={styles.container}>
      <Head>
        <title>Redux Toolkit</title>
        <link rel="icon" href="/favicon.ico" />
        {/* Acquire new vocabulary efficiently. */}
      </Head>
      <main className={styles.header}>
        <Main />
      </main>
    </div>
  )
}

export default IndexPage
