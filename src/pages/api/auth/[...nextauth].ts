import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        })
    ],
    secret: process.env.SECRET,
    callbacks: {
        async session({ session, token, user }) {
            // console.log('session:')
            session.accessToken = token.accessToken
            // console.log(session)
            // console.log(user)
            return session
        },
        async jwt({ token, account }) {
            if (account?.access_token) {
                token.accessToken = account.access_token
            }
            // console.log('jwt:')
            // console.log(token)
            // console.log(account)
            return token
        }
    }
})