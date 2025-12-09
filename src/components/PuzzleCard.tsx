import { ReactNode } from "react";
import { motion } from "framer-motion";

interface PuzzleCardProps {
  title: string;
  children: ReactNode;
}

const PuzzleCard = ({ title, children }: PuzzleCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="border-b border-border pb-4">
        <h2 className="text-sm text-muted-foreground mb-1">// DESAFÍO</h2>
        <h3 className="text-lg text-foreground text-glow font-semibold">
          {title}
        </h3>
      </div>
      <div className="space-y-4">{children}</div>
    </motion.div>
  );
};

export default PuzzleCard;
