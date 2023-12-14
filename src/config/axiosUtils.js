import axios from "axios";
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

  //Route to handle PostAgain Advert
  postAgainAdvert: async (data, token) => {
    const response = await api.request({
      url: `/postagainadvert`,
      method: "PUT",
      headers: {
        Authorization: `${token}`,
      },
      data: data,
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

  addSubscription: async (data, token) => {
    const response = await api.request({
      url: `/addsubscription`,
      method: `POST`,
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    });
    return response;
  },

  getPaymentHistory: async (token, id, portfolio_id) => {
    const response = await api.request({
      url: `/paymenthistory?provider_id=${id}&portfolio_id=${portfolio_id}`,
      method: `GET`,
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  },
};

//this function is used to get all the plan
export async function GetAllPlan() {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_Admin_Live_url}/getplan`,
    headers: {},
  };

  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.request(config);
    // console.log(response.data);
    return response.data; // or return something else if needed
  } catch (error) {
    throw error; // rethrow the error or handle it as needed
  }
}
//this function is used to get the all plan that a user subscribed
export async function getUserSubscription(token, id, provider_id) {
  const response = await api.request({
    url: `/getactivesubscription?provider_id=${id}&provider_portfolio_id=${provider_id}`,
    method: `GET`,
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
  });
  return response;
}

//This utils function will return advert preview data and products

export async function getPreviewAdvertData(
  token,
  advert_id,
  advertProvider_id
) {
  const response = await api.request({
    url: `/advert-preview?advert_id=${advert_id}&advertProvider_id=${advertProvider_id}`,
    method: `GET`,
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
  });
  return response;
}
