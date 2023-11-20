import { useState } from "react";

function DragAndDropImageInput() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const preventDefault = (e) => {
    e.preventDefault();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.input);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" />
        <button>Submit</button>
      </form>

      {/* <div className="  d-flex flex-column flex-md-row justify-content-between where_to_show_group">
        <div className="d-flex align-items-center gap-3 justify-content-between">
          <label className="form-head mb-0 " htmlFor="liveads">
            Live Ads
          </label>
          <input
            className="radioColor"
            type="radio"
            name="userSearch"
            id="liveads"
          />
        </div>
        <div className="d-flex align-items-center gap-3 justify-content-between">
          <label className="form-head mb-0 " htmlFor="latestoffer">
            Latest Offer
          </label>
          <input
            className="radioColor"
            type="radio"
            name="userSearch"
            id="latestoffer"
          />
        </div>

        <div className="d-flex align-items-center gap-3 justify-content-between">
          <label className="form-head mb-0 " htmlFor="service">
            Services
          </label>
          <input
            className="radioColor"
            type="radio"
            name="userSearch"
            id="service"
          />
        </div>
      </div> */}

      {/* <div
        id="drop-container"
        onDragOver={preventDefault}
        onDragEnter={preventDefault}
        onDrop={handleImageDrop}
        style={{ cursor: "pointer" }}
      >
        <p>Drag &amp; Drop an image here</p>

        <input
          type="file"
          accept="image/*"
          id="file-input"
          style={{ display: "none" }}
          onChange={handleImageSelect}
        />
        <label htmlFor="file-input" style={{ cursor: "pointer" }}></label>

        {selectedImage && (
          <img
            src={selectedImage}
            alt="Selected"
            id="image-preview"
            style={{ maxHeight: "300px", maxWidth: "100%" }}
          />
        )}
      </div> */}
    </div>
  );
}

export default DragAndDropImageInput;
