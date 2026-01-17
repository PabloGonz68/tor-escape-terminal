import { useState } from "react";
import { motion } from "framer-motion";
import { Smartphone, Monitor, Server } from "lucide-react";
import PuzzleCard from "../PuzzleCard";
import TerminalButton from "../TerminalButton";

interface Level14PlatformsProps {
  onComplete: (success: boolean) => void;
}

const platforms = [
  {
    icon: Monitor,
    title: "Tor Browser",
    desc: "Navegador principal para desktop",
    platforms: "Windows, macOS, Linux",
    correct: true,
  },
  {
    icon: Smartphone,
    title: "Orbot",
    desc: "Tor para Android",
    platforms: "Android",
    correct: true,
  },
  {
    icon: Server,
    title: "Tor Expert Bundle",
    desc: "Instalación manual avanzada",
    platforms: "Todas las plataformas",
    correct: true,
  },
  {
    icon: Monitor,
    title: "Chrome con extensión Tor",
    desc: "Extensión no oficial para Chrome",
    platforms: "Windows, macOS, Linux",
    correct: false,
  },
  {
    icon: Smartphone,
    title: "Tor Browser Mobile",
    desc: "Versión móvil del navegador",
    platforms: "iOS, Android",
    correct: false,
  },
];

const Level14Platforms = ({ onComplete }: Level14PlatformsProps) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const togglePlatform = (title: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(title)
        ? prev.filter(p => p !== title)
        : [...prev, title]
    );
  };

  const handleSubmit = () => {
    const correctPlatforms = platforms.filter(p => p.correct).map(p => p.title);
    const isCorrect = selectedPlatforms.length === correctPlatforms.length &&
      selectedPlatforms.every(p => correctPlatforms.includes(p));
    onComplete(isCorrect);
  };

  return (
    <PuzzleCard title="Tor en Diferentes Plataformas">
      <div className="space-y-6">
        <div className="flex items-start gap-3 p-4 bg-secondary/50 border border-border rounded">
          <Monitor className="w-5 h-5 text-terminal-purple mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-foreground text-sm">
              Selecciona las aplicaciones oficiales del{" "}
              <span className="text-terminal-purple font-bold">Proyecto Tor</span> para usuarios finales:
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Aplicaciones recomendadas por Tor Project
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
            >
              <TerminalButton
                onClick={() => togglePlatform(platform.title)}
                variant="option"
                selected={selectedPlatforms.includes(platform.title)}
              >
                <span className="flex items-center gap-3 text-left w-full">
                  <platform.icon className="w-5 h-5 text-terminal-purple flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">{platform.title}</span>
                    <span className="text-xs text-muted-foreground block">{platform.desc}</span>
                    <span className="text-[10px] text-muted-foreground">{platform.platforms}</span>
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
            disabled={selectedPlatforms.length === 0}
          >
            {"> VERIFICAR PLATAFORMAS"}
          </TerminalButton>
        </motion.div>

        <p className="text-xs text-muted-foreground">
          // Pista: Tor Browser es la aplicación más usada
        </p>
      </div>
    </PuzzleCard>
  );
};

export default Level14Platforms;