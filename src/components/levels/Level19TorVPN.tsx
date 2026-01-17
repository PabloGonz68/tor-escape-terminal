import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Zap } from "lucide-react";
import PuzzleCard from "../PuzzleCard";
import TerminalButton from "../TerminalButton";

interface Level19TorVPNProps {
  onComplete: (success: boolean) => void;
}

const combinations = [
  {
    id: "tor_over_vpn",
    title: "Tor sobre VPN",
    desc: "Conectar a VPN primero, luego Tor",
    pros: "Oculta uso de Tor al ISP",
    cons: "VPN ve tu tráfico real",
    recommended: true,
  },
  {
    id: "vpn_over_tor",
    title: "VPN sobre Tor",
    desc: "Conectar a Tor primero, luego VPN",
    pros: "VPN no ve tu IP real",
    cons: "Más lento, VPN puede ver destino",
    recommended: false,
  },
  {
    id: "only_tor",
    title: "Solo Tor",
    desc: "Usar únicamente Tor",
    pros: "Sencillo y efectivo",
    cons: "ISP puede detectar uso de Tor",
    recommended: false,
  },
  {
    id: "only_vpn",
    title: "Solo VPN",
    desc: "Usar únicamente VPN",
    pros: "Más rápido que Tor",
    cons: "VPN puede registrar actividad",
    recommended: false,
  },
];

const Level19TorVPN = ({ onComplete }: Level19TorVPNProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!selected) return;
    const combination = combinations.find((c) => c.id === selected);
    onComplete(combination?.recommended || false);
  };

  return (
    <PuzzleCard title="Tor + VPN: ¿Cuál Combinación?">
      <div className="space-y-6">
        <div className="flex items-start gap-3 p-4 bg-secondary/50 border border-border rounded">
          <Shield className="w-5 h-5 text-terminal-purple mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-foreground text-sm">
              ¿Cuál es la combinación recomendada de{" "}
              <span className="text-terminal-purple font-bold">Tor + VPN</span> para máxima privacidad?
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Orden correcto para combinar tecnologías
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {combinations.map((combination, index) => (
            <motion.div
              key={combination.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
            >
              <TerminalButton
                onClick={() => setSelected(combination.id)}
                variant="option"
                selected={selected === combination.id}
              >
                <span className="flex items-start gap-3 text-left w-full">
                  <Lock className="w-5 h-5 text-terminal-purple flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-semibold">{combination.title}</span>
                    <span className="text-xs text-muted-foreground block">{combination.desc}</span>
                    <div className="flex gap-4 mt-1 text-[10px] text-muted-foreground">
                      <span>✅ {combination.pros}</span>
                      <span>❌ {combination.cons}</span>
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
            {"> SELECCIONAR COMBINACIÓN"}
          </TerminalButton>
        </motion.div>

        <p className="text-xs text-muted-foreground">
          // Pista: Piensa en quién ve qué parte del tráfico
        </p>
      </div>
    </PuzzleCard>
  );
};

export default Level19TorVPN;