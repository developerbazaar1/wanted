const ProductCrasuel = ({ product, unique }) => {
  // console.log(unique);
  return (
    <div className="details_provider_products mb-2">
      <h5>{product?.productname}</h5>
      {/* //crasule for small screen */}
      <div
        id={`carouselExampleIndicators${unique}`}
        className="carousel slide d-md-none"
      >
        <div className="carousel-inner">
          {product?.productImages?.map((img, index) => (
            <div className="carousel-item active" key={index}>
              <img src={img} className="d-block w-100 " alt={index} />
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target={`#carouselExampleIndicators${unique}`}
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target={`#carouselExampleIndicators${unique}`}
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* <!-- Image grid for medium and larger screens --> */}
      <div className=" d-none d-md-flex detial_product_image">
        {product?.productImages?.map((img, index) => (
          <div className="singleProduct_image" key={index}>
            <img src={img} className="img-fluid" alt={index} />
            {product?.productPrice && (
              <div>
                {" "}
                <span
                  style={{
                    color: "green",
                    marginRight: "3px",
                  }}
                >
                  $
                </span>{" "}
                {product?.productPrice}
              </div>
            )}
          </div>
        ))}
        {/* <!-- Add more columns for additional images --> */}
      </div>
    </div>
  );
};

export default ProductCrasuel;
