import { motion } from "framer-motion";
import { FileText, Edit3, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const narrativeHooks = [
  "High Retention Moat",
  "Unit Economics @ 4x LTV:CAC",
  "Founder-Market Fit",
  "TAM: $12B Pet Tech Market",
  "Defensible AI Layer",
];

const NarrativeArtifacts = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 font-mono">
        Narrative Artifacts
      </h2>
      <Card className="bg-card border-border rounded p-0 overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Pitch Deck Preview */}
          <div className="lg:w-1/2 p-6 border-b lg:border-b-0 lg:border-r border-border">
            <div className="aspect-video bg-secondary rounded border border-border flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer hover:border-primary/50 transition-colors">
              {/* Slide preview mockup */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
              <FileText className="w-12 h-12 text-muted-foreground mb-3" />
              <span className="font-mono text-sm text-muted-foreground">Pitch_v1.pdf</span>
              <span className="font-mono text-xs text-muted-foreground/60 mt-1">12 slides • 2.4 MB</span>
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="font-mono text-xs text-primary">Click to preview</span>
              </div>
            </div>
          </div>

          {/* Narrative Hooks */}
          <div className="lg:w-1/2 p-6 flex flex-col">
            <h3 className="text-sm font-semibold text-foreground mb-4">Key Narrative Hooks</h3>
            <ul className="space-y-3 flex-1">
              {narrativeHooks.map((hook, index) => (
                <motion.li
                  key={hook}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-sm text-muted-foreground font-mono">{hook}</span>
                </motion.li>
              ))}
            </ul>
            
            <div className="flex gap-3 mt-6 pt-4 border-t border-border">
              <Button variant="ghost" size="sm" className="font-mono text-xs gap-2">
                <Edit3 className="w-3 h-3" />
                Edit Deck Outline
              </Button>
              <Button size="sm" className="font-mono text-xs gap-2">
                <Download className="w-3 h-3" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default NarrativeArtifacts;
