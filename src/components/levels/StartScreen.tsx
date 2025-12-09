import { motion } from "framer-motion";
import { Shield, Wifi } from "lucide-react";
import TerminalButton from "../TerminalButton";

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen = ({ onStart }: StartScreenProps) => {
  return (
    <div className="text-center space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="inline-block"
        >
          <Shield className="w-16 h-16 text-terminal-purple mx-auto" />
        </motion.div>

        <pre className="text-terminal-green text-glow text-xs sm:text-sm leading-relaxed">
{`
╔══════════════════════════════════════╗
║                                      ║
║   TOR NETWORK ACCESS PROTOCOL        ║
║                                      ║
║   > Iniciando túnel cifrado...       ║
║   > Verificando nodos de salida...   ║
║   > Estado: LISTO                    ║
║                                      ║
╚══════════════════════════════════════╝
`}
        </pre>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="space-y-4"
      >
        <p className="text-muted-foreground text-sm">
          // Completa los 4 desafíos para escapar de la vigilancia
        </p>

        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Wifi className="w-4 h-4" /> Conexión anónima
          </span>
          <span>|</span>
          <span>4 Niveles</span>
          <span>|</span>
          <span>Educativo</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <TerminalButton onClick={onStart} variant="primary">
          {"> INICIAR CONEXIÓN"}
        </TerminalButton>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-xs text-terminal-green-dim cursor-blink"
      >
        Presiona para comenzar
      </motion.p>
    </div>
  );
};

export default StartScreen;
