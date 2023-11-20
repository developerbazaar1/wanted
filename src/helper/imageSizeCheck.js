export function ImgSizeCheck(imgSize) {
  const maxSize = 5 * 1024 * 1024; // 5 MB in bytes
  if (imgSize > maxSize) {
    // console.error("File size exceeds the limit of 5 MB.");
    // console.log(imgSize, "imageSize");
    return false;
  } else {
    return true;
  }
}
