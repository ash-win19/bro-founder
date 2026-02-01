import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { X, Sparkles, Users, DollarSign, Receipt, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProduct } from "@/contexts/ProductContext";

interface MVPSection {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  value: number;
  content: string[];
}

// Custom label component to render icons on the pie chart
const renderCustomizedLabel = (
  sections: MVPSection[]
) => ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  index,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  index: number;
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  const section = sections[index];

  return (
    <foreignObject
      x={x - 14}
      y={y - 14}
      width={28}
      height={28}
      style={{ pointerEvents: "none" }}
    >
      <div className="flex items-center justify-center w-full h-full text-white drop-shadow-lg">
        {section.icon}
      </div>
    </foreignObject>
  );
};

const MVPCanvas = () => {
  const { productData, overviewData } = useProduct();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Generate sections dynamically from productData and overviewData
  const sections = useMemo<MVPSection[]>(() => {
    return [
      {
        id: "value",
        label: "Value Proposition",
        icon: <Sparkles className="w-5 h-5" />,
        color: "hsl(45 100% 60%)",
        value: 1,
        content: overviewData?.keyFeatures || productData.coreFeatures || [
          "Define your core features",
          "What makes your product unique?",
        ],
      },
      {
        id: "segments",
        label: "Customer Segments",
        icon: <Users className="w-5 h-5" />,
        color: "hsl(280 80% 60%)",
        value: 1,
        content: [
          overviewData?.targetMarket || productData.targetUsers || "Target customers to be defined",
        ],
      },
      {
        id: "revenue",
        label: "Revenue Streams",
        icon: <DollarSign className="w-5 h-5" />,
        color: "hsl(150 80% 45%)",
        value: 1,
        content: [
          overviewData?.businessModelSummary || productData.revenueModel || "Revenue model to be defined",
          productData.pricing ? `Pricing: ${productData.pricing}` : "Pricing to be determined",
        ],
      },
      {
        id: "cost",
        label: "Cost Structure",
        icon: <Receipt className="w-5 h-5" />,
        color: "hsl(0 75% 55%)",
        value: 1,
        content: productData.techStack.length > 0
          ? productData.techStack.map(tech => `${tech} infrastructure`)
          : ["Infrastructure costs (variable)", "Development costs (fixed)"],
      },
      {
        id: "goals",
        label: "Goals",
        icon: <Target className="w-5 h-5" />,
        color: "hsl(187 100% 50%)",
        value: 1,
        content: productData.timeline
          ? [`Timeline: ${productData.timeline}`, "Launch MVP", "Achieve product-market fit"]
          : ["Define MVP timeline", "Set measurable goals"],
      },
    ];
  }, [productData, overviewData]);

  const [editableSections, setEditableSections] = useState<MVPSection[]>(sections);

  // Sync editableSections when sections change (when productData updates)
  useEffect(() => {
    setEditableSections(sections);
  }, [sections]);

  const handleSectionClick = (sectionId: string) => {
    if (expandedSection === sectionId) {
      setExpandedSection(null);
    } else {
      setExpandedSection(sectionId);
    }
  };

  const handleContentEdit = (sectionId: string, index: number, newValue: string) => {
    setEditableSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? { ...s, content: s.content.map((c, i) => (i === index ? newValue : c)) }
          : s
      )
    );
  };

  const expandedData = editableSections.find((s) => s.id === expandedSection);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      className="bg-card border border-border rounded-2xl p-6"
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="text-sm font-mono text-primary font-bold">02</span>
        <h3 className="text-lg font-semibold text-foreground uppercase tracking-wide">
          MVP Canvas
        </h3>
      </div>
      <p className="text-xs text-muted-foreground mb-6">
        Click any section to explore details
      </p>

      {/* Donut Chart with Icons */}
      <div className="h-[320px] w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={editableSections}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={130}
              paddingAngle={3}
              onClick={(_, index) => handleSectionClick(editableSections[index].id)}
              label={renderCustomizedLabel(editableSections)}
              labelLine={false}
              isAnimationActive={false}
            >
              {editableSections.map((section) => (
                <Cell
                  key={section.id}
                  fill={section.color}
                  style={{
                    cursor: "pointer",
                    filter:
                      expandedSection === section.id
                        ? `brightness(1.3) drop-shadow(0 0 12px ${section.color})`
                        : "brightness(1)",
                    transition: "filter 0.3s ease",
                  }}
                  stroke={expandedSection === section.id ? section.color : "transparent"}
                  strokeWidth={expandedSection === section.id ? 3 : 0}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <span className="text-2xl">🎯</span>
            <p className="text-xs font-mono text-muted-foreground mt-1">MVP</p>
          </div>
        </div>
      </div>

      {/* Expanded Section Panel */}
      <AnimatePresence>
        {expandedData && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-6 p-5 bg-secondary/30 rounded-xl border border-border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span style={{ color: expandedData.color }}>{expandedData.icon}</span>
                  <h4 className="text-base font-semibold text-foreground uppercase">
                    {expandedData.label}
                  </h4>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setExpandedSection(null)}
                  className="h-8 w-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <ul className="space-y-2">
                {expandedData.content.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary mt-2.5">•</span>
                    <Input
                      value={item}
                      onChange={(e) => handleContentEdit(expandedData.id, i, e.target.value)}
                      className="flex-1 bg-card border-border text-sm text-foreground"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MVPCanvas;
