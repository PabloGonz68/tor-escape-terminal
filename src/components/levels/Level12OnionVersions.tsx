import { useState } from "react";
import { motion } from "framer-motion";
import { EyeOff, Key, Hash } from "lucide-react";
import PuzzleCard from "../PuzzleCard";
import TerminalButton from "../TerminalButton";

interface Level12OnionVersionsProps {
  onComplete: (success: boolean) => void;
}

const versions = [
  {
    id: "v2",
    title: "Onion v2",
    length: "16 caracteres",
    crypto: "SHA-1 + RSA-1024",
    status: "16 caracteres",
    correct: false,
  },
  {
    id: "v3",
    title: "Onion v3",
    length: "56 caracteres",
    crypto: "SHA-3 + Ed25519",
    status: "56 caracteres",
    correct: true,
  },
  {
    id: "v1",
    title: "Onion v1",
    length: "10 caracteres",
    crypto: "SHA-1 + RSA-1024",
    status: "10 caracteres",
    correct: false,
  },
  {
    id: "next",
    title: "Onion v4",
    length: "Variable",
    crypto: "Próxima generación",
    status: "En desarrollo",
    correct: false,
  },
];

const Level12OnionVersions = ({ onComplete }: Level12OnionVersionsProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!selected) return;
    const version = versions.find((v) => v.id === selected);
    onComplete(version?.correct || false);
  };

  return (
    <PuzzleCard title="Versiones de Direcciones Onion">
      <div className="space-y-6">
        <div className="flex items-start gap-3 p-4 bg-secondary/50 border border-border rounded">
          <EyeOff className="w-5 h-5 text-terminal-purple mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-foreground text-sm">
              ¿Cuál es la versión actual recomendada de direcciones{" "}
              <span className="text-terminal-purple font-bold">.onion</span>?
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Compara las características de seguridad
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {versions.map((version, index) => (
            <motion.div
              key={version.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
            >
              <TerminalButton
                onClick={() => setSelected(version.id)}
                variant="option"
                selected={selected === version.id}
              >
                <span className="flex items-start gap-3 text-left w-full">
                  <Hash className="w-5 h-5 text-terminal-purple flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-semibold">{version.title}</span>
                    <div className="text-xs text-muted-foreground space-y-1 mt-1">
                      <p>📏 Longitud: {version.length}</p>
                      <p>🔐 Criptografía: {version.crypto}</p>
                      <p>📊 Estado: {version.status}</p>
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
            disabled={!selected}
          >
            {"> SELECCIONAR VERSIÓN"}
          </TerminalButton>
        </motion.div>

        <p className="text-xs text-muted-foreground">
          // Pista: La v3 ofrece mejor seguridad criptográfica
        </p>
      </div>
    </PuzzleCard>
  );
};

export default Level12OnionVersions;