import React, { useEffect, useState } from "react";
import { transformQuizData, shuffleArray,manipulateScore,waitAndExecute, scheduleScoreThenNext } from "../../utils.js";
import ScoreModal from "./ScoreModal.jsx";
import FloatingBackground from "./FloatingBackground.jsx";

const QuestionBoard = ({ category, amount, difficulty, mode, onExit }) => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [score, _setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const v = Number(localStorage.getItem('quiz_high_score') || 0);
    return Number.isFinite(v) ? v : 0;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestion] = useState([]);
  const [isOffline, setIsOffline] = useState(false);
  const [timer, setTimer] = useState(30);
  const [timerActive, setTimerActive] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [sprintTimeLeft, setSprintTimeLeft] = useState(60);
  const [lives, setLives] = useState(3);

  // Timer effect
  useEffect(() => {
    if (!timerActive || isLoading || isOffline) return;
    if (timer === 0) {
      setTimerActive(false);
      if (mode === 'endless') {
        setLives((prev) => (prev > 0 ? prev - 1 : 0));
      }
      setQuestionNumber((prev) => prev + 1);
      // Optionally: auto-next or show timeout message
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, timerActive, isLoading, isOffline, mode]);

  // Reset timer on question change
  useEffect(() => {
    setTimer(30);
    setTimerActive(true);
    setIsDisabled(false);
    setSelectedAnswer(null);
  }, [questionNumber, isLoading, isOffline]);

  useEffect(() => {
    if (mode !== 'sprint' || isLoading || isOffline) return;
    if (sprintTimeLeft === 0) return;
    const id = setInterval(() => {
      setSprintTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [mode, sprintTimeLeft, isLoading, isOffline]);

  // Persist high score only when the game is over (final score)
  useEffect(() => {
    const isGameOver = (
      (mode !== 'sprint' && mode !== 'endless' && questionNumber >= (amount || 15)) ||
      (mode === 'sprint' && sprintTimeLeft <= 0) ||
      (mode === 'endless' && lives <= 0)
    );
    if (isGameOver && score > highScore) {
      setHighScore(score);
      localStorage.setItem('quiz_high_score', String(score));
    }
  }, [mode, questionNumber, amount, sprintTimeLeft, lives, score, highScore]);

  let url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`;
  console.log(category, difficulty, amount, url);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setIsOffline(false);
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        const transformedData = transformQuizData(data, shuffleArray);
        setQuestion(transformedData);
        console.log(transformedData);
      } catch (error) {
        if (!window.navigator.onLine) {
          setIsOffline(true);
        }
        console.error("Error fetching questions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    window.addEventListener("offline", () => setIsOffline(true));
    window.addEventListener("online", () => setIsOffline(false));
    return () => {
      window.removeEventListener("offline", () => setIsOffline(true));
      window.removeEventListener("online", () => setIsOffline(false));
    };
  }, [url]);

  const handleClick = () => {
    setSelectedAnswer(null);
    setQuestionNumber((prev) => prev + 1);
  };

  const handleStop = () => {
    setTimerActive(false);
    setIsDisabled(true);
    if (mode === 'sprint') {
      setSprintTimeLeft(0);
    } else if (mode === 'endless') {
      setLives(0);
    } else {
      setQuestionNumber(amount || 15);
    }
  };

  const handleRestart = () => {
    if (onExit) {
      onExit();
      return;
    }
    setQuestionNumber(0);
    _setScore(0);
    setSelectedAnswer(null);
    setTimer(30);
    setTimerActive(true);
  };

  return (
    <div className="container-responsive relative overflow-hidden mt-12 p-5 bg-[color:var(--glass)] border border-[color:var(--glass-border)] rounded-2xl">
      <FloatingBackground />
      <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-2 rounded-2xl text-[1rem] font-bold bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--accent)] bg-clip-text text-transparent 2xl:text-[2.2rem] xl:text-[1.4rem]">
          Score: {score}
        </span>
        <span className="px-3 py-2 rounded-2xl text-[1rem] font-bold bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--accent)] bg-clip-text text-transparent 2xl:text-[2.2rem] xl:text-[1.4rem]">
          High: {highScore}
        </span>
        <div className="flex items-center gap-3 text-sm text-[color:var(--muted)] 2xl:text-[2rem] xl:text-[1.4rem]">
          <div>Question {questionNumber + 1}</div>
          {mode === 'sprint' && (
            <div className="px-3 py-1 rounded-full border border-[color:var(--glass-border)]">
              {sprintTimeLeft}s
            </div>
          )}
          {mode === 'endless' && (
            <div className="px-3 py-1 rounded-full border border-[color:var(--glass-border)]">
              Lives: {lives}
            </div>
          )}
        </div>
      </div>
      {isOffline ? (
        <div className="flex flex-col items-center justify-center py-10">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse
              cx="60"
              cy="100"
              rx="40"
              ry="10"
              fill="#7c5cff"
              opacity="0.2"
            />
            <path
              d="M30 80 Q60 40 90 80"
              stroke="#00ffd1"
              strokeWidth="4"
              fill="none"
            />
            <circle
              cx="60"
              cy="60"
              r="18"
              fill="#7c5cff"
              stroke="#00ffd1"
              strokeWidth="3"
            />
            <rect x="52" y="55" width="16" height="6" rx="3" fill="#fff" />
            <rect x="56" y="65" width="8" height="4" rx="2" fill="#fff" />
            <text
              x="60"
              y="115"
              textAnchor="middle"
              fill="#7c5cff"
              fontSize="14"
            >
              No Internet
            </text>
          </svg>
          <h1 className="text-[1.5rem] font-bold mb-2 neon-text">
            Oops! You're offline
          </h1>
          <p className="text-[1rem] text-[var(--muted)] mb-2">
            Check your connection and try again.
          </p>
        </div>
      ) : isLoading ? (
        <div className="flex flex-col items-center justify-center py-10">
          <div
            className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4"
            style={{ borderColor: "var(--primary)" }}
          ></div>
          <h1 className="text-[1.6rem] font-bold mb-2 neon-text">
            Loading Question...
          </h1>
        </div>
      ) : (
        <>
          {/* Timer UI */}
          <div className="flex items-center justify-center mb-4">
            <div
              className={`relative w-16 h-16 flex items-center justify-center`}
            >
              <div
                className={`absolute inset-0 rounded-full border-4 ${
                  timer <= 15
                    ? "border-red-500 animate-pulse-fast"
                    : "border-[#00efc5] animate-pulse"
                }`}
              ></div>
              <span
                className={`text-[1.7rem] font-bold z-10 ${
                  timer <= 15
                    ? "text-red-500"
                    : "bg-gradient-to-r from-[#28ff5e] to-[#19fff3] bg-clip-text text-transparent"
                }`}
              >
                {timer}s
              </span>
            </div>
          </div>
          <h2 className="mt-2 mb-3 text-[1.3rem] font-bold bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--accent)] bg-clip-text text-transparent 2xl:text-[2.4rem]">
            {questions[questionNumber]?.category}
          </h2>
          <p className="text-[1rem] mb-6 text-[color:var(--muted)] leading-relaxed 2xl:text-[1.3rem]">
            {questions[questionNumber]?.question}
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {/*here we are mapping onto the answer array */}
            {questions[questionNumber]?.answers?.map((answer, index) => (
              <button
                key={index}
                onClick={() => {
                  if (isDisabled) return;
                  setSelectedAnswer(answer);
                  setTimerActive(false);
                  if (mode === 'endless' && !answer.isCorrect) {
                    setLives((prev) => (prev > 0 ? prev - 1 : 0));
                  }
                  scheduleScoreThenNext(timer, score, _setScore, answer, setQuestionNumber);
                  setIsDisabled(true);
                }}
                className={`text-left
                  relative
                  p-4 rounded-xl
                  flex items-center
                  gap-4
                  transform hover:scale-[1.02]
                  transition-all duration-300
                  overflow-hidden
                  group
                  2xl:text-[1.5rem]
                  ${
                    selectedAnswer && answer === selectedAnswer
                      ? selectedAnswer.isCorrect
                        ? "bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--accent)] text-[#111424] shadow-lg shadow-[color:var(--primary)]/20"
                        : "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/20"
                      : selectedAnswer && !selectedAnswer.isCorrect && answer.isCorrect
                        ? "bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--accent)] text-[#111424] shadow-lg shadow-[color:var(--primary)]/20"
                        : "bg-[color:var(--panel)] hover:bg-[color:var(--glass)] border border-[color:var(--glass-border)] hover:border-[color:var(--accent)]"
                  }
                  `}
                disabled={isDisabled}
              >
                {/* Animated dot indicator */}
                <div
                  className={`
                  w-4 h-4 rounded-full
                  transition-all duration-300
                  flex items-center justify-center
                  ${
                    selectedAnswer && answer === selectedAnswer
                      ? selectedAnswer.isCorrect
                        ? "bg-[#111424]"
                        : "bg-white"
                      : selectedAnswer && !selectedAnswer.isCorrect && answer.isCorrect
                        ? "bg-[#111424]"
                        : "bg-[color:var(--accent)]/30 group-hover:bg-[color:var(--accent)]"
                  }
                `}
                >
                  {/* Inner dot for selected state */}
                  <div
                    className={`
                    w-2 h-2 rounded-full
                    transform scale-0 group-hover:scale-100
                    transition-transform duration-300
                    ${
                      selectedAnswer && (answer === selectedAnswer || (!selectedAnswer.isCorrect && answer.isCorrect))
                        ? "scale-100"
                        : ""
                    }
                    ${
                      selectedAnswer && answer === selectedAnswer
                        ? selectedAnswer.isCorrect
                          ? "bg-[#28ff5e]"
                          : "bg-red-500"
                        : selectedAnswer && !selectedAnswer.isCorrect && answer.isCorrect
                          ? "bg-[#28ff5e]"
                          : "bg-[#111424]"
                    }
                  `}
                  />
                </div>

                {/* Answer text */}
                <span
                  className={`
                  relative z-10 font-medium
                  ${
                    selectedAnswer && answer === selectedAnswer
                      ? selectedAnswer.isCorrect
                        ? "text-[#111424]"
                        : "text-white"
                      : selectedAnswer && !selectedAnswer.isCorrect && answer.isCorrect
                        ? "text-[#111424]"
                        : "text-[color:var(--muted)] group-hover:text-[color:var(--accent)]"
                  }
                `}
                >
                  {answer.text}
                </span>

                {/* Hover effect background */}
                <div
                  className={`
                  absolute inset-0 opacity-0 group-hover:opacity-10
                  transition-opacity duration-300
                  bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--accent)]
                `}
                />
              </button>
            ))}
          </div>
          <div className="flex justify-between items-center text-[0.9rem] font-bold mt-8">
            <button
              className="py-2 px-6 rounded-xl border border-[color:var(--glass-border)] text-[color:var(--muted)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] transition-colors 2xl:py-6 2xl:px-20 2xl:text-[1rem]"
              onClick={handleStop}
            >
              Stop Game
            </button>
            <button
              className="py-2 px-6 bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--accent)] text-[#111424] font-bold rounded-xl hover:from-[color:var(--accent)] hover:to-[color:var(--primary)] transition-all duration-300 2xl:py-6 2xl:px-20 2xl:text-[1rem]"
              onClick={handleClick}
            >
              Next
            </button>
          </div>
        </>
      )}
      {(
        (mode !== 'sprint' && mode !== 'endless' && questionNumber >= (amount || 15)) ||
        (mode === 'sprint' && sprintTimeLeft <= 0) ||
        (mode === 'endless' && lives <= 0)
      ) && (
        <ScoreModal score={score} onRestart={handleRestart} />
      )}
    </div>
  );
};

export default QuestionBoard;
