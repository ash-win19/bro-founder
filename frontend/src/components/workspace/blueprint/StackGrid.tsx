import { motion } from "framer-motion";
import { Layout, Database, Lock, Cloud } from "lucide-react";
import { Card } from "@/components/ui/card";

const stackItems = [
  {
    category: "Frontend",
    tech: "React + Tailwind",
    icon: Layout,
    description: "Component-based UI with utility-first CSS",
  },
  {
    category: "Backend",
    tech: "Supabase",
    icon: Database,
    description: "PostgreSQL with real-time subscriptions",
  },
  {
    category: "Auth",
    tech: "Clerk",
    icon: Lock,
    description: "Drop-in authentication & user management",
  },
  {
    category: "Hosting",
    tech: "Vercel",
    icon: Cloud,
    description: "Edge-optimized serverless deployment",
  },
];

const StackGrid = () => {
  return (
    <div className="mb-8">
      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 font-mono">
        Recommended Stack
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stackItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="bg-card border-border rounded p-4 hover:border-primary/50 hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.3)] transition-all duration-300 cursor-pointer group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                      {item.category}
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {item.tech}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground font-mono leading-relaxed">
                  {item.description}
                </p>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default StackGrid;
