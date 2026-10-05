export interface ILoginUser {
  id: string;
  password: string;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface IResetPassword {
  id: string;
  newPassword: string;
  token: string;
}
