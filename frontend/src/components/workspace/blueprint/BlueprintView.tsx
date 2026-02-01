import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import BlueprintHeader from "./BlueprintHeader";
import StackGrid from "./StackGrid";
import FeatureList from "./FeatureList";
import RiskConsole from "./RiskConsole";
import BlueprintFooter from "./BlueprintFooter";

const BlueprintView = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex-1 flex flex-col bg-background"
    >
      <ScrollArea className="flex-1">
        <div className="p-8 max-w-5xl mx-auto">
          <BlueprintHeader />
          <StackGrid />
          <FeatureList />
          <RiskConsole />
        </div>
      </ScrollArea>
      <BlueprintFooter />
    </motion.div>
  );
};

export default BlueprintView;
