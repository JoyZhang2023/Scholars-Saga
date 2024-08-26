import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { PrismaClient, users } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/sign-in',
  },

  providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: {},
          password: {},
        },
        async authorize(credentials, req) {

          const getUser: users | null = await prisma.users.findUnique({
            where: {
              email: credentials?.email,
            },
          })

          if(getUser) {
            const passwordCorrect = await compare(credentials?.password || '', getUser.password);
            console.log({passwordCorrect});
            if(passwordCorrect) {
              return {
                id: getUser.id,
                email: getUser.email,
                role: getUser.role,
              } as any
            }
          }

          return NextResponse.json({message: 'log in fail'});

        },
    }),
  ],
});

export {handler as GET, handler as POST}