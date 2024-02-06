import "../css/Home.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ServicesAPi } from "../config/AxiosUtils";
import Loader from "../components/Loader";
import { SearchContext } from "../features/searchContext";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { taxonomyFilter } = useContext(SearchContext);
  console.log(taxonomyFilter);

  const [services, setServices] = useState({
    category: [],
    status: "",
    message: "",
  });

  useEffect(() => {
    if (taxonomyFilter) {
      return navigate(`/services/${taxonomyFilter}`);
    }

    setLoading(true);
    ServicesAPi.GetCategoryServices()
      .then((res) => {
        // console.log(res?.data?.category);
        setServices({
          category: res?.data?.category,
          status: "success",
          message: res?.data.message,
        });
      })
      .catch((e) => {
        setServices({
          category: [],
          status: "error",
          message: e.response?.data.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
  if (services.category.length <= 0 && !loading) {
    return (
      <h2
        style={{
          height: "300px",
        }}
        className="d-flex justify-content-center align-items-center"
      >
        No Advert is Found !
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
      <div className="container_home">
        {services?.category?.map((cate: any) => (
          <div className="single_cat p-0" key={cate._id}>
            <Link
              to={`/services/${cate.categoryName}`}
              state={{
                cate_id: cate._id,
                name: cate.categoryName,
                iconurl: cate?.categoryIcon,
              }}
            >
              <div className="post_cat_img_div">
                <img src={cate?.categoryImage} alt={`${cate?.categoryName}`} />
              </div>
              <div className="cat_icon_container">
                <div className="cat_icon_img_div">
                  <img src={cate?.categoryIcon} alt="icon" />
                </div>
                <div className="cat_name">{cate?.categoryName}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
