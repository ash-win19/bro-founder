import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts";
import { Star } from "lucide-react";
import { useProduct } from "@/contexts/ProductContext";

interface MatrixPoint {
  id: string;
  name: string;
  domain?: string;
  x: number;
  y: number;
  size: number;
  type: "user" | "competitor";
  logoUrl?: string | null;
}

interface CompetitorLogoProps {
  name: string;
  domain?: string;
  size: number;
  isUser?: boolean;
  onClick?: () => void;
}

const CompetitorLogo = ({ name, domain, size, isUser, onClick }: CompetitorLogoProps) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (domain && !isUser) {
      const clearbitUrl = `https://logo.clearbit.com/${domain}`;
      const img = new Image();
      img.onload = () => setLogoUrl(clearbitUrl);
      img.onerror = () => setHasError(true);
      img.src = clearbitUrl;
    }
  }, [domain, isUser]);

  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const pixelSize = Math.max(40, Math.min(size / 2, 80));

  if (isUser) {
    return (
      <motion.div
        onClick={onClick}
        className="cursor-pointer"
        animate={{
          boxShadow: [
            "0 0 20px rgba(0, 255, 204, 0.5)",
            "0 0 40px rgba(0, 255, 204, 0.8)",
            "0 0 20px rgba(0, 255, 204, 0.5)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: pixelSize,
          height: pixelSize,
          borderRadius: "50%",
          background: "linear-gradient(135deg, hsl(187 100% 50%), hsl(220 100% 60%))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Star className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
      </motion.div>
    );
  }

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.2 }}
      className="cursor-pointer rounded-full overflow-hidden bg-secondary flex items-center justify-center border border-border shadow-lg"
      style={{
        width: pixelSize,
        height: pixelSize,
      }}
    >
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
    </motion.div>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as MatrixPoint;
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-semibold text-foreground">{data.name}</p>
        <p className="text-xs text-muted-foreground mt-1">
          Depth: {data.x}% • Complexity: {data.y}%
        </p>
        {data.type === "user" && (
          <p className="text-xs text-primary mt-1 font-mono">Your Product</p>
        )}
      </div>
    );
  }
  return null;
};

const PositioningMatrix = () => {
  const { productData } = useProduct();

  const defaultCompetitors = [
    { name: "ChatGPT", domain: "openai.com", strength: "", weakness: "" },
    { name: "Notion AI", domain: "notion.so", strength: "", weakness: "" },
    { name: "Pitch Deck Gen", domain: "pitch.com", strength: "", weakness: "" },
  ];

  const matrixData: MatrixPoint[] = useMemo(() => {
    const userProduct: MatrixPoint = {
      id: "user",
      name: productData.name || "Your Product",
      x: 85,
      y: 90,
      size: 150,
      type: "user",
    };

    const competitors = productData.competitors.length > 0
      ? productData.competitors
      : defaultCompetitors;

    const competitorPoints: MatrixPoint[] = competitors.map((comp, index) => ({
      id: `competitor-${index}`,
      name: comp.name,
      domain: (comp as any).domain,
      x: 25 + index * 20,
      y: 30 + index * 15,
      size: 100 - index * 15,
      type: "competitor" as const,
    }));

    return [userProduct, ...competitorPoints];
  }, [productData]);

  const scrollToCompetitor = (competitorId: string) => {
    const element = document.getElementById(competitorId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-card border border-border rounded-2xl p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm font-mono text-primary font-bold">04</span>
        <h3 className="text-lg font-semibold text-foreground uppercase tracking-wide">
          Competitive Landscape
        </h3>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-primary to-blue-500 shadow-[0_0_10px_hsl(187_100%_50%_/_0.5)] flex items-center justify-center">
            <Star className="w-2.5 h-2.5 text-primary-foreground fill-primary-foreground" />
          </div>
          <span className="text-xs text-muted-foreground">Your Product</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-secondary border border-border" />
          <span className="text-xs text-muted-foreground">Competitors</span>
        </div>
      </div>

      <div className="h-[350px] w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 20 }}>
            <defs>
              <linearGradient id="premiumZone" x1="0.5" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(187 100% 50%)" stopOpacity={0.02} />
                <stop offset="100%" stopColor="hsl(187 100% 50%)" stopOpacity={0.08} />
              </linearGradient>
            </defs>

            {/* Premium zone background */}
            <rect x="50%" y="0" width="50%" height="50%" fill="url(#premiumZone)" />

            <XAxis
              type="number"
              dataKey="x"
              domain={[0, 100]}
              tick={{ fill: "hsl(215 20% 55%)", fontSize: 10 }}
              tickLine={{ stroke: "hsl(222 30% 18%)" }}
              axisLine={{ stroke: "hsl(222 30% 18%)" }}
              label={{
                value: "Depth of Analysis →",
                position: "bottom",
                offset: 20,
                style: { fill: "hsl(215 20% 55%)", fontSize: 11, fontFamily: "JetBrains Mono" },
              }}
            />
            <YAxis
              type="number"
              dataKey="y"
              domain={[0, 100]}
              tick={{ fill: "hsl(215 20% 55%)", fontSize: 10 }}
              tickLine={{ stroke: "hsl(222 30% 18%)" }}
              axisLine={{ stroke: "hsl(222 30% 18%)" }}
              label={{
                value: "Complexity Handling ↑",
                angle: -90,
                position: "insideLeft",
                offset: 10,
                style: { fill: "hsl(215 20% 55%)", fontSize: 11, fontFamily: "JetBrains Mono" },
              }}
            />

            <ReferenceLine x={50} stroke="hsl(222 30% 18%)" strokeDasharray="3 3" />
            <ReferenceLine y={50} stroke="hsl(222 30% 18%)" strokeDasharray="3 3" />

            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: "3 3" }} />

            <Scatter data={matrixData} shape="circle">
              {matrixData.map((entry) => (
                <Cell
                  key={entry.id}
                  fill={entry.type === "user" ? "hsl(187 100% 50%)" : "hsl(215 20% 55%)"}
                  fillOpacity={entry.type === "user" ? 1 : 0.6}
                  stroke={entry.type === "user" ? "hsl(187 100% 50%)" : "transparent"}
                  strokeWidth={entry.type === "user" ? 2 : 0}
                  style={{
                    filter:
                      entry.type === "user"
                        ? "drop-shadow(0 0 8px hsl(187 100% 50% / 0.6))"
                        : "none",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (entry.type === "competitor") {
                      scrollToCompetitor(entry.id);
                    }
                  }}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Quadrant labels */}
      <div className="flex justify-between mt-4 text-xs font-mono">
        <span className="text-destructive/60">Commodity Zone ↙</span>
        <span className="text-primary/80">Premium Zone ↗</span>
      </div>

      {/* Clickable Logo Row */}
      <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-border">
        {matrixData.map((point) => (
          <div
            key={point.id}
            className="flex flex-col items-center gap-1"
            title={`${point.name} - Position: ${point.x}/${point.y}`}
          >
            <CompetitorLogo
              name={point.name}
              domain={point.domain}
              size={point.size}
              isUser={point.type === "user"}
              onClick={() => {
                if (point.type === "competitor") {
                  scrollToCompetitor(point.id);
                }
              }}
            />
            <span className="text-[10px] font-mono text-muted-foreground text-center max-w-[60px] truncate">
              {point.name}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default PositioningMatrix;
