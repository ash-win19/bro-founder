import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import PitchHeader from "./PitchHeader";
import NarrativeArtifacts from "./NarrativeArtifacts";
import BuilderMatch from "./BuilderMatch";
import InvestorIntelligence from "./InvestorIntelligence";
import PitchFooter from "./PitchFooter";

const PitchView = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex-1 flex flex-col bg-background"
    >
      <ScrollArea className="flex-1">
        <div className="p-8 max-w-5xl mx-auto">
          <PitchHeader />
          
          {/* Top Section: Artifacts + Builders */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
            <div className="lg:col-span-3">
              <NarrativeArtifacts />
            </div>
            <div className="lg:col-span-2">
              <BuilderMatch />
            </div>
          </div>

          {/* Bottom Section: Investor Table */}
          <InvestorIntelligence />
        </div>
      </ScrollArea>
      <PitchFooter />
    </motion.div>
  );
};

export default PitchView;
