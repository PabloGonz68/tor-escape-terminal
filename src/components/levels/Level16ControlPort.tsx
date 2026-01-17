import { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Code, Settings } from "lucide-react";
import PuzzleCard from "../PuzzleCard";
import TerminalButton from "../TerminalButton";

interface Level16ControlPortProps {
  onComplete: (success: boolean) => void;
}

const Level16ControlPort = ({ onComplete }: Level16ControlPortProps) => {
  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {
    const normalized = answer.toLowerCase().trim();
    onComplete(normalized === "controlport 9051" || normalized === "controlport 9051 cookieauthentication 1");
  };

  return (
    <PuzzleCard title="Puerto de Control de Tor">
      <div className="space-y-6">
        <div className="flex items-start gap-3 p-4 bg-secondary/50 border border-border rounded">
          <Terminal className="w-5 h-5 text-terminal-purple mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-foreground text-sm">
              ¿Cuál es la configuración completa para habilitar el{" "}
              <span className="text-terminal-purple font-bold">Control Port</span> con autenticación por cookie?
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Incluye puerto, método de autenticación y archivo de cookie
            </p>
          </div>
        </div>

        <div className="p-4 bg-secondary/30 border border-border rounded">
          <p className="text-sm text-muted-foreground mb-3">
            // Ejemplo de uso del Control Port:
          </p>
          <pre className="text-xs text-terminal-green font-mono">
{`AUTHENTICATE
SIGNAL NEWNYM
GETINFO circuit-status`}
          </pre>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">
            {"> Puerto del Control Port:"}
          </label>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="ControlPort XXXX XXXX 1"
            className="w-full bg-background border border-border px-4 py-3 text-foreground text-sm rounded focus:outline-none focus:border-terminal-green focus:ring-1 focus:ring-terminal-green font-mono"
          />
        </div>

        <TerminalButton onClick={handleSubmit} variant="primary" disabled={!answer}>
          {"> VERIFICAR PUERTO"}
        </TerminalButton>
      </div>
    </PuzzleCard>
  );
};

export default Level16ControlPort;