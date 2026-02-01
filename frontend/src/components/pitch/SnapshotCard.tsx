import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface SnapshotCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  description: string;
  delay?: number;
}

const SnapshotCard = ({ icon: Icon, label, value, description, delay = 0 }: SnapshotCardProps) => {
  const [displayValue, setDisplayValue] = useState("0");
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
      // Animate number if it starts with a digit
      if (/^\d/.test(value)) {
        const numericPart = parseInt(value.replace(/[^0-9]/g, ""));
        const suffix = value.replace(/[0-9]/g, "");
        let current = 0;
        const increment = numericPart / 30;
        const interval = setInterval(() => {
          current += increment;
          if (current >= numericPart) {
            setDisplayValue(value);
            clearInterval(interval);
          } else {
            setDisplayValue(Math.floor(current) + suffix);
          }
        }, 30);
        return () => clearInterval(interval);
      } else {
        setDisplayValue(value);
      }
    }, delay * 100);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="group relative"
    >
      <div className="bg-card border border-border rounded-xl p-6 h-full transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-[0_0_40px_rgba(0,255,204,0.1)]">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
        
        <div className="relative z-10">
          {/* Icon */}
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
            <Icon className="w-6 h-6 text-primary" />
          </div>

          {/* Label */}
          <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
            {label}
          </span>

          {/* Value */}
          <motion.div
            className="text-3xl font-bold text-foreground mt-2"
            initial={{ scale: 0.9 }}
            animate={{ scale: isAnimated ? 1 : 0.9 }}
          >
            {displayValue}
          </motion.div>

          {/* Description */}
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SnapshotCard;
