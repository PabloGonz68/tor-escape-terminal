import { ReactNode } from "react";
import { motion } from "framer-motion";

interface TerminalButtonProps {
  children: ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary" | "option";
  selected?: boolean;
  disabled?: boolean;
}

const TerminalButton = ({
  children,
  onClick,
  variant = "primary",
  selected = false,
  disabled = false,
}: TerminalButtonProps) => {
  const baseClasses =
    "font-mono text-sm px-4 py-3 border transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-terminal-purple/20 border-terminal-purple text-terminal-purple hover:bg-terminal-purple hover:text-primary-foreground box-glow-purple",
    secondary:
      "bg-secondary border-border text-foreground hover:border-terminal-green hover:text-terminal-green",
    option: selected
      ? "bg-terminal-green/20 border-terminal-green text-terminal-green box-glow"
      : "bg-secondary border-border text-muted-foreground hover:border-terminal-green hover:text-foreground",
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]}`}
    >
      {children}
    </motion.button>
  );
};

export default TerminalButton;
