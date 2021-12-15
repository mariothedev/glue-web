import type { NextPage } from 'next'
import { useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import { useRouter } from 'next/router'
import { useSession, signIn } from 'next-auth/react'

const IndexPage: NextPage = () => {

  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session && status === 'authenticated') {
      router.push({ pathname: '/account', query: { email: session.user.email } })
    }
  }, [session, status])

  return (
    <div className={styles.container}>
      <Head>
        <title>Glue: vocabulary app</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Learn new vocabulary efficiently on the go."/>
      </Head>
      <main className={styles.header}>
        <div>
          {!session && status !== 'loading' &&
            <button onClick={() => signIn()}>Sign in</button>
          }
          {status === 'loading' &&
            <p> Loading.... </p>
          }
        </div>
      </main>
    </div>
  )
}

export default IndexPage
