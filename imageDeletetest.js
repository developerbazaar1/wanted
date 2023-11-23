const cloudinary = require("./src/config/cloudinary");

const imageUrl =
  "https://res.cloudinary.com/djoenye05/image/upload/v1700743844/wantedvendor/wantedvendor/1700743619076-110telephone.png";

// Extract the public_id from the URL
const publicIdMatch = imageUrl.match(/\/v\d+\/(.+)$/);

if (publicIdMatch && publicIdMatch[1]) {
  const public_id = publicIdMatch[1];
  console.log(public_id);

  // Now you can use the public_id to delete the image
  cloudinary.uploader.destroy(public_id, (error, result) => {
    if (error) {
      console.error("Error deleting image from Cloudinary:", error);
    } else {
      console.log("Image deleted from Cloudinary:", result);
      // You can now remove the URL from your database
    }
  });
} else {
  console.error("Unable to extract public_id from the URL");
}
