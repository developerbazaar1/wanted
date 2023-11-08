import { api } from "./ApiConfig";

export const AuthApi = {
  Signup: async (data) => {
    const response = await api.request({
      url: `/signup`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    });

    return response;
  },
  Login: async (data) => {
    const response = await api.request({
      url: `/login`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    });

    return response;
  },
};

export const ProctedApi = {
  CreatPortfolio: async (data, token) => {
    const response = await api.request({
      url: `/portfolio`,
      method: "PUT",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    });

    return response;
  },

  AddAdvert: async (data, token) => {
    const response = await api.request({
      url: `/addAdvert`,
      method: "POST",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    });
    return response;
  },
};
