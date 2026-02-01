import { motion } from "framer-motion";
import { Lightbulb, Search, Building2, Rocket, Check } from "lucide-react";
import type { WorkspacePhase, PhaseStatus } from "@/contexts/ProductContext";

const StatusIndicator = ({ status }: { status: PhaseStatus }) => {
  if (status === "completed") {
    return (
      <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
        <Check className="w-2.5 h-2.5 text-primary-foreground" />
      </div>
    );
  }
  if (status === "in-progress") {
    return <div className="w-4 h-4 rounded-full bg-primary animate-pulse" />;
  }
  return <div className="w-4 h-4 rounded-full border-2 border-muted-foreground" />;
};

interface StatusBarProps {
  currentPhase: WorkspacePhase;
  onPhaseChange: (phase: WorkspacePhase) => void;
  phaseStatuses: Record<WorkspacePhase, PhaseStatus>;
}

const phases: { id: WorkspacePhase; label: string; icon: typeof Lightbulb }[] = [
  { id: "brainstorming", label: "Brainstorm", icon: Lightbulb },
  { id: "market-research", label: "Market", icon: Search },
  { id: "business-model", label: "Business", icon: Building2 },
  { id: "mvp", label: "MVP", icon: Rocket },
];

const StatusBar = ({ currentPhase, onPhaseChange, phaseStatuses }: StatusBarProps) => {
  const currentIndex = phases.findIndex((p) => p.id === currentPhase);

  return (
    <div className="w-28 border-r border-border bg-card/50 flex flex-col items-center justify-center sticky top-0 h-screen overflow-hidden">
      <div className="flex flex-col">
        {phases.map((phase, index) => {
          const Icon = phase.icon;
          const isActive = phase.id === currentPhase;
          const status = phaseStatuses[phase.id];
          const isPast = status === "completed";

          return (
            <div key={phase.id} className="flex items-center h-20">
              {/* Left column: Status indicator + connecting line */}
              <div className="w-6 flex flex-col items-center justify-center h-full relative">
                {/* Line above (except for first item) */}
                {index > 0 && (
                  <div className="absolute top-0 w-px h-[calc(50%-8px)]">
                    <div className="w-full h-full bg-border" />
                    {index <= currentIndex && (
                      <motion.div
                        className="absolute top-0 left-0 w-full bg-primary"
                        initial={{ height: 0 }}
                        animate={{ height: "100%" }}
                        transition={{ duration: 0.3, delay: (index - 1) * 0.1 }}
                      />
                    )}
                  </div>
                )}
                
                {/* Status indicator (centered) */}
                <div className="z-10 bg-card">
                  <StatusIndicator status={status} />
                </div>
                
                {/* Line below (except for last item) */}
                {index < phases.length - 1 && (
                  <div className="absolute bottom-0 w-px h-[calc(50%-8px)]">
                    <div className="w-full h-full bg-border" />
                    {index < currentIndex && (
                      <motion.div
                        className="absolute top-0 left-0 w-full bg-primary"
                        initial={{ height: 0 }}
                        animate={{ height: "100%" }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Right column: Clickable phase button */}
              <motion.button
                onClick={() => onPhaseChange(phase.id)}
                className={`
                  relative z-20 flex flex-col items-center justify-center gap-1.5 w-16 h-16 rounded-lg transition-all cursor-pointer
                  ${isActive ? 'bg-primary/10' : 'hover:bg-secondary'}
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className={`
                    w-9 h-9 rounded-lg flex items-center justify-center border transition-all
                    ${isActive 
                      ? 'bg-primary border-primary shadow-glow text-primary-foreground' 
                      : isPast 
                        ? 'bg-primary/20 border-primary/50 text-primary' 
                        : 'bg-secondary border-border text-muted-foreground'
                    }
                  `}
                  animate={isActive ? { 
                    boxShadow: [
                      "0 0 20px -5px hsl(187 100% 50% / 0.5)",
                      "0 0 30px -5px hsl(187 100% 50% / 0.7)",
                      "0 0 20px -5px hsl(187 100% 50% / 0.5)",
                    ]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Icon className="w-4 h-4" />
                </motion.div>
                
                <span className={`
                  font-mono text-[9px] uppercase tracking-wider transition-colors
                  ${isActive ? 'text-primary font-semibold' : isPast ? 'text-primary/70' : 'text-muted-foreground'}
                `}>
                  {phase.label}
                </span>

                {isActive && (
                  <motion.div
                    className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-full"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatusBar;
