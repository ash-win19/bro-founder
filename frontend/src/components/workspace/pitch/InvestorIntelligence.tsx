import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Investor {
  id: string;
  name: string;
  thesisFit: string;
  status: "warm-intro" | "cold-out" | "deck-sent";
  linkedIn: string;
}

const investors: Investor[] = [
  {
    id: "1",
    name: "Sequoia Capital",
    thesisFit: "Early-stage consumer, AI-first products",
    status: "warm-intro",
    linkedIn: "#",
  },
  {
    id: "2",
    name: "a16z Seed",
    thesisFit: "Marketplace dynamics, network effects",
    status: "deck-sent",
    linkedIn: "#",
  },
  {
    id: "3",
    name: "Felicis Ventures",
    thesisFit: "Pet economy thesis, repeat founder backing",
    status: "cold-out",
    linkedIn: "#",
  },
  {
    id: "4",
    name: "Lux Capital",
    thesisFit: "Deep tech + consumer intersection",
    status: "warm-intro",
    linkedIn: "#",
  },
];

const statusLabels: Record<Investor["status"], string> = {
  "warm-intro": "Warm Intro",
  "cold-out": "Cold Outreach",
  "deck-sent": "Deck Sent",
};

const InvestorIntelligence = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="mb-24"
    >
      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 font-mono">
        Capital Alignment
      </h2>
      <div className="border border-border rounded bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="font-mono text-xs">Firm / Angel</TableHead>
              <TableHead className="font-mono text-xs">Thesis Fit</TableHead>
              <TableHead className="w-40 font-mono text-xs">Contact Status</TableHead>
              <TableHead className="w-24 font-mono text-xs text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {investors.map((investor) => (
              <TableRow
                key={investor.id}
                className="border-border hover:bg-secondary/30 transition-colors group"
              >
                <TableCell className="font-semibold">{investor.name}</TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {investor.thesisFit}
                </TableCell>
                <TableCell>
                  <Select defaultValue={investor.status}>
                    <SelectTrigger className="h-8 text-xs font-mono w-full bg-secondary border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="warm-intro" className="font-mono text-xs">
                        Warm Intro
                      </SelectItem>
                      <SelectItem value="cold-out" className="font-mono text-xs">
                        Cold Outreach
                      </SelectItem>
                      <SelectItem value="deck-sent" className="font-mono text-xs">
                        Deck Sent
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 px-3 gap-2 font-mono text-xs bg-[#0077B5]/10 border-[#0077B5]/30 text-[#0077B5] hover:bg-[#0077B5]/20 hover:border-[#0077B5]/50"
                  >
                    <Linkedin className="w-3 h-3" />
                    <span className="hidden sm:inline">Connect</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
};

export default InvestorIntelligence;
