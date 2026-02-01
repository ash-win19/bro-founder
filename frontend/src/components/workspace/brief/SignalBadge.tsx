import { Badge } from "@/components/ui/badge";

type SignalType = "Market signal" | "Technical signal" | "Behavioral signal" | "Founder signal";

interface SignalBadgeProps {
  type: SignalType;
}

const signalColors: Record<SignalType, string> = {
  "Market signal": "bg-blue-500/10 text-blue-400 border-blue-500/30",
  "Technical signal": "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  "Behavioral signal": "bg-amber-500/10 text-amber-400 border-amber-500/30",
  "Founder signal": "bg-purple-500/10 text-purple-400 border-purple-500/30",
};

const SignalBadge = ({ type }: SignalBadgeProps) => {
  return (
    <Badge 
      variant="outline" 
      className={`text-xs font-mono ${signalColors[type]}`}
    >
      {type}
    </Badge>
  );
};

export default SignalBadge;
