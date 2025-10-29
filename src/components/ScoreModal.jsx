import React, { useEffect, useState } from "react";

const ScoreModal = ({ score, onRestart }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 20);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center`}>
      <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`} />

      <div
        className={`relative mx-4 w-full max-w-md rounded-2xl border border-[color:var(--glass-border)] bg-[color:var(--glass)] p-6 shadow-2xl transition-all duration-300 ${open ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2'}`}
      >
        <div className="mb-4 text-center">
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-[#28ff5e] to-[#19fff3] bg-clip-text text-transparent">
            Quiz Finished!
          </h2>
          <p className="mt-2 text-[#8b9eba]">Here is your final score</p>
        </div>

        <div className="mb-6 flex items-center justify-center">
          <div className="relative grid place-items-center">
            <div className="h-24 w-24 rounded-full border-4 border-[#00efc5] animate-pulse" />
            <div className="absolute inset-0 grid place-items-center">
              <span className="text-3xl font-extrabold bg-gradient-to-r from-[#28ff5e] to-[#19fff3] bg-clip-text text-transparent">
                {score}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-3">
          <button
            onClick={onRestart}
            className="py-2 px-5 rounded-xl font-semibold text-[#111424] bg-gradient-to-r from-[#28ff5e] to-[#19fff3] hover:from-[#19fff3] hover:to-[#28ff5e] transition-colors"
          >
            Restart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScoreModal;
