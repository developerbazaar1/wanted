import axios from "axios";

const FileUpload = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    console.log("Geolocation not supported");
  }

  async function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

    try {
      const response = await axios.get(
        `https://api.radar.io/v1/geocode/reverse?coordinates=${latitude},${longitude}`,
        {
          headers: {
            Authorization: `${import.meta.env.VITE_GeoCodeAPI}`,
          },
        }
      );

      console.log(response?.data); // Assuming you want to log the response data
    } catch (error) {
      console.error("Error in geocoding request", error);
    }
  }

  function error() {
    console.log("Unable to retrieve your location");
  }

  return <div>This is reverse geocoding</div>;
};

export default FileUpload;
