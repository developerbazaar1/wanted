import { useState, useEffect } from "react";
const CustomPagination = ({ totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      onPageChange(page);
    }
  };

  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage, onPageChange]);

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <span
          key={i}
          className={`page-number ${currentPage === i ? "active" : ""}`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </span>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="custom-pagination">
      {totalItems > itemsPerPage && (
        <>
          <span
            className={`page-number prev ${
              currentPage === 1 ? "disabled" : ""
            }`}
            onClick={() => handlePageClick(currentPage - 1)}
          >
            {"<"}
          </span>
          {renderPageNumbers()}
          <span
            className={`page-number next ${
              currentPage === totalPages ? "disabled" : ""
            }`}
            onClick={() => handlePageClick(currentPage + 1)}
          >
            {">"}
          </span>
        </>
      )}
    </div>
  );
};

export default CustomPagination;
