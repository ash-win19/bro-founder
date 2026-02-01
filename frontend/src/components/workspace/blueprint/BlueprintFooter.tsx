import { motion } from "framer-motion";
import { Github, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlueprintFooter = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.8 }}
      className="fixed bottom-0 right-0 left-[calc(260px+80px)] bg-card/95 backdrop-blur-sm border-t border-border p-4 z-10"
    >
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <p className="text-xs text-muted-foreground font-mono">
          Ready to build? Export your technical specification.
        </p>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="font-mono text-sm gap-2">
            <FileDown className="w-4 h-4" />
            Download PDF
          </Button>
          <Button className="font-mono text-sm gap-2">
            <Github className="w-4 h-4" />
            Export PRD to GitHub
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default BlueprintFooter;
