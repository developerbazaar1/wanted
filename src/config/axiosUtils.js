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

  /**
   *
   * @param {*} data
   * @param {*} token
   * @returns {*return the user data}
   */
  getAdvert: async (id, token) => {
    const response = await api.request({
      url: `/getAdvert?_id=${id}`,
      method: "GET",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  },

  deleteAdvert: async (data, token) => {
    const response = await api.request({
      url: `/deleteAdvert`,
      method: "DELETE",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    });
    return response;
  },

  /**
   *
   * @param {} data
   * @param {*} token
   * @returns update Profile data
   */

  updateProfile: async (data, token) => {
    const response = await api.request({
      url: `/update/profile`,
      method: "PUT",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    });
    return response;
  },
};
