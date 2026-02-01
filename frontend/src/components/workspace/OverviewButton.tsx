import { motion } from "framer-motion";
import { LayoutDashboard } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";

interface OverviewButtonProps {
  isPhaseComplete: boolean;
}

const OverviewButton = ({ isPhaseComplete }: OverviewButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isPhaseComplete) {
      navigate("/overview");
    }
  };
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          onClick={handleClick}
          disabled={!isPhaseComplete}
          className={`
            group flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-xs uppercase tracking-wider
            backdrop-blur-md transition-all duration-300
            ${isPhaseComplete 
              ? 'bg-card/80 border border-primary/60 text-foreground cursor-pointer shadow-[0_0_20px_-5px_hsl(var(--primary)/0.4)] hover:bg-card hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.6)]' 
              : 'bg-card/80 border border-border text-muted-foreground opacity-40 cursor-not-allowed'
            }
          `}
        >
          <span className="hidden sm:inline">Go to Overview</span>
          <LayoutDashboard 
            className={`
              w-4 h-4 transition-transform duration-300
              ${isPhaseComplete ? 'group-hover:translate-x-1' : ''}
            `} 
          />
        </motion.button>
      </TooltipTrigger>
      {!isPhaseComplete && (
        <TooltipContent side="bottom" className="font-mono text-xs">
          Complete brainstorm phase to unlock overview
        </TooltipContent>
      )}
      {isPhaseComplete && (
        <TooltipContent side="bottom" className="font-mono text-xs">
          View your product overview
        </TooltipContent>
      )}
    </Tooltip>
  );
};

export default OverviewButton;
