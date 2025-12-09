import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, CheckCircle2 } from "lucide-react";
import PuzzleCard from "../PuzzleCard";
import TerminalButton from "../TerminalButton";

interface Level4OnionProps {
  onComplete: (success: boolean) => void;
}

const options = [
  {
    id: "A",
    text: "facebookcorewwwi.onion",
    desc: "Dirección v2 (16 caracteres) - OBSOLETA",
    correct: false,
  },
  {
    id: "B",
    text: "www.darkweb-market.com",
    desc: "Dominio clearnet normal",
    correct: false,
  },
  {
    id: "C",
    text: "duckduckgogg42xjoc72x3sjasowoarfbgcmvfimaftt6twagswzczad.onion",
    desc: "Dirección v3 (56 caracteres) - ACTUAL",
    correct: true,
  },
];

const Level4Onion = ({ onComplete }: Level4OnionProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!selected) return;
    const option = options.find((o) => o.id === selected);
    onComplete(option?.correct || false);
  };

  return (
    <PuzzleCard title="Validación de Direcciones Onion">
      <div className="space-y-6">
        <div className="flex items-start gap-3 p-4 bg-secondary/50 border border-border rounded">
          <Globe className="w-5 h-5 text-terminal-purple flex-shrink-0" />
          <div>
            <p className="text-sm text-foreground">
              ¿Cuál de estas direcciones parece una dirección{" "}
              <span className="text-terminal-purple">.onion v3</span> legítima?
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Las direcciones v3 tienen 56 caracteres + ".onion"
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {options.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
            >
              <button
                onClick={() => setSelected(option.id)}
                className={`w-full text-left p-4 border rounded transition-all ${
                  selected === option.id
                    ? "border-terminal-green bg-terminal-green/10 box-glow"
                    : "border-border bg-secondary hover:border-terminal-green/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-terminal-purple font-bold">[{option.id}]</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground font-mono break-all">
                      {option.text}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{option.desc}</p>
                  </div>
                  {selected === option.id && (
                    <CheckCircle2 className="w-5 h-5 text-terminal-green flex-shrink-0" />
                  )}
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Info Box */}
        <div className="p-3 bg-terminal-purple/10 border border-terminal-purple/30 rounded text-xs">
          <p className="text-muted-foreground">
            <span className="text-terminal-purple">INFO:</span> Las direcciones v3 usan
            criptografía ed25519 más segura que las antiguas v2.
          </p>
        </div>

        <TerminalButton onClick={handleSubmit} variant="primary" disabled={!selected}>
          {"> VALIDAR DIRECCIÓN"}
        </TerminalButton>
      </div>
    </PuzzleCard>
  );
};

export default Level4Onion;
