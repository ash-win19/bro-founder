import { motion } from "framer-motion";
import { Download, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface OverviewHeroProps {
  productName: string;
  coreFunction: string;
  lastUpdated: Date;
}

const OverviewHero = ({ productName, coreFunction, lastUpdated }: OverviewHeroProps) => {
  const { toast } = useToast();

  const handleExport = (format: string) => {
    toast({
      title: `Exporting as ${format.toUpperCase()}`,
      description: "Your export will be ready shortly.",
    });
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-card border-b border-border px-6 lg:px-8 h-20 flex items-center shrink-0"
    >
      <div className="w-full flex items-center justify-between gap-4">
        {/* Left: Logo + Product Name */}
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-xl shrink-0">🚀</span>
          <h1 className="text-lg md:text-xl font-bold text-foreground tracking-tight truncate">
            {productName.toUpperCase()}
          </h1>
          <span className="hidden md:inline text-muted-foreground">—</span>
          <span className="hidden md:inline text-sm text-muted-foreground font-mono truncate">
            Overview
          </span>
        </div>

        {/* Center: Last Updated (hidden on mobile) */}
        <p className="hidden lg:block text-xs font-mono text-muted-foreground/60">
          Last updated: {lastUpdated.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          })}
        </p>

        {/* Right: Export Button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 shrink-0">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
              <ChevronDown className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleExport("pdf")}>
              Export as PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport("markdown")}>
              Export as Markdown
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport("json")}>
              Export as JSON
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.header>
  );
};

export default OverviewHero;
