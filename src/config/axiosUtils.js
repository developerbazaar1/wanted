import { api } from "./ApiConfig";
import { openapi } from "./ApiConfig";

export const categoriesApi = {
  getCategory: async () => {
    const response = await openapi.request({
      url: `/getcategory`,
      method: "GET",
    });
    return response;
  },
  subgetCategory: async () => {
    const response = await openapi.request({
      url: `/getsubcategory`,
      method: "GET",
    });
    return response;
  },
};

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
        // "Content-Type": "application/json",
      },
      data: data,
    });

    return response;
  },

  AddAdvert: async (data, token) => {
    const response = await api.request({
      url: `/addAdvert`,
      method: "POST",
      headers: {
        Authorization: `${token}`,
        // "Content-Type": "application/json",
      },
      data: data,
    });
    return response;
  },

  /**
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
  updateAdvert: async (data, token) => {
    const response = await api.request({
      url: `/updateAdvert`,
      method: "PUT",
      headers: {
        Authorization: `${token}`,
        // "Content-Type": "application/json",
      },
      data: data,
    });
    return response;
  },

  /**
   * @param {*} data
   * @param {*} token
   * @returns {*return the user data}
   */
  getProduct: async (id, token) => {
    const response = await api.request({
      url: `/getproduct?_id=${id}`,
      method: "GET",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  },

  addProduct: async (data, token) => {
    const response = await api.request({
      url: `/addproduct`,
      method: "POST",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    });
    return response;
  },
  deleteProduct: async (data, token) => {
    const response = await api.request({
      url: `/deleteproduct`,
      method: "DELETE",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    });
    return response;
  },

  updateProduct: async (data, token) => {
    const response = await api.request({
      url: `/updateproduct`,
      method: `PUT`,
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    });
    return response;
  },

  updateProductImg: async (data, token) => {
    const response = await api.request({
      url: `/addimages`,
      method: `PUT`,
      headers: {
        Authorization: `${token}`,
        // "Content-Type": "application/json",
      },
      data: data,
    });
    return response;
  },
};
