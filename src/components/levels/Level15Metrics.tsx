import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Users, Globe } from "lucide-react";
import PuzzleCard from "../PuzzleCard";
import TerminalButton from "../TerminalButton";

interface Level15MetricsProps {
  onComplete: (success: boolean) => void;
}

const options = [
  { id: "A", text: "metrics.torproject.org", correct: true },
  { id: "B", text: "status.torproject.org", correct: false },
  { id: "C", text: "relays.torproject.org", correct: false },
];

const Level15Metrics = ({ onComplete }: Level15MetricsProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!selected) return;
    const option = options.find((o) => o.id === selected);
    onComplete(option?.correct || false);
  };

  return (
    <PuzzleCard title="Métricas de la Red Tor">
      <div className="space-y-6">
        <div className="flex items-start gap-3 p-4 bg-secondary/50 border border-border rounded">
          <BarChart3 className="w-5 h-5 text-terminal-purple mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-foreground text-sm">
              ¿Cuál es el sitio web oficial donde se publican las{" "}
              <span className="text-terminal-purple font-bold">métricas</span> de la red Tor?
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Estadísticas públicas de la red Tor
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-secondary/30 border border-border rounded">
          <div className="text-center">
            <Users className="w-8 h-8 text-terminal-green mx-auto mb-2" />
            <p className="text-xs font-semibold">USUARIOS</p>
            <p className="text-[10px] text-muted-foreground">~2M diarios</p>
          </div>
          <div className="text-center">
            <Globe className="w-8 h-8 text-terminal-blue mx-auto mb-2" />
            <p className="text-xs font-semibold">RELAYS</p>
            <p className="text-[10px] text-muted-foreground">~7000 activos</p>
          </div>
          <div className="text-center">
            <BarChart3 className="w-8 h-8 text-terminal-purple mx-auto mb-2" />
            <p className="text-xs font-semibold">BW TOTAL</p>
            <p className="text-[10px] text-muted-foreground">~200 Gbps</p>
          </div>
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
          {"> ACCEDER A MÉTRICAS"}
        </TerminalButton>

        <p className="text-xs text-muted-foreground">
          // Pista: Es un subdominio de torproject.org
        </p>
      </div>
    </PuzzleCard>
  );
};

export default Level15Metrics;