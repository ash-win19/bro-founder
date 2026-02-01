import { useState, memo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, X, ExternalLink, Star } from "lucide-react";
import { Competitor } from "@/contexts/ProductContext";

interface ExtendedCompetitor extends Competitor {
  domain?: string;
  website?: string;
  pricing?: string;
  overview?: string;
  examples?: string[];
}

interface CompetitorCardProps {
  competitor: ExtendedCompetitor;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

const CompetitorLogo = ({ name, domain }: { name: string; domain?: string }) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (domain) {
      const clearbitUrl = `https://logo.clearbit.com/${domain}`;
      const img = new Image();
      img.onload = () => setLogoUrl(clearbitUrl);
      img.onerror = () => setHasError(true);
      img.src = clearbitUrl;
    }
  }, [domain]);

  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="rounded-full overflow-hidden bg-secondary flex items-center justify-center border border-border shrink-0 w-12 h-12">
      {logoUrl && !hasError ? (
        <img
          src={logoUrl}
          alt={name}
          className="w-full h-full object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <span className="text-sm font-bold text-muted-foreground">{initials}</span>
      )}
    </div>
  );
};

const renderStars = (score: number, max: number = 3) => (
  <div className="flex gap-0.5">
    {Array.from({ length: max }).map((_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < score
            ? "text-primary fill-primary"
            : "text-muted-foreground/30"
        }`}
      />
    ))}
  </div>
);

const CompetitorCard = memo(({ competitor, index, isExpanded, onToggle }: CompetitorCardProps) => {
  const featureScores = {
    marketResearch: 2,
    backendDesign: 0,
    riskAnalysis: 0,
    pitchGeneration: 1,
    uiGeneration: 1,
  };

  return (
    <motion.div
      id={`competitor-${index}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300"
    >
      {/* Collapsed View */}
      <button
        onClick={onToggle}
        className="w-full p-4 text-left hover:bg-secondary/30 transition-colors"
      >
        <div className="flex items-start gap-4">
          <CompetitorLogo name={competitor.name} domain={competitor.domain} />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h4 className="text-base font-semibold text-foreground truncate">
                {competitor.name}
              </h4>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="shrink-0"
              >
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] font-mono text-primary uppercase">Strength</span>
                <p className="text-xs text-muted-foreground line-clamp-1">{competitor.strength}</p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-destructive uppercase">Gap</span>
                <p className="text-xs text-destructive/70 line-clamp-1">{competitor.weakness}</p>
              </div>
            </div>
          </div>
        </div>
      </button>

      {/* Expanded View */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4 border-t border-border">
              {/* Overview */}
              <div className="pt-4">
                <h5 className="text-xs font-mono text-muted-foreground uppercase mb-2">Overview</h5>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {competitor.overview ||
                    `General-purpose solution that competes in the same space but lacks startup-specific depth and technical architecture guidance.`}
                </p>
              </div>

              {/* Strengths */}
              <div>
                <h5 className="text-xs font-mono text-primary uppercase mb-2 flex items-center gap-2">
                  <Check className="w-3 h-3" /> Strengths
                </h5>
                <ul className="space-y-1.5">
                  <li className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="text-primary">•</span> {competitor.strength}
                  </li>
                  <li className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="text-primary">•</span> Fast responses
                  </li>
                  <li className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="text-primary">•</span> Natural conversation
                  </li>
                </ul>
              </div>

              {/* Gaps */}
              <div>
                <h5 className="text-xs font-mono text-destructive uppercase mb-2 flex items-center gap-2">
                  <X className="w-3 h-3" /> Gaps (Your Advantages)
                </h5>
                <ul className="space-y-1.5">
                  <li className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="text-destructive">•</span> {competitor.weakness}
                  </li>
                  <li className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="text-destructive">•</span> No backend architecture
                  </li>
                  <li className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="text-destructive">•</span> No Build/Pivot/Kill framework
                  </li>
                </ul>
              </div>

              {/* Feature Comparison */}
              <div>
                <h5 className="text-xs font-mono text-muted-foreground uppercase mb-3 flex items-center gap-2">
                  📊 Feature Comparison
                </h5>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Market Research</span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <span className="text-muted-foreground/60 w-8">You</span>
                        {renderStars(3)}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-muted-foreground/60 w-12">Them</span>
                        {renderStars(featureScores.marketResearch)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Backend Design</span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <span className="text-muted-foreground/60 w-8">You</span>
                        {renderStars(3)}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-muted-foreground/60 w-12">Them</span>
                        {renderStars(featureScores.backendDesign)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Risk Analysis</span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <span className="text-muted-foreground/60 w-8">You</span>
                        {renderStars(3)}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-muted-foreground/60 w-12">Them</span>
                        {renderStars(featureScores.riskAnalysis)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Pitch Generation</span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <span className="text-muted-foreground/60 w-8">You</span>
                        {renderStars(1)}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-muted-foreground/60 w-12">Them</span>
                        {renderStars(featureScores.pitchGeneration)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Links */}
              <div className="pt-2 border-t border-border/50 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  💰 Pricing: {competitor.pricing || "Free / Premium tiers"}
                </span>
                {competitor.website && (
                  <a
                    href={competitor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary flex items-center gap-1 hover:underline"
                  >
                    Website <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

CompetitorCard.displayName = "CompetitorCard";

interface CompetitorCardsGridProps {
  competitors: Competitor[];
}

const CompetitorCardsGrid = ({ competitors }: CompetitorCardsGridProps) => {
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  const toggleCard = (index: number) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const displayCompetitors: ExtendedCompetitor[] =
    competitors.length > 0
      ? competitors.map((c) => ({ ...c, domain: undefined }))
      : [
          {
            name: "ChatGPT",
            domain: "openai.com",
            strength: "Broad knowledge base",
            weakness: "No startup-specific depth",
            website: "https://chat.openai.com",
            pricing: "Free / $20/mo",
          },
          {
            name: "Notion AI",
            domain: "notion.so",
            strength: "Seamless workspace integration",
            weakness: "No decision framework",
            website: "https://notion.so",
            pricing: "$10/mo add-on",
          },
          {
            name: "Pitch Deck Generators",
            domain: "pitch.com",
            strength: "Visual outputs",
            weakness: "Surface-level analysis",
            website: "https://pitch.com",
            pricing: "Freemium",
          },
        ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3 mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Competitive Analysis: Click any competitor to see detailed comparison
        </h3>
      </div>
      
      {/* Single column stack for cleaner appearance */}
      <div className="space-y-3">
        {displayCompetitors.map((competitor, index) => (
          <CompetitorCard
            key={index}
            competitor={competitor}
            index={index}
            isExpanded={expandedCards.has(index)}
            onToggle={() => toggleCard(index)}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default CompetitorCardsGrid;
