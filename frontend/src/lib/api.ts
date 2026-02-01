// API client for backend communication

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface OrchestratorRequest {
  task: string;
  context?: {
    currentPhase?: string;
    productData?: Record<string, unknown>;
  };
  userId?: string;
  sessionId?: string;
}

export interface OrchestratorResponse {
  response: string;
  actions?: Array<{
    action: string;
    status: 'pending' | 'in_progress' | 'completed' | 'failed';
    result?: unknown;
  }>;
  suggestions?: string[];
  metadata?: {
    agentsUsed?: string[];
    timestamp?: string;
  };
}

export const callOrchestratorAgent = async (
  request: OrchestratorRequest
): Promise<OrchestratorResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/agents/orchestrator`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Handle the wrapped response format from backend
    if (data.success && data.data) {
      // Extract the text from Mastra's generate response
      const responseText = data.data.text || data.data.content || JSON.stringify(data.data);
      return {
        response: responseText,
        actions: data.data.actions,
        suggestions: data.data.suggestions,
        metadata: data.data.metadata,
      };
    } else if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error('Error calling orchestrator agent:', error);
    throw error;
  }
};

export interface OverviewData {
  executiveSummary: string;
  problemStatement: string;
  solutionOverview: string;
  targetMarket: string;
  competitiveAdvantage: string;
  keyFeatures: string[];
  marketInsights: string;
  businessModelSummary: string;
  recommendation: 'build' | 'pivot' | 'kill';
  recommendationReasoning: string;
}

export const generateOverview = async (
  productData: Record<string, unknown>
): Promise<OverviewData> => {
  const task = `Generate a comprehensive product overview based on the following collected data:

Product Name: ${productData.name || 'Not specified'}
Problem Statement: ${productData.problemStatement || 'Not specified'}
Solution: ${productData.solution || 'Not specified'}
Target Users: ${productData.targetUsers || 'Not specified'}
Market Size: ${productData.marketSize || 'Not specified'}
Revenue Model: ${productData.revenueModel || 'Not specified'}
Pricing: ${productData.pricing || 'Not specified'}
Core Features: ${JSON.stringify(productData.coreFeatures || [])}
Tech Stack: ${JSON.stringify(productData.techStack || [])}
Competitors: ${JSON.stringify(productData.competitors || [])}

Please provide a structured overview with:
1. Executive Summary (2-3 sentences)
2. Problem Statement (refined and clear)
3. Solution Overview (how it solves the problem)
4. Target Market (who will use this)
5. Competitive Advantage (what makes it unique)
6. Key Features (bullet points)
7. Market Insights (TAM, trends, opportunities)
8. Business Model Summary
9. Recommendation (build/pivot/kill) with reasoning

Format as JSON with these exact keys: executiveSummary, problemStatement, solutionOverview, targetMarket, competitiveAdvantage, keyFeatures (array), marketInsights, businessModelSummary, recommendation, recommendationReasoning`;

  const response = await callOrchestratorAgent({
    task,
    context: { productData },
  });

  try {
    // Try to parse JSON from the response
    const jsonMatch = response.response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsedData = JSON.parse(jsonMatch[0]);
      return parsedData as OverviewData;
    }

    // If no JSON found, return a structured default
    return {
      executiveSummary: response.response.slice(0, 300),
      problemStatement: productData.problemStatement as string || 'To be defined',
      solutionOverview: productData.solution as string || 'To be defined',
      targetMarket: productData.targetUsers as string || 'To be defined',
      competitiveAdvantage: 'Analyzing competitive landscape...',
      keyFeatures: (productData.coreFeatures as string[]) || [],
      marketInsights: productData.marketSize as string || 'Market analysis pending',
      businessModelSummary: productData.revenueModel as string || 'To be defined',
      recommendation: 'build',
      recommendationReasoning: response.response,
    };
  } catch (error) {
    console.error('Error parsing overview data:', error);
    throw new Error('Failed to generate structured overview');
  }
};

export interface DevPlanPhase {
  phase: number;
  name: string;
  subtitle: string;
  timeline: string;
  status: 'active' | 'upcoming' | 'completed';
  tasks: string[];
}

export interface TechStackItem {
  name: string;
  version: string;
  reason: string;
}

export interface DevPlanData {
  executionPhases: DevPlanPhase[];
  techStack: TechStackItem[];
  builderPrompt: string;
  estimatedTimeline: string;
  keyRisks: string[];
  nextSteps: string[];
}

export interface PitchMetric {
  label: string;
  value: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
}

export interface PitchData {
  elevatorPitch: string;
  snapshotMetrics: PitchMetric[];
  marketOpportunity: string;
  competitiveAdvantage: string[];
  businessModel: string;
  traction: string[];
  team: TeamMember[];
  fundingAsk: string;
}

export const generatePitch = async (
  productData: Record<string, unknown>
): Promise<PitchData> => {
  const task = `Generate a compelling investor pitch deck content based on the following product data:

Product Name: ${productData.name || 'Not specified'}
Problem Statement: ${productData.problemStatement || 'Not specified'}
Solution: ${productData.solution || 'Not specified'}
Target Users: ${productData.targetUsers || 'Not specified'}
Market Size: ${productData.marketSize || 'Not specified'}
Revenue Model: ${productData.revenueModel || 'Not specified'}
Pricing: ${productData.pricing || 'Not specified'}
Core Features: ${JSON.stringify(productData.coreFeatures || [])}
Differentiators: ${JSON.stringify(productData.differentiators || [])}
Competitors: ${JSON.stringify(productData.competitors || [])}

Please provide a comprehensive investor pitch with:
1. Elevator Pitch (2-3 compelling sentences that hook investors)
2. Company Snapshot Metrics (6 metrics with values and descriptions):
   - Market Size
   - Growth Rate
   - MRR (or projected revenue)
   - Traction (users/customers)
   - Team size
   - Runway
3. Market Opportunity (detailed paragraph explaining the market)
4. Competitive Advantage (5-7 bullet points of unique advantages)
5. Business Model (detailed description of revenue streams and pricing)
6. Traction (5-7 bullet points showing progress and achievements)
7. Team (4-6 team members with names and roles - can be placeholder if not provided)
8. Funding Ask (what you're raising and how you'll use it)

Format as JSON with these exact keys: elevatorPitch, snapshotMetrics (array with label, value, description), marketOpportunity, competitiveAdvantage (array), businessModel, traction (array), team (array with name, role), fundingAsk`;

  const response = await callOrchestratorAgent({
    task,
    context: { productData },
  });

  try {
    // Try to parse JSON from the response
    const jsonMatch = response.response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsedData = JSON.parse(jsonMatch[0]);
      return parsedData as PitchData;
    }

    // If no JSON found, return a structured default based on productData
    return {
      elevatorPitch: productData.name
        ? `${productData.name} is solving ${productData.problemStatement || "a critical problem"} for ${productData.targetUsers || "our target users"}. ${productData.solution || "Our innovative solution"} creates a ${productData.marketSize || "$50B+"} market opportunity.`
        : response.response.slice(0, 300),
      snapshotMetrics: [
        {
          label: 'Market Size',
          value: (productData.marketSize as string) || '$50B+',
          description: 'Total addressable market opportunity',
        },
        {
          label: 'Growth Rate',
          value: '127%',
          description: 'Year-over-year growth projection',
        },
        {
          label: 'MRR',
          value: '$0',
          description: 'Monthly recurring revenue (pre-launch)',
        },
        {
          label: 'Traction',
          value: 'MVP',
          description: 'Product development stage',
        },
        {
          label: 'Team',
          value: '2-3',
          description: 'Founding team members',
        },
        {
          label: 'Runway',
          value: '12mo',
          description: 'Estimated runway post-raise',
        },
      ],
      marketOpportunity:
        productData.problemStatement
          ? `${productData.problemStatement} This represents a significant opportunity in a ${productData.marketSize || "$50B+"} market.`
          : 'Large market opportunity with strong growth potential.',
      competitiveAdvantage:
        (productData.differentiators as string[])?.length > 0
          ? (productData.differentiators as string[])
          : [
              'First-mover advantage in this space',
              'Unique technology approach',
              'Strong founding team',
              'Proprietary insights and data',
            ],
      businessModel:
        productData.revenueModel
          ? `${productData.revenueModel}. ${productData.pricing ? `Pricing: ${productData.pricing}` : ""}`
          : 'SaaS subscription model with tiered pricing',
      traction: [
        'MVP in development',
        'Strong founder-market fit',
        'Initial customer conversations underway',
        'Product roadmap validated with potential users',
      ],
      team: [
        { name: 'Founder', role: 'CEO - Technical Background' },
        { name: 'Co-Founder', role: 'CTO - Product Development' },
      ],
      fundingAsk: `Raising $500K-$1M pre-seed to build MVP, validate product-market fit, and acquire first 100 customers.`,
    };
  } catch (error) {
    console.error('Error parsing pitch data:', error);
    throw new Error('Failed to generate structured pitch');
  }
};

export const generateDevPlan = async (
  productData: Record<string, unknown>
): Promise<DevPlanData> => {
  const task = `Generate a detailed development plan for building this product as an MVP:

Product Name: ${productData.name || 'Not specified'}
Problem Statement: ${productData.problemStatement || 'Not specified'}
Solution: ${productData.solution || 'Not specified'}
Core Features: ${JSON.stringify(productData.coreFeatures || [])}
Tech Stack: ${JSON.stringify(productData.techStack || [])}
Target Users: ${productData.targetUsers || 'Not specified'}
Timeline: ${productData.timeline || 'Not specified'}

Please provide a comprehensive development plan with:
1. Execution Phases (3-4 phases with specific tasks for each)
   - Each phase should have: phase number, name, subtitle, timeline (e.g., "Weeks 1-2"), status, and 3-5 specific tasks
2. Technology Stack (5-7 recommended technologies)
   - For each tech: name, version, and reason for choosing it
3. Builder Prompt (A detailed AI system prompt that an AI coding assistant could use to build this product)
4. Estimated Timeline (overall timeline for MVP completion)
5. Key Risks (3-5 technical or execution risks)
6. Next Steps (3-5 immediate actionable steps to start)

Format as JSON with these exact keys: executionPhases (array), techStack (array), builderPrompt (string), estimatedTimeline (string), keyRisks (array), nextSteps (array)`;

  const response = await callOrchestratorAgent({
    task,
    context: { productData, currentPhase: 'mvp' },
  });

  try {
    // Try to parse JSON from the response
    const jsonMatch = response.response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsedData = JSON.parse(jsonMatch[0]);
      return parsedData as DevPlanData;
    }

    // If no JSON found, return a structured default based on productData
    const defaultPhases: DevPlanPhase[] = [
      {
        phase: 1,
        name: 'Foundation',
        subtitle: 'Core Infrastructure & Setup',
        timeline: 'Weeks 1-2',
        status: 'active',
        tasks: [
          'Initialize project with chosen framework',
          'Set up database and authentication',
          'Create basic UI shell',
          'Deploy to staging environment',
        ],
      },
      {
        phase: 2,
        name: 'Core Features',
        subtitle: 'Build Key Functionality',
        timeline: 'Weeks 3-4',
        status: 'upcoming',
        tasks:
          (productData.coreFeatures as string[])?.slice(0, 4) || [
            'Implement main feature',
            'Add data management',
            'Integrate APIs',
          ],
      },
      {
        phase: 3,
        name: 'Polish & Launch',
        subtitle: 'Testing & Deployment',
        timeline: 'Week 5-6',
        status: 'upcoming',
        tasks: [
          'UI/UX refinement',
          'Testing and bug fixes',
          'Production deployment',
          'User onboarding flow',
        ],
      },
    ];

    const defaultTechStack: TechStackItem[] =
      (productData.techStack as string[])?.map((tech, idx) => ({
        name: tech,
        version: 'Latest',
        reason: 'Recommended for this use case',
      })) || [
        {
          name: 'React',
          version: 'v18',
          reason: 'Modern UI framework with great ecosystem',
        },
        {
          name: 'Node.js',
          version: 'v20',
          reason: 'JavaScript runtime for backend',
        },
        {
          name: 'PostgreSQL',
          version: 'v15',
          reason: 'Reliable relational database',
        },
      ];

    return {
      executionPhases: defaultPhases,
      techStack: defaultTechStack,
      builderPrompt: `You are building ${productData.name || 'a product'} that ${productData.solution || 'solves a problem'}.\n\nKey features:\n${(productData.coreFeatures as string[] || []).map(f => `- ${f}`).join('\n')}\n\nTech stack:\n${(productData.techStack as string[] || []).map(t => `- ${t}`).join('\n')}\n\nFocus on building a minimal viable product that validates the core value proposition.`,
      estimatedTimeline: productData.timeline as string || '4-6 weeks',
      keyRisks: [
        'Scope creep - stick to MVP features only',
        'Technical complexity in core features',
        'Integration challenges with third-party services',
      ],
      nextSteps: [
        'Set up development environment',
        'Initialize project repository',
        'Create database schema',
        'Build authentication flow',
      ],
    };
  } catch (error) {
    console.error('Error parsing dev plan data:', error);
    throw new Error('Failed to generate structured dev plan');
  }
};
