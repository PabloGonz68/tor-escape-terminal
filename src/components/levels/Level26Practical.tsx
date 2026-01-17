import { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Play, CheckCircle, XCircle, Key, GripVertical } from "lucide-react";
import PuzzleCard from "../PuzzleCard";
import TerminalButton from "../TerminalButton";

interface Level26PracticalProps {
  onComplete: (success: boolean) => void;
}

const Cinematic = ({ commands, step }: { commands: any[], step: number }) => {
  const executedCommands = commands.slice(0, step);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <h2 className="text-xl font-bold text-terminal-green">Ejecutando Configuración...</h2>
        <p className="text-sm text-muted-foreground">Viendo la magia de Tor en acción</p>
      </motion.div>

      <div className="bg-black border border-terminal-green/30 rounded p-4 font-mono text-sm text-terminal-green space-y-2">
        {executedCommands.map((cmd, index) => (
          <motion.div
            key={cmd.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.5 }}
          >
            <div className="flex items-center gap-2">
              <span className="text-terminal-purple">$</span>
              <span>
                {cmd.parts.map((part: any, pIndex: number) => 
                  typeof part === 'string' ? part : part.value
                ).join('')}
              </span>
            </div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1, delay: index * 0.5 + 0.3 }}
              className="h-1 bg-terminal-green mt-1"
            />
            <p className="text-xs text-terminal-green mt-1">✓ Ejecutado correctamente</p>
          </motion.div>
        ))}

        {step > commands.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring" }}
            className="text-center py-4"
          >
            <div className="text-terminal-green text-lg font-bold">¡Relay Puente Configurado!</div>
            <div className="text-sm">Conectando a la red Tor...</div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-terminal-green border-t-transparent rounded-full mx-auto mt-2"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

const commands = [
  {
    id: 1,
    parts: ["sudo apt install ", { type: 'blank', value: 'tor' }],
    correctOrder: 1
  },
  {
    id: 2,
    parts: ["echo 'Bridge obfs4 192.0.2.1:443' | sudo tee -a /etc/", { type: 'blank', value: 'tor' }, "/", { type: 'blank', value: 'torrc' }],
    correctOrder: 2
  },
  {
    id: 3,
    parts: ["echo -e 'ServerTransportPlugin obfs4 exec /usr/bin/obfs4proxy\\nBridgeRelay 1\\nPublishServerDescriptor 0' | sudo tee -a /etc/tor/torrc"],
    correctOrder: 3
  },
  {
    id: 4,
    parts: ["sudo tor --verify-config"],
    correctOrder: 4
  },
  {
    id: 5,
    parts: ["sudo tor --controlport ", { type: 'blank', value: '9052' }, " --socksport ", { type: 'blank', value: '9051' }, " --exitpolicy reject *:*"],
    correctOrder: 5
  }
];

const Level26Practical = ({ onComplete }: Level26PracticalProps) => {
  const shuffleArray = (array: number[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const [commandOrder, setCommandOrder] = useState(() => shuffleArray(commands.map(c => c.id)));
  const [blankInputs, setBlankInputs] = useState<{ [key: number]: { [blankIndex: number]: string } }>({});
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [cinematicStep, setCinematicStep] = useState(0);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (dropIndex: number) => {
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newOrder = [...commandOrder];
    const [removed] = newOrder.splice(draggedIndex, 1);
    newOrder.splice(dropIndex, 0, removed);
    setCommandOrder(newOrder);
    setDraggedIndex(null);
  };

  const handleBlankChange = (commandId: number, blankIndex: number, value: string) => {
    setBlankInputs(prev => ({
      ...prev,
      [commandId]: {
        ...prev[commandId],
        [blankIndex]: value
      }
    }));
  };

  const checkCompletion = () => {
    // Check order
    const isOrderCorrect = commandOrder.every((id, index) => {
      const command = commands.find(c => c.id === id);
      return command?.correctOrder === index + 1;
    });

    // Check blanks
    const areBlanksCorrect = commands.every(command => {
      return command.parts.every((part, partIndex) => {
        if (typeof part === 'string') return true;
        const inputValue = blankInputs[command.id]?.[partIndex] || '';
        return inputValue.trim().toLowerCase() === part.value.toLowerCase();
      });
    });

    return isOrderCorrect && areBlanksCorrect;
  };

  const handleSubmit = () => {
    if (checkCompletion()) {
      setIsCompleted(true);
      setCinematicStep(0);
      // Start cinematic
      const timer = setInterval(() => {
        setCinematicStep(prev => {
          if (prev < commands.length) {
            return prev + 1;
          } else {
            clearInterval(timer);
            setTimeout(() => onComplete(true), 2000); // Delay before completing
            return prev;
          }
        });
      }, 1500); // Time per step
    }
  };

  const renderCommand = (commandId: number, index: number) => {
    const command = commands.find(c => c.id === commandId);
    if (!command) return null;

    const isDragging = draggedIndex === index;

    return (
      <motion.div
        key={commandId}
        draggable
        onDragStart={() => handleDragStart(index)}
        onDragOver={handleDragOver}
        onDrop={() => handleDrop(index)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          scale: isDragging ? 1.05 : 1,
          rotate: isDragging ? 2 : 0
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`flex items-center gap-3 p-4 bg-secondary/50 border border-border rounded cursor-move hover:bg-secondary/70 transition-all duration-200 ${isDragging ? 'shadow-lg z-10' : ''}`}
      >
        <motion.div
          animate={{ rotate: isDragging ? 360 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <GripVertical className="w-5 h-5 text-muted-foreground" />
        </motion.div>
        <div className="flex-1 font-mono text-sm">
          {command.parts.map((part, partIndex) => {
            if (typeof part === 'string') {
              return <span key={partIndex}>{part}</span>;
            } else {
              return (
                <motion.input
                  key={partIndex}
                  type="text"
                  value={blankInputs[command.id]?.[partIndex] || ''}
                  onChange={(e) => handleBlankChange(command.id, partIndex, e.target.value)}
                  placeholder="[completar]"
                  className="bg-background border border-border px-2 py-1 text-xs rounded font-mono focus:outline-none focus:ring-1 focus:ring-terminal-purple w-24"
                  animate={{ scale: blankInputs[command.id]?.[partIndex] ? [1, 1.1, 1] : 1 }}
                  transition={{ duration: 0.3 }}
                />
              );
            }
          })}
        </div>
        <span className="text-xs text-muted-foreground">#{index + 1}</span>
      </motion.div>
    );
  };

  return (
    <PuzzleCard title="Configuración Avanzada de Tor - Relay Puente">
      {isCompleted ? (
        <Cinematic commands={commands} step={cinematicStep} />
      ) : (
        <div className="space-y-6">
          <div className="flex items-start gap-3 p-4 bg-terminal-red/10 border border-terminal-red/30 rounded">
            <Terminal className="w-5 h-5 text-terminal-red flex-shrink-0" />
            <div>
              <p className="text-sm text-foreground">
                <span className="text-terminal-red font-bold">DESAFÍO AVANZADO:</span> Ordena y completa los comandos para configurar un relay puente obfs4
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Arrastra para ordenar, completa los espacios en blanco
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {commandOrder.map((commandId, index) => renderCommand(commandId, index))}
          </div>

          <TerminalButton
            onClick={handleSubmit}
            variant="primary"
          >
            <Play className="w-4 h-4 mr-2" />
            VERIFICAR CONFIGURACIÓN
          </TerminalButton>

          <div className="p-3 bg-terminal-yellow/10 border border-terminal-yellow/30 rounded text-xs">
            <p className="text-muted-foreground">
              <span className="text-terminal-yellow">💡 PISTA:</span> Los comandos deben estar en el orden correcto de ejecución, y los espacios en blanco deben completarse con los valores apropiados.
            </p>
          </div>
        </div>
      )}
    </PuzzleCard>
  );
};

export default Level26Practical;