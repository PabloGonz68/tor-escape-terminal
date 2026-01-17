import { motion } from "framer-motion";
import { ShieldCheck, RotateCcw, Eye, EyeOff } from "lucide-react";
import TerminalButton from "../TerminalButton";

interface FinalScreenProps {
  onRestart: () => void;
}

const FinalScreen = ({ onRestart }: FinalScreenProps) => {
  return (
    <div className="text-center space-y-8 relative overflow-hidden">
      {/* Animated background particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-terminal-green/20 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0
          }}
          animate={{
            y: [null, -100],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="relative inline-block"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-2 border-terminal-green/30 rounded-full"
          style={{ width: "120%", height: "120%", left: "-10%", top: "-10%" }}
        />
        <motion.div
          animate={{ 
            boxShadow: [
              "0 0 20px rgba(34, 197, 94, 0.3)",
              "0 0 40px rgba(34, 197, 94, 0.6)",
              "0 0 20px rgba(34, 197, 94, 0.3)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ShieldCheck className="w-24 h-24 text-terminal-green mx-auto" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-terminal-green text-glow">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            ANONIMATO ASEGURADO
          </motion.span>
        </h2>
        <p className="text-lg text-foreground">
          Has escapado de la vigilancia
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="space-y-4"
      >
        <pre className="text-terminal-green text-xs leading-relaxed">
{`
╔════════════════════════════════════════╗
║                                        ║
║   ✓ Túnel TOR establecido              ║
║   ✓ Tráfico cifrado en 3 capas         ║
║   ✓ IP real oculta                     ║
║   ✓ Dirección .onion validada          ║
║                                        ║
║   STATUS: CONEXIÓN SEGURA              ║
║                                        ║
╚════════════════════════════════════════╝
`}
        </pre>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="flex justify-center gap-8"
      >
        <motion.div
          className="text-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring" }}
        >
          <div className="flex items-center justify-center gap-2 text-terminal-green">
            <EyeOff className="w-5 h-5" />
            <motion.span 
              className="text-2xl font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, type: "spring" }}
            >
              26/26
            </motion.span>
          </div>
          <p className="text-xs text-muted-foreground">Niveles completados</p>
        </motion.div>
        <motion.div
          className="text-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.1, type: "spring" }}
        >
          <div className="flex items-center justify-center gap-2 text-terminal-purple">
            <Eye className="w-5 h-5" />
            <motion.span 
              className="text-2xl font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.3, type: "spring" }}
            >
              0
            </motion.span>
          </div>
          <p className="text-xs text-muted-foreground">Rastreadores evadidos</p>
        </motion.div>
      </motion.div>

      {/* Learning Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="p-4 bg-secondary/50 border border-border rounded text-left space-y-2"
      >
        <p className="text-sm text-terminal-purple font-bold">// Lo que aprendiste:</p>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• TOR = The Onion Router (enrutamiento por capas)</li>
          <li>• La red usa mínimo 3 nodos para anonimato</li>
          <li>• Los Bridges ayudan a evadir censura</li>
          <li>• Las direcciones v3 tienen 56 caracteres</li>
          <li>• Tor Browser incluye NoScript y HTTPS Everywhere</li>
          <li>• Los relays Guard, Middle y Exit tienen roles específicos</li>
          <li>• Los servicios ocultos usan rendezvous points</li>
          <li>• Ataques como timing y exit node comprometen la privacidad</li>
          <li>• Configuración avanzada requiere puertos específicos</li>
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <TerminalButton onClick={onRestart} variant="secondary">
          <span className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
            REINICIAR PROTOCOLO
          </span>
        </TerminalButton>
      </motion.div>
    </div>
  );
};

export default FinalScreen;
