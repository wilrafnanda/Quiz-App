import React, { useState, useRef, useEffect } from "react";
import LandingPage from "../Pages/LandingPage";
import QuestionLayout from "./components/QuestionLayout";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [amount, setAmount] = useState(15);
  const [category, setCategory] = useState(0);
  const [difficulty, setDifficulty] = useState("easy");
  const [view, setView] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [mode, setMode] = useState('classic'); // classic | sprint | daily | endless
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("/sounds/mad_vibe.m4a");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    const playAudio = () => {
      if (!isMuted) {
        audioRef.current.play();
      }
    };

    // Play audio when user interacts with the page
    document.addEventListener("click", playAudio, { once: true });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      document.removeEventListener("click", playAudio);
    };
  }, [isMuted]);

  useEffect(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          // Handle auto-play restrictions
        });
      }
    }
  }, [isMuted]);

  const toggleSound = () => {
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <>
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="fixed top-4 right-16 z-50 bg-[color:var(--glass)] p-2 rounded-full hover:bg-[color:var(--panel)] transition-colors"
        title={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
      >
        {theme === 'dark' ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v2m0 14v2m9-9h-2M5 12H3m14.95 6.364l-1.414-1.414M7.05 7.05 5.636 5.636m12.728 0-1.414 1.414M7.05 16.95l-1.414 1.414"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
            />
          </svg>
        )}
      </button>

      <button
        onClick={toggleSound}
        className="fixed top-4 right-4 z-50 bg-[color:var(--glass)] p-2 rounded-full hover:bg-[color:var(--panel)] transition-colors"
        title={isMuted ? "Unmute sound" : "Mute sound"}
      >
        {isMuted ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
          </svg>
        )}
      </button>

      {/* Main Content */}
      {view && (
        <QuestionLayout
          amount={amount}
          category={category}
          difficulty={difficulty}
          mode={mode}
          onExit={() => setView(false)}
        />
      )}

      {!view && (
        <LandingPage
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setCategory={setCategory}
          category={category}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          setView={setView}
          amount={amount}
          mode={mode}
          setMode={setMode}
        />
      )}
    </>
  );
}

export default App;
