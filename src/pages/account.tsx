import { useState, useEffect } from 'react'
import type { GetServerSideProps, NextPage, GetStaticPaths } from 'next'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  selectAccount,
  setAccount
} from '../app/accountReducer'
import { useRouter } from 'next/router'

export const getServerSideProps: GetServerSideProps = async (context) => {

  const { query } = context
  const { email, token } = query

  if (!email) {
    return {
      props: {}
    }
  }


  try {
    const doc = await fetch(`${process.env.NEXTAUTH_URL}/api/user?email=${email}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })

    let res = await doc.json()

    if (res.error) {
      throw 404
    }

    if (res) {
      return {
        props: res
      }
    }
  } catch (e) {

    if (e === 404) {

      const doc = await fetch(`${process.env.NEXTAUTH_URL}/api/user?email=${email}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })

      let res = await doc.json()

      if (res.error) {
        return {
          props: { error: "problem creating entity in database" }
        }
      }

      if (res) {
        return {
          props: res
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