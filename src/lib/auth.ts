import { PrismaAdapter } from '@auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import { AuthOptions } from 'next-auth'
import prismaClient from './prisma'

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prismaClient),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
              params: {
                prompt: "select_account",
                access_type: "offline",
                response_type: "code",
                // scope: "openid email profile"
              }
            }
          })
    ],
    callbacks: {
        async session({ session, user }) {
            session.user = { 
                ...session.user, 
                id: user.id 
            } as {
                id: string,
                name: string,
                email: string
            }
            return session
        }
    },
    // pages: {
    //     signIn: '/', // Redireciona para a home após login (substitua pela sua rota)
    // }
}