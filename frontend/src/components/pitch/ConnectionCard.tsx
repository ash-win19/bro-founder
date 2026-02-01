import { memo } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ConnectionCardProps {
  name: string;
  title: string;
  company: string;
  tags: string[];
  matchScore: number;
  initials: string;
  type: "investor" | "builder";
  index: number;
}

const ConnectionCard = memo(({
  name,
  title,
  company,
  tags,
  matchScore,
  initials,
  type,
  index,
}: ConnectionCardProps) => {
  const getMatchColor = (score: number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 70) return "text-yellow-400";
    return "text-muted-foreground";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <div className="bg-card border border-border rounded-xl p-5 h-full transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-[0_0_30px_rgba(0,255,204,0.08)]">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <Avatar className="w-12 h-12 border-2 border-border group-hover:border-primary/40 transition-colors">
            <AvatarFallback className="bg-secondary text-sm font-mono font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-semibold text-foreground truncate">{name}</h4>
              <span className={`font-mono text-sm font-bold ${getMatchColor(matchScore)}`}>
                {matchScore}%
              </span>
            </div>
            <p className="text-sm text-muted-foreground truncate">
              {title} @ {company}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {tags.slice(0, 3).map((tag, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="text-xs font-mono border-border/50 text-muted-foreground"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="mt-4 pt-4 border-t border-border/50">
          <Button
            variant="outline"
            size="sm"
            className="w-full group-hover:border-primary/50 group-hover:text-primary transition-colors"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            {type === "investor" ? "Request Intro" : "Connect"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
});

ConnectionCard.displayName = "ConnectionCard";

export default ConnectionCard;
