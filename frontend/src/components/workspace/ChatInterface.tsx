import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Command, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProduct, type WorkspacePhase } from "@/contexts/ProductContext";
import OverviewButton from "./OverviewButton";
import { callOrchestratorAgent } from "@/lib/api";
import { Streamdown } from "streamdown";
import { code } from "@streamdown/code";
import { mermaid } from "@streamdown/mermaid";
import { math } from "@streamdown/math";
import { cjk } from "@streamdown/cjk";
import "katex/dist/katex.min.css";

interface ChatInterfaceProps {
  currentPhase: WorkspacePhase;
}

const ChatInterface = ({ currentPhase }: ChatInterfaceProps) => {
  const { messages, addMessage, setProductData, productData, canGoToOverview } = useProduct();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Extract data from user message (simulated - in real implementation this would use AI)
  const extractDataFromMessage = (content: string) => {
    // Simple keyword extraction for demo purposes
    // In a real implementation, this would use AI/NLP
    const lowerContent = content.toLowerCase();
    
    // Try to detect product name (first capitalized phrase or quoted text)
    const quotedMatch = content.match(/"([^"]+)"/);
    const capitalizedMatch = content.match(/\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\b/);
    
    if (quotedMatch) {
      setProductData({ name: quotedMatch[1] });
    } else if (capitalizedMatch && capitalizedMatch[1].length > 2) {
      setProductData({ name: capitalizedMatch[1] });
    }

    // Detect problem statements
    if (lowerContent.includes("problem") || lowerContent.includes("struggle") || lowerContent.includes("pain point")) {
      setProductData({ problemStatement: content });
    }

    // Detect solution descriptions
    if (lowerContent.includes("solution") || lowerContent.includes("helps") || lowerContent.includes("enables")) {
      setProductData({ solution: content });
    }

    // Detect target users
    if (lowerContent.includes("target") || lowerContent.includes("users") || lowerContent.includes("customers")) {
      setProductData({ targetUsers: content });
    }

    // Detect revenue/business model
    if (lowerContent.includes("revenue") || lowerContent.includes("monetize") || lowerContent.includes("pricing")) {
      setProductData({ revenueModel: content });
    }

    // Detect features
    if (lowerContent.includes("feature") || lowerContent.includes("mvp") || lowerContent.includes("build")) {
      const features = content.split(/[,;]/).filter(f => f.trim().length > 3);
      if (features.length > 0) {
        setProductData({ coreFeatures: features.map(f => f.trim()) });
      }
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      content: input,
      sender: "user" as const,
      timestamp: new Date(),
    };

    addMessage(userMessage);
    extractDataFromMessage(input);
    const userInput = input;
    setInput("");
    setIsLoading(true);

    try {
      // Call orchestrator agent
      const response = await callOrchestratorAgent({
        task: userInput,
        context: {
          currentPhase,
          productData,
        },
      });

      const aiResponse = {
        id: (Date.now() + 1).toString(),
        content: response.response,
        sender: "ai" as const,
        timestamp: new Date(),
      };
      addMessage(aiResponse);
    } catch (error) {
      console.error("Error calling orchestrator agent:", error);
      const errorResponse = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an error processing your request. Please make sure the backend is running and try again.",
        sender: "ai" as const,
        timestamp: new Date(),
      };
      addMessage(errorResponse);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Header - Fixed */}
      <div className="sticky top-0 z-10 h-14 border-b border-border flex items-center justify-between px-6 bg-background/95 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h1 className="font-semibold text-sm">Bro Founder</h1>
            <p className="text-xs text-muted-foreground font-mono">AI Technical Co-Founder</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <OverviewButton isPhaseComplete={canGoToOverview} />
          <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-lg border border-border">
            <Command className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-mono">K</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-4 ${message.sender === "user" ? "flex-row-reverse" : ""}`}
            >
              {/* Avatar */}
              <div className={`
                w-10 h-10 rounded-lg shrink-0 flex items-center justify-center
                ${message.sender === "ai"
                  ? 'bg-primary/20 border border-primary/30'
                  : 'bg-secondary border border-border'
                }
              `}>
                {message.sender === "ai" ? (
                  <Sparkles className="w-5 h-5 text-primary" />
                ) : (
                  <User className="w-5 h-5 text-muted-foreground" />
                )}
              </div>

              {/* Message bubble */}
              <div className={`
                max-w-[70%] p-4 rounded-lg border
                ${message.sender === "ai"
                  ? 'bg-card border-border rounded-tl-none'
                  : 'bg-primary/10 border-primary/30 rounded-tr-none'
                }
              `}>
                {message.sender === "ai" ? (
                  <div className="text-sm leading-relaxed">
                    <Streamdown
                      plugins={{ code, mermaid, math, cjk }}
                      isAnimating={isLoading && message.id === messages[messages.length - 1]?.id}
                    >
                      {message.content}
                    </Streamdown>
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed">
                    {message.content}
                  </p>
                )}
                <span className="text-[10px] text-muted-foreground/60 font-mono mt-2 block">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </motion.div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex gap-4"
            >
              <div className="w-10 h-10 rounded-lg shrink-0 flex items-center justify-center bg-primary/20 border border-primary/30">
                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
              </div>
              <div className="max-w-[70%] p-4 rounded-lg border bg-card border-border rounded-tl-none">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="relative flex items-center gap-2 bg-secondary rounded-lg border border-border focus-within:border-primary/50 transition-colors">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted-foreground"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            size="icon"
            className="mr-2 w-8 h-8 rounded-md"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-[10px] text-muted-foreground/60 font-mono mt-2 text-center">
          Press Enter to send • Cmd+K for commands
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
