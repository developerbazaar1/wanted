import { ProfileType } from "./Types";

export const castProfileUpdateValue = (
  formData: ProfileType,
  id: string
): FormData => {
  const data = new FormData();
  data.append("userName", formData.userName);
  data.append("id", id);
  data.append("phoneNumber", formData.userPhone);
  if (formData.newPassword) {
    data.append("newPassword", formData.newPassword);
  }
  if (formData.oldPassword) {
    data.append("oldPassword", formData.oldPassword);
  }
  if (formData.profilePic?.length > 0) {
    data.append("img", formData.profilePic[0]);
  }
  return data;
};
