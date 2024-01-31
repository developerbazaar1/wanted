import { LoginInputTypes, signupInputTypes } from "../utils/Types";
import { api, openapi } from "./ApiConfig";

export const AuthApi = {
  Signup: async (data: signupInputTypes) => {
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
  Login: async (data: LoginInputTypes) => {
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

export const ProfileApi = {
  updateProfile: async (data: unknown, token: string | null) => {
    const response = await api.request({
      url: "/updateprofile",
      maxBodyLength: Infinity,
      method: "PUT",
      headers: {
        Authorization: `${token}`,
      },
      data: data,
    });
    return response;
  },
};

export const AdsApi = {
  getAdsBaedOnType: async (
    adstypes: string,
    page = 1,
    pageSize = 6,
    searchQuery = ""
  ) => {
    const response = await api.request({
      url: `/getads?adstypes=${adstypes}&page=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}`,
      method: "get",
    });
    // console.log(response);

    return response;
  },

  getOnlyAdvertPreviewData: async (advert_id: string) => {
    const response = await api.request({
      url: `/getads/details?advert_id=${advert_id}`,
      method: `GET`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  },

  getAdsBasedOnSearch: async (
    postalCode: string | null,
    taxonomy: string | null,
    searchQuery: string | null,
    page = 1,
    pageSize = 6
  ) => {
    const response = await api.request({
      url: `/serach?postalCode=${postalCode}&taxonomy=${taxonomy}&searchQuery=${searchQuery}&page=${page}&pageSize=${pageSize}`,
      method: "GET",
    });

    return response;
  },
  getAdsBasedOnService: async (_id: string, page = 1, searchQuery = "") => {
    return await api.request({
      url: `/getsingsubservideadvert/${_id}?page=${page}&pageSize=6&searchQuery=${searchQuery}`,
      method: "GET",
    });
  },
};

export const WishListAPi = {
  GetWishList: async (token: string | null) => {
    const response = await api.request({
      url: `/wishlist`,
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
    });

    return response;
  },

  UpdateWishList: async (token: string | null, advert_Id: string) => {
    const response = await api.request({
      url: `/wishlist/${advert_Id}`,
      method: "PUT",
      headers: {
        Authorization: `${token}`,
      },
    });
    return response;
  },
};

export const ServicesAPi = {
  GetCategoryServices: async (search: string | null) => {
    const response = await openapi.request({
      url: `/getcategory?search=${search}`,
      method: "GET",
    });
    return response;
  },
  GetSubCategoryServices: async () => {
    const response = await openapi.request({
      url: `/getsubcategory`,
      method: "GET",
    });
    return response;
  },
  GetSubSubCategoryServices: async () => {
    const response = await openapi.request({
      url: `/getsubSubcategory`,
      method: "GET",
    });
    return response;
  },

  //fetched all sub category for particular category
  GetServiceOfCategory: async (_id: string, search: string | null) => {
    const response = await api.request({
      url: `/getSubSservice?_id=${_id}&search=${search}`,
      method: "GET",
    });
    return response;
  },
};
