const NoDataFound = ({ img, title, description }) => {
  return (
    <>
      <img
        src={img}
        alt="loading"
        style={{
          width: "200px",
          height: "200px",
        }}
      />
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </>
  );
};

export default NoDataFound;
