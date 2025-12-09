import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import TerminalWindow from "@/components/TerminalWindow";
import ProgressBar from "@/components/ProgressBar";
import FeedbackMessage from "@/components/FeedbackMessage";
import StartScreen from "@/components/levels/StartScreen";
import Level1Quiz from "@/components/levels/Level1Quiz";
import Level2Nodes from "@/components/levels/Level2Nodes";
import Level3Crypto from "@/components/levels/Level3Crypto";
import Level4Onion from "@/components/levels/Level4Onion";
import FinalScreen from "@/components/levels/FinalScreen";

type GameState = "start" | "level1" | "level2" | "level3" | "level4" | "final";
type FeedbackType = "success" | "error" | null;

const TOTAL_LEVELS = 4;

const Index = () => {
  const [gameState, setGameState] = useState<GameState>("start");
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [currentLevel, setCurrentLevel] = useState(1);

  const handleStart = () => {
    setGameState("level1");
    setCurrentLevel(1);
  };

  const handleLevelComplete = (success: boolean, nextState: GameState) => {
    setFeedback(success ? "success" : "error");

    if (success) {
      setTimeout(() => {
        setFeedback(null);
        setGameState(nextState);
        if (nextState !== "final") {
          setCurrentLevel((prev) => prev + 1);
        }
      }, 2000);
    } else {
      setTimeout(() => {
        setFeedback(null);
      }, 1500);
    }
  };

  const handleRestart = () => {
    setGameState("start");
    setCurrentLevel(1);
  };

  const getCurrentLevelNumber = () => {
    switch (gameState) {
      case "level1":
        return 1;
      case "level2":
        return 2;
      case "level3":
        return 3;
      case "level4":
        return 4;
      case "final":
        return 5;
      default:
        return 1;
    }
  };

  const renderContent = () => {
    switch (gameState) {
      case "start":
        return <StartScreen onStart={handleStart} />;
      case "level1":
        return (
          <Level1Quiz
            onComplete={(success) => handleLevelComplete(success, "level2")}
          />
        );
      case "level2":
        return (
          <Level2Nodes
            onComplete={(success) => handleLevelComplete(success, "level3")}
          />
        );
      case "level3":
        return (
          <Level3Crypto
            onComplete={(success) => handleLevelComplete(success, "level4")}
          />
        );
      case "level4":
        return (
          <Level4Onion
            onComplete={(success) => handleLevelComplete(success, "final")}
          />
        );
      case "final":
        return <FinalScreen onRestart={handleRestart} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background Grid Effect */}
      <div
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--terminal-green)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--terminal-green)) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-xs text-muted-foreground tracking-widest mb-2">
            {"[ SISTEMA DE ENTRENAMIENTO ]"}
          </h1>
          <p className="text-terminal-green text-glow text-sm">
            PROTOCOLO DE ACCESO A RED TOR
          </p>
        </header>

        {/* Progress Bar - only show during levels */}
        {gameState !== "start" && gameState !== "final" && (
          <ProgressBar
            currentLevel={getCurrentLevelNumber()}
            totalLevels={TOTAL_LEVELS}
          />
        )}

        {/* Terminal Window */}
        <TerminalWindow
          title={
            gameState === "start"
              ? "tor_init.sh"
              : gameState === "final"
              ? "mission_complete.log"
              : `nivel_${getCurrentLevelNumber()}.sh`
          }
        >
          <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
        </TerminalWindow>

        {/* Footer */}
        <footer className="text-center mt-8 text-xs text-muted-foreground">
          <p>// Escape Room Educativo - Privacidad y Anonimato</p>
          <p className="mt-1">Tor Project Educational Workshop</p>
        </footer>
      </div>

      {/* Feedback Overlay */}
      <AnimatePresence>
        {feedback && <FeedbackMessage type={feedback} />}
      </AnimatePresence>
    </div>
  );
};

export default Index;
