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
        async session({ session, token }) {
            session.idToken = token.idToken
            return session
        },
        async jwt({ token, account }) {
            if (account?.id_token) {
                token.idToken = account.id_token
            }
            return token
        }
    }
})