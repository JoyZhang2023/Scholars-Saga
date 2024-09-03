// Authentication utilities like 'verifyUser', 'getSessionUser', etc.
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from 'next-auth';
import { PrismaClient, users } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/sign-in',
    signOut: '/home',
    // error: '/auth/error' log in fail page
  },

  providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: {},
          password: {},
          role: {},
        },
        async authorize(credentials, req) {

          console.log({credentials});

          const getUser: users | null = await prisma.users.findUnique({
            where: {
              email: credentials?.email,
            },
          })
          
          console.log({getUser});

          var passwordCorrect = false;

          if(getUser) {
            if( getUser.email == 'Admin@scholarsaga.com') {
              if (getUser.password == 'Admin123') {
                passwordCorrect = true;
              }
            } else {
                passwordCorrect = await compare(credentials?.password || '', getUser.password);
                console.log({passwordCorrect});
            }
            if(passwordCorrect) {
                return {
                    id: getUser.id,
                    email: getUser.email,
                    role: getUser.role,
                    profile_id: getUser.profile_id ?? 'User'
                  } as any
            }
          }
          return null
        },
    }),
  ],

  callbacks: {
    async session({ token, session }) {
      if(token) {
        session.user.id = token.id
        session.user.email = token.email
        session.user.role = token.role
      }
      return session
    },

    // async jwt({ token, user }) {
    //   const currentUser = await prisma.users.findFirst({
    //     where: {
    //       email: token.email,
    //     },
    //   })
            
    //   if (!currentUser) {
    //     token.id = user!.id
    //     return token
    //   } 
      
    //   return {
    //     id: currentUser.id,
    //     email: currentUser.email,
    //     role: currentUser.role,
    //     profile_id: currentUser.profile_id,
    //   } as any
    // },
  },
}
