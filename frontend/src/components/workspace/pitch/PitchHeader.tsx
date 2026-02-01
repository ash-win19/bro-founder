import { Badge } from "@/components/ui/badge";

const PitchHeader = () => {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <h1 className="text-2xl font-semibold text-foreground mb-1">
          Market Readiness & Network
        </h1>
        <p className="text-sm text-muted-foreground font-mono">
          Generated via Bro Founder • Pitch Deck & Investor Signal Ready
        </p>
      </div>
      <Badge 
        variant="outline" 
        className="font-mono text-sm px-3 py-1.5 border-emerald-500/50 text-emerald-400"
      >
        Narrative Score: 92/100
      </Badge>
    </div>
  );
};

export default PitchHeader;
