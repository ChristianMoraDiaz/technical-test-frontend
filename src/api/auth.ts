import { User, UserLoginProps, UserRegistrationProps } from "@/interface/auth";
import axios, { AxiosResponse } from "axios";
import CredentialsProvider from "next-auth/providers/credentials";

export const userRegister = async (userData: UserRegistrationProps) => {
  try {
    const response: AxiosResponse<User> = await axios.post(
      "http://localhost:4000/auth/register",
      userData
    );
    return response.data;
  } catch (error: any) {
    throw (
      error.response?.data || {
        message: "An error occurred while creating the task.",
      }
    );
  }
};

export const userLogin = async (userData: UserLoginProps) => {
  try {
    const response: AxiosResponse<User> = await axios.post(
      "http://localhost:4000/auth/login",
      userData
    );

    return response.data;
  } catch (error: any) {
    throw (
      error.response?.data || {
        message: "An error occurred while creating the task.",
      }
    );
  }
};

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },
      async authorize(credentials, req) {
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
