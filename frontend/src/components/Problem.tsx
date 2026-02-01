import { AlertTriangle, Server, Clock, Cloud, Lock } from "lucide-react";

const Problem = () => {
  const problems = [
    { icon: AlertTriangle, text: "wrong market" },
    { icon: Server, text: "backend over-complexity" },
    { icon: Lock, text: "hidden dependencies" },
    { icon: Cloud, text: "outages & infra risk" },
    { icon: Clock, text: "fake deadlines" },
  ];

  return (
    <section className="py-24 relative">
      <div className="container px-6">
        <div className="max-w-4xl mx-auto">
          {/* Quote block */}
          <blockquote className="relative">
            <div className="absolute -top-4 -left-4 text-6xl text-primary/20 font-serif">"</div>
            <p className="text-2xl md:text-3xl font-medium text-foreground leading-relaxed pl-8 border-l-2 border-primary/30">
              Founders waste months building products that were either poorly architected or 
              <span className="text-primary"> shouldn't have been built at all.</span>
            </p>
          </blockquote>

          {/* Problem tags */}
          <div className="mt-12">
            <p className="text-muted-foreground mb-6 font-mono text-sm">
              UI tools won't save you from:
            </p>
            <div className="flex flex-wrap gap-3">
              {problems.map((problem, i) => (
                <div 
                  key={i}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive/80"
                >
                  <problem.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{problem.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Solution statement */}
          <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-primary/10 to-transparent border border-primary/20">
            <p className="text-xl font-semibold text-foreground">
              Bro Founder solves the <span className="text-gradient">thinking problem</span> before the building problem.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
