const ProductCrasuel = ({ product }) => {
  return (
    <div className="details_provider_products mb-2">
      <h5>{product?.productname}</h5>
      {/* //crasule for small screen */}
      <div id="carouselExampleIndicators" className="carousel slide d-md-none">
        <div className="carousel-inner">
          {product?.productImages?.map((img, index) => (
            <div className="carousel-item active" key={index}>
              <img src={img} className="d-block w-100 " alt={index} />
            </div>
          ))}
          {/* <!-- Add more carousel items for additional images --> */}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
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
          data-bs-target="#carouselExampleIndicators"
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
          <div className="" key={index}>
            <img src={img} className="img-fluid" alt={index} />
          </div>
        ))}
        {/* <!-- Add more columns for additional images --> */}
      </div>
    </div>
  );
};

export default ProductCrasuel;
