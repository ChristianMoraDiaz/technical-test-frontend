export interface UserRegistrationProps {
  name: string;
  email: string;
  password: string;
}

export interface UserLoginProps {
  email?: string;
  password?: string;
}
export interface User {
  id: number;
  name: string;
  email: string;
}
