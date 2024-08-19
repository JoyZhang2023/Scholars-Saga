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
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email'},
        password: {label: 'Password', type: 'password'},
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user1 = { id: '1', email: 'info@gmail.com', password: 'Abc123', role: 'Admin' };
        const user2 = { id: '2', email: 'admin@gmail.com', password: 'Abc124', role: 'Counselor' };

        // query date from db
        //const response = await sql`
        //SELECT * FROM users WHERE email=${credentials?.email}`;
        // const user = response.rows[0];

        // const passwordCorrect = await compare(credentials?.password || '', user.password);
        const passwordCorrect = (user1.password == credentials?.password);
        
        console.log(credentials?.password);
        console.log({passwordCorrect});

        if(passwordCorrect) {

          return {
            id: user1.id,
            email: user1.email,
            role: user1.role,
          }
        }

        return null;

      },
    }),
  ],
});

export {handler as GET, handler as POST}