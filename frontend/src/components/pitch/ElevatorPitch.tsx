import { useState } from "react";
import { motion } from "framer-motion";
import { Edit3, RefreshCw, Copy, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface ElevatorPitchProps {
  initialPitch: string;
  onPitchChange: (pitch: string) => void;
}

const ElevatorPitch = ({ initialPitch, onPitchChange }: ElevatorPitchProps) => {
  const [pitch, setPitch] = useState(initialPitch);
  const [isEditing, setIsEditing] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    setIsEditing(false);
    onPitchChange(pitch);
    toast({
      title: "Pitch saved",
      description: "Your elevator pitch has been updated.",
    });
  };

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    // Simulate AI regeneration with a delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const newPitch = `We're building the future of startup validation. Our AI-powered platform analyzes market data, competitor landscapes, and funding trends to give founders a clear go/no-go signal in minutes, not months. With 500+ startups validated and a 94% accuracy rate on our recommendations, we're saving founders precious time and investors from bad bets. We're raising $2M to scale our AI engine and capture the $50B startup advisory market.`;
    
    setPitch(newPitch);
    onPitchChange(newPitch);
    setIsRegenerating(false);
    toast({
      title: "Pitch regenerated",
      description: "Your pitch has been refreshed with AI insights.",
    });
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(pitch);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Copied to clipboard",
      description: "Your elevator pitch is ready to share.",
    });
  };

  const characterCount = pitch.length;
  const isOptimalLength = characterCount >= 200 && characterCount <= 350;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className="bg-card border border-border rounded-2xl p-8 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-foreground">Elevator Pitch</h2>
            <Badge variant="outline" className="text-xs font-mono border-primary/30 text-primary">
              <Sparkles className="w-3 h-3 mr-1" />
              AI Generated
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            {isEditing ? (
              <Button onClick={handleSave} size="sm" variant="default">
                Save Changes
              </Button>
            ) : (
              <Button onClick={() => setIsEditing(true)} size="sm" variant="outline">
                <Edit3 className="w-4 h-4 mr-2" />
                Edit
              </Button>
            )}
            
            <Button
              onClick={handleRegenerate}
              size="sm"
              variant="outline"
              disabled={isRegenerating}
              className={isRegenerating ? "animate-pulse" : ""}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRegenerating ? "animate-spin" : ""}`} />
              {isRegenerating ? "Generating..." : "Regenerate"}
            </Button>
            
            <Button onClick={handleCopy} size="sm" variant="ghost">
              {copied ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Pitch Content */}
        <div className="relative z-10">
          {isEditing ? (
            <Textarea
              value={pitch}
              onChange={(e) => setPitch(e.target.value)}
              className="min-h-[150px] text-lg leading-relaxed bg-secondary/50 border-primary/20 focus:border-primary/50 resize-none"
              placeholder="Write your elevator pitch..."
            />
          ) : (
            <motion.p
              key={pitch}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg leading-relaxed text-foreground/90"
            >
              {pitch}
            </motion.p>
          )}
        </div>

        {/* Character Count */}
        <div className="mt-4 flex items-center justify-between relative z-10">
          <span
            className={`text-sm font-mono ${
              isOptimalLength ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {characterCount} characters
            {isOptimalLength && " ✓ Optimal length"}
          </span>
          <span className="text-xs text-muted-foreground">
            Recommended: 200-350 characters
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ElevatorPitch;
