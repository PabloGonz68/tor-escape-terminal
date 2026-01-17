import { useState } from "react";
import { motion } from "framer-motion";
import { Server, Users, Zap } from "lucide-react";
import PuzzleCard from "../PuzzleCard";
import TerminalButton from "../TerminalButton";

interface Level6RelaysProps {
  onComplete: (success: boolean) => void;
}

const relayTypes = [
  {
    id: "guard",
    icon: Server,
    title: "Guard Relay",
    desc: "Primer nodo en el circuito",
    bandwidth: "Alta estabilidad",
    risk: "Bajo riesgo de deanominización",
    correct: true,
  },
  {
    id: "middle",
    icon: Users,
    title: "Middle Relay",
    desc: "Nodo intermedio",
    bandwidth: "Cualquier capacidad",
    risk: "Riesgo moderado",
    correct: true,
  },
  {
    id: "exit",
    icon: Zap,
    title: "Exit Relay",
    desc: "Último nodo del circuito",
    bandwidth: "Alta capacidad",
    risk: "Alto riesgo legal",
    correct: true,
  },
  {
    id: "bridge",
    icon: Server,
    title: "Bridge Relay",
    desc: "Punto de entrada no listado",
    bandwidth: "Variable",
    risk: "Muy bajo riesgo",
    correct: false,
  },
  {
    id: "authority",
    icon: Users,
    title: "Authority Relay",
    desc: "Servidores de directorio principales",
    bandwidth: "Alta estabilidad",
    risk: "Confianza requerida",
    correct: false,
  },
];

const Level6Relays = ({ onComplete }: Level6RelaysProps) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const toggleType = (id: string) => {
    setSelectedTypes(prev =>
      prev.includes(id)
        ? prev.filter(t => t !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = () => {
    const correctTypes = relayTypes.filter(r => r.correct).map(r => r.id);
    const isCorrect = selectedTypes.length === correctTypes.length &&
      selectedTypes.every(t => correctTypes.includes(t));
    onComplete(isCorrect);
  };

  return (
    <PuzzleCard title="Tipos de Relays en Tor">
      <div className="space-y-6">
        <div className="flex items-start gap-3 p-4 bg-secondary/50 border border-border rounded">
          <Server className="w-5 h-5 text-terminal-purple mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-foreground text-sm">
              ¿Cuáles son los tres tipos principales de relays en la red{" "}
              <span className="text-terminal-purple font-bold">Tor</span>?
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Selecciona todos los tipos correctos
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {relayTypes.map((relay, index) => (
            <motion.div
              key={relay.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
            >
              <TerminalButton
                onClick={() => toggleType(relay.id)}
                variant="option"
                selected={selectedTypes.includes(relay.id)}
              >
                <span className="flex items-start gap-3 text-left w-full">
                  <relay.icon className="w-5 h-5 text-terminal-purple flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-semibold">{relay.title}</span>
                    <span className="text-xs text-muted-foreground block">{relay.desc}</span>
                    <div className="flex gap-4 mt-1 text-[10px] text-muted-foreground">
                      <span>📊 {relay.bandwidth}</span>
                      <span>⚠️ {relay.risk}</span>
                    </div>
                  </div>
                </span>
              </TerminalButton>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="pt-4 border-t border-border"
        >
          <TerminalButton
            onClick={handleSubmit}
            variant="primary"
            disabled={selectedTypes.length === 0}
          >
            {"> VERIFICAR TIPOS DE RELAYS"}
          </TerminalButton>
        </motion.div>

        <p className="text-xs text-muted-foreground">
          // Pista: Los relays guard ofrecen estabilidad, los exit necesitan confianza legal
        </p>
      </div>
    </PuzzleCard>
  );
};

export default Level6Relays;