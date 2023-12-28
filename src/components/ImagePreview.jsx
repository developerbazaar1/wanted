const ImagePreview = ({
  selectedImage,
  fileName,
  removeImagePreview,
  portfolioImgUrl,
}) => {
  if (!selectedImage && !portfolioImgUrl) {
    return (
      <div className="protfilo_image_preview_container">
        <div className="preview_image_div">
          {/* <img src={advertUrl} alt="" className="protfilo_prew_image" /> */}
        </div>
      </div>
    );
  }

  return (
    <>
      {selectedImage ? (
        <div className="protfilo_image_preview_container">
          <div className="preview_image_div">
            <img
              src={selectedImage}
              alt="loading"
              className="protfilo_prew_image"
            />
          </div>
          <button
            className="protfilo_prew_image_remove_button"
            onClick={removeImagePreview}
          >
            Remove
          </button>

          <span className="protfilo_preview_image_name">{fileName}</span>
        </div>
      ) : (
        <div className="protfilo_image_preview_container">
          <div className="preview_image_div">
            <img src={portfolioImgUrl} alt="" className="protfilo_prew_image" />
          </div>
        </div>
      )}
    </>
  );
};

export default ImagePreview;
