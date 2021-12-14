import { useState, useEffect } from 'react'
import type { GetServerSideProps, NextPage, GetStaticPaths } from 'next'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  selectAccount,
  setAccount
} from '../pages/accountReducer'
import { useRouter } from 'next/router'


export const getServerSideProps: GetServerSideProps = async (context) => {

  const { query } = context
  const { email } = query

  if (!email) {
    return {
      props: {}
    }
  }

  const nano = require('nano')('http://mario:password123fl@62.16.133.196:5984');
  const db = nano.use('learners');

  try {
    const doc = await db.get(email)
    if (doc) {
      return {
        props: doc
      }
    }
  } catch ({ statusCode }) {

    if (statusCode === 404) {
      await db.insert({ _id: email })

      const doc = await db.get(email)
      if (doc) {
        return {
          props: {
            doc
          }
        }
      }
    }
  }

}

const AccountPage: NextPage = (doc) => {

  const account = useAppSelector(selectAccount)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { data: session, status } = useSession()

  const signUserOut = (e: any) => {
    e.preventDefault()
    signOut({ callbackUrl: "/" })
  }

  useEffect(() => {
    if (!session && status !== "authenticated") {
      router.push({ pathname: '/', query: {} })
    }
    dispatch(setAccount(doc))
  }, [])

  return (
    <div>
      {status === 'loading' &&
        <p> Loading... </p>
      }
      {status !== 'loading' && session &&
        <div>
          <button onClick={signUserOut}>Sign out</button>
          <h1>{JSON.stringify(account)}</h1>
        </div>
      }
    </div>
  )
}


export default AccountPage