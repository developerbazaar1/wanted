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
  // Check if profilePic is a File or a FileList
  if (formData.profilePic instanceof FileList) {
    if (formData.profilePic.length > 0) {
      data.append("img", formData.profilePic[0]);
    }
  } else if (formData.profilePic instanceof File) {
    data.append("img", formData.profilePic);
  }
  return data;
};
