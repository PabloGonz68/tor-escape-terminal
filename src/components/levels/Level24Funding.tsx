import { useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, Heart, Building } from "lucide-react";
import PuzzleCard from "../PuzzleCard";
import TerminalButton from "../TerminalButton";

interface Level24FundingProps {
  onComplete: (success: boolean) => void;
}

const sources = [
  {
    title: "Fundación Mozilla",
    type: "Organización sin fines de lucro",
    amount: "Millones de dólares anuales",
    correct: false,
  },
  {
    title: "Agencia de Investigación Avanzada de Defensa (DARPA)",
    type: "Gobierno de EE.UU.",
    amount: "Financiamiento inicial",
    correct: true,
  },
  {
    title: "Fundación Knight",
    type: "Fundación privada",
    amount: "Apoyo continuo",
    correct: true,
  },
  {
    title: "Usuarios individuales",
    type: "Donaciones de la comunidad",
    amount: "Parte significativa",
    correct: true,
  },
  {
    title: "Google",
    type: "Empresa tecnológica",
    amount: "Patrocinio corporativo",
    correct: false,
  },
  {
    title: "Microsoft",
    type: "Empresa de software",
    amount: "Inversión en investigación",
    correct: false,
  },
  {
    title: "Fundación Bill & Melinda Gates",
    type: "Fundación filantrópica",
    amount: "Apoyo global",
    correct: false,
  },
  {
    title: "Gobierno chino",
    type: "Estado extranjero",
    amount: "Financiamiento internacional",
    correct: false,
  },
];

const Level24Funding = ({ onComplete }: Level24FundingProps) => {
  const [selectedSources, setSelectedSources] = useState<string[]>([]);

  const toggleSource = (title: string) => {
    setSelectedSources(prev =>
      prev.includes(title)
        ? prev.filter(s => s !== title)
        : [...prev, title]
    );
  };

  const handleSubmit = () => {
    const correctSources = sources.filter(s => s.correct).map(s => s.title);
    const isCorrect = selectedSources.length === correctSources.length &&
      selectedSources.every(s => correctSources.includes(s));
    onComplete(isCorrect);
  };

  return (
    <PuzzleCard title="Financiamiento del Proyecto Tor">
      <div className="space-y-6">
        <div className="flex items-start gap-3 p-4 bg-secondary/50 border border-border rounded">
          <DollarSign className="w-5 h-5 text-terminal-purple mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-foreground text-sm">
              Selecciona las fuentes de financiamiento actuales del{" "}
              <span className="text-terminal-purple font-bold">Proyecto Tor</span>:
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Cómo se financia el desarrollo de Tor
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {sources.map((source, index) => (
            <motion.div
              key={source.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
            >
              <TerminalButton
                onClick={() => toggleSource(source.title)}
                variant="option"
                selected={selectedSources.includes(source.title)}
              >
                <span className="flex items-center gap-3 text-left w-full">
                  <Building className="w-5 h-5 text-terminal-purple flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">{source.title}</span>
                    <span className="text-xs text-muted-foreground block">{source.type}</span>
                    <span className="text-[10px] text-muted-foreground">💰 {source.amount}</span>
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
            disabled={selectedSources.length === 0}
          >
            {"> VERIFICAR FINANCIAMIENTO"}
          </TerminalButton>
        </motion.div>

        <p className="text-xs text-muted-foreground">
          // Pista: Tor comenzó como proyecto gubernamental pero ahora es independiente
        </p>
      </div>
    </PuzzleCard>
  );
};

export default Level24Funding;