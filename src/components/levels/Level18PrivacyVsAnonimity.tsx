import { useState } from "react";
import { motion } from "framer-motion";
import { Scale, Eye, UserCheck } from "lucide-react";
import PuzzleCard from "../PuzzleCard";
import TerminalButton from "../TerminalButton";

interface Level18PrivacyVsAnonimityProps {
  onComplete: (success: boolean) => void;
}

const concepts = [
  {
    id: "privacy",
    title: "Privacidad",
    desc: "Control sobre tu información personal",
    example: "No compartir datos sensibles",
    correct: true,
  },
  {
    id: "anonymity",
    title: "Anonimato",
    desc: "Ocultar tu identidad en línea",
    example: "Usar Tor para navegar",
    correct: true,
  },
  {
    id: "security",
    title: "Seguridad",
    desc: "Protección contra ataques informáticos",
    example: "Usar antivirus y firewalls",
    correct: false,
  },
  {
    id: "encryption",
    title: "Encriptación",
    desc: "Convertir datos en código secreto",
    example: "Usar HTTPS para conexiones",
    correct: false,
  },
];

const Level18PrivacyVsAnonimity = ({ onComplete }: Level18PrivacyVsAnonimityProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!selected) return;
    const concept = concepts.find((c) => c.id === selected);
    onComplete(concept?.correct || false);
  };

  return (
    <PuzzleCard title="Privacidad vs Anonimato">
      <div className="space-y-6">
        <div className="flex items-start gap-3 p-4 bg-secondary/50 border border-border rounded">
          <Scale className="w-5 h-5 text-terminal-purple mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-foreground text-sm">
              ¿Cuál de estos conceptos es más amplio y engloba al otro?
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Diferencia entre privacidad y anonimato
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {concepts.map((concept, index) => (
            <motion.div
              key={concept.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
            >
              <TerminalButton
                onClick={() => setSelected(concept.id)}
                variant="option"
                selected={selected === concept.id}
              >
                <span className="flex items-start gap-3 text-left w-full">
                  <Eye className="w-5 h-5 text-terminal-purple flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-semibold">{concept.title}</span>
                    <span className="text-xs text-muted-foreground block">{concept.desc}</span>
                    <span className="text-[10px] text-muted-foreground">💡 {concept.example}</span>
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
            disabled={!selected}
          >
            {"> SELECCIONAR CONCEPTO"}
          </TerminalButton>
        </motion.div>

        <div className="p-3 bg-terminal-blue/10 border border-terminal-blue/30 rounded text-xs">
          <p className="text-muted-foreground">
            <span className="text-terminal-blue">INFO:</span> La privacidad incluye el anonimato, pero va más allá.
            Tor ayuda con el anonimato, pero la privacidad requiere más medidas.
          </p>
        </div>
      </div>
    </PuzzleCard>
  );
};

export default Level18PrivacyVsAnonimity;