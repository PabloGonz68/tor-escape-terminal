import { useState } from "react";
import { motion } from "framer-motion";
import { Route, Zap, Shield } from "lucide-react";
import PuzzleCard from "../PuzzleCard";
import TerminalButton from "../TerminalButton";

interface Level13BridgesProps {
  onComplete: (success: boolean) => void;
}

const transports = [
  {
    id: "obfs4",
    title: "obfs4",
    desc: "Transporte más avanzado y seguro",
    type: "Pluggable Transport",
    correct: true,
  },
  {
    id: "meek",
    title: "meek",
    desc: "Usa servicios CDN para ocultar tráfico",
    type: "Domain Fronting",
    correct: true,
  },
  {
    id: "fte",
    title: "FTE (Format-Transforming Encryption)",
    desc: "Transforma el tráfico en texto normal",
    type: "Experimental",
    correct: false,
  },
  {
    id: "scramblesuit",
    title: "ScrambleSuit",
    desc: "Ofusca paquetes de manera uniforme",
    type: "Obsoleto",
    correct: false,
  },
  {
    id: "vanilla",
    title: "Vanilla Tor",
    desc: "Tor sin ofuscación adicional",
    type: "Sin puente",
    correct: false,
  },
];

const Level13Bridges = ({ onComplete }: Level13BridgesProps) => {
  const [selectedTransports, setSelectedTransports] = useState<string[]>([]);

  const toggleTransport = (id: string) => {
    setSelectedTransports(prev =>
      prev.includes(id)
        ? prev.filter(t => t !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = () => {
    const correctTransports = transports.filter(t => t.correct).map(t => t.id);
    const isCorrect = selectedTransports.length === correctTransports.length &&
      selectedTransports.every(t => correctTransports.includes(t));
    onComplete(isCorrect);
  };

  return (
    <PuzzleCard title="Puentes y Transportes Pluggable">
      <div className="space-y-6">
        <div className="flex items-start gap-3 p-4 bg-secondary/50 border border-border rounded">
          <Route className="w-5 h-5 text-terminal-purple mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-foreground text-sm">
              Selecciona los transportes pluggable actualmente soportados por{" "}
              <span className="text-terminal-purple font-bold">Tor</span>:
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Transportes para evadir la censura
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {transports.map((transport, index) => (
            <motion.div
              key={transport.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <TerminalButton
                onClick={() => toggleTransport(transport.id)}
                variant="option"
                selected={selectedTransports.includes(transport.id)}
              >
                <span className="flex items-start gap-3 text-left w-full">
                  <Zap className="w-5 h-5 text-terminal-purple flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">{transport.title}</span>
                    <span className="text-xs text-muted-foreground block">{transport.desc}</span>
                    <span className="text-[10px] text-muted-foreground">{transport.type}</span>
                  </div>
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
            disabled={selectedTransports.length === 0}
          >
            {"> VERIFICAR TRANSPORTES"}
          </TerminalButton>
        </motion.div>

        <p className="text-xs text-muted-foreground">
          // Pista: obfs4 es el más usado para evadir firewalls
        </p>
      </div>
    </PuzzleCard>
  );
};

export default Level13Bridges;