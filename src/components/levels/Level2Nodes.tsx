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

  const nodes = [
    { icon: Shield, label: "GUARDIA", desc: "Entry Node" },
    { icon: Server, label: "MEDIO", desc: "Middle Node" },
    { icon: Globe, label: "SALIDA", desc: "Exit Node" },
  ];

  return (
    <PuzzleCard title="Lógica de Enrutamiento Onion">
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">
          // Observa la estructura de nodos de la red Tor
        </p>

        {/* Visual Node Representation */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 py-6">
          {nodes.map((node, index) => (
            <motion.div
              key={node.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  className="w-14 h-14 sm:w-16 sm:h-16 border-2 border-terminal-purple rounded-lg flex items-center justify-center bg-secondary"
                >
                  <node.icon className="w-6 h-6 sm:w-8 sm:h-8 text-terminal-purple" />
                </motion.div>
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-terminal-green text-terminal-bg rounded-full text-xs flex items-center justify-center font-bold">
                  {index + 1}
                </span>
              </div>
              <span className="text-xs text-foreground mt-2 font-bold">{node.label}</span>
              <span className="text-[10px] text-muted-foreground">{node.desc}</span>
            </motion.div>
          ))}

          {/* Connection Lines */}
          <svg className="absolute w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
            {[0, 1].map((i) => (
              <motion.line
                key={i}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.5 + i * 0.2, duration: 0.5 }}
                className="stroke-terminal-green/50"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            ))}
          </svg>
        </div>

        {/* Data flow animation */}
        <div className="relative h-8 bg-secondary rounded border border-border overflow-hidden">
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute h-full w-1/4 bg-gradient-to-r from-transparent via-terminal-green/30 to-transparent"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs text-muted-foreground">
              {">>> FLUJO DE DATOS CIFRADO >>>"}
            </span>
          </div>
        </div>

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
