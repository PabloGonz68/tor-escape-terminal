import { useState } from "react";
import { motion } from "framer-motion";
import { AppWindow, Shield, Lock } from "lucide-react";
import PuzzleCard from "../PuzzleCard";
import TerminalButton from "../TerminalButton";

interface Level17ApplicationsProps {
  onComplete: (success: boolean) => void;
}

const apps = [
  {
    title: "Tor Browser",
    desc: "Navegador web anónimo",
    type: "Cliente directo",
    correct: true,
  },
  {
    title: "Tails OS",
    desc: "Sistema operativo live USB",
    type: "Sistema completo",
    correct: true,
  },
  {
    title: "OnionShare",
    desc: "Compartir archivos anónimamente",
    type: "Herramienta específica",
    correct: true,
  },
  {
    title: "Tor Messenger",
    desc: "Cliente de mensajería (obsoleto)",
    type: "Aplicación específica",
    correct: false,
  },
  {
    title: "Brave Browser",
    desc: "Navegador con Tor integrado",
    type: "Navegador alternativo",
    correct: false,
  },
  {
    title: "TorBirdy",
    desc: "Extensión para Thunderbird (obsoleto)",
    type: "Cliente de email",
    correct: false,
  },
];

const Level17Applications = ({ onComplete }: Level17ApplicationsProps) => {
  const [selectedApps, setSelectedApps] = useState<string[]>([]);

  const toggleApp = (title: string) => {
    setSelectedApps(prev =>
      prev.includes(title)
        ? prev.filter(a => a !== title)
        : [...prev, title]
    );
  };

  const handleSubmit = () => {
    const correctApps = apps.filter(a => a.correct).map(a => a.title);
    const isCorrect = selectedApps.length === correctApps.length &&
      selectedApps.every(a => correctApps.includes(a));
    onComplete(isCorrect);
  };

  return (
    <PuzzleCard title="Aplicaciones que Usan Tor">
      <div className="space-y-6">
        <div className="flex items-start gap-3 p-4 bg-secondary/50 border border-border rounded">
          <AppWindow className="w-5 h-5 text-terminal-purple mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-foreground text-sm">
              Selecciona las aplicaciones activas que utilizan{" "}
              <span className="text-terminal-purple font-bold">Tor</span> actualmente:
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Herramientas que integran Tor
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {apps.map((app, index) => (
            <motion.div
              key={app.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <TerminalButton
                onClick={() => toggleApp(app.title)}
                variant="option"
                selected={selectedApps.includes(app.title)}
              >
                <span className="flex items-center gap-3 text-left w-full">
                  <Shield className="w-5 h-5 text-terminal-purple flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">{app.title}</span>
                    <span className="text-xs text-muted-foreground block">{app.desc}</span>
                    <span className="text-[10px] text-muted-foreground">{app.type}</span>
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
            disabled={selectedApps.length === 0}
          >
            {"> VERIFICAR APLICACIONES"}
          </TerminalButton>
        </motion.div>

        <p className="text-xs text-muted-foreground">
          // Pista: Algunas aplicaciones han sido discontinuadas
        </p>
      </div>
    </PuzzleCard>
  );
};

export default Level17Applications;