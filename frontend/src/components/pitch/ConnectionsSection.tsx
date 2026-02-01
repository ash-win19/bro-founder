import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import ConnectionCard from "./ConnectionCard";

interface Connection {
  id: string;
  name: string;
  title: string;
  company: string;
  tags: string[];
  matchScore: number;
  initials: string;
  type: "investor" | "builder";
}

const mockInvestors: Connection[] = [
  { id: "1", name: "Sarah Chen", title: "Partner", company: "Sequoia Capital", tags: ["Series A", "SaaS", "$2-10M"], matchScore: 96, initials: "SC", type: "investor" },
  { id: "2", name: "Michael Foster", title: "GP", company: "a16z", tags: ["Seed", "AI/ML", "$500K-2M"], matchScore: 92, initials: "MF", type: "investor" },
  { id: "3", name: "Emily Wong", title: "Principal", company: "Accel", tags: ["Pre-seed", "B2B", "$250K-1M"], matchScore: 89, initials: "EW", type: "investor" },
  { id: "4", name: "David Kim", title: "Founding Partner", company: "Founders Fund", tags: ["Series A", "DeepTech", "$5-15M"], matchScore: 85, initials: "DK", type: "investor" },
  { id: "5", name: "Rachel Martinez", title: "Investor", company: "First Round", tags: ["Seed", "Consumer", "$1-3M"], matchScore: 82, initials: "RM", type: "investor" },
  { id: "6", name: "James Liu", title: "Partner", company: "GV", tags: ["Series B", "Enterprise", "$10-25M"], matchScore: 78, initials: "JL", type: "investor" },
];

const mockBuilders: Connection[] = [
  { id: "7", name: "Alex Thompson", title: "Full Stack Engineer", company: "Ex-Stripe", tags: ["React", "Node.js", "AWS"], matchScore: 94, initials: "AT", type: "builder" },
  { id: "8", name: "Maya Patel", title: "Product Designer", company: "Ex-Figma", tags: ["UI/UX", "Design Systems", "Mobile"], matchScore: 91, initials: "MP", type: "builder" },
  { id: "9", name: "Jordan Lee", title: "ML Engineer", company: "Ex-OpenAI", tags: ["Python", "LLMs", "MLOps"], matchScore: 88, initials: "JL", type: "builder" },
  { id: "10", name: "Chris Rodriguez", title: "Growth Lead", company: "Ex-Airbnb", tags: ["B2C", "Marketing", "Analytics"], matchScore: 85, initials: "CR", type: "builder" },
  { id: "11", name: "Sam Johnson", title: "Backend Engineer", company: "Ex-Netflix", tags: ["Go", "Kubernetes", "Microservices"], matchScore: 81, initials: "SJ", type: "builder" },
  { id: "12", name: "Taylor Swift", title: "Mobile Dev", company: "Ex-Instagram", tags: ["iOS", "React Native", "Swift"], matchScore: 79, initials: "TS", type: "builder" },
];

const ConnectionsSection = () => {
  const [activeTab, setActiveTab] = useState<"investors" | "builders">("investors");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);

  const connections = activeTab === "investors" ? mockInvestors : mockBuilders;

  const filteredConnections = useMemo(() => {
    if (!searchQuery) return connections;
    const query = searchQuery.toLowerCase();
    return connections.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.company.toLowerCase().includes(query) ||
        c.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }, [connections, searchQuery]);

  const visibleConnections = filteredConnections.slice(0, visibleCount);
  const hasMore = visibleCount < filteredConnections.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v as "investors" | "builders"); setVisibleCount(6); }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <TabsList className="bg-secondary/50">
            <TabsTrigger value="investors" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Potential Investors
            </TabsTrigger>
            <TabsTrigger value="builders" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Fellow Builders
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, company, or tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary/50 border-border"
              />
            </div>
            <Button variant="outline" size="icon" className="shrink-0">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="investors" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleConnections.map((connection, index) => (
              <ConnectionCard key={connection.id} {...connection} index={index} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="builders" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleConnections.map((connection, index) => (
              <ConnectionCard key={connection.id} {...connection} index={index} />
            ))}
          </div>
        </TabsContent>

        {hasMore && (
          <div className="flex justify-center mt-8">
            <Button variant="outline" onClick={handleLoadMore}>
              Load More ({filteredConnections.length - visibleCount} remaining)
            </Button>
          </div>
        )}

        {filteredConnections.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No connections found matching "{searchQuery}"
          </div>
        )}
      </Tabs>
    </motion.div>
  );
};

export default ConnectionsSection;
