import React from "react";

const DifficultyModal = ({ setModalShow, setDifficulty, setView }) => {
  const difficultyLevels = [
    {
      level: "easy",
      color: "from-emerald-400 to-green-500",
      hoverColor: "from-emerald-500 to-green-600",
      label: "Easy",
      icon: "🌟",
    },
    {
      level: "medium",
      color: "from-amber-400 to-yellow-500",
      hoverColor: "from-amber-500 to-yellow-600",
      label: "Medium",
      icon: "⚡",
    },
    {
      level: "hard",
      color: "from-red-500 to-rose-600",
      hoverColor: "from-red-600 to-rose-700",
      label: "Hard",
      icon: "🔥",
    },
  ];

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50
                    animate-[fadeIn_0.3s_ease-in-out]"
    >
      <div
        className="bg-gradient-to-br from-[#1d2834] to-[#151f28] rounded-2xl shadow-2xl p-8 
                      w-[90%] max-w-md text-center transform
                      animate-[scaleIn_0.4s_ease-out]
                      border border-white/10 relative overflow-hidden"
      >
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 -left-4 w-24 h-24 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-24 h-24 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-24 h-24 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        {/* Title with animated gradient */}
        <h1
          className="text-[2.5rem] font-black mb-8 bg-gradient-to-r from-[#60efff] to-[#00ff87] bg-clip-text text-transparent
                       animate-[titleSlide_0.6s_ease-out]
                       relative"
        >
          SELECT YOUR LEVEL
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#60efff] to-[#00ff87] rounded-full"></div>
        </h1>

        {/* Difficulty Buttons Container */}
        <div className="flex flex-col justify-center items-center gap-4 relative z-10">
          {difficultyLevels.map((difficulty, index) => (
            <button
              key={difficulty.level}
              onClick={() => {
                setDifficulty(difficulty.level);
                setModalShow(false);
                setView(true);
              }}
              className={`
                w-full py-4 px-8 rounded-xl font-bold text-[1.2rem]
                bg-gradient-to-r ${difficulty.color}
                hover:bg-gradient-to-r ${difficulty.hoverColor}
                transform hover:scale-105 hover:-rotate-1
                transition-all duration-300 ease-out
                shadow-lg hover:shadow-xl
                animate-[buttonSlide_0.5s_ease-out]
                animation-delay-${index * 150}
                flex items-center justify-center gap-3
                text-white
              `}
            >
              <span className="text-2xl">{difficulty.icon}</span>
              <span>{difficulty.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={() => setModalShow(false)}
        className="absolute top-6 right-6 text-white/60 hover:text-white/90 
                   transform hover:rotate-90 transition-all duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default DifficultyModal;
