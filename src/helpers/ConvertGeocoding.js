const axios = require("axios");

async function getGeoCode(address) {
  try {
    const apiKey = process.env.GOOGLEMAPAPIKEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?key=${apiKey}&address=${encodeURIComponent(
      address
    )}`;

    const response = await axios.get(url);
    if (response.status === 200) {
      const location = response.data.results[0]?.geometry?.location;
      // console.log("This is cordinates", location);
      if (location) {
        return location;
      } else {
        const error = new Error("Location data not found");
        error.status = 500;
        throw error;
      }
    } else {
      throw new Error("Failed to fetch location data");
    }
  } catch (error) {
    console.error("Error fetching location data:", error);
    throw error; // Propagate the error for handling by the caller
  }
}

module.exports = getGeoCode;
