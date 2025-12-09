import { motion } from "framer-motion";

interface ProgressBarProps {
  currentLevel: number;
  totalLevels: number;
}

const ProgressBar = ({ currentLevel, totalLevels }: ProgressBarProps) => {
  const progress = ((currentLevel - 1) / totalLevels) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-muted-foreground font-mono">
          [NIVEL {currentLevel}/{totalLevels}]
        </span>
        <span className="text-xs text-muted-foreground font-mono">
          {Math.round(progress)}% COMPLETADO
        </span>
      </div>
      <div className="h-2 bg-secondary rounded-sm overflow-hidden border border-border">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full bg-terminal-purple relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-terminal-green/30" />
        </motion.div>
      </div>
      <div className="flex justify-between mt-1">
        {Array.from({ length: totalLevels }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors ${
              i < currentLevel - 1
                ? "bg-terminal-green"
                : i === currentLevel - 1
                ? "bg-terminal-purple pulse-glow"
                : "bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
