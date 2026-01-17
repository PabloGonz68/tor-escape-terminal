import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Target, Shield } from "lucide-react";
import PuzzleCard from "../PuzzleCard";
import TerminalButton from "../TerminalButton";

interface Level8AttacksProps {
  onComplete: (success: boolean) => void;
}

const attacks = [
  {
    id: "timing",
    title: "Ataque de Timing",
    desc: "Analiza el tiempo de respuesta para correlacionar tráfico",
    dangerous: true,
    mitigation: "Usar guard relays consistentes",
  },
  {
    id: "exit",
    title: "Ataque de Exit Node",
    desc: "El último relay puede ver el tráfico sin cifrar",
    dangerous: true,
    mitigation: "Siempre usar HTTPS",
  },
  {
    id: "correlation",
    title: "Ataque de Correlación",
    desc: "Compara patrones de entrada y salida",
    dangerous: true,
    mitigation: "Evitar comportamientos únicos",
  },
  {
    id: "malicious",
    title: "Relay Malicioso",
    desc: "Un relay controlado por atacante",
    dangerous: true,
    mitigation: "Tor rota circuitos automáticamente",
  },
  {
    id: "dns",
    title: "Envenenamiento DNS",
    desc: "Manipulación de respuestas DNS",
    dangerous: false,
    mitigation: "Tor usa su propio DNS",
  },
  {
    id: "phishing",
    title: "Phishing",
    desc: "Sitios falsos que imitan a Tor",
    dangerous: false,
    mitigation: "Verificar direcciones .onion",
  },
];

const Level8Attacks = ({ onComplete }: Level8AttacksProps) => {
  const [selectedAttacks, setSelectedAttacks] = useState<string[]>([]);

  const toggleAttack = (id: string) => {
    setSelectedAttacks(prev =>
      prev.includes(id)
        ? prev.filter(a => a !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = () => {
    const dangerousAttacks = attacks.filter(a => a.dangerous).map(a => a.id);
    const isCorrect = selectedAttacks.length === dangerousAttacks.length &&
      selectedAttacks.every(a => dangerousAttacks.includes(a));
    onComplete(isCorrect);
  };

  return (
    <PuzzleCard title="Ataques y Debilidades de Tor">
      <div className="space-y-6">
        <div className="flex items-start gap-3 p-4 bg-terminal-red/10 border border-terminal-red/30 rounded">
          <AlertTriangle className="w-5 h-5 text-terminal-red flex-shrink-0" />
          <div>
            <p className="text-sm text-foreground">
              ¿Cuáles son las principales amenazas a la anonimidad en la red{" "}
              <span className="text-terminal-red font-bold">Tor</span>?
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Selecciona todas las vulnerabilidades reales
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {attacks.map((attack, index) => (
            <motion.div
              key={attack.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <TerminalButton
                onClick={() => toggleAttack(attack.id)}
                variant="option"
                selected={selectedAttacks.includes(attack.id)}
              >
                <span className="flex items-start gap-3 text-left w-full">
                  <Target className="w-5 h-5 text-terminal-red flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-semibold">{attack.title}</span>
                    <span className="text-xs text-muted-foreground block">{attack.desc}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <Shield className="w-3 h-3 text-terminal-green" />
                      <span className="text-[10px] text-muted-foreground">{attack.mitigation}</span>
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
            disabled={selectedAttacks.length === 0}
          >
            {"> IDENTIFICAR VULNERABILIDADES"}
          </TerminalButton>
        </motion.div>

        <p className="text-xs text-muted-foreground">
          // Pista: Tor no protege contra todas las formas de análisis de tráfico
        </p>
      </div>
    </PuzzleCard>
  );
};

export default Level8Attacks;