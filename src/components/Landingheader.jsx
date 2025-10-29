import React from "react";

const Landingheader = () => {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-[var(--muted)] font-bold mb-6">
        <p className="text-xl neon-text">Pick a topic</p>
        <div className="py-1 px-3 bg-[color:rgba(9,16,24,0.6)] rounded-[20px] mt-3 sm:mt-0 futuristic-btn text-[0.9rem] 2xl:mt-[140px]">
          10+ Categories
        </div>
      </div>
    </>
  );
};

export default Landingheader;
