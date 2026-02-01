import { motion } from "framer-motion";
import { Radio, FolderDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const PitchFooter = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.8 }}
      className="fixed bottom-0 right-0 left-[calc(260px+80px)] bg-card/95 backdrop-blur-sm border-t border-border p-4 z-10"
    >
      <div className="flex items-center justify-between max-w-5xl mx-auto">
        <p className="text-xs text-muted-foreground font-mono">
          Ready to launch? Broadcast your signal to the network.
        </p>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="font-mono text-sm gap-2">
            <FolderDown className="w-4 h-4" />
            Download Data Room
          </Button>
          <Button 
            className="font-mono text-sm gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 border-0 text-white shadow-[0_0_30px_-5px_hsl(25_100%_50%_/_0.4)] hover:shadow-[0_0_40px_-5px_hsl(25_100%_50%_/_0.6)]"
          >
            <Radio className="w-4 h-4" />
            Broadcast to Network
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default PitchFooter;
