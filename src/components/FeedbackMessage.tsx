import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ShieldX } from "lucide-react";

interface FeedbackMessageProps {
  type: "success" | "error" | null;
  message?: string;
}

const FeedbackMessage = ({ type, message }: FeedbackMessageProps) => {
  if (!type) return null;

  const isSuccess = type === "success";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-0 flex items-center justify-center z-50 bg-background/90`}
      >
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="text-center space-y-4"
        >
          <motion.div
            animate={isSuccess ? { rotate: [0, 10, -10, 0] } : { x: [-5, 5, -5, 5, 0] }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            {isSuccess ? (
              <ShieldCheck className="w-20 h-20 text-terminal-green" />
            ) : (
              <ShieldX className="w-20 h-20 text-terminal-red" />
            )}
          </motion.div>
          <h2
            className={`text-2xl font-bold ${
              isSuccess ? "text-terminal-green text-glow" : "text-terminal-red text-glow-red"
            }`}
          >
            {isSuccess ? "ACCESO CONCEDIDO" : "ACCESO DENEGADO"}
          </h2>
          <p className="text-muted-foreground text-sm">
            {message || (isSuccess ? "Avanzando al siguiente nivel..." : "Intenta de nuevo")}
          </p>
          {isSuccess && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5 }}
              className="h-1 bg-terminal-green mx-auto max-w-xs"
            />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FeedbackMessage;
