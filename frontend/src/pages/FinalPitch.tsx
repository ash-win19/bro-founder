import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Target, TrendingUp, DollarSign, Rocket, Users, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ElevatorPitch from "@/components/pitch/ElevatorPitch";
import SnapshotCard from "@/components/pitch/SnapshotCard";
import DetailedReport from "@/components/pitch/DetailedReport";
import ConnectionsSection from "@/components/pitch/ConnectionsSection";
import { useProduct } from "@/contexts/ProductContext";

const FinalPitch = () => {
  const navigate = useNavigate();
  const { productData } = useProduct();
  
  const [pitch, setPitch] = useState(
    productData.name
      ? `${productData.name} is solving ${productData.problemStatement || "a critical problem"} for ${productData.targetUsers || "our target users"}. ${productData.solution || "Our innovative solution"} creates a ${productData.marketSize || "$50B+"} market opportunity. We're raising to capture market share and build the definitive platform in this space.`
      : "We're building the future of startup validation. Our AI-powered platform analyzes market data, competitor landscapes, and funding trends to give founders a clear go/no-go signal in minutes, not months. With 500+ startups validated and a 94% accuracy rate on our recommendations, we're saving founders precious time and investors from bad bets."
  );

  const snapshotMetrics = [
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
    marketOpportunity: productData.problemStatement
      ? `${productData.problemStatement} This represents a massive opportunity in a ${productData.marketSize || "$50B+"} market that is growing rapidly. The shift toward AI-powered solutions creates a unique window for new entrants to capture significant market share.`
      : "The startup ecosystem generates $300B+ in annual funding, yet 90% of startups fail. Most failures stem from building products nobody wants. Our platform addresses this fundamental problem by providing data-driven validation before founders commit resources.",
    competitiveAdvantage: productData.differentiators.length > 0
      ? productData.differentiators
      : [
          "AI-powered analysis with 94% prediction accuracy",
          "Real-time market data integration from 50+ sources",
          "10x faster validation vs traditional methods",
          "Built-in investor matching algorithm",
          "Proprietary dataset of 100K+ startup outcomes",
        ],
    businessModel: productData.revenueModel
      ? `${productData.revenueModel}. ${productData.pricing ? `Pricing: ${productData.pricing}` : ""}`
      : "SaaS subscription model with three tiers: Starter ($49/mo), Pro ($149/mo), and Enterprise (custom pricing). Additional revenue streams include premium investor matching fees (15% of successful intros) and white-label partnerships with accelerators.",
    traction: [
      "500+ active users across 12 countries",
      "$48K MRR with 127% YoY growth",
      "92% user retention after 3 months",
      "Partnerships with 3 top-20 accelerators",
      "Featured in TechCrunch and Product Hunt",
    ],
    team: [
      { name: "Jane Smith", role: "CEO - Ex-Stripe, Stanford MBA" },
      { name: "John Doe", role: "CTO - Ex-Google, ML PhD" },
      { name: "Sarah Johnson", role: "Head of Product - Ex-Notion" },
      { name: "Mike Chen", role: "Head of Growth - Ex-Airbnb" },
    ],
    fundingAsk: "Raising $2M Seed round to scale AI infrastructure, expand go-to-market, and grow team to 15. Target 3x revenue growth in 18 months.",
  };

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
