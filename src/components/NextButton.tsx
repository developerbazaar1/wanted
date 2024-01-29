import React from "react";

interface NextButtonProps {
  setAdsLoading: React.Dispatch<React.SetStateAction<number>>;
}

const NextButton: React.FC<NextButtonProps> = ({ setAdsLoading }) => {
  return (
    <>
      <div className="w-100 text-center">
        <button
          className="next_button"
          onClick={() => setAdsLoading((val: number) => val + 1)}
        >
          Load More
        </button>
      </div>
    </>
  );
};

export default NextButton;
