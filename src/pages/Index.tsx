import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import TerminalWindow from "@/components/TerminalWindow";
import ProgressBar from "@/components/ProgressBar";
import FeedbackMessage from "@/components/FeedbackMessage";
import StartScreen from "@/components/levels/StartScreen";
import Level1Quiz from "@/components/levels/Level1Quiz";
import Level2Nodes from "@/components/levels/Level2Nodes";
import Level3Crypto from "@/components/levels/Level3Crypto";
import Level4Onion from "@/components/levels/Level4Onion";
import Level5TorBrowser from "@/components/levels/Level5TorBrowser";
import Level6Relays from "@/components/levels/Level6Relays";
import Level7HiddenServices from "@/components/levels/Level7HiddenServices";
import Level8Attacks from "@/components/levels/Level8Attacks";
import Level9SafeUsage from "@/components/levels/Level9SafeUsage";
import Level10TorProject from "@/components/levels/Level10TorProject";
import Level11Configuration from "@/components/levels/Level11Configuration";
import Level12OnionVersions from "@/components/levels/Level12OnionVersions";
import Level13Bridges from "@/components/levels/Level13Bridges";
import Level14Platforms from "@/components/levels/Level14Platforms";
import Level15Metrics from "@/components/levels/Level15Metrics";
import Level16ControlPort from "@/components/levels/Level16ControlPort";
import Level17Applications from "@/components/levels/Level17Applications";
import Level18PrivacyVsAnonimity from "@/components/levels/Level18PrivacyVsAnonimity";
import Level19TorVPN from "@/components/levels/Level19TorVPN";
import Level20Corporate from "@/components/levels/Level20Corporate";
import Level21Performance from "@/components/levels/Level21Performance";
import Level22Updates from "@/components/levels/Level22Updates";
import Level23Community from "@/components/levels/Level23Community";
import Level24Funding from "@/components/levels/Level24Funding";
import Level25TorVsOthers from "@/components/levels/Level25TorVsOthers";
import Level26Practical from "@/components/levels/Level26Practical";
import FinalScreen from "@/components/levels/FinalScreen";

type GameState = "start" | "level1" | "level2" | "level3" | "level4" | "level5" | "level6" | "level7" | "level8" | "level9" | "level10" | "level11" | "level12" | "level13" | "level14" | "level15" | "level16" | "level17" | "level18" | "level19" | "level20" | "level21" | "level22" | "level23" | "level24" | "level25" | "level26" | "final";
type FeedbackType = "success" | "error" | null;

const TOTAL_LEVELS = 26;

const Index = () => {
  const [gameState, setGameState] = useState<GameState>("start");
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [currentLevel, setCurrentLevel] = useState(1);
  const gameStateRef = useRef<GameState>("start");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey) {
        event.preventDefault();
        
        if (event.key === '0') {
          // Go to start
          setGameState("start");
          setCurrentLevel(0);
          setFeedback(null);
        } else if (event.key === 'i' || event.key === 'I') {
          // Cycle through levels: next level, or back to start if at end
          const currentLevelNum = getCurrentLevelNumber(gameStateRef.current);
          if (currentLevelNum === 0) {
            // At start, go to level 1
            setGameState("level1");
            setCurrentLevel(1);
          } else if (currentLevelNum < 26) {
            // Go to next level
            const nextLevel = currentLevelNum + 1;
            setGameState(`level${nextLevel}` as GameState);
            setCurrentLevel(nextLevel);
          } else {
            // At level 26 or final, go back to start
            setGameState("start");
            setCurrentLevel(0);
          }
          setFeedback(null);
        } else if (event.key === 'ArrowRight') {
          // Next level
          const currentLevelNum = getCurrentLevelNumber(gameStateRef.current);
          if (currentLevelNum < 26) {
            const nextLevel = currentLevelNum + 1;
            setGameState(`level${nextLevel}` as GameState);
            setCurrentLevel(nextLevel);
            setFeedback(null);
          }
        } else if (event.key === 'ArrowLeft') {
          // Previous level
          const currentLevelNum = getCurrentLevelNumber(gameStateRef.current);
          if (currentLevelNum > 1) {
            const prevLevel = currentLevelNum - 1;
            setGameState(`level${prevLevel}` as GameState);
            setCurrentLevel(prevLevel);
            setFeedback(null);
          } else if (currentLevelNum === 1) {
            setGameState("start");
            setCurrentLevel(0);
            setFeedback(null);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

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

  const getCurrentLevelNumber = (state: GameState = gameState) => {
    switch (state) {
      case "start":
        return 0;
      case "level1":
        return 1;
      case "level2":
        return 2;
      case "level3":
        return 3;
      case "level4":
        return 4;
      case "level5":
        return 5;
      case "level6":
        return 6;
      case "level7":
        return 7;
      case "level8":
        return 8;
      case "level9":
        return 9;
      case "level10":
        return 10;
      case "level11":
        return 11;
      case "level12":
        return 12;
      case "level13":
        return 13;
      case "level14":
        return 14;
      case "level15":
        return 15;
      case "level16":
        return 16;
      case "level17":
        return 17;
      case "level18":
        return 18;
      case "level19":
        return 19;
      case "level20":
        return 20;
      case "level21":
        return 21;
      case "level22":
        return 22;
      case "level23":
        return 23;
      case "level24":
        return 24;
      case "level25":
        return 25;
      case "level26":
        return 26;
      case "final":
        return 27;
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
            onComplete={(success) => handleLevelComplete(success, "level3")}
          />
        );
      case "level2":
        return (
          <Level3Crypto
            onComplete={(success) => handleLevelComplete(success, "level4")}
          />
        );
      case "level3":
        return (
          <Level2Nodes
            onComplete={(success) => handleLevelComplete(success, "level5")}
          />
        );
      case "level4":
        return (
          <Level4Onion
            onComplete={(success) => handleLevelComplete(success, "level6")}
          />
        );
      case "level5":
        return (
          <Level6Relays
            onComplete={(success) => handleLevelComplete(success, "level7")}
          />
        );
      case "level6":
        return (
          <Level5TorBrowser
            onComplete={(success) => handleLevelComplete(success, "level8")}
          />
        );
      case "level7":
        return (
          <Level12OnionVersions
            onComplete={(success) => handleLevelComplete(success, "level9")}
          />
        );
      case "level8":
        return (
          <Level7HiddenServices
            onComplete={(success) => handleLevelComplete(success, "level10")}
          />
        );
      case "level9":
        return (
          <Level8Attacks
            onComplete={(success) => handleLevelComplete(success, "level11")}
          />
        );
      case "level10":
        return (
          <Level9SafeUsage
            onComplete={(success) => handleLevelComplete(success, "level12")}
          />
        );
      case "level11":
        return (
          <Level11Configuration
            onComplete={(success) => handleLevelComplete(success, "level13")}
          />
        );
      case "level12":
        return (
          <Level10TorProject
            onComplete={(success) => handleLevelComplete(success, "level14")}
          />
        );
      case "level13":
        return (
          <Level13Bridges
            onComplete={(success) => handleLevelComplete(success, "level15")}
          />
        );
      case "level14":
        return (
          <Level16ControlPort
            onComplete={(success) => handleLevelComplete(success, "level16")}
          />
        );
      case "level15":
        return (
          <Level14Platforms
            onComplete={(success) => handleLevelComplete(success, "level17")}
          />
        );
      case "level16":
        return (
          <Level15Metrics
            onComplete={(success) => handleLevelComplete(success, "level18")}
          />
        );
      case "level17":
        return (
          <Level17Applications
            onComplete={(success) => handleLevelComplete(success, "level19")}
          />
        );
      case "level18":
        return (
          <Level18PrivacyVsAnonimity
            onComplete={(success) => handleLevelComplete(success, "level20")}
          />
        );
      case "level19":
        return (
          <Level19TorVPN
            onComplete={(success) => handleLevelComplete(success, "level21")}
          />
        );
      case "level20":
        return (
          <Level20Corporate
            onComplete={(success) => handleLevelComplete(success, "level22")}
          />
        );
      case "level21":
        return (
          <Level21Performance
            onComplete={(success) => handleLevelComplete(success, "level23")}
          />
        );
      case "level22":
        return (
          <Level22Updates
            onComplete={(success) => handleLevelComplete(success, "level24")}
          />
        );
      case "level23":
        return (
          <Level23Community
            onComplete={(success) => handleLevelComplete(success, "level25")}
          />
        );
      case "level24":
        return (
          <Level24Funding
            onComplete={(success) => handleLevelComplete(success, "level26")}
          />
        );
      case "level25":
        return (
          <Level25TorVsOthers
            onComplete={(success) => handleLevelComplete(success, "level26")}
          />
        );
      case "level26":
        return (
          <Level26Practical
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
