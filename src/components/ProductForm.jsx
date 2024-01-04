import { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoMdImages } from "react-icons/io";
import { toast } from "react-toastify";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/psd",
  "image/ai",
  "image/avif",
];

const ProductForm = ({ numProducts, register, setValue, errors }) => {
  const [settings] = useState({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  });
  // console.log("This is number of products", numProducts);
  console.log(errors);
  const [imagePreviews, setImagePreviews] = useState(
    Array.from({ length: numProducts }, () => [])
  );
  const [selectedImages, setSelectedImages] = useState(
    Array.from({ length: numProducts }, () => [])
  );

  const handleImageChangeForProduct = (e, productIndex) => {
    const files = e.target.files;
    const newPreviews = [...imagePreviews];
    const newSelectedImages = [...selectedImages];

    // Ensure that the array element at the specified index exists
    if (!newPreviews[productIndex]) {
      newPreviews[productIndex] = [];
    }

    // Ensure that the array element at the specified index exists
    if (!newSelectedImages[productIndex]) {
      newSelectedImages[productIndex] = [];
    }

    for (let i = 0; i < Math.min(files.length, 3); i++) {
      // Check if the file type is allowed
      if (allowedTypes.includes(files[i].type)) {
        const reader = new FileReader();
        reader.onload = (event) => {
          // Ensure that the array element at the inner index exists
          if (!newPreviews[productIndex][i]) {
            newPreviews[productIndex][i] = event.target.result;
          } else {
            newPreviews[productIndex].push(event.target.result);
          }
          setImagePreviews([...newPreviews]);

          // Store the selected images in the separate state
          newSelectedImages[productIndex].push(files[i]);
          setSelectedImages([...newSelectedImages]);

          // Set the value only for the current product
          setValue(
            `productImg[${productIndex}]`,
            newSelectedImages[productIndex]
          );
        };
        reader.readAsDataURL(files[i]);
      } else {
        // File type not allowed, handle accordingly (e.g., show an error message)
        toast.error(`File type not allowed: ${files[i].type}`);
      }
    }
  };

  const handleImageRemove = (productIndex, imgIndex) => {
    const newPreviews = [...imagePreviews];
    const newSelectedImages = [...selectedImages];

    newPreviews[productIndex].splice(imgIndex, 1);
    setImagePreviews([...newPreviews]);

    // Remove the selected image from the separate state
    newSelectedImages[productIndex].splice(imgIndex, 1);
    setSelectedImages([...newSelectedImages]);

    // Set the value only for the current product
    setValue(`productImg[${productIndex}]`, newSelectedImages[productIndex]);
  };

  const productForms = [];
  for (let i = 0; i < numProducts; i++) {
    productForms.push(
      <div className="row justify-content-center mx-0" key={i}>
        <div className="col-md-12 px-0">
          <div className="row">
            <label className="form-head mx-1" htmlFor="">
              {/* {`Product ${i + 1}`} */}
            </label>
            <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
              <div className="product-details-container mb-2 pb-3" key={i}>
                <div className="single-product">
                  <div className="advert-product-input ">
                    <div className="mb-2 ">
                      <label
                        htmlFor={`productName${i}`}
                        className="mb-2 form-head"
                      >
                        Product Name
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter Product Name"
                        id={`productName${i}`}
                        {...register(`product[${i}].productName`, {
                          pattern: {
                            value: /^[ A-Za-z0-9._%+-]*$/,
                            message: "Invalid Product Name",
                          },
                          required: {
                            value: true,
                            message: "Title is Required",
                          },
                        })}
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor={`product_id${i}`}
                        className="mb-2 form-head"
                      >
                        Product Id
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter Product Id"
                        id={`product_id${i}`}
                        {...register(`product[${i}].product_id`, {
                          pattern: {
                            value: /^[ A-Za-z0-9._%+-]*$/,
                            message: "Invalid Product iD",
                          },
                          required: {
                            value: true,
                            message: "Product Id is Required",
                          },
                        })}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor={`productPrice${i}`}
                        className="mb-2 form-head"
                      >
                        Product Price
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter Product Price"
                        id={`productPrice${i}`}
                        {...register(`product[${i}].productPrice`, {
                          pattern: {
                            value: /^\d+$/,
                            message: "Invalid Product Price",
                          },
                          required: {
                            value: true,
                            message: "Product Price is Required",
                          },
                        })}
                      />
                    </div>
                  </div>

                  <div className="ms-3 product-icons">
                    <label
                      htmlFor={`productName${i}`}
                      title="Edit Product Name"
                    >
                      <MdModeEditOutline
                        size="20"
                        style={{
                          cursor: "pointer",
                        }}
                      />
                    </label>

                    <span>
                      <label
                        htmlFor={`productImg${i + 1}`}
                        title="Add Product Images"
                      >
                        <IoMdImages
                          className="addMoreProductImgIcon"
                          size="30"
                        />
                      </label>

                      <input
                        type="file"
                        id={`productImg${i + 1}`}
                        className="particularImgInput"
                        multiple
                        onChange={(e) => handleImageChangeForProduct(e, i)}
                      />
                    </span>
                  </div>
                </div>
                {/* image area */}
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
              {!imagePreviews[i] && (
                <div className="text-center"> image is required </div>
              )}

              {imagePreviews[i] && (
                <Slider {...settings} className="selected-product-img-preview">
                  {imagePreviews[i]?.map((preview, imgIndex) => (
                    <div key={imgIndex} className="productForm-img-container">
                      <img
                        src={preview}
                        style={{
                          width: "100%",
                          height: "238px",
                          objectFit: "cover",
                        }}
                        alt={`Product ${i + 1} - Image ${imgIndex + 1}`}
                      />
                      <MdDelete
                        className="product-prevImg-del-icon"
                        color="red"
                        size="20"
                        onClick={() => handleImageRemove(i, imgIndex)}
                      />
                    </div>
                  ))}
                </Slider>
              )}
            </div>
          </div>
        </div>
        <hr />
      </div>
    );
  }

  return <>{productForms}</>;
};

export default ProductForm;
