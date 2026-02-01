import { Brain, X, Check } from "lucide-react";

const WhatItIs = () => {
  const doesNot = [
    "build pretty UIs",
    "write random pitch decks",
    "generate fluffy advice",
  ];

  const does = [
    "validate ideas using real market data",
    "design correct backend logic",
    "avoid unrealistic timelines",
    "make clear build / pivot / kill decisions",
  ];

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />
      
      <div className="container relative z-10 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="flex items-center gap-3 mb-8">
            <Brain className="w-6 h-6 text-primary" />
            <span className="text-sm font-mono text-primary uppercase tracking-wider">
              What Bro Founder Really Is
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            An AI backend architect + market validator
            <span className="text-muted-foreground"> for early-stage founders.</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {/* Doesn't do */}
            <div className="p-6 rounded-xl bg-card border border-border">
              <h3 className="text-lg font-semibold mb-4 text-muted-foreground">
                It doesn't:
              </h3>
              <ul className="space-y-3">
                {doesNot.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <X className="w-5 h-5 text-destructive/70 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Does do */}
            <div className="p-6 rounded-xl bg-card border border-primary/20 shadow-glow">
              <h3 className="text-lg font-semibold mb-4 text-foreground">
                It thinks like a technical co-founder:
              </h3>
              <ul className="space-y-3">
                {does.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground">
                    <Check className="w-5 h-5 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatItIs;
