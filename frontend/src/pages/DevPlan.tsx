import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Send, Terminal, Layout, Database, Cloud, Paintbrush, Brain, Clipboard, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const executionPhases = [
  {
    phase: 1,
    name: "MVP",
    subtitle: "Core Infrastructure & Auth",
    timeline: "Weeks 1-2",
    status: "active" as const,
    tasks: ["Setup Supabase", "User Schema", "Basic UI Shell"]
  },
  {
    phase: 2,
    name: "Logic",
    subtitle: "Business Logic & Integration",
    timeline: "Weeks 3-4",
    status: "upcoming" as const,
    tasks: ["Connect OpenAI API", "Payment Gateways", "CRUD Operations"]
  },
  {
    phase: 3,
    name: "Polish",
    subtitle: "UI Polish & Deploy",
    timeline: "Week 5",
    status: "upcoming soon" as const,
    tasks: ["Mobile Responsiveness", "Vercel Deployment", "Bug Bash"]
  }
];

const techStack = [
  { name: "React", icon: Layout, version: "v18" },
  { name: "Supabase", icon: Database, version: "v2" },
  { name: "Tailwind", icon: Paintbrush, version: "v3" },
  { name: "Vercel", icon: Cloud, version: "Edge" },
  { name: "OpenAI", icon: Brain, version: "GPT-4o" }
];

const builderPrompt = `You are an expert CTO building a React application with Supabase backend. The app should include:
- User authentication with email/password and OAuth providers
- Real-time data synchronization using Supabase subscriptions
- A responsive UI built with Tailwind CSS
- Type-safe API calls with proper error handling
- Row Level Security policies for data protection
- Edge functions for serverless backend logic
...`;

const initialMessages = [
  {
    role: "assistant",
    content: "Welcome to the Dev Architect. I'm here to help you plan your technical implementation. What would you like to discuss?",
  },
];

const DevPlan = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    setMessages((prev) => [
      ...prev,
      { role: "user", content: inputValue },
      { role: "assistant", content: "I understand you want to discuss: " + inputValue + ". Let me help you break that down into actionable steps." },
    ]);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopyPrompt = async () => {
    await navigator.clipboard.writeText(builderPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen w-full bg-background flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm px-6 py-4"
      >
        <Button
          variant="ghost"
          onClick={() => navigate("/overview")}
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Overview
        </Button>
      </motion.header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Chat Interface */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="w-[350px] flex-shrink-0 bg-[#0F0F0F] border-r border-border flex flex-col"
        >
          {/* Chat Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-primary/20 flex items-center justify-center">
                <Terminal className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Dev Architect</h2>
                <p className="text-xs text-muted-foreground font-mono">Technical Planning Assistant</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`${
                    message.role === "assistant"
                      ? "bg-secondary/50 rounded-lg p-3"
                      : "bg-primary/10 rounded-lg p-3 ml-4"
                  }`}
                >
                  <p className="text-sm text-foreground font-mono leading-relaxed">
                    {message.content}
                  </p>
                </motion.div>
              ))}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about architecture..."
                className="flex-1 bg-background border border-border rounded px-3 py-2 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <Button
                size="icon"
                onClick={handleSendMessage}
                className="shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.aside>

        {/* Right Panel - The Blueprint */}
        <main className="flex-1 overflow-auto p-8 relative">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Blueprint Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-3xl font-bold text-foreground mb-2">The Blueprint</h1>
              <p className="text-muted-foreground">Your technical roadmap and implementation guide</p>
            </motion.div>

            {/* Section 1: Phase-by-Phase Execution Plan */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 font-mono">
                Phase-by-Phase Execution Plan
              </h2>
              <Card className="bg-card border-border p-6">
                <div className="space-y-6">
                  {executionPhases.map((phase, index) => (
                    <div key={phase.phase} className="relative">
                      {/* Vertical connecting line */}
                      {index < executionPhases.length - 1 && (
                        <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-border -mb-6 h-[calc(100%+1.5rem)]" />
                      )}
                      
                      {/* Phase Header */}
                      <div className="flex items-start gap-4">
                        {/* Phase Node */}
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center z-10 shrink-0 ${
                            phase.status === "active"
                              ? "bg-primary border-2 border-primary"
                              : "bg-background border-2 border-border"
                          }`}
                        >
                          <span
                            className={`text-xs font-bold font-mono ${
                              phase.status === "active"
                                ? "text-primary-foreground"
                                : "text-muted-foreground"
                            }`}
                          >
                            {phase.phase}
                          </span>
                        </div>
                        
                        {/* Phase Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-foreground">
                                Phase {phase.phase} — {phase.name}
                              </span>
                              {phase.status === "active" && (
                                <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded font-mono">
                                  Active
                                </span>
                              )}
                            </div>
                            <span className="text-sm text-muted-foreground font-mono">
                              {phase.timeline}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {phase.subtitle}
                          </p>
                          
                          {/* Task List */}
                          <div className="space-y-1.5 pl-2">
                            {phase.tasks.map((task, taskIndex) => (
                              <div key={taskIndex} className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
                                <span className="text-border">└─</span>
                                <span>{task}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.section>

            {/* Section 2: AI System Prompt */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 font-mono">
                AI System Prompt (Copy & Build)
              </h2>
              <div className="bg-[#050505] border border-zinc-800 rounded-lg overflow-hidden">
                {/* Header Bar */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-zinc-700" />
                      <div className="w-3 h-3 rounded-full bg-zinc-700" />
                      <div className="w-3 h-3 rounded-full bg-zinc-700" />
                    </div>
                    <span className="text-xs text-muted-foreground font-mono ml-2">
                      builder-prompt.txt
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyPrompt}
                    className="gap-2 text-muted-foreground hover:text-foreground"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-primary" />
                        <span className="text-primary">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Clipboard className="w-4 h-4" />
                        <span>Copy Prompt</span>
                      </>
                    )}
                  </Button>
                </div>
                
                {/* Code Content */}
                <div className="p-4 font-mono text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                  {builderPrompt}
                </div>
              </div>
            </motion.section>

            {/* Section 3: Approved Technology Stack */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="pb-24"
            >
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 font-mono">
                Approved Technology Stack
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {techStack.map((tech, index) => {
                  const Icon = tech.icon;
                  return (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                    >
                      <Card className="bg-card border-border p-3 hover:border-primary/50 hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.3)] transition-all duration-300 cursor-pointer group">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                            <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-foreground font-mono text-sm truncate">{tech.name}</p>
                            <p className="text-xs text-muted-foreground font-mono">{tech.version}</p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>
          </div>

          {/* Fixed Navigation Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="fixed bottom-8 right-8"
          >
            <Button
              onClick={() => navigate("/finalpitch")}
              className="gap-2 shadow-[0_0_30px_-5px_hsl(var(--primary)/0.5)]"
              size="lg"
            >
              Go to Pitch
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DevPlan;
