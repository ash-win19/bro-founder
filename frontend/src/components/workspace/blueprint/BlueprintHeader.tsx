import { Badge } from "@/components/ui/badge";

const BlueprintHeader = () => {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <h1 className="text-2xl font-semibold text-foreground mb-1">
          System Architecture & MVP Scope
        </h1>
        <p className="text-sm text-muted-foreground font-mono">
          Generated via Bro Founder • Est. Build Time: 2 Weeks
        </p>
      </div>
      <Badge 
        variant="outline" 
        className="font-mono text-sm px-3 py-1.5 border-primary/50 text-primary"
      >
        Complexity Score: 55/100
      </Badge>
    </div>
  );
};

export default BlueprintHeader;
