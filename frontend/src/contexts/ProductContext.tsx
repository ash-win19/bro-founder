import { createContext, useContext, useState, ReactNode } from "react";

export type WorkspacePhase = "brainstorming" | "market-research" | "business-model" | "mvp";
export type PhaseStatus = "not-started" | "in-progress" | "completed";
export type Recommendation = "build" | "pivot" | "kill" | null;

export interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export interface Competitor {
  name: string;
  strength: string;
  weakness: string;
}

export interface ProductData {
  // Core identity
  name: string;
  tagline: string;
  
  // From Brainstorming phase
  problemStatement: string;
  solution: string;
  
  // From Market Research phase
  targetUsers: string;
  marketSize: string;
  competitors: Competitor[];
  
  // From Business Model phase
  revenueModel: string;
  pricing: string;
  
  // From MVP phase
  coreFeatures: string[];
  techStack: string[];
  timeline: string;
  
  // Meta
  differentiators: string[];
  risks: string[];
  recommendation: Recommendation;
}

interface ProductContextType {
  productData: ProductData;
  updateProductData: <K extends keyof ProductData>(field: K, value: ProductData[K]) => void;
  setProductData: (data: Partial<ProductData>) => void;
  messages: Message[];
  addMessage: (message: Message) => void;
  currentPhase: WorkspacePhase;
  setCurrentPhase: (phase: WorkspacePhase) => void;
  phaseStatuses: Record<WorkspacePhase, PhaseStatus>;
  hasData: boolean;
}

const defaultProductData: ProductData = {
  name: "",
  tagline: "",
  problemStatement: "",
  solution: "",
  targetUsers: "",
  marketSize: "",
  competitors: [],
  revenueModel: "",
  pricing: "",
  coreFeatures: [],
  techStack: [],
  timeline: "",
  differentiators: [],
  risks: [],
  recommendation: null,
};

const phaseWelcome: Record<WorkspacePhase, string> = {
  "brainstorming": "Let's explore your startup idea. What problem are you trying to solve?",
  "market-research": "Time to validate with real data. Tell me about your target market.",
  "business-model": "Let's design a sustainable business model. How do you plan to monetize?",
  "mvp": "Now let's architect your MVP. What's the core feature set?",
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [productData, setProductDataState] = useState<ProductData>(defaultProductData);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: phaseWelcome["brainstorming"],
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [currentPhase, setCurrentPhaseState] = useState<WorkspacePhase>("brainstorming");

  // Calculate phase statuses based on message count per phase
  const getPhaseStatuses = (): Record<WorkspacePhase, PhaseStatus> => {
    const phases: WorkspacePhase[] = ["brainstorming", "market-research", "business-model", "mvp"];
    const currentIndex = phases.indexOf(currentPhase);
    
    return phases.reduce((acc, phase, index) => {
      if (index < currentIndex) {
        acc[phase] = "completed";
      } else if (index === currentIndex) {
        acc[phase] = "in-progress";
      } else {
        acc[phase] = "not-started";
      }
      return acc;
    }, {} as Record<WorkspacePhase, PhaseStatus>);
  };

  const updateProductData = <K extends keyof ProductData>(field: K, value: ProductData[K]) => {
    setProductDataState(prev => ({ ...prev, [field]: value }));
  };

  const setProductData = (data: Partial<ProductData>) => {
    setProductDataState(prev => ({ ...prev, ...data }));
  };

  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  const setCurrentPhase = (phase: WorkspacePhase) => {
    setCurrentPhaseState(phase);
    // Add a welcome message for the new phase
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      content: phaseWelcome[phase],
      sender: "ai",
      timestamp: new Date(),
    };
    addMessage(welcomeMessage);
  };

  // Check if there's meaningful data entered
  const hasData = Boolean(
    productData.name || 
    productData.problemStatement || 
    productData.solution ||
    messages.length > 3 // More than just initial welcome messages
  );

  return (
    <ProductContext.Provider
      value={{
        productData,
        updateProductData,
        setProductData,
        messages,
        addMessage,
        currentPhase,
        setCurrentPhase,
        phaseStatuses: getPhaseStatuses(),
        hasData,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};

export { phaseWelcome };
