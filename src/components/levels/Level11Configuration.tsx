import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Shield, Globe } from "lucide-react";
import PuzzleCard from "../PuzzleCard";
import TerminalButton from "../TerminalButton";

interface Level11ConfigurationProps {
  onComplete: (success: boolean) => void;
}

const options = [
  { id: "A", text: "ServerTransportPlugin obfs4 exec /usr/bin/obfs4proxy", correct: true },
  { id: "B", text: "ServerTransportPlugin obfs4 exec /usr/bin/meek", correct: false },
  { id: "C", text: "ServerTransportPlugin obfs4 exec /usr/bin/fte", correct: false },
];

const Level11Configuration = ({ onComplete }: Level11ConfigurationProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!selected) return;
    const option = options.find((o) => o.id === selected);
    onComplete(option?.correct || false);
  };

  return (
    <PuzzleCard title="Configuración de Tor">
      <div className="space-y-6">
        <div className="flex items-start gap-3 p-4 bg-secondary/50 border border-border rounded">
          <Settings className="w-5 h-5 text-terminal-purple mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-foreground text-sm">
              ¿Cuál es la configuración completa para convertir un relay en un{" "}
              <span className="text-terminal-purple font-bold">bridge obfs4</span>?
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Incluye ServerTransportPlugin y BridgeRelay
            </p>
          </div>
        </div>

        <div className="p-4 bg-secondary/30 border border-border rounded">
          <p className="text-sm text-muted-foreground mb-3">
            // Ejemplo de configuración básica:
          </p>
          <pre className="text-xs text-terminal-green font-mono">
{`# Archivo de configuración Tor
SocksPort 9050
ControlPort 9051
CookieAuthentication 1
ExitPolicy reject *:*

# Configuración de bridges
UseBridges 1
Bridge obfs4...`}
          </pre>
        </div>

        {/* Answer Options */}
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
                  <span className="font-mono text-sm">{option.text}</span>
                </span>
              </TerminalButton>
            </motion.div>
          ))}
        </div>

        <TerminalButton onClick={handleSubmit} variant="primary" disabled={!selected}>
          {"> VERIFICAR CONFIGURACIÓN"}
        </TerminalButton>

        <p className="text-xs text-muted-foreground">
          // Pista: ServerTransportPlugin obfs4 exec /usr/bin/obfs4proxy
        </p>
      </div>
    </PuzzleCard>
  );
};

export default Level11Configuration;