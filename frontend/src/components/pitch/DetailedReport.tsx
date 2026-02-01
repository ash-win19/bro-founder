import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Download, FileText, Copy, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";

interface ReportData {
  marketOpportunity: string;
  competitiveAdvantage: string[];
  businessModel: string;
  traction: string[];
  team: Array<{ name: string; role: string }>;
  fundingAsk: string;
}

interface DetailedReportProps {
  report: ReportData;
}

const DetailedReport = ({ report }: DetailedReportProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleCopyMarkdown = () => {
    const markdown = `
# Business Report

## Market Opportunity
${report.marketOpportunity}

## Competitive Advantage
${report.competitiveAdvantage.map((item) => `- ${item}`).join("\n")}

## Business Model
${report.businessModel}

## Traction & Milestones
${report.traction.map((item) => `- ${item}`).join("\n")}

## Team
${report.team.map((member) => `- **${member.name}**: ${member.role}`).join("\n")}

## Funding Ask
${report.fundingAsk}
    `.trim();

    navigator.clipboard.writeText(markdown);
    toast({
      title: "Copied as Markdown",
      description: "Report copied to clipboard in Markdown format.",
    });
  };

  const handleDownloadPDF = () => {
    toast({
      title: "Generating PDF...",
      description: "Your report will download shortly.",
    });
    // Mock PDF generation
    setTimeout(() => {
      toast({
        title: "PDF Ready",
        description: "Report downloaded successfully.",
      });
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <Card className="bg-card border-border overflow-hidden">
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between p-6 hover:bg-secondary/30 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold text-foreground">Full Business Report</h2>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              </motion.div>
            </div>
          </CollapsibleTrigger>

          <AnimatePresence>
            {isOpen && (
              <CollapsibleContent forceMount>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-6 pb-6 space-y-8">
                    {/* Export buttons */}
                    <div className="flex flex-wrap gap-3 pt-2 border-t border-border">
                      <Button onClick={handleDownloadPDF} variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                      <Button onClick={handleCopyMarkdown} variant="outline" size="sm">
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Markdown
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mail className="w-4 h-4 mr-2" />
                        Email Report
                      </Button>
                    </div>

                    {/* Market Opportunity */}
                    <section>
                      <h3 className="text-lg font-semibold text-foreground mb-3 font-mono">
                        01 — Market Opportunity
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {report.marketOpportunity}
                      </p>
                    </section>

                    {/* Competitive Advantage */}
                    <section>
                      <h3 className="text-lg font-semibold text-foreground mb-3 font-mono">
                        02 — Competitive Advantage
                      </h3>
                      <ul className="space-y-2">
                        {report.competitiveAdvantage.map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="text-primary mt-1">▸</span>
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </section>

                    {/* Business Model */}
                    <section>
                      <h3 className="text-lg font-semibold text-foreground mb-3 font-mono">
                        03 — Business Model
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {report.businessModel}
                      </p>
                    </section>

                    {/* Traction */}
                    <section>
                      <h3 className="text-lg font-semibold text-foreground mb-3 font-mono">
                        04 — Traction & Milestones
                      </h3>
                      <ul className="space-y-2">
                        {report.traction.map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="text-primary mt-1">✓</span>
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </section>

                    {/* Team */}
                    <section>
                      <h3 className="text-lg font-semibold text-foreground mb-3 font-mono">
                        05 — Team
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {report.team.map((member, index) => (
                          <div
                            key={index}
                            className="bg-secondary/30 rounded-lg p-4 border border-border"
                          >
                            <p className="font-semibold text-foreground">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Funding Ask */}
                    <section>
                      <h3 className="text-lg font-semibold text-foreground mb-3 font-mono">
                        06 — Funding Ask
                      </h3>
                      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6 border border-primary/20">
                        <p className="text-lg text-foreground font-medium">
                          {report.fundingAsk}
                        </p>
                      </div>
                    </section>
                  </div>
                </motion.div>
              </CollapsibleContent>
            )}
          </AnimatePresence>
        </Card>
      </Collapsible>
    </motion.div>
  );
};

export default DetailedReport;
