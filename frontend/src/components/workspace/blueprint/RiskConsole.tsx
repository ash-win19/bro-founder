import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

const riskLines = [
  { text: "> Initializing risk analysis...", type: "info" as const, delay: 0 },
  { text: "> Scanning dependency graph...", type: "info" as const, delay: 400 },
  { text: "> WARNING: Real-time sync adds 20% operational overhead", type: "warning" as const, delay: 800 },
  { text: "> WARNING: OpenAI API rate limits may affect peak usage", type: "warning" as const, delay: 1200 },
  { text: "> NOTICE: Clerk free tier limited to 10k MAU", type: "info" as const, delay: 1600 },
  { text: "> Vercel serverless cold starts: avg 250ms", type: "info" as const, delay: 2000 },
  { text: "> RISK: No offline fallback for AI features", type: "error" as const, delay: 2400 },
  { text: "> Analysis complete. 2 warnings, 1 critical risk identified.", type: "success" as const, delay: 2800 },
];

const RiskConsole = () => {
  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    riskLines.forEach((line, index) => {
      const timer = setTimeout(() => {
        setVisibleLines(index + 1);
      }, line.delay);
      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  const getLineColor = (type: "info" | "warning" | "error" | "success") => {
    switch (type) {
      case "warning":
        return "text-amber-400";
      case "error":
        return "text-destructive";
      case "success":
        return "text-emerald-400";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.6 }}
      className="mb-24"
    >
      <div className="flex items-center gap-2 mb-4">
        <Terminal className="w-4 h-4 text-muted-foreground" />
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider font-mono">
          Risk Console
        </h2>
      </div>
      <div className="bg-[hsl(0,0%,0%)] border border-border rounded p-4 min-h-[180px] font-mono text-sm overflow-hidden">
        {riskLines.slice(0, visibleLines).map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className={`${getLineColor(line.type)} leading-relaxed`}
          >
            {line.text}
          </motion.div>
        ))}
        {visibleLines < riskLines.length && (
          <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1" />
        )}
      </div>
    </motion.div>
  );
};

export default RiskConsole;
