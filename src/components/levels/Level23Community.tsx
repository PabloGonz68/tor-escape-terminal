import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Heart, DollarSign } from "lucide-react";
import PuzzleCard from "../PuzzleCard";
import TerminalButton from "../TerminalButton";

interface Level23CommunityProps {
  onComplete: (success: boolean) => void;
}

const contributions = [
  {
    title: "Ejecutar un relay",
    desc: "Contribuir bandwidth a la red",
    impact: "Aumenta capacidad de la red",
    correct: true,
  },
  {
    title: "Reportar bugs",
    desc: "Ayudar con desarrollo y testing",
    impact: "Mejora estabilidad del software",
    correct: true,
  },
  {
    title: "Traducir documentación",
    desc: "Hacer Tor accesible globalmente",
    impact: "Aumenta adopción internacional",
    correct: true,
  },
  {
    title: "Donar criptomonedas",
    desc: "Apoyo financiero al proyecto",
    impact: "Financia desarrollo continuo",
    correct: true,
  },
  {
    title: "Crear tutoriales",
    desc: "Educar a nuevos usuarios",
    impact: "Facilita adopción de Tor",
    correct: false,
  },
  {
    title: "Desarrollar aplicaciones",
    desc: "Crear software compatible con Tor",
    impact: "Amplía el ecosistema",
    correct: false,
  },
];

const Level23Community = ({ onComplete }: Level23CommunityProps) => {
  const [selectedContributions, setSelectedContributions] = useState<string[]>([]);

  const toggleContribution = (title: string) => {
    setSelectedContributions(prev =>
      prev.includes(title)
        ? prev.filter(c => c !== title)
        : [...prev, title]
    );
  };

  const handleSubmit = () => {
    const correctContributions = contributions.filter(c => c.correct).map(c => c.title);
    const isCorrect = selectedContributions.length === correctContributions.length &&
      selectedContributions.every(c => correctContributions.includes(c));
    onComplete(isCorrect);
  };

  return (
    <PuzzleCard title="Contribuciones a la Comunidad Tor">
      <div className="space-y-6">
        <div className="flex items-start gap-3 p-4 bg-secondary/50 border border-border rounded">
          <Users className="w-5 h-5 text-terminal-purple mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-foreground text-sm">
              Selecciona todas las formas válidas de contribuir al{" "}
              <span className="text-terminal-purple font-bold">Proyecto Tor</span>:
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Cómo ayudar al proyecto
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {contributions.map((contribution, index) => (
            <motion.div
              key={contribution.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <TerminalButton
                onClick={() => toggleContribution(contribution.title)}
                variant="option"
                selected={selectedContributions.includes(contribution.title)}
              >
                <span className="flex items-center gap-3 text-left w-full">
                  <Heart className="w-5 h-5 text-terminal-purple flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">{contribution.title}</span>
                    <span className="text-xs text-muted-foreground block">{contribution.desc}</span>
                    <span className="text-[10px] text-muted-foreground">📈 {contribution.impact}</span>
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
            disabled={selectedContributions.length === 0}
          >
            {"> CONTRIBUIR A TOR"}
          </TerminalButton>
        </motion.div>

        <p className="text-xs text-muted-foreground">
          // Pista: Tor es un proyecto comunitario que necesita ayuda de todos
        </p>
      </div>
    </PuzzleCard>
  );
};

export default Level23Community;