import { useState } from "react";
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Feature {
  id: string;
  priority: "P0" | "P1";
  name: string;
  technicalImplication: string;
  effort: string;
}

const initialFeatures: Feature[] = [
  {
    id: "1",
    priority: "P0",
    name: "User Authentication",
    technicalImplication: "OAuth2 + JWT session management",
    effort: "2 days",
  },
  {
    id: "2",
    priority: "P0",
    name: "Chat Interface",
    technicalImplication: "WebSocket for real-time messaging",
    effort: "3 days",
  },
  {
    id: "3",
    priority: "P0",
    name: "LLM Integration",
    technicalImplication: "OpenAI API with streaming responses",
    effort: "2 days",
  },
  {
    id: "4",
    priority: "P1",
    name: "Conversation History",
    technicalImplication: "PostgreSQL with pagination queries",
    effort: "1 day",
  },
  {
    id: "5",
    priority: "P1",
    name: "Export to PDF",
    technicalImplication: "Server-side PDF generation (Puppeteer)",
    effort: "1 day",
  },
  {
    id: "6",
    priority: "P1",
    name: "GitHub Integration",
    technicalImplication: "GitHub API + Markdown generation",
    effort: "2 days",
  },
];

const FeatureList = () => {
  const [features, setFeatures] = useState<Feature[]>(initialFeatures);
  const [rejectedIds, setRejectedIds] = useState<Set<string>>(new Set());

  const toggleFeature = (id: string) => {
    setRejectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.4 }}
      className="mb-8"
    >
      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 font-mono">
        MVP Feature List
      </h2>
      <div className="border border-border rounded bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="w-12"></TableHead>
              <TableHead className="w-20 font-mono text-xs">Priority</TableHead>
              <TableHead className="font-mono text-xs">Feature</TableHead>
              <TableHead className="font-mono text-xs">Technical Implication</TableHead>
              <TableHead className="w-24 font-mono text-xs text-right">Est. Effort</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {features.map((feature) => {
              const isRejected = rejectedIds.has(feature.id);
              return (
                <TableRow
                  key={feature.id}
                  className={`border-border transition-opacity ${isRejected ? "opacity-40" : ""}`}
                >
                  <TableCell>
                    <Checkbox
                      checked={!isRejected}
                      onCheckedChange={() => toggleFeature(feature.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={feature.priority === "P0" ? "default" : "secondary"}
                      className={`font-mono text-xs ${
                        feature.priority === "P0"
                          ? "bg-destructive/20 text-destructive border-destructive/30"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {feature.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className={`font-medium ${isRejected ? "line-through" : ""}`}>
                    {feature.name}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {feature.technicalImplication}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-right text-primary">
                    {feature.effort}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
};

export default FeatureList;
