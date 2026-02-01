import { motion } from "framer-motion";
import { useProduct } from "@/contexts/ProductContext";

const ProductContextColumn = () => {
  const { productData } = useProduct();

  const displayName = productData.name || "Your Startup";
  const displaySolution = productData.solution || "Define your solution in the workspace";
  const displayProblem = productData.problemStatement || "Start a conversation to define the problem you're solving";

  // Generate a 3-4 sentence summary
  const productSummary = productData.solution
    ? `${displayName} helps ${productData.targetUsers || "founders"} by ${displaySolution.toLowerCase()}. ${displayProblem} Our platform provides opinionated Build/Pivot/Kill decisions backed by technical depth and market intelligence.`
    : "An AI technical co-founder that validates startup ideas through market research and backend architecture analysis. Designed for pre-seed to early seed founders who need actionable insights, not generic advice. Our platform provides opinionated Build/Pivot/Kill decisions backed by technical depth and market intelligence.";

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,204,0.08)]"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm font-mono text-primary font-bold">01</span>
        <h3 className="text-lg font-semibold text-foreground uppercase tracking-wide">
          Product Overview
        </h3>
      </div>

      <div className="space-y-5">
        {/* Product Name */}
        <div>
          <p className="text-xs font-mono text-muted-foreground mb-1">Your Startup</p>
          <h4 className="text-2xl font-bold text-foreground">{displayName}</h4>
        </div>

        {/* Summary */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {productSummary}
        </p>

        {/* Core Function Box */}
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/30">
          <p className="text-xs font-mono text-primary mb-2">Core Function:</p>
          <p className="text-sm text-foreground leading-relaxed">
            Help founders make informed{" "}
            <span className="font-mono px-1.5 py-0.5 bg-primary/10 rounded text-xs text-primary">
              Build
            </span>{" "}
            /{" "}
            <span className="font-mono px-1.5 py-0.5 bg-primary/10 rounded text-xs text-primary">
              Pivot
            </span>{" "}
            /{" "}
            <span className="font-mono px-1.5 py-0.5 bg-primary/10 rounded text-xs text-primary">
              Kill
            </span>{" "}
            decisions.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductContextColumn;
