import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { userLogin } from "../../../../api/auth";
import { UserLoginProps } from "../../../../interface/auth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },
      async authorize(credentials, req) {
        console.log("HOLA ACA ESTOY");
        const loginData: UserLoginProps = {
          email: credentials?.email,
          password: credentials?.password,
        };
        const userFound = await userLogin(loginData);

        return {
          id: userFound.id.toString(),
          name: userFound.name,
          email: userFound.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
