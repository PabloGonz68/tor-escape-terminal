import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Shield, RefreshCw } from "lucide-react";
import PuzzleCard from "../PuzzleCard";
import TerminalButton from "../TerminalButton";

interface Level22UpdatesProps {
  onComplete: (success: boolean) => void;
}

const Level22Updates = ({ onComplete }: Level22UpdatesProps) => {
  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {
    const normalized = answer.toLowerCase().trim();
    onComplete(normalized === "actualizar");
  };

  return (
    <PuzzleCard title="Actualizaciones de Seguridad en Tor">
      <div className="space-y-6">
        <div className="flex items-start gap-3 p-4 bg-terminal-red/10 border border-terminal-red/30 rounded">
          <AlertTriangle className="w-5 h-5 text-terminal-red flex-shrink-0" />
          <p className="text-sm text-foreground">
            Se ha descubierto una vulnerabilidad crítica en Tor. ¿Qué debes hacer?
          </p>
        </div>

        <div className="p-4 bg-secondary/30 border border-border rounded">
          <p className="text-sm text-muted-foreground mb-3">
            // Vulnerabilidades recientes corregidas:
          </p>
          <div className="text-xs text-terminal-green font-mono space-y-1">
            <p>• Heartbleed (OpenSSL) - 2014</p>
            <p>• Circuit fingerprinting - 2020</p>
            <p>• Onion service guard discovery - 2021</p>
            <p>• Guard selection bias - 2022</p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">
            {"> Acción inmediata:"}
          </label>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="¿Qué hacer ante una vulnerabilidad?"
            className="w-full bg-background border border-border px-4 py-3 text-foreground text-sm rounded focus:outline-none focus:border-terminal-green focus:ring-1 focus:ring-terminal-green"
          />
        </div>

        <TerminalButton onClick={handleSubmit} variant="primary" disabled={!answer}>
          {"> EJECUTAR ACCIÓN"}
        </TerminalButton>

        <div className="p-3 bg-terminal-green/10 border border-terminal-green/30 rounded text-xs">
          <p className="text-muted-foreground">
            <span className="text-terminal-green">CONSEJO:</span> Las actualizaciones de Tor son críticas.
            El proyecto libera parches rápidamente para vulnerabilidades.
          </p>
        </div>
      </div>
    </PuzzleCard>
  );
};

export default Level22Updates;