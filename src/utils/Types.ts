// types.ts

export type LoginInputTypes = {
  email: string;
  password: number | string;
};
export type signupInputTypes = {
  userName: string;
  email: string;
  password: number | string;
  termsAndCondition?: boolean | undefined;
};

export type ProfileType = {
  userName: string;
  email: string;
  oldPassword: string;
  newPassword: string;
  profilePic: File;
  userPhone: string;
};
