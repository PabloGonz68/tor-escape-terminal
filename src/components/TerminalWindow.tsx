import { ReactNode } from "react";
import { motion } from "framer-motion";

interface TerminalWindowProps {
  children: ReactNode;
  title?: string;
}

const TerminalWindow = ({ children, title = "tor_access_protocol.sh" }: TerminalWindowProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="border border-border rounded-sm overflow-hidden box-glow">
        {/* Terminal Header */}
        <div className="bg-secondary px-4 py-2 flex items-center gap-2 border-b border-border">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-terminal-red opacity-80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80" />
            <div className="w-3 h-3 rounded-full bg-terminal-green opacity-80" />
          </div>
          <span className="text-muted-foreground text-xs ml-2 font-mono">
            {title}
          </span>
        </div>

        {/* Terminal Body */}
        <div className="bg-background p-6 min-h-[400px] relative scanlines">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default TerminalWindow;
