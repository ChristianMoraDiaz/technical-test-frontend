import { User, UserLoginProps, UserRegistrationProps } from "@/interface/auth";
import axios, { AxiosResponse } from "axios";

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

    console.log("LOGIN =>", response.data);
    return response.data;
  } catch (error: any) {
    throw (
      error.response?.data || {
        message: "An error occurred while creating the task.",
      }
    );
  }
};
