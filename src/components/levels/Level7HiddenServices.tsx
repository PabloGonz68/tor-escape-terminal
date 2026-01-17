import { useState } from "react";
import { motion } from "framer-motion";
import { EyeOff, Globe, Key } from "lucide-react";
import PuzzleCard from "../PuzzleCard";
import TerminalButton from "../TerminalButton";

interface Level7HiddenServicesProps {
  onComplete: (success: boolean) => void;
}

const options = [
  { id: "A", text: "Introduction Point - Punto de introducción", correct: true },
  { id: "B", text: "Rendezvous Point - Punto de encuentro", correct: false },
  { id: "C", text: "Guard Relay - Relay guardián", correct: false },
  { id: "D", text: "Exit Node - Nodo de salida", correct: false },
];

const Level7HiddenServices = ({ onComplete }: Level7HiddenServicesProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!selected) return;
    const option = options.find((o) => o.id === selected);
    onComplete(option?.correct || false);
  };

  return (
    <PuzzleCard title="Servicios Ocultos de Tor">
      <div className="space-y-6">
        <div className="flex items-start gap-3 p-4 bg-terminal-purple/10 border border-terminal-purple/30 rounded">
          <EyeOff className="w-5 h-5 text-terminal-purple flex-shrink-0" />
          <p className="text-sm text-foreground">
            Los servicios ocultos de Tor usan un sistema especial de rendezvous para conectarse.
            ¿Cómo se llama el tipo de nodo que facilita esta conexión inicial?
          </p>
        </div>

        {/* Hidden Service Architecture Visual */}
        <div className="relative p-6 bg-secondary/30 border border-border rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-terminal-purple/20 border border-terminal-purple rounded-lg flex items-center justify-center mx-auto">
                <Key className="w-6 h-6 text-terminal-purple" />
              </div>
              <p className="text-xs font-semibold">SERVIDOR OCULTO</p>
              <p className="text-[10px] text-muted-foreground">Publica descriptor</p>
            </div>

            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="space-y-2"
            >
              <div className="w-12 h-12 bg-terminal-green/20 border border-terminal-green rounded-lg flex items-center justify-center mx-auto">
                <Globe className="w-6 h-6 text-terminal-green" />
              </div>
              <p className="text-xs font-semibold">NODO ???</p>
              <p className="text-[10px] text-muted-foreground">Facilita conexión</p>
            </motion.div>

            <div className="space-y-2">
              <div className="w-12 h-12 bg-terminal-blue/20 border border-terminal-blue rounded-lg flex items-center justify-center mx-auto">
                <EyeOff className="w-6 h-6 text-terminal-blue" />
              </div>
              <p className="text-xs font-semibold">CLIENTE</p>
              <p className="text-[10px] text-muted-foreground">Accede al servicio</p>
            </div>
          </div>

          {/* Connection arrows */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              d="M 120 60 L 200 60"
              stroke="hsl(var(--terminal-green))"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 4"
            />
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1, duration: 1 }}
              d="M 280 60 L 360 60"
              stroke="hsl(var(--terminal-green))"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 4"
            />
          </svg>
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
                  <span>{option.text}</span>
                </span>
              </TerminalButton>
            </motion.div>
          ))}
        </div>

        <TerminalButton onClick={handleSubmit} variant="primary" disabled={!selected}>
          {"> VERIFICAR RESPUESTA"}
        </TerminalButton>

        <p className="text-xs text-muted-foreground">
          // Pista: Es el primer punto de contacto para establecer la conexión con el servicio oculto
        </p>
      </div>
    </PuzzleCard>
  );
};

export default Level7HiddenServices;