import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession, signIn } from 'next-auth/react'


function Main() {
    const { data: session, status} = useSession()
    const router = useRouter()
    
    useEffect(() => {
        debugger
        if (session && status === 'authenticated') {
            console.log(session)
            debugger
            router.push({ pathname: '/account', query: { email: session.user.email } })
        }
    }, [session, status])
    return (
        <div>
            {!session &&
                <button onClick={() => signIn()}> Sign in</button>
            }
        </div>
    )
}

export default Main



