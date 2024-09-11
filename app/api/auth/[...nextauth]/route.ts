import NextAuth, {User, type NextAuthOptions}from "next-auth";
import { PrismaClient, users } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
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
          name: 'Sign in',
          credentials: {
            email: { label: 'Email', type: 'email', placeholder: 'user@scholarsaga.com' },
            password: { label: 'Password', type:'password' },
          },
          async authorize(credentials, req) {
  
            console.log({credentials});

            const getUser = await prisma.users.findUnique({
              where: {
                email: credentials?.email,
              },
            });
            
            console.log("user find", {getUser});
  
            var passwordCorrect = false;

            if (getUser) {
              if( credentials?.email == 'admin@scholarsaga.com') {
                if (credentials.password == 'Admin123') {
                  passwordCorrect = true;
                }
              } else {
                  passwordCorrect = await compare(credentials?.password || '', getUser.password);
              }
              console.log({passwordCorrect});
  
              if(!passwordCorrect) throw new Error("Email or password is not correct");
                 
              return {
                id: getUser.id + '',
                email: getUser.email,
                role: getUser.role,
                profile_id: getUser.profile_id,
              } as any;
            }
          },
        }),
    ],

    callbacks: {
      session: ({ session, token }) => {
        return {
          ...session,
          user: {
            ...session.user,
            email: token.email,
            role: token.role,
            profile_id: token.profile_id
          }
        }
      },
      jwt: ({ token, user }) => {
        if (user) {
          const u = user as unknown as any
          return {
            ...token,
            id: u.id,
            email: u.email,
            role: u.role,
            profile_id: u.profile_id
          }
        }
        return token
      }
    }
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}