import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import PuzzleCard from "../PuzzleCard";
import TerminalButton from "../TerminalButton";

interface Level9SafeUsageProps {
  onComplete: (success: boolean) => void;
}

const practices = [
  {
    id: "https",
    text: "Usar HTTPS Everywhere para forzar conexiones seguras",
    safe: true,
  },
  {
    id: "javascript",
    text: "Deshabilitar JavaScript en sitios no confiables",
    safe: true,
  },
  {
    id: "login",
    text: "Iniciar sesión en cuentas personales con Tor",
    safe: false,
  },
  {
    id: "vpn",
    text: "Combinar Tor con una VPN para doble protección",
    safe: false,
  },
  {
    id: "updates",
    text: "Mantener el Tor Browser actualizado",
    safe: true,
  },
  {
    id: "plugins",
    text: "Instalar plugins adicionales en el navegador",
    safe: false,
  },
  {
    id: "cookies",
    text: "Aceptar todas las cookies por defecto",
    safe: false,
  },
  {
    id: "bookmarks",
    text: "Guardar marcadores de sitios sensibles",
    safe: false,
  },
];

const Level9SafeUsage = ({ onComplete }: Level9SafeUsageProps) => {
  const [selectedPractices, setSelectedPractices] = useState<string[]>([]);

  const togglePractice = (id: string) => {
    setSelectedPractices(prev =>
      prev.includes(id)
        ? prev.filter(p => p !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = () => {
    const safePractices = practices.filter(p => p.safe).map(p => p.id);
    const isCorrect = selectedPractices.length === safePractices.length &&
      selectedPractices.every(p => safePractices.includes(p));
    onComplete(isCorrect);
  };

  return (
    <PuzzleCard title="Uso Seguro de Tor">
      <div className="space-y-6">
        <div className="flex items-start gap-3 p-4 bg-secondary/50 border border-border rounded">
          <AlertTriangle className="w-5 h-5 text-terminal-purple mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-foreground text-sm">
              Selecciona las prácticas recomendadas para usar{" "}
              <span className="text-terminal-purple font-bold">Tor</span> de forma segura:
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Elige solo las opciones que mejoran la seguridad
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {practices.map((practice, index) => (
            <motion.div
              key={practice.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <TerminalButton
                onClick={() => togglePractice(practice.id)}
                variant="option"
                selected={selectedPractices.includes(practice.id)}
              >
                <span className="flex items-center gap-3 text-left w-full">
                  <span className="text-sm">{practice.text}</span>
                </span>
              </TerminalButton>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="pt-4 border-t border-border"
        >
          <TerminalButton
            onClick={handleSubmit}
            variant="primary"
            disabled={selectedPractices.length === 0}
          >
            {"> VERIFICAR PRÁCTICAS SEGURAS"}
          </TerminalButton>
        </motion.div>

        <div className="p-3 bg-terminal-green/10 border border-terminal-green/30 rounded text-xs">
          <p className="text-muted-foreground">
            <span className="text-terminal-green">CONSEJO:</span> Tor protege el tráfico, pero no el contenido.
            Siempre usa HTTPS y evita comportamientos identificables.
          </p>
        </div>
      </div>
    </PuzzleCard>
  );
};

export default Level9SafeUsage;