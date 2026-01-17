import { useState } from "react";
import { motion } from "framer-motion";
import { Building, Shield, Users } from "lucide-react";
import PuzzleCard from "../PuzzleCard";
import TerminalButton from "../TerminalButton";

interface Level20CorporateProps {
  onComplete: (success: boolean) => void;
}

const Level20Corporate = ({ onComplete }: Level20CorporateProps) => {
  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {
    const normalized = answer.toLowerCase().trim();
    onComplete(normalized === "onionbalance" || normalized === "onion balance");
  };

  return (
    <PuzzleCard title="Tor en Entornos Corporativos">
      <div className="space-y-6">
        <div className="flex items-start gap-3 p-4 bg-secondary/50 border border-border rounded">
          <Building className="w-5 h-5 text-terminal-purple mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-foreground text-sm">
              ¿Cómo se llama la herramienta para balancear carga en servicios onion de alta disponibilidad?
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Solución para servicios onion corporativos
            </p>
          </div>
        </div>

        <div className="p-4 bg-secondary/30 border border-border rounded">
          <p className="text-sm text-muted-foreground mb-3">
            // Arquitectura de servicios onion corporativos:
          </p>
          <div className="text-xs text-terminal-green font-mono space-y-1">
            <p>Frontend Load Balancer → OnionBalance</p>
            <p>├── Instancia 1 (.onion)</p>
            <p>├── Instancia 2 (.onion)</p>
            <p>└── Instancia N (.onion)</p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">
            {"> Nombre de la herramienta:"}
          </label>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Escribe el nombre de la herramienta..."
            className="w-full bg-background border border-border px-4 py-3 text-foreground text-sm rounded focus:outline-none focus:border-terminal-green focus:ring-1 focus:ring-terminal-green"
          />
        </div>

        <TerminalButton onClick={handleSubmit} variant="primary" disabled={!answer}>
          {"> VERIFICAR HERRAMIENTA"}
        </TerminalButton>

        <p className="text-xs text-muted-foreground">
          // Pista: Permite múltiples instancias detrás de una dirección .onion
        </p>
      </div>
    </PuzzleCard>
  );
};

export default Level20Corporate;