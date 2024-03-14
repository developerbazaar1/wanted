import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BackIcon } from "../../utils/SvgElements";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useServices } from "../../service/auth";
import { showArrowCheck } from "../../utils/CastintoFormData";
import { SearchContext } from "../../features/searchContext";

interface Props {
  smcatsh: boolean;
  handleChangeSmallOpenHide: (arg: boolean) => void;
}

const SmCategoryComponent: React.FC<Props> = ({
  smcatsh,
  handleChangeSmallOpenHide,
}) => {
  const { taxonomyFilter, updatetaxonomyFilterQuery } =
    useContext(SearchContext);
  const { category, subCategory, SubSubCategory } = useServices();
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const pathnames = location.split("/").filter((x) => x);
  const [openedCategories, setOpenedCategories] = useState<string[]>([]);
  const [openedSubCategories, setOpenedSubCategories] = useState<string[]>([]);

  console.log("This is taxnomoy", taxonomyFilter);
  // function to Handle Selected category
  function handleSelectedDropDown(service: string) {
    updatetaxonomyFilterQuery(service);
    if (pathnames.length === 0 || pathnames.includes(`services`)) {
      navigate(`/services/search`);
    }
  }
  const toggleCategory = (categoryId: string) => {
    if (openedCategories.includes(categoryId)) {
      setOpenedCategories(openedCategories.filter((id) => id !== categoryId));
    } else {
      setOpenedCategories([...openedCategories, categoryId]);
    }
  };

  const toggleSubCategory = (subCategoryId: string) => {
    if (openedSubCategories.includes(subCategoryId)) {
      setOpenedSubCategories(
        openedSubCategories.filter((id) => id !== subCategoryId)
      );
    } else {
      setOpenedSubCategories([...openedSubCategories, subCategoryId]);
    }
  };

  const isCategoryOpened = (categoryId: string) => {
    return openedCategories.includes(categoryId);
  };

  const isSubCategoryOpened = (subCategoryId: string) => {
    return openedSubCategories.includes(subCategoryId);
  };

  const renderSubCategories = (categoryId: string) => {
    if (!isCategoryOpened(categoryId)) return null;

    const filteredSubCategories = subCategory.filter(
      (subCat: any) => subCat.category_id === categoryId
    );

    return (
      <ul className="sm-subCat-lists sm-subCat-lists-open">
        {filteredSubCategories.map((subCatElement: any) => (
          <li className="sm-subCat-list" key={subCatElement._id}>
            <span className="sm-common-list">
              <Link
                to="#"
                className="sm-list-link"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectedDropDown(subCatElement.subCategoryName);
                }}
              >
                {subCatElement?.subCategoryName}
              </Link>
              <div
                className={`more-list-icon ${
                  isSubCategoryOpened(subCatElement._id)
                    ? "more-list-icon-open"
                    : ""
                }`}
                onClick={() => toggleSubCategory(subCatElement._id)}
              >
                {showArrowCheck(
                  subCatElement._id,
                  SubSubCategory,
                  "subCat"
                ) && <IoIosAddCircleOutline />}
              </div>
            </span>
            {renderSubSubCategories(subCatElement._id)}
          </li>
        ))}
      </ul>
    );
  };

  const renderSubSubCategories = (subCategoryId: string) => {
    if (!isSubCategoryOpened(subCategoryId)) return null;

    const filteredSubSubCategories = SubSubCategory.filter(
      (subSubCat: any) => subSubCat.subcategory_id === subCategoryId
    );

    if (filteredSubSubCategories.length === 0) return null;

    return (
      <ul className="sm-subCat-lists sm-subCat-lists-open">
        {filteredSubSubCategories.map((subSubCatElement: any) => (
          <li className="sm-subCat-list" key={subSubCatElement._id}>
            <span className={`sm-common-list`}>
              <Link
                to="#"
                className="sm-list-link"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectedDropDown(subSubCatElement.subSubCategoryName);
                }}
              >
                {subSubCatElement?.subSubCategoryName}
              </Link>
            </span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <div
        className={`sm-cate-container ${
          smcatsh ? "sm-cate-container-open" : ""
        }`}
      >
        <div className="cat-head d-flex align-items-center">
          <button
            title="Back"
            className="sm-cat-back-btn"
            onClick={() => handleChangeSmallOpenHide(false)}
          >
            {BackIcon}
          </button>
          <div className="title">Categories</div>
        </div>
        <hr className="m-0" />
        <section className="sm-cate-body">
          <div className="top-cat">All Categories</div>
          <ul>
            {category.map((catElement: any) => (
              <li key={catElement._id}>
                <span className="sm-cate-list">
                  <Link
                    to="#"
                    className="sm-list-link"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectedDropDown(catElement.categoryName);
                    }}
                  >
                    {catElement?.categoryName}
                  </Link>
                  <div
                    onClick={() => toggleCategory(catElement._id)}
                    className={`more-list-icon ${
                      isCategoryOpened(catElement._id)
                        ? "more-list-icon-open"
                        : ""
                    }`}
                  >
                    {showArrowCheck(catElement._id, subCategory, "Cat") && (
                      <IoIosAddCircleOutline />
                    )}
                  </div>
                </span>
                {renderSubCategories(catElement._id)}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default SmCategoryComponent;
