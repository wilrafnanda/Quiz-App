import React from "react";

const Landingfooter = ({ setCurrentPage, currentPage, numberOfPages }) => {
  const pages = numberOfPages - 1;
  function previous() {
    if (currentPage === 1) return;
    setCurrentPage((prev) => prev - 1);
  }
  function next() {
    if (currentPage > pages) return;
    setCurrentPage((prev) => prev + 1);
  }

  return (
    <>
      <div className="mb-[50px]">
        <p className="font-light text-[var(--muted)] mb-4">
          Tip: Browse categories to start
        </p>

        <div className="flex gap-4 justify-end items-center">
          {
            <button
              onClick={previous}
              className={`futuristic-btn py-3 px-5 font-bold rounded-[8px] ${
                currentPage === 1 ? "opacity-40 cursor-not-allowed" : ""
              }`}
            >
              Prev
            </button>
          }

          <button
            onClick={next}
            className={`futuristic-btn py-3 px-5 font-bold rounded-[8px] ${
              currentPage > pages ? "opacity-40 " : ""
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Landingfooter;
