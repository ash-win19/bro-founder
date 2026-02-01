import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Target, TrendingUp, DollarSign, Rocket, Users, Clock, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ElevatorPitch from "@/components/pitch/ElevatorPitch";
import SnapshotCard from "@/components/pitch/SnapshotCard";
import DetailedReport from "@/components/pitch/DetailedReport";
import ConnectionsSection from "@/components/pitch/ConnectionsSection";
import { useProduct } from "@/contexts/ProductContext";
import { generatePitch } from "@/lib/api";

const FinalPitch = () => {
  const navigate = useNavigate();
  const {
    productData,
    hasData,
    pitchData,
    setPitchData,
    isGeneratingPitch,
    setIsGeneratingPitch,
  } = useProduct();

  // Generate pitch when component mounts and we have data
  useEffect(() => {
    const fetchPitch = async () => {
      if (hasData && !pitchData && !isGeneratingPitch) {
        setIsGeneratingPitch(true);
        try {
          const pitch = await generatePitch(productData);
          setPitchData(pitch);
        } catch (error) {
          console.error('Error generating pitch:', error);
        } finally {
          setIsGeneratingPitch(false);
        }
      }
    };

    fetchPitch();
  }, [hasData, pitchData, isGeneratingPitch, productData, setPitchData, setIsGeneratingPitch]);
  
  // Use AI-generated pitch or fallback
  const defaultPitch = productData.name
    ? `${productData.name} is solving ${productData.problemStatement || "a critical problem"} for ${productData.targetUsers || "our target users"}. ${productData.solution || "Our innovative solution"} creates a ${productData.marketSize || "$50B+"} market opportunity. We're raising to capture market share and build the definitive platform in this space.`
    : "We're building the future of startup validation. Our AI-powered platform analyzes market data, competitor landscapes, and funding trends to give founders a clear go/no-go signal in minutes, not months. With 500+ startups validated and a 94% accuracy rate on our recommendations, we're saving founders precious time and investors from bad bets.";

  const [pitch, setPitch] = useState(pitchData?.elevatorPitch || defaultPitch);

  // Update pitch when AI data arrives
  useEffect(() => {
    if (pitchData?.elevatorPitch) {
      setPitch(pitchData.elevatorPitch);
    }
  }, [pitchData]);

  // Map icons for snapshot metrics
  const iconMap: Record<string, typeof Target> = {
    'Market Size': Target,
    'Growth Rate': TrendingUp,
    'MRR': DollarSign,
    'Traction': Rocket,
    'Team': Users,
    'Runway': Clock,
  };

  const snapshotMetrics = pitchData?.snapshotMetrics?.map(metric => ({
    icon: iconMap[metric.label] || Target,
    label: metric.label,
    value: metric.value,
    description: metric.description,
  })) || [
    {
      icon: Target,
      label: "Market Size",
      value: productData.marketSize || "$50B+",
      description: "Total addressable market opportunity",
    },
    {
      icon: TrendingUp,
      label: "Growth Rate",
      value: "127%",
      description: "Year-over-year revenue growth",
    },
    {
      icon: DollarSign,
      label: "MRR",
      value: "$48K",
      description: "Monthly recurring revenue",
    },
    {
      icon: Rocket,
      label: "Traction",
      value: "500+",
      description: "Active users on platform",
    },
    {
      icon: Users,
      label: "Team",
      value: "8",
      description: "Full-time team members",
    },
    {
      icon: Clock,
      label: "Runway",
      value: "18mo",
      description: "Current cash runway",
    },
  ];

  const reportData = {
    marketOpportunity: pitchData?.marketOpportunity || (
      productData.problemStatement
        ? `${productData.problemStatement} This represents a massive opportunity in a ${productData.marketSize || "$50B+"} market that is growing rapidly. The shift toward AI-powered solutions creates a unique window for new entrants to capture significant market share.`
        : "The startup ecosystem generates $300B+ in annual funding, yet 90% of startups fail. Most failures stem from building products nobody wants. Our platform addresses this fundamental problem by providing data-driven validation before founders commit resources."
    ),
    competitiveAdvantage: pitchData?.competitiveAdvantage || (
      productData.differentiators.length > 0
        ? productData.differentiators
        : [
            "AI-powered analysis with 94% prediction accuracy",
            "Real-time market data integration from 50+ sources",
            "10x faster validation vs traditional methods",
            "Built-in investor matching algorithm",
            "Proprietary dataset of 100K+ startup outcomes",
          ]
    ),
    businessModel: pitchData?.businessModel || (
      productData.revenueModel
        ? `${productData.revenueModel}. ${productData.pricing ? `Pricing: ${productData.pricing}` : ""}`
        : "SaaS subscription model with three tiers: Starter ($49/mo), Pro ($149/mo), and Enterprise (custom pricing). Additional revenue streams include premium investor matching fees (15% of successful intros) and white-label partnerships with accelerators."
    ),
    traction: pitchData?.traction || [
      "500+ active users across 12 countries",
      "$48K MRR with 127% YoY growth",
      "92% user retention after 3 months",
      "Partnerships with 3 top-20 accelerators",
      "Featured in TechCrunch and Product Hunt",
    ],
    team: pitchData?.team || [
      { name: "Jane Smith", role: "CEO - Ex-Stripe, Stanford MBA" },
      { name: "John Doe", role: "CTO - Ex-Google, ML PhD" },
      { name: "Sarah Johnson", role: "Head of Product - Ex-Notion" },
      { name: "Mike Chen", role: "Head of Growth - Ex-Airbnb" },
    ],
    fundingAsk: pitchData?.fundingAsk || "Raising $2M Seed round to scale AI infrastructure, expand go-to-market, and grow team to 15. Target 3x revenue growth in 18 months.",
  };

  // Show loading state while generating pitch
  if (isGeneratingPitch) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate("/overview")}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Overview
            </Button>
            <h1 className="text-xl font-bold text-foreground">
              {productData.name || "Your Startup"} — Pitch Deck
            </h1>
            <div className="w-[120px]" />
          </div>
        </header>
        <div className="flex items-center justify-center min-h-[calc(100vh-73px)]">
          <motion.div
            className="flex flex-col items-center justify-center text-center px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Generating Your Investor Pitch</h2>
            <p className="text-sm text-muted-foreground max-w-md">
              Our AI is crafting a compelling pitch deck with market insights, traction metrics, and competitive analysis...
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/overview")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Overview
          </Button>
          <h1 className="text-xl font-bold text-foreground">
            {productData.name || "Your Startup"} — Pitch Deck
          </h1>
          <div className="w-[120px]" /> {/* Spacer for centering */}
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-73px)]">
        <main className="max-w-6xl mx-auto px-6 py-8 space-y-12">
          {/* Elevator Pitch Section */}
          <section>
            <ElevatorPitch initialPitch={pitch} onPitchChange={setPitch} />
          </section>

          {/* Company Snapshot */}
          <section>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6 font-mono"
            >
              Company Snapshot
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {snapshotMetrics.map((metric, index) => (
                <SnapshotCard key={metric.label} {...metric} delay={index} />
              ))}
            </div>
          </section>

          {/* Detailed Report */}
          <section>
            <DetailedReport report={reportData} />
          </section>

          {/* Connections */}
          <section>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6 font-mono"
            >
              Your Network
            </motion.h2>
            <ConnectionsSection />
          </section>
        </main>
      </ScrollArea>
    </div>
  );
};

export default FinalPitch;
