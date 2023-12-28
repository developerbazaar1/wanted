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

//  <div className="product-details-container">
//    <div className="single-product">
//      <div className="advert-product-input">
//        <div>
//          <label htmlFor="productName">Product Name</label>
//          <input type="text" placeholder="Enter Product Name" id="productName" />
//        </div>
//        <div>
//          <label htmlFor="product_id">Product Id</label>
//          <input type="text" placeholder="Enter Product Id" id="product_id" />
//        </div>

//        <div>
//          <label htmlFor="productPrice">Product Price</label>
//          <input
//            type="text"
//            placeholder="Enter Product Price"
//            id="productPrice"
//          />
//        </div>
//      </div>

//      <div className="ms-3 product-icons">
//        <label htmlFor="productName">
//          <MdModeEditOutline
//            size="20"
//            style={{
//              cursor: "pointer",
//            }}
//          />
//        </label>

//        <span>
//          <label htmlFor="addMoreProductimg">
//            <IoMdImages className="addMoreProductImgIcon" size="20" />
//          </label>

//          <input
//            type="file"
//            id="addMoreProductimg"
//            className="particularImgInput"
//          />
//        </span>
//      </div>

//      <div className="product-img-prev-cont">
//        <div className="single-img-cont">
//          <img
//            src="https://cdn.helioswatchstore.com/production/media/ar60042_1.jpg"
//            alt=""
//          />
//          <MdDelete className="product-prevImg-del-icon" color="red" size="20" />
//        </div>
//        <div className="single-img-cont">
//          <img
//            src="https://cdn.helioswatchstore.com/production/media/ar60042_1.jpg"
//            alt=""
//          />
//          <MdDelete size="20" className="product-prevImg-del-icon" />
//        </div>
//        <div className="single-img-cont">
//          <img
//            src="https://cdn.helioswatchstore.com/production/media/ar60042_1.jpg"
//            alt=""
//          />
//          <MdDelete size="20" className="product-prevImg-del-icon" />
//        </div>
//      </div>
//    </div>
//  </div>;
