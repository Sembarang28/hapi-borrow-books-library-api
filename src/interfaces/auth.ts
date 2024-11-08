export default interface IAuth {
  email: string;
  password: string;
}

export interface Password {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}