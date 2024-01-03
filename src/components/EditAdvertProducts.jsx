import { useEffect, useState } from "react";
import { IoMdImages } from "react-icons/io";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { toast } from "react-toastify";
import { ImgSizeCheck } from "../helper/imageSizeCheck";
import { ProctedApi } from "../config/axiosUtils";
import Swal from "sweetalert2";
const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/psd",
  "image/ai",
  "image/avif",
];

const EditAdvertProducts = ({
  product,
  i,
  register,
  setValue,
  advertId,
  loading,
  setLoading,
  token,
  setRefresh,
}) => {
  const [addProductImg, setAddProductImg] = useState([]);
  const [newProductImgPreve, setNewProductImgPreve] = useState([]);

  const handleProductImageUpdate = (e, productIndex) => {
    e.preventDefault();
    let files = e.target.files;
    const selected = [];
    for (let i = 0; i < files.length; i++) {
      if (!allowedTypes.includes(files[i].type)) {
        toast.error("Selected file is not an image");
        continue;
      }
      if (!ImgSizeCheck(files[i].size)) {
        toast.error("File size exceeds the limit of 5 MB");
        continue;
      }
      if (files[i] && files[i].type.startsWith("image/")) {
        setAddProductImg((img) => [...img, files[i]]);
        const reader = new FileReader();
        reader.onload = (e) => {
          selected.push(e.target.result);
          setNewProductImgPreve((prevImages) => [
            ...prevImages,
            e.target.result,
          ]);
        };
        reader.readAsDataURL(files[i]);
      }
    }
  };

  const removePrevImg = (index) => {
    const updatedAddProductImg = [...addProductImg];
    const updatedNewProductImgPreve = [...newProductImgPreve];

    // Remove the element at the specified index
    updatedAddProductImg.splice(index, 1);
    updatedNewProductImgPreve.splice(index, 1);

    // Update the state with the new arrays
    setAddProductImg(updatedAddProductImg);
    setNewProductImgPreve(updatedNewProductImgPreve);
  };

  //Delete confiorm icon pops
  const handleDelete = (e, imgId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (imgId) {
          HandleProductImgRemove(e, imgId);
        } else {
          HandleRemoveProduct();
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your item is safe :)", "info");
      }
    });
  };

  const HandleRemoveProduct = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    ProctedApi.deleteadvertProduct(token, advertId, product._id)
      .then((res) => {
        console.log(res);
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
        setRefresh((prev) => !prev);
        return toast.success(res.data.message);
      })
      .catch((e) => {
        console.log(e);
        return toast.error(e.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const HandleProductImgRemove = (e, imgId) => {
    if (loading) {
      return;
    }
    e.stopPropagation();
    ProctedApi.deleteadvertProductImage(token, advertId, product._id, imgId)
      .then((res) => {
        console.log(res.data);
        console.log(res.data.message);
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
        setRefresh((prev) => !prev);
        return toast.success(res.data.message);
      })
      .catch((e) => {
        return toast.error(e.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (addProductImg.length > 0) {
      setValue(`oldProductImg[${i}]`, addProductImg);
    }
  }, [addProductImg]);

  return (
    <>
      <div className="product-details-container" key={product?._id}>
        <label className="form-head" htmlFor="">
          {/* {`Product ${i + 1}`} */}
          {product?.productName}
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
                {...register(`products[${i}].productName`)}
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
                {...register(`products[${i}].product_id`)}
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
                {...register(`products[${i}].productPrice`)}
              />
            </div>
          </div>

          <div className="mx-3 product-icons">
            <label htmlFor={`productName${i}`} title="Edit Product">
              <MdModeEditOutline
                size="20"
                style={{
                  cursor: "pointer",
                }}
              />
            </label>

            <div
              className="delete-product-icon"
              onClick={(e) => handleDelete()}
              title="Delete Product"
            >
              <MdDelete size={20} color="red" />
            </div>
            <span>
              <label
                htmlFor={`oldproductImg${i + 1}`}
                title="Add Product Images"
              >
                <IoMdImages className="addMoreProductImgIcon" size="20" />
              </label>

              <input
                type="file"
                id={`oldproductImg${i + 1}`}
                className="particularImgInput"
                multiple
                onChange={(e) => handleProductImageUpdate(e, i)}
              />
            </span>
          </div>

          <div className="product-img-prev-cont">
            {/* <img/> */}
            {newProductImgPreve?.map((imgprev, index) => (
              <div key={index} className="single-img-cont">
                <img
                  src={imgprev}
                  alt={`Product ${index + 1} - Image ${index + 1}`}
                />
                <MdDelete
                  className="product-prevImg-del-icon"
                  color="red"
                  size="20"
                  onClick={() => removePrevImg(index)}
                />
              </div>
            ))}
            {product?.productImg?.map((img, imgIndex) => (
              <div key={img._id} className="single-img-cont">
                <img
                  src={img?.imgUrl}
                  alt={`Product ${i + 1} - Image ${imgIndex + 1}`}
                />
                <div
                  aria-disabled={true}
                  className="product-prevImg-del-icon"
                  onClick={(e) => handleDelete(e, img._id)}
                  id="product"
                >
                  <MdDelete color="red" size="20" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <hr />
      </div>
    </>
  );
};

export default EditAdvertProducts;
