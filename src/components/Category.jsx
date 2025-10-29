import React from "react";

const Category = (props) => {
  const { setModalShow, item, setCategory } = props;

  return (
    <>
      <div className="bg-[color:var(--glass)] w-[100%] mx-auto mb-1 rounded-[20px] p-3 border border-[color:var(--glass-border)] hover:border-[color:var(--accent)] transition-all duration-300 transform hover:scale-[1.02]">
        <div className="flex justify-between justify items-center gap-3">
          <span className="text-2xl font-bold flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-[color:var(--panel)] transform transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
              <img
                src={props.data?.img}
                alt=""
                className="w-10 transition-transform"
              />
            </div>
            <p className="mb-[5px] text-[0.9rem] bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--accent)] bg-clip-text text-transparent font-bold">
              {item.category}
            </p>
          </span>
          <span className="py-1 px-2 bg-[color:var(--panel)] rounded-[20px] text-[0.8rem] text-[color:var(--accent)] border border-[color:var(--glass-border)]">
            10Qs
          </span>
        </div>
        <p className="text-[color:var(--muted)] mb-2 ml-3 text-sm font-semibold">
          {item.description}
        </p>
        <div className="flex justify-end">
          <button
            onClick={() => {
              setModalShow(true);
              setCategory(item.id);
            }}
            className="
                    xl:text-xl
                    px-4 py-2
                    bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--accent)]
                    hover:from-[color:var(--accent)] hover:to-[color:var(--primary)]
                    rounded-[15px] 
                    text-sm text-[#111424]
                    font-bold
                    cursor-pointer
                    transform hover:scale-105
                    transition-all duration-300
                    flex items-center gap-2
                "
          >
            <span>Start</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Category;
