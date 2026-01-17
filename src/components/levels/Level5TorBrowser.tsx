import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Eye, Lock } from "lucide-react";
import PuzzleCard from "../PuzzleCard";
import TerminalButton from "../TerminalButton";

interface Level5TorBrowserProps {
  onComplete: (success: boolean) => void;
}

const features = [
  {
    icon: Shield,
    title: "NoScript",
    desc: "Bloquea JavaScript por defecto",
    correct: true,
  },
  {
    icon: Eye,
    title: "HTTPS Everywhere",
    desc: "Fuerza conexiones HTTPS",
    correct: true,
  },
  {
    icon: Lock,
    title: "Tor Circuit",
    desc: "Muestra el circuito actual",
    correct: true,
  },
  {
    icon: Shield,
    title: "uBlock Origin",
    desc: "Bloqueador de anuncios",
    correct: false,
  },
  {
    icon: Eye,
    title: "Flash Player",
    desc: "Reproductor multimedia",
    correct: false,
  },
  {
    icon: Lock,
    title: "Password Manager",
    desc: "Gestor de contraseñas integrado",
    correct: false,
  },
];

const Level5TorBrowser = ({ onComplete }: Level5TorBrowserProps) => {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const toggleFeature = (title: string) => {
    setSelectedFeatures(prev =>
      prev.includes(title)
        ? prev.filter(f => f !== title)
        : [...prev, title]
    );
  };

  const handleSubmit = () => {
    const correctFeatures = features.filter(f => f.correct).map(f => f.title);
    const isCorrect = selectedFeatures.length === correctFeatures.length &&
      selectedFeatures.every(f => correctFeatures.includes(f));
    onComplete(isCorrect);
  };

  return (
    <PuzzleCard title="Características del Tor Browser">
      <div className="space-y-6">
        <div className="flex items-start gap-3 p-4 bg-secondary/50 border border-border rounded">
          <Shield className="w-5 h-5 text-terminal-purple mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-foreground text-sm">
              Selecciona las características de seguridad que incluye el{" "}
              <span className="text-terminal-purple font-bold">Tor Browser</span> por defecto:
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <TerminalButton
                onClick={() => toggleFeature(feature.title)}
                variant="option"
                selected={selectedFeatures.includes(feature.title)}
              >
                <span className="flex items-center gap-3 text-left w-full">
                  <feature.icon className="w-5 h-5 text-terminal-purple flex-shrink-0" />
                  <div>
                    <span className="font-semibold">{feature.title}</span>
                    <span className="text-xs text-muted-foreground block">{feature.desc}</span>
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
            disabled={selectedFeatures.length === 0}
          >
            {"> VERIFICAR SELECCIÓN"}
          </TerminalButton>
        </motion.div>

        <p className="text-xs text-muted-foreground">
          // Pista: El Tor Browser incluye extensiones de privacidad preinstaladas
        </p>
      </div>
    </PuzzleCard>
  );
};

export default Level5TorBrowser;