import { Link, useParams, useSearchParams } from "react-router-dom";
import "../css/subCategory.css";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import { ServicesAPi } from "../config/AxiosUtils";
import { useServices } from "../service/auth";

const SubCategory = () => {
  // const {  name, iconurl } = useLocation().state;
  const [searchParams] = useSearchParams();
  const { category } = useServices();

  const { subcategory } = useParams();

  const categoryObj: any = category.find(
    (e: any) => e?.categoryName === subcategory
  );

  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState({
    SubCategory: [],
    status: "",
    message: "",
  });

  console.log(searchParams.get("serach"));

  useEffect(() => {
    setLoading(true);
    ServicesAPi.GetServiceOfCategory(
      categoryObj?._id,
      searchParams.get("serach") || ""
    )
      .then((res) => {
        console.log(res?.data?.services);
        setServices({
          SubCategory: JSON.parse(res?.data?.services),
          status: "success",
          message: res?.data.message,
        });
      })
      .catch((e) => {
        setServices({
          SubCategory: [],
          status: "error",
          message: e.response?.data.message,
        });
        console.log("inside the service", e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [subcategory, searchParams.get("serach")]);

  if (loading) {
    return (
      <div
        style={{
          position: "relative",
          height: "300px",
        }}
      >
        <Loader />;
      </div>
    );
  }
  if (services.SubCategory.length <= 0 && !loading) {
    return (
      <h2
        style={{
          height: "300px",
        }}
        className="d-flex justify-content-center align-items-center"
      >
        No servicess is Found !
      </h2>
    );
  }

  if (services.status === "error") {
    return (
      <h2
        style={{
          height: "300px",
        }}
        className="d-flex justify-content-center align-items-center"
      >
        {services.message}
      </h2>
    );
  }

  return (
    <>
      <div className=" single_cat_name_heading">
        <div>
          <div className="cat_icon_img_div">
            <img src={categoryObj?.categoryIcon} alt="BeautySpa" />
          </div>
          <h2>{categoryObj?.categoryName}</h2>
        </div>
      </div>
      {/* <div className="subCategory_container">
        {services?.SubCategory.map((subcat) => (
          <Link
            className="single_Subcat p-0"
            key={subcat._id}
            to={subcat.subCategoryName}
          >
            <div className="single_cat_content">
              <div className="single_subCat_img">
                <img src={subcat.subCatImg} alt={`${subcat.subCategoryName}`} />
              </div>
              <div className="single_sub_cat_name">
                <h2>{subcat.subCategoryName}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div> */}

      <div className="container_home">
        {services?.SubCategory?.map((subcat: any) => (
          <div className="single_cat p-0" key={subcat._id}>
            <Link key={subcat._id} to={subcat.subCategoryName}>
              <div className="post_cat_img_div">
                <img src={subcat.subCatImg} alt={`${subcat.subCategoryName}`} />
              </div>
              <div className="cat_icon_container">
                <div className="cat_name text-center">
                  {subcat?.subCategoryName}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default SubCategory;
