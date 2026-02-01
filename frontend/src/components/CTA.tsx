import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-glow" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-3xl" />

      <div className="container relative z-10 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-primary/20 mb-8">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono text-foreground">
              Stop building blind
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to think like a 
            <span className="text-gradient"> technical co-founder?</span>
          </h2>

          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Get market validation, backend architecture, and real execution plans. 
            Make the build / pivot / kill decision with confidence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg">
              Launch Bro Founder
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          <p className="mt-8 text-sm text-muted-foreground font-mono">
            Real decisions. Real architecture. Real results.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
