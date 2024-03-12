import { ProfileType } from "./Types";
import axios from "axios";

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

export const showArrowCheck = (
  condition: string,
  service: any[],
  type: string
): boolean => {
  let result;
  if (type === "Cat") {
    result = service.find((element: any) => condition === element.category_id);
  } else {
    result = service.find(
      (element: any) => condition === element.subcategory_id
    );
  }
  return result ? true : false;
};

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface LocationData {
  latitude: number;
  longitude: number;
  formattedAddress: string;
}

interface Address {
  formattedAddress: string;
  // Add other properties if needed
}

async function reverseGeocode(
  latitude: number,
  longitude: number
): Promise<Address> {
  try {
    const response = await axios.get(
      `https://api.radar.io/v1/geocode/reverse?coordinates=${latitude},${longitude}`,
      {
        headers: {
          Authorization: `${import.meta.env.VITE_GeoCodeAPI}`,
        },
      }
    );

    const formattedAddress: string =
      response?.data?.addresses[0]?.formattedAddress;
    if (!formattedAddress) {
      throw new Error("Address not found in the response");
    }

    return { formattedAddress };
  } catch (error) {
    console.error("Error in geocoding request", error);
    throw error;
  }
}

export function getCurrentLocation(): Promise<LocationData> {
  return new Promise<LocationData>((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position: GeolocationPosition) => {
          const { latitude, longitude }: Coordinates = position.coords;

          try {
            const addressData: Address = await reverseGeocode(
              latitude,
              longitude
            );

            const formattedAddress: string = addressData.formattedAddress;
            resolve({ latitude, longitude, formattedAddress });
          } catch (error) {
            reject(error);
          }
        },
        (error: GeolocationPositionError) => {
          console.error("Error getting location:", error);
          reject(error);
        }
      );
    } else {
      const error: Error = new Error("Geolocation not supported");
      console.error(error);
      reject(error);
    }
  });
}
