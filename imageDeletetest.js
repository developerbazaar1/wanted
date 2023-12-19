const cloudinary = require("./src/config/cloudinary");

const imageUrl =
  "http://res.cloudinary.com/djoenye05/image/upload/v1700817963/wantedvendor/wantedvendor/1700817738390-507No%20data-pana%201.png.png";
// Extract the public_id from the URL
const publicIdMatch = imageUrl.match(/\/v\d+\/(.+)$/);

if (publicIdMatch && publicIdMatch[1]) {
  const public_id = publicIdMatch[1];
  // console.log(public_id);

  // Now you can use the public_id to delete the image
  cloudinary.uploader.destroy(
    "wantedvendor/wantedvendor/1702835192297-698certificate.webp.png",
    (error, result) => {
      if (error) {
        console.error("Error deleting image from Cloudinary:", error);
      } else {
        console.log("Image deleted from Cloudinary:", result);
        // You can now remove the URL from your database
      }
    }
  );
} else {
  console.error("Unable to extract public_id from the URL");
}
