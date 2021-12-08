
import type { NextPage } from 'next'
import Head from 'next/head'

import styles from '../styles/Home.module.css'
// By default, Next.js pre-renders pages using Static Generation without fetching data
const AboutPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Redux Toolkit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
          <h1>About Page</h1>
      </header>
    </div>
  )
}

export default AboutPage
