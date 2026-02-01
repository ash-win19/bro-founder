import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProduct } from "@/contexts/ProductContext";
import { generateOverview } from "@/lib/api";
import { useEffect } from "react";
import OverviewHero from "@/components/overview/OverviewHero";
import ProductContextColumn from "@/components/overview/ProductContextColumn";
import MVPCanvas from "@/components/overview/MVPCanvas";
import PositioningMatrix from "@/components/overview/PositioningMatrix";
import CompetitorCardsGrid from "@/components/overview/CompetitorCardsGrid";

const EmptyState = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
        <FileText className="w-8 h-8 text-primary" />
      </div>
      <h2 className="text-xl font-semibold text-foreground mb-2">No Product Data Yet</h2>
      <p className="text-sm text-muted-foreground max-w-md mb-8">
        Start a conversation in the Workspace to generate your comprehensive product overview document.
      </p>
      <Button onClick={() => navigate("/workspace")} className="gap-2">
        Go to Workspace <ArrowRight className="w-4 h-4" />
      </Button>
    </motion.div>
  );
};

const LoadingState = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
      <h2 className="text-xl font-semibold text-foreground mb-2">Generating Your Overview</h2>
      <p className="text-sm text-muted-foreground max-w-md">
        Our AI is analyzing your product data and creating a comprehensive overview...
      </p>
    </motion.div>
  );
};

const Overview = () => {
  const navigate = useNavigate();
  const {
    productData,
    hasData,
    overviewData,
    setOverviewData,
    isGeneratingOverview,
    setIsGeneratingOverview,
  } = useProduct();

  const displayName = productData.name || "Your Startup";
  const displayTagline = productData.tagline || overviewData?.executiveSummary || "Define your product in the workspace";
  const displayMarketSize = productData.marketSize || overviewData?.marketInsights || "To be determined";

  // Generate overview when component mounts and we have data
  useEffect(() => {
    const fetchOverview = async () => {
      if (hasData && !overviewData && !isGeneratingOverview) {
        setIsGeneratingOverview(true);
        try {
          const overview = await generateOverview(productData);
          setOverviewData(overview);
        } catch (error) {
          console.error('Error generating overview:', error);
        } finally {
          setIsGeneratingOverview(false);
        }
      }
    };

    fetchOverview();
  }, [hasData, overviewData, isGeneratingOverview, productData, setOverviewData, setIsGeneratingOverview]);

  if (!hasData) {
    return (
      <div className="min-h-screen bg-background">
        <EmptyState />
      </div>
    );
  }

  if (isGeneratingOverview) {
    return (
      <div className="min-h-screen bg-background">
        <LoadingState />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Compact Hero Header - 80px */}
      <OverviewHero
        productName={displayName}
        coreFunction={displayTagline}
        lastUpdated={new Date()}
      />

      {/* Main Content - 2-Panel Split Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 relative">
        {/* Cyan Gradient Divider - Visible on desktop only */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent z-10" />

        {/* LEFT PANEL - Product Overview & MVP Canvas */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="h-[calc(100vh-80px)] overflow-y-auto p-6 lg:p-8 space-y-8"
        >
          <ProductContextColumn />
          <MVPCanvas />
        </motion.div>

        {/* RIGHT PANEL - Competitive Intelligence */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="h-[calc(100vh-80px)] overflow-y-auto p-6 lg:p-8 space-y-8"
        >
          {/* Market Stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="text-xs font-mono text-muted-foreground mb-1">MARKET SIZE</p>
              <p className="text-lg font-semibold text-foreground">{displayMarketSize}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="text-xs font-mono text-muted-foreground mb-1">COMPETITOR COUNT</p>
              <p className="text-lg font-semibold text-foreground">
                ~{productData.competitors.length || 3} identified
              </p>
            </div>
          </motion.div>

          {/* Positioning Matrix */}
          <PositioningMatrix />

          {/* Competitor Cards */}
          <CompetitorCardsGrid competitors={productData.competitors} />

          {/* Footer Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="pt-6 border-t border-border flex items-center justify-between"
          >
            <Button
              variant="outline"
              onClick={() => navigate("/workspace")}
              className="gap-2"
            >
              ← Back to Workspace
            </Button>
            <Button
              onClick={() => navigate("/DevPlan")}
              className="gap-2"
            >
              View Development Plan <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Overview;
