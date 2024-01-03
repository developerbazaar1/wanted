import { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoMdImages } from "react-icons/io";
import { toast } from "react-toastify";
const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/psd",
  "image/ai",
  "image/avif",
];

const ProductForm = ({ numProducts, register, setValue, errors }) => {
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
      <div className="product-details-container" key={i}>
        <label className="form-head" htmlFor="">
          {`Product ${i + 1}`}
        </label>
        <div className="single-product">
          <div className="advert-product-input">
            <div className="mb-1 ">
              <label htmlFor={`productName${i}`} className="mb-0">
                Product Name
              </label>
              <input
                type="text"
                placeholder="Enter Product Name"
                id={`productName${i}`}
                {...register(`product[${i}].productName`, {
                  pattern: {
                    value: /^[A-Za-z!'!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/,
                    message: "Invalid Product Name",
                  },
                  required: {
                    value: true,
                    message: "Title is Required",
                  },
                })}
              />
            </div>
            <div className="mb-1">
              <label htmlFor={`product_id${i}`} className="mb-0">
                Product Id
              </label>
              <input
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
              <label htmlFor={`productPrice${i}`} className="mb-0">
                Product Price
              </label>
              <input
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

          <div className="mx-3 product-icons">
            <label htmlFor={`productName${i}`}>
              <MdModeEditOutline
                size="20"
                style={{
                  cursor: "pointer",
                }}
              />
            </label>

            <span>
              <label htmlFor={`productImg${i + 1}`}>
                <IoMdImages className="addMoreProductImgIcon" size="20" />
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

          <div className="product-img-prev-cont">
            {!imagePreviews[i] && <div> image is required </div>}
            {imagePreviews[i]?.map((preview, imgIndex) => (
              <div key={imgIndex} className="single-img-cont">
                <img
                  src={preview}
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
          </div>
        </div>
        <hr />
      </div>
    );
  }

  return <>{productForms}</>;
};

export default ProductForm;
