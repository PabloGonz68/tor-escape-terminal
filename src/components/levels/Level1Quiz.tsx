import { useState } from "react";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import PuzzleCard from "../PuzzleCard";
import TerminalButton from "../TerminalButton";

interface Level1QuizProps {
  onComplete: (success: boolean) => void;
}

const options = [
  { id: "A", text: "The Onion Router", correct: true },
  { id: "B", text: "Total Online Routing", correct: false },
  { id: "C", text: "The Only Route", correct: false },
];

const Level1Quiz = ({ onComplete }: Level1QuizProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!selected) return;
    const option = options.find((o) => o.id === selected);
    onComplete(option?.correct || false);
  };

  return (
    <PuzzleCard title="Conceptos Básicos de TOR">
      <div className="space-y-6">
        <div className="flex items-start gap-3 p-4 bg-secondary/50 border border-border rounded">
          <HelpCircle className="w-5 h-5 text-terminal-purple mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-foreground text-sm">
              ¿Qué significa el acrónimo <span className="text-terminal-purple font-bold">TOR</span>?
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Selecciona la respuesta correcta
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {options.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <TerminalButton
                onClick={() => setSelected(option.id)}
                variant="option"
                selected={selected === option.id}
              >
                <span className="flex items-center gap-3 text-left w-full">
                  <span className="text-terminal-purple">[{option.id}]</span>
                  <span>{option.text}</span>
                </span>
              </TerminalButton>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="pt-4 border-t border-border"
        >
          <TerminalButton
            onClick={handleSubmit}
            variant="primary"
            disabled={!selected}
          >
            {"> VERIFICAR RESPUESTA"}
          </TerminalButton>
        </motion.div>

        <p className="text-xs text-muted-foreground">
          // Pista: Piensa en las capas de encriptación
        </p>
      </div>
    </PuzzleCard>
  );
};

export default Level1Quiz;
