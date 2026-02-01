import { motion } from "framer-motion";
import { Linkedin, Users, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BriefSection from "./BriefSection";

// Investor data - reframed without confidence badges
const investors = [
  { name: "SeedCamp", focus: "DevTools, European founders", sector: "AI SaaS" },
  { name: "Jason Calacanis", focus: "Angel investor, early-stage", sector: "Marketplaces" },
  { name: "First Round", focus: "Consumer and enterprise mix", sector: "B2B Software" },
  { name: "Founder Collective", focus: "Founder-friendly terms", sector: "AI Startups" },
  { name: "Y Combinator", focus: "Batch applications", sector: "Tech Startups" },
];

// Builder data - reframed without match percentages
const builders = [
  { name: "Alex Chen", initials: "AC", skill: "Full Stack Development", context: "Building in similar problem space" },
  { name: "Maya Rodriguez", initials: "MR", skill: "Product Design", context: "Experience with founder tools" },
  { name: "Jordan Park", initials: "JP", skill: "Growth & Marketing", context: "B2C SaaS background" },
];

const generateLinkedInUrl = (name: string, sector: string) => {
  const query = encodeURIComponent(`${name} ${sector}`);
  return `https://www.linkedin.com/search/results/all/?keywords=${query}`;
};

const ConnectionsSection = () => {
  return (
    <BriefSection title="Relevant People to Talk To">
      <p className="text-sm text-muted-foreground mb-6">
        Suggestions based on available signals. No endorsements implied.
      </p>
      
      <Card className="bg-card/50 border-border/50 p-6">
        <Tabs defaultValue="investors" className="w-full">
          <TabsList className="w-full justify-start mb-6 bg-muted/30">
            <TabsTrigger value="investors" className="flex-1">
              <Users className="mr-2 h-4 w-4" />
              Investors
            </TabsTrigger>
            <TabsTrigger value="builders" className="flex-1">
              <MessageCircle className="mr-2 h-4 w-4" />
              Builders
            </TabsTrigger>
          </TabsList>

          <TabsContent value="investors" className="space-y-3">
            {investors.map((investor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border/30"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{investor.name}</h4>
                  <p className="text-sm text-muted-foreground">{investor.focus}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="font-mono text-xs"
                >
                  <a
                    href={generateLinkedInUrl(investor.name, investor.sector)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="mr-2 h-4 w-4" />
                    View Profile
                  </a>
                </Button>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="builders" className="space-y-3">
            {builders.map((builder, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border/30"
              >
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-secondary text-xs font-mono">
                      {builder.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-foreground">{builder.name}</h4>
                    <p className="text-sm text-primary font-mono">{builder.skill}</p>
                    <p className="text-sm text-muted-foreground">{builder.context}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="font-mono text-xs">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Reach Out
                </Button>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>
      </Card>
    </BriefSection>
  );
};

export default ConnectionsSection;
