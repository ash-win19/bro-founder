import { motion } from "framer-motion";
import { useProduct } from "@/contexts/ProductContext";

const ProductContextColumn = () => {
  const { productData, overviewData } = useProduct();

  const displayName = productData.name || "Your Startup";
  const displaySolution = overviewData?.solutionOverview || productData.solution || "Define your solution in the workspace";
  const displayProblem = overviewData?.problemStatement || productData.problemStatement || "Start a conversation to define the problem you're solving";

  // Use AI-generated summary or fallback
  const productSummary = overviewData?.executiveSummary || (
    productData.solution
      ? `${displayName} helps ${productData.targetUsers || "founders"} by ${displaySolution.toLowerCase()}. ${displayProblem}`
      : "An AI technical co-founder that validates startup ideas through market research and backend architecture analysis. Designed for pre-seed to early seed founders who need actionable insights, not generic advice."
  );

  // Get recommendation from AI or productData
  const recommendation = overviewData?.recommendation || productData.recommendation || 'build';

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

        {/* AI Recommendation Box */}
        <div className={`p-4 rounded-lg border ${
          recommendation === 'build' ? 'bg-green-500/5 border-green-500/30' :
          recommendation === 'pivot' ? 'bg-yellow-500/5 border-yellow-500/30' :
          'bg-red-500/5 border-red-500/30'
        }`}>
          <p className="text-xs font-mono mb-2" style={{
            color: recommendation === 'build' ? 'rgb(34 197 94)' :
                   recommendation === 'pivot' ? 'rgb(234 179 8)' :
                   'rgb(239 68 68)'
          }}>
            AI Recommendation:
          </p>
          <p className="text-sm text-foreground leading-relaxed mb-2">
            <span className={`font-mono px-2 py-1 rounded text-sm font-semibold ${
              recommendation === 'build' ? 'bg-green-500/20 text-green-500' :
              recommendation === 'pivot' ? 'bg-yellow-500/20 text-yellow-500' :
              'bg-red-500/20 text-red-500'
            }`}>
              {recommendation.toUpperCase()}
            </span>
          </p>
          {overviewData?.recommendationReasoning && (
            <p className="text-xs text-muted-foreground leading-relaxed">
              {overviewData.recommendationReasoning}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductContextColumn;
