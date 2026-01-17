import { useState } from "react";
import { motion } from "framer-motion";
import { GitBranch, Shield, Zap } from "lucide-react";
import PuzzleCard from "../PuzzleCard";
import TerminalButton from "../TerminalButton";

interface Level25TorVsOthersProps {
  onComplete: (success: boolean) => void;
}

const tools = [
  {
    title: "Tor vs I2P",
    tor_advantage: "Más usuarios, mejor usabilidad",
    other_advantage: "Mejor anonimato interno",
    use_case: "Tor para web general, I2P para darknet",
    correct: true,
  },
  {
    title: "Tor vs VPN",
    tor_advantage: "Anonimato distribuido",
    other_advantage: "Mejor rendimiento",
    use_case: "Tor para anonimato, VPN para privacidad",
    correct: true,
  },
  {
    title: "Tor vs Proxy",
    tor_advantage: "Encriptación de ruta completa",
    other_advantage: "Más rápido y simple",
    use_case: "Tor para anonimato fuerte, proxy para acceso básico",
    correct: true,
  },
  {
    title: "Tor vs HTTP",
    tor_advantage: "Conexión encriptada",
    other_advantage: "Sin encriptación",
    use_case: "Tor para seguridad, HTTP para velocidad",
    correct: false,
  },
  {
    title: "Tor vs Firewall",
    tor_advantage: "Anonimato de red",
    other_advantage: "Control de acceso local",
    use_case: "Tor para anonimato, firewall para protección",
    correct: false,
  },
  {
    title: "Tor vs Antivirus",
    tor_advantage: "Protección de identidad",
    other_advantage: "Protección contra malware",
    use_case: "Tor para privacidad, antivirus para seguridad",
    correct: false,
  },
];

const Level25TorVsOthers = ({ onComplete }: Level25TorVsOthersProps) => {
  const [selectedTools, setSelectedTools] = useState<string[]>([]);

  const toggleTool = (title: string) => {
    setSelectedTools(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  const handleSubmit = () => {
    const correctTools = tools.filter(t => t.correct).map(t => t.title);
    const isCorrect = selectedTools.length === correctTools.length &&
      selectedTools.every(t => correctTools.includes(t));
    onComplete(isCorrect);
  };

  return (
    <PuzzleCard title="Tor vs Otras Herramientas de Anonimato">
      <div className="space-y-6">
        <div className="flex items-start gap-3 p-4 bg-secondary/50 border border-border rounded">
          <GitBranch className="w-5 h-5 text-terminal-purple mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-foreground text-sm">
              Selecciona las comparaciones válidas entre{" "}
              <span className="text-terminal-purple font-bold">Tor</span> y otras herramientas:
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Cuándo usar cada herramienta
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <TerminalButton
                onClick={() => toggleTool(tool.title)}
                variant="option"
                selected={selectedTools.includes(tool.title)}
              >
                <span className="flex items-start gap-3 text-left w-full">
                  <Shield className="w-5 h-5 text-terminal-purple flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">{tool.title}</span>
                    <div className="text-xs text-muted-foreground space-y-1 mt-1">
                      <p>🟣 Tor: {tool.tor_advantage}</p>
                      <p>🔵 Otro: {tool.other_advantage}</p>
                      <p>📋 Uso: {tool.use_case}</p>
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
          transition={{ delay: 0.4 }}
          className="pt-4 border-t border-border"
        >
          <TerminalButton
            onClick={handleSubmit}
            variant="primary"
            disabled={selectedTools.length === 0}
          >
            {"> COMPARAR HERRAMIENTAS"}
          </TerminalButton>
        </motion.div>

        <p className="text-xs text-muted-foreground">
          // Pista: Cada herramienta tiene fortalezas específicas
        </p>
      </div>
    </PuzzleCard>
  );
};

export default Level25TorVsOthers;