import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const builders = [
  {
    id: "1",
    name: "Alex Chen",
    role: "Full Stack Dev",
    synergy: 96,
    match: "Also building in PetTech",
    initials: "AC",
  },
  {
    id: "2",
    name: "Maya Rodriguez",
    role: "Product Designer",
    synergy: 91,
    match: "Ex-Chewy, AI/ML focus",
    initials: "MR",
  },
  {
    id: "3",
    name: "Jordan Park",
    role: "Growth Marketer",
    synergy: 88,
    match: "B2C SaaS experience",
    initials: "JP",
  },
];

const BuilderMatch = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 font-mono">
        Builder Signal
      </h2>
      <div className="space-y-3">
        {builders.map((builder, index) => (
          <motion.div
            key={builder.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
          >
            <Card className="bg-card border-border rounded p-4 hover:border-primary/30 transition-colors group">
              <div className="flex items-start gap-4">
                <Avatar className="w-10 h-10 border border-border">
                  <AvatarFallback className="bg-secondary text-xs font-mono">
                    {builder.initials}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm text-foreground">{builder.name}</span>
                    <span className="font-mono text-xs text-primary">
                      {builder.synergy}% Match
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono mb-2">{builder.role}</p>
                  <p className="text-xs text-muted-foreground/80 italic">{builder.match}</p>
                </div>

                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default BuilderMatch;
