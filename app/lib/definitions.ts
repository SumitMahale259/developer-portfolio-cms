export type User = {
  id: string;
  fullName: string;
  email: string;
  password: string;
};

export type ForgotPasswordState = {
  success: boolean;
  message: string;
}