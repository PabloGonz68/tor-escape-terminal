import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Code, Heart } from "lucide-react";
import PuzzleCard from "../PuzzleCard";
import TerminalButton from "../TerminalButton";

interface Level10TorProjectProps {
  onComplete: (success: boolean) => void;
}

const options = [
  { id: "A", text: "2002 - Primera versión pública con 3 nodos", correct: true },
  { id: "B", text: "1995 - Proyecto inicial de la Marina de EE.UU.", correct: false },
  { id: "C", text: "2010 - Lanzamiento de Tor Browser", correct: false },
  { id: "D", text: "1998 - Desarrollo inicial en el MIT", correct: false },
  { id: "E", text: "2008 - Separación del proyecto de la Marina", correct: false },
  { id: "F", text: "2015 - Implementación de onion v3", correct: false },
];

const Level10TorProject = ({ onComplete }: Level10TorProjectProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!selected) return;
    const option = options.find((o) => o.id === selected);
    onComplete(option?.correct || false);
  };

  return (
    <PuzzleCard title="Historia del Proyecto Tor">
      <div className="space-y-6">
        <div className="flex items-start gap-3 p-4 bg-secondary/50 border border-border rounded">
          <Users className="w-5 h-5 text-terminal-purple mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-foreground text-sm">
              ¿En qué año y contexto se lanzó la primera versión pública del{" "}
              <span className="text-terminal-purple font-bold">Proyecto Tor</span>?
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Incluye detalles técnicos del lanzamiento inicial
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
          // Pista: Tor comenzó como un proyecto de la Marina de EE.UU.
        </p>
      </div>
    </PuzzleCard>
  );
};

export default Level10TorProject;