import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, TrendingUp, BarChart3 } from "lucide-react";
import PuzzleCard from "../PuzzleCard";
import TerminalButton from "../TerminalButton";

interface Level21PerformanceProps {
  onComplete: (success: boolean) => void;
}

const factors = [
  {
    title: "Número de saltos",
    impact: "Reduce velocidad significativamente",
    solution: "3 saltos es el equilibrio óptimo",
    correct: true,
  },
  {
    title: "Criptografía",
    impact: "Overhead mínimo en rendimiento moderno",
    solution: "Hardware actual maneja bien AES",
    correct: false,
  },
  {
    title: "Congestión de red",
    impact: "El mayor bottleneck",
    solution: "Usar relays con buen bandwidth",
    correct: true,
  },
  {
    title: "Latencia geográfica",
    impact: "Afecta cuando relays están lejos",
    solution: "Tor elige relays automáticamente",
    correct: false,
  },
  {
    title: "Compresión de datos",
    impact: "Reduce tamaño pero aumenta CPU",
    solution: "Equilibrio automático en Tor",
    correct: false,
  },
];

const Level21Performance = ({ onComplete }: Level21PerformanceProps) => {
  const [selectedFactors, setSelectedFactors] = useState<string[]>([]);

  const toggleFactor = (title: string) => {
    setSelectedFactors(prev =>
      prev.includes(title)
        ? prev.filter(f => f !== title)
        : [...prev, title]
    );
  };

  const handleSubmit = () => {
    const correctFactors = factors.filter(f => f.correct).map(f => f.title);
    const isCorrect = selectedFactors.length === correctFactors.length &&
      selectedFactors.every(f => correctFactors.includes(f));
    onComplete(isCorrect);
  };

  return (
    <PuzzleCard title="Rendimiento de Tor">
      <div className="space-y-6">
        <div className="flex items-start gap-3 p-4 bg-secondary/50 border border-border rounded">
          <Activity className="w-5 h-5 text-terminal-purple mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-foreground text-sm">
              Selecciona los factores que más afectan el rendimiento de{" "}
              <span className="text-terminal-purple font-bold">Tor</span>:
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Cuellos de botella principales
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {factors.map((factor, index) => (
            <motion.div
              key={factor.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
            >
              <TerminalButton
                onClick={() => toggleFactor(factor.title)}
                variant="option"
                selected={selectedFactors.includes(factor.title)}
              >
                <span className="flex items-start gap-3 text-left w-full">
                  <TrendingUp className="w-5 h-5 text-terminal-purple flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">{factor.title}</span>
                    <span className="text-xs text-muted-foreground block">{factor.impact}</span>
                    <span className="text-[10px] text-muted-foreground">💡 {factor.solution}</span>
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
            disabled={selectedFactors.length === 0}
          >
            {"> ANALIZAR RENDIMIENTO"}
          </TerminalButton>
        </motion.div>

        <p className="text-xs text-muted-foreground">
          // Pista: La congestión de la red es el mayor problema
        </p>
      </div>
    </PuzzleCard>
  );
};

export default Level21Performance;