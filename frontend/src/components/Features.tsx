import { Search, Server, Gauge, MessageSquare } from "lucide-react";

const Features = () => {
  const features = [
    {
      number: "01",
      icon: Search,
      title: "Market Reality Check",
      description: "Uses public data (YC, Crunchbase, Product Hunt, GitHub signals) to validate your idea against real competition.",
      output: "Market map + differentiation advice",
      questions: [
        "Has this already been built?",
        "Is the market crowded or empty?",
        "Where is the real wedge?",
      ],
    },
    {
      number: "02",
      icon: Server,
      title: "Backend Architecture Brain",
      description: "Designs domain models, APIs, data flows, infra assumptions, and third-party risks.",
      output: "This is your moat.",
      insight: "This feature implies async workflows and eventual consistency — expect higher operational overhead.",
    },
    {
      number: "03",
      icon: Gauge,
      title: "Execution Reality Engine",
      description: "Time ranges instead of fake dates. Risk flags for LLM outages, cloud incidents, vendor lock-in. Complexity multipliers.",
      output: "No more surprises",
      joke: "Why is this late? when AWS or OpenAI is down 😄",
    },
    {
      number: "04",
      icon: MessageSquare,
      title: "Decision-Driven Chat",
      description: "Every session ends with Build / Pivot / Kill decisions. Clear next steps. Exportable execution plan.",
      output: "Real decisions.",
      emphasis: "Not endless chatting.",
    },
  ];

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/50 to-transparent" />
      
      <div className="container relative z-10 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="text-sm font-mono text-primary uppercase tracking-wider">
              Core Capabilities
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">
              What Bro Founder Does
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Clear. Concrete. No fluff.
            </p>
          </div>

          {/* Features grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <div 
                key={i}
                className="group p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-glow/30"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-primary">{feature.number}</span>
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {feature.description}
                </p>

                {/* Questions or insights */}
                {feature.questions && (
                  <ul className="space-y-2 mb-4">
                    {feature.questions.map((q, j) => (
                      <li key={j} className="text-sm text-foreground/80 font-mono">
                        → {q}
                      </li>
                    ))}
                  </ul>
                )}

                {feature.insight && (
                  <div className="p-3 rounded-lg bg-secondary/50 border border-border text-sm font-mono text-muted-foreground italic">
                    "{feature.insight}"
                  </div>
                )}

                {feature.joke && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {feature.joke}
                  </p>
                )}

                {feature.emphasis && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {feature.emphasis}
                  </p>
                )}

                {/* Output tag */}
                <div className="mt-4 pt-4 border-t border-border">
                  <span className="text-xs font-mono text-primary uppercase tracking-wider">
                    Output:
                  </span>
                  <p className="text-sm font-semibold text-foreground mt-1">
                    {feature.output}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
