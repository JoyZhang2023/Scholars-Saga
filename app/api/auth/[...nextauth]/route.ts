import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/sign-in',
  },

  providers: [
      CredentialsProvider({
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = { id: '1', email: 'info@gmail.com', password: 'Abc123' }

        // query date from db
        //const response = await sql`
        //SELECT * FROM users WHERE email=${credentials?.email}`;
        // const user = response.rows[0];

        const passwordCorrect = await compare(credentials?.password || '', user.password);
        
        console.log(credentials?.password);
        console.log({passwordCorrect});

        if(passwordCorrect) {
          return {
            id: user.id,
            email: user.email,
          }
        }

        return null;

        

      },
    }),
  ],
});

export {handler as GET, handler as POST}