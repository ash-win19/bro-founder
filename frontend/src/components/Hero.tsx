import { Button } from "@/components/ui/button";
import { Rocket, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-50" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8 animate-fade-in">
            <Rocket className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono text-muted-foreground">
              For early-stage founders
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 animate-slide-up">
            <span className="text-gradient">Bro Founder</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            The AI co-founder that helps you build
          </p>
          
          <p className="text-2xl md:text-3xl font-semibold text-foreground mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            the right product — <span className="text-gradient">the right way.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Button variant="hero" size="lg" onClick={() => navigate("/workspace")}>
              Launch Bro Founder
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="heroOutline" size="lg">
              See How It Works
            </Button>
          </div>

          {/* Trust indicator */}
          <p className="mt-12 text-sm text-muted-foreground font-mono animate-fade-in" style={{ animationDelay: '0.5s' }}>
            No fluff. No fake deadlines. Just real decisions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
