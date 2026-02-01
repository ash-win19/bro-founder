import { createContext, useContext, useState, ReactNode } from "react";
import type { OverviewData, DevPlanData, PitchData } from "@/lib/api";

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
  isPhaseComplete: (phase: WorkspacePhase) => boolean;
  canGoToOverview: boolean;
  overviewData: OverviewData | null;
  setOverviewData: (data: OverviewData) => void;
  isGeneratingOverview: boolean;
  setIsGeneratingOverview: (isGenerating: boolean) => void;
  devPlanData: DevPlanData | null;
  setDevPlanData: (data: DevPlanData) => void;
  isGeneratingDevPlan: boolean;
  setIsGeneratingDevPlan: (isGenerating: boolean) => void;
  pitchData: PitchData | null;
  setPitchData: (data: PitchData) => void;
  isGeneratingPitch: boolean;
  setIsGeneratingPitch: (isGenerating: boolean) => void;
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
  const [overviewData, setOverviewData] = useState<OverviewData | null>(null);
  const [isGeneratingOverview, setIsGeneratingOverview] = useState(false);
  const [devPlanData, setDevPlanData] = useState<DevPlanData | null>(null);
  const [isGeneratingDevPlan, setIsGeneratingDevPlan] = useState(false);
  const [pitchData, setPitchData] = useState<PitchData | null>(null);
  const [isGeneratingPitch, setIsGeneratingPitch] = useState(false);

  // Validation rules for each phase
  const isPhaseComplete = (phase: WorkspacePhase): boolean => {
    switch (phase) {
      case "brainstorming":
        return Boolean(
          productData.problemStatement &&
          productData.solution &&
          (productData.name || messages.length >= 4)
        );
      case "market-research":
        return Boolean(
          productData.targetUsers &&
          (productData.marketSize || productData.competitors.length > 0)
        );
      case "business-model":
        return Boolean(
          productData.revenueModel &&
          productData.pricing
        );
      case "mvp":
        return Boolean(
          productData.coreFeatures.length > 0 &&
          (productData.techStack.length > 0 || productData.timeline)
        );
      default:
        return false;
    }
  };

  // Calculate phase statuses based on data completion
  const getPhaseStatuses = (): Record<WorkspacePhase, PhaseStatus> => {
    const phases: WorkspacePhase[] = ["brainstorming", "market-research", "business-model", "mvp"];
    const currentIndex = phases.indexOf(currentPhase);

    return phases.reduce((acc, phase, index) => {
      const phaseIsComplete = isPhaseComplete(phase);

      if (phaseIsComplete && index < currentIndex) {
        acc[phase] = "completed";
      } else if (index === currentIndex) {
        acc[phase] = phaseIsComplete ? "completed" : "in-progress";
      } else if (index < currentIndex && !phaseIsComplete) {
        // Previous phase that's incomplete
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

  // Check if user can go to overview - need at least brainstorm phase complete OR be in MVP phase
  const canGoToOverview =
    (isPhaseComplete("brainstorming") && messages.length >= 4) ||
    currentPhase === "mvp" ||
    currentPhase === "business-model";

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
        isPhaseComplete,
        canGoToOverview,
        overviewData,
        setOverviewData,
        isGeneratingOverview,
        setIsGeneratingOverview,
        devPlanData,
        setDevPlanData,
        isGeneratingDevPlan,
        setIsGeneratingDevPlan,
        pitchData,
        setPitchData,
        isGeneratingPitch,
        setIsGeneratingPitch,
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
