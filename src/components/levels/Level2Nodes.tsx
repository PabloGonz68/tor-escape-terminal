import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Server, Globe } from "lucide-react";
import PuzzleCard from "../PuzzleCard";
import TerminalButton from "../TerminalButton";

interface Level2NodesProps {
  onComplete: (success: boolean) => void;
}

const Level2Nodes = ({ onComplete }: Level2NodesProps) => {
  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {
    onComplete(answer === "3");
  };

  return (
    <PuzzleCard title="Lógica de Enrutamiento Onion">
      <div className="space-y-6">
        <div className="p-4 bg-secondary/50 border border-border rounded space-y-3">
          <p className="text-sm text-foreground">
            Para mantener el anonimato, ¿cuántos nodos mínimos necesita saltar tu conexión?
          </p>
          <div className="flex items-center gap-3">
            <span className="text-terminal-green">{">"}</span>
            <input
              type="number"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Ingresa un número"
              className="bg-background border border-border px-3 py-2 text-foreground text-sm rounded focus:outline-none focus:border-terminal-green focus:ring-1 focus:ring-terminal-green w-40"
            />
          </div>
        </div>

        <TerminalButton onClick={handleSubmit} variant="primary" disabled={!answer}>
          {"> VERIFICAR RESPUESTA"}
        </TerminalButton>

        <p className="text-xs text-muted-foreground">
          // Pista: Cuenta los nodos en el diagrama
        </p>
      </div>
    </PuzzleCard>
  );
};

export default Level2Nodes;
