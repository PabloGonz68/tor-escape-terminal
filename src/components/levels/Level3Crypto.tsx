import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Key, AlertTriangle } from "lucide-react";
import PuzzleCard from "../PuzzleCard";
import TerminalButton from "../TerminalButton";

interface Level3CryptoProps {
  onComplete: (success: boolean) => void;
}

const Level3Crypto = ({ onComplete }: Level3CryptoProps) => {
  const [answer, setAnswer] = useState("");

  // "Usa Bridges" en base64
  const encodedMessage = "VXNhIEJyaWRnZXM=";

  const handleSubmit = () => {
    const normalized = answer.toLowerCase().trim();
    onComplete(normalized === "usa bridges");
  };

  return (
    <PuzzleCard title="Decodificación Criptográfica">
      <div className="space-y-6">
        <div className="flex items-start gap-3 p-4 bg-terminal-red/10 border border-terminal-red/30 rounded">
          <AlertTriangle className="w-5 h-5 text-terminal-red flex-shrink-0" />
          <p className="text-sm text-foreground">
            Has interceptado un mensaje cifrado. Descífralo para continuar.
          </p>
        </div>

        {/* Encoded Message Display */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative"
        >
          <div className="bg-secondary p-6 border border-border rounded-lg relative overflow-hidden">
            <div className="absolute top-2 left-2 flex items-center gap-2 text-xs text-muted-foreground">
              <Lock className="w-3 h-3" />
              <span>MENSAJE CIFRADO</span>
            </div>
            <motion.p
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-center text-xl sm:text-2xl text-terminal-purple font-bold tracking-wider mt-4 text-glow-purple break-all"
            >
              {encodedMessage}
            </motion.p>
          </div>
        </motion.div>

        {/* Hint Section */}
        <div className="flex items-start gap-3 p-4 bg-terminal-purple/10 border border-terminal-purple/30 rounded">
          <Key className="w-5 h-5 text-terminal-purple flex-shrink-0" />
          <div>
            <p className="text-sm text-foreground font-semibold">PISTA:</p>
            <p className="text-sm text-muted-foreground">
              "La clave para saltarse la <span className="text-terminal-green">censura</span>"
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              // Tip: Busca codificaciones comúnes en la web
            </p>
          </div>
        </div>

        {/* Decoder Tool Visual */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-secondary/30 border border-border rounded">
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-2">ENTRADA CIFRADA</p>
            <p className="text-terminal-purple text-sm break-all">{encodedMessage}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-2">SALIDA DESCIFRADA</p>
            <p className="text-terminal-green text-sm">{answer || "???"}</p>
          </div>
        </div>

        {/* Answer Input */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">
            {"> Ingresa el mensaje descifrado:"}
          </label>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Escribe aquí el texto descifrado..."
            className="w-full bg-background border border-border px-4 py-3 text-foreground text-sm rounded focus:outline-none focus:border-terminal-green focus:ring-1 focus:ring-terminal-green"
          />
        </div>

        <TerminalButton onClick={handleSubmit} variant="primary" disabled={!answer}>
          {"> DECODIFICAR Y VERIFICAR"}
        </TerminalButton>

        <p className="text-xs text-muted-foreground">
          // Los bridges son puntos de entrada no listados a la red Tor
        </p>
      </div>
    </PuzzleCard>
  );
};

export default Level3Crypto;
