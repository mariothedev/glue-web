import type { GetStaticProps, NextPage } from 'next'
import { useSession, signIn, signOut } from 'next-auth/react'
import Head from 'next/head'

import styles from '../styles/Home.module.css'


export const getStaticProps: GetStaticProps = async (context) => {
  
  const nano = require('nano')('http://mario:password123fl@62.16.133.196:5984');
  const alice = nano.use('learners');
  const doc = await alice.get('mario')
  console.log(doc)
  console.log(`Env: ${process.env.TEST}`)
    return {
      props: {
      posts: "hello"
    },
  }
}

const AboutPage: NextPage = ({ posts }) => {

  const {data:session} = useSession()
  console.log(session)
  return (
    <div className={styles.container}>
      <Head>
        <title>Redux Toolkit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <h1>About Page</h1>
        {session && 
          <button onClick={() => signOut()}>Sign Out</button>
        }
        {!session && 
          <button onClick={() => signIn()}> Sign in</button>
        }
        {posts}
      </header>
    </div>
  )
}


export default AboutPage