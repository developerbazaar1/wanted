import { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoIosArrowDown, IoMdImages } from "react-icons/io";
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

const ProductForm = ({
  numProducts,
  register,
  setValue,
  errors,
  category,
  subcategory,
  subsubcategory,
}) => {
  const [settings] = useState({
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  });

  const [selectedCategories, setSelectedCategories] = useState(
    Array.from({ length: numProducts }, () => [])
  );
  const [selectedSubCategories, setSubSelectedCategories] = useState(
    Array.from({ length: numProducts }, () => [])
  );

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

  const cahndleSubcategory = (e, index) => {
    if (index === 0) {
      for (let localIndex = 1; localIndex < numProducts; localIndex++) {
        // console.log("setting sub category ", e.target.value);
        setValue(`product[${localIndex}].subcategory`, e.target.value);
      }
    }
  };

  console.log("Sub sub category", selectedSubCategories);
  const handleCategoryChange = (event, productIndex) => {
    const selectedValue = event.target.value;
    const selectedCat = category.find(
      (cat) => cat.categoryName === selectedValue
    );

    const newSelectedCategories = [...selectedCategories];
    newSelectedCategories[productIndex] = selectedCat;
    setSelectedCategories(newSelectedCategories);

    // Set default category and subcategory for other products
    for (let i = 0; i < numProducts; i++) {
      if (i !== productIndex && !newSelectedCategories[i]) {
        newSelectedCategories[i] = selectedCat;
        if (productIndex === 0) {
          setValue(`product[${i}].category`, event.target.value);
        }
      }
    }

    // Update state with default categories
    setSelectedCategories(newSelectedCategories);
    // let dupNewforcate = [...newSelectedCategories];

    // return;
    // for (let i = 0; i < numProducts; i++) {
    //   console.log("dup category", dupNewforcate[i].categoryName);
    //   console.log("user selected category category", event.target.value);
    //   console.log(
    //     "set category name for dup category",
    //     selectedCat.categoryName
    //   );
    //   if (productIndex === 0) {
    //     console.log(dupNewforcate[i]);
    //     dupNewforcate[i] = selectedCat;
    //   }
    // }

    // setSelectedCategories(dupNewforcate);
  };

  const handleSuCategoryChange = (event, productIndex) => {
    const selectedValue = event.target.value;
    const selectedSubCat = subcategory.find(
      (cat) => cat.subCategoryName === selectedValue
    );
    // selectedSubCategories, setSubSelectedCategories;
    // console.log(selectedSubCat);
    const newSelectedSubCategories = [...selectedSubCategories];
    newSelectedSubCategories[productIndex] = selectedSubCat;
    setSubSelectedCategories(newSelectedSubCategories);

    // Set default category and subcategory for other products
    for (let i = 0; i < numProducts; i++) {
      if (i !== productIndex && !newSelectedSubCategories[i]) {
        newSelectedSubCategories[i] = selectedSubCat;
      }
    }

    // Update state with default categories
    setSubSelectedCategories(newSelectedSubCategories);
  };

  // console.log("This is selected categories", selectedCategories);

  // console.log("This is Sub category", selectedSubCategories);

  const productsTitleInput =
    numProducts > 0 ? (
      <div className="mb-2 col-12 col-sm-6 col-md-12 col-lg-12 col-xl-6">
        <label htmlFor={`productTitle`} className="mb-2 form-head">
          Products Title
        </label>
        <input
          className="form-control "
          type="text"
          placeholder="Enter Product Title"
          id={`productTitle`}
          {...register(`productTitle`, {
            pattern: {
              value: /^[ A-Za-z!@#$%^&*()_+{}\[\]:;<>,.?/~`'-]*$/,
              message: "Invalid Product Title",
            },
            required: {
              value: true,
              message: "Product Title is Required",
            },
          })}
        />
      </div>
    ) : null;

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
                  <div className="advert-product-input row">
                    <div className="mb-2 col-12 col-sm-6 col-md-12 col-lg-12 col-xl-6">
                      <label
                        htmlFor={`productName${i}`}
                        className="mb-2 form-head"
                      >
                        Product Name
                      </label>
                      <input
                        className="form-control "
                        type="text"
                        placeholder="Enter Product Name"
                        id={`productName${i}`}
                        {...register(`product[${i}].productName`, {
                          pattern: {
                            value: /^[ A-Za-z!@#$%^&*()_+{}\[\]:;<>,.?/~`'-]*$/,
                            message: "Invalid Product Name",
                          },
                          required: {
                            value: true,
                            message: "Title is Required",
                          },
                        })}
                      />
                    </div>
                    <div className="mb-2 col-6">
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

                    <div className="mb-2 col-6">
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
                    <div
                      className={`form-group mb-2 position-relative  col-12 col-sm-6 col-md-12 col-lg-12 col-xl-6`}
                    >
                      <label className="form-head" htmlFor="category">
                        Product Category
                      </label>
                      <select
                        className="form-control"
                        id="productCategory"
                        {...register(`product[${i}].category`)}
                        onChange={(e) => handleCategoryChange(e, i)}
                        // value={"rahul"}
                      >
                        <option value="" key="defaultcat">
                          Select Product Category
                        </option>
                        {category?.map((cat) => (
                          <option key={cat._id} value={`${cat?.categoryName}`}>
                            {cat?.categoryName}
                          </option>
                        ))}
                      </select>
                      <IoIosArrowDown className="category-dropw-down-toogle" />
                    </div>
                    <div
                      className={`form-group mb-2 position-relative col-12 col-sm-6 col-md-12 col-lg-12 col-xl-6`}
                    >
                      <label className="form-head" htmlFor="category">
                        Product Sub Category
                      </label>
                      <select
                        className="form-control"
                        id="productSubCategory"
                        {...register(`product[${i}].subcategory`, {
                          required: true,
                        })}
                        onChange={(e) => {
                          cahndleSubcategory(e, i);
                          handleSuCategoryChange(e, i);
                        }}
                      >
                        <option value="" key="defaultcat">
                          Select Product Sub Category
                        </option>
                        {selectedCategories[i] &&
                          subcategory
                            ?.filter(
                              (item) =>
                                item.category_id === selectedCategories[i]?._id
                            )
                            .map((subcate) => (
                              <option
                                key={subcate._id}
                                value={`${subcate?.subCategoryName}`}
                              >
                                {subcate?.subCategoryName}
                              </option>
                            ))}
                      </select>
                      <IoIosArrowDown className="category-dropw-down-toogle" />
                    </div>
                    <div
                      className={`form-group mb-2 position-relative col-12 col-sm-6 col-md-12 col-lg-12 col-xl-6`}
                    >
                      <label className="form-head" htmlFor="category">
                        Sub-Sub Category
                      </label>
                      <select
                        className="form-control"
                        id="productSubsubCategory"
                        {...register(`product[${i}].subsubcategory`)}
                      >
                        <option value="" key="defaultcat">
                          Select Product Sub Category
                        </option>
                        {selectedSubCategories[i] &&
                          subsubcategory
                            ?.filter(
                              (item) =>
                                item.subcategory_id ===
                                selectedSubCategories[i]?._id
                            )
                            .map((subsubcate) => (
                              <option
                                key={subsubcate._id}
                                value={`${subsubcate?.subSubCategoryName}`}
                              >
                                {subsubcate?.subSubCategoryName}
                              </option>
                            ))}
                      </select>
                      <IoIosArrowDown className="category-dropw-down-toogle" />
                    </div>
                  </div>

                  <div className="ms-3 product-icons">
                    <label
                      htmlFor={`productName${i}`}
                      title="Edit Product Name"
                    >
                      <MdModeEditOutline
                        size="25"
                        className="addMoreProductImgIcon"
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

  return (
    <>
      {productsTitleInput}
      {productForms}
    </>
  );
};

export default ProductForm;
