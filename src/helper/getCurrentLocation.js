import axios from "axios";

export async function reverseGeocode(latitude, longitude) {
  try {
    const response = await axios.get(
      `https://api.radar.io/v1/geocode/reverse?coordinates=${latitude},${longitude}`,
      {
        headers: {
          Authorization: `${import.meta.env.VITE_GeoCodeAPI}`,
        },
      }
    );

    const formattedAddress = response?.data?.addresses[0];
    return formattedAddress;
  } catch (error) {
    console.error("Error in geocoding request", error);
    throw error;
  }
}

export async function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          try {
            const formattedAddress = await reverseGeocode(latitude, longitude);
            resolve({ latitude, longitude, formattedAddress });
          } catch (error) {
            reject(error);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          reject(error);
        }
      );
    } else {
      const error = new Error("Geolocation not supported");
      console.error(error);
      reject(error);
    }
  });
}
