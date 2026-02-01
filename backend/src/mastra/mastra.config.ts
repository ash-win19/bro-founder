import { Mastra } from '@mastra/core';
import { orchestratorAgent } from './agents/orchestrator.agent';
import { generalAgent } from './agents/general.agent';
import { businessAgent } from './agents/business.agent';
import { mvpPlannerAgent } from './agents/mvp.agent';
import { brainstormAgent } from './agents/brainstorm.agent';

/**
 * Mastra Configuration
 *
 * This file configures the Mastra instance with all available agents.
 * Add new agents here as you create them.
 */

export const mastra = new Mastra({
  agents: {
    orchestrator: orchestratorAgent,
    general: generalAgent,
    business: businessAgent,
    mvpPlanner: mvpPlannerAgent,
    brainstorm: brainstormAgent,
    // Add more agents here as needed
    // Example:
    // dataAnalyst: dataAnalystAgent,
    // codeReviewer: codeReviewerAgent,
    // contentWriter: contentWriterAgent,
  },
});

// Export individual agents for direct access if needed
export const agents = {
  orchestrator: mastra.getAgent('orchestrator'),
  general: mastra.getAgent('general'),
  business: mastra.getAgent('business'),
  mvpPlanner: mastra.getAgent('mvpPlanner'),
  brainstorm: mastra.getAgent('brainstorm'),
};

// Type for available agent names
export type AgentName =
  | 'orchestrator'
  | 'general'
  | 'business'
  | 'mvpPlanner'
  | 'brainstorm';
// Add more agent names here as you create them
// Example: export type AgentName = 'orchestrator' | 'dataAnalyst' | 'codeReviewer';

// Helper function to get any agent by name
export function getAgent(name: AgentName) {
  return mastra.getAgent(name);
}

// Intelligent routing function to determine which agent to use
function routeToAgent(task: string, context?: Record<string, any>): AgentName {
  const lowerTask = task.toLowerCase();
  const currentPhase = context?.currentPhase || '';

  // Phase-based routing
  if (currentPhase === 'brainstorming' || currentPhase === 'brainstorm') {
    // Check if they're asking about business/pricing in brainstorm phase
    if (
      lowerTask.includes('revenue') ||
      lowerTask.includes('pricing') ||
      lowerTask.includes('monetize') ||
      lowerTask.includes('business model') ||
      lowerTask.includes('make money')
    ) {
      return 'business';
    }
    return 'brainstorm';
  }

  if (
    currentPhase === 'market-research' ||
    currentPhase === 'market' ||
    currentPhase === 'market_research'
  ) {
    return 'brainstorm'; // Market research still uses brainstorm agent for validation
  }

  if (
    currentPhase === 'business-model' ||
    currentPhase === 'business' ||
    currentPhase === 'business_model'
  ) {
    return 'business';
  }

  if (currentPhase === 'mvp') {
    return 'mvpPlanner';
  }

  // Keyword-based routing (when no phase or general phase)
  // Business/Revenue related
  if (
    lowerTask.includes('revenue') ||
    lowerTask.includes('pricing') ||
    lowerTask.includes('monetize') ||
    lowerTask.includes('business model') ||
    lowerTask.includes('make money') ||
    lowerTask.includes('unit economics') ||
    lowerTask.includes('ltv') ||
    lowerTask.includes('cac') ||
    lowerTask.includes('profit')
  ) {
    return 'business';
  }

  // MVP/Technical Planning related
  if (
    lowerTask.includes('mvp') ||
    lowerTask.includes('build') ||
    lowerTask.includes('develop') ||
    lowerTask.includes('tech stack') ||
    lowerTask.includes('architecture') ||
    lowerTask.includes('implement') ||
    lowerTask.includes('roadmap') ||
    lowerTask.includes('timeline') ||
    lowerTask.includes('how long') ||
    lowerTask.includes('steps to')
  ) {
    return 'mvpPlanner';
  }

  // Brainstorm/Validation related
  if (
    lowerTask.includes('idea') ||
    lowerTask.includes('validate') ||
    lowerTask.includes('viable') ||
    lowerTask.includes('build or pivot') ||
    lowerTask.includes('should i build') ||
    lowerTask.includes('market fit') ||
    lowerTask.includes('competitor') ||
    lowerTask.includes('problem') ||
    lowerTask.includes('solution')
  ) {
    return 'brainstorm';
  }

  // Default to general for everything else
  return 'general';
}

// Helper function to execute orchestrator agent with intelligent routing
export async function executeOrchestrator(input: {
  task: string;
  context?: Record<string, any>;
  userId?: string;
  sessionId?: string;
}) {
  // Determine which agent to route to
  const selectedAgent = routeToAgent(input.task, input.context);

  console.log(
    `[Orchestrator] Routing to ${selectedAgent} agent for task: "${input.task.substring(0, 50)}..."`,
  );

  const agent = mastra.getAgent(selectedAgent);

  // Format the input as a user message
  let content = input.task;

  // Add context information for better agent responses
  if (input.context) {
    const { currentPhase, productData } = input.context;

    // Build context string
    let contextInfo = '';
    if (currentPhase) {
      contextInfo += `Current Phase: ${currentPhase}\n`;
    }
    if (productData) {
      const {
        name,
        problemStatement,
        solution,
        targetUsers,
        revenueModel,
        coreFeatures,
      } = productData as any;

      if (name) contextInfo += `Product Name: ${name}\n`;
      if (problemStatement)
        contextInfo += `Problem: ${problemStatement}\n`;
      if (solution) contextInfo += `Solution: ${solution}\n`;
      if (targetUsers) contextInfo += `Target Users: ${targetUsers}\n`;
      if (revenueModel) contextInfo += `Revenue Model: ${revenueModel}\n`;
      if (coreFeatures?.length > 0)
        contextInfo += `Core Features: ${coreFeatures.join(', ')}\n`;
    }

    if (contextInfo) {
      content = `${contextInfo}\nUser Query: ${input.task}`;
    }
  }

  const messages = [{ role: 'user' as const, content }];

  const result = await agent.generate(messages);

  // Add metadata about which agent was used
  return {
    ...result,
    agentUsed: selectedAgent,
  };
}

// Helper function to execute brainstorm agent
export async function executeBrainstorm(input: {
  idea: string;
  context?: Record<string, any>;
  userId?: string;
  sessionId?: string;
}) {
  const agent = mastra.getAgent('brainstorm');

  // Format the input as a user message with context
  const messages = [{ role: 'user' as const, content: input.idea }];

  // Add context as additional messages if provided
  if (input.context) {
    messages.push({
      role: 'user' as const,
      content: `Additional context: ${JSON.stringify(input.context)}`,
    });
  }

  return await agent.generate(messages);
}

// Helper function to execute general agent
export async function executeGeneral(input: {
  question: string;
  context?: Record<string, any>;
  userId?: string;
  sessionId?: string;
}) {
  const agent = mastra.getAgent('general');

  // Format the input as a user message with context
  const messages = [{ role: 'user' as const, content: input.question }];

  // Add context as additional messages if provided
  if (input.context) {
    messages.push({
      role: 'user' as const,
      content: `Additional context: ${JSON.stringify(input.context)}`,
    });
  }

  return await agent.generate(messages);
}

// Helper function to execute business agent
export async function executeBusiness(input: {
  question: string;
  context?: Record<string, any>;
  userId?: string;
  sessionId?: string;
}) {
  const agent = mastra.getAgent('business');

  // Format the input as a user message with context
  const messages = [{ role: 'user' as const, content: input.question }];

  // Add context as additional messages if provided
  if (input.context) {
    messages.push({
      role: 'user' as const,
      content: `Additional context: ${JSON.stringify(input.context)}`,
    });
  }

  return await agent.generate(messages);
}

// Helper function to execute MVP planner agent
export async function executeMvpPlanner(input: {
  idea: string;
  context?: Record<string, any>;
  userId?: string;
  sessionId?: string;
}) {
  const agent = mastra.getAgent('mvpPlanner');

  // Format the input as a user message with context
  const messages = [{ role: 'user' as const, content: input.idea }];

  // Add context as additional messages if provided
  if (input.context) {
    messages.push({
      role: 'user' as const,
      content: `Additional context: ${JSON.stringify(input.context)}`,
    });
  }

  return await agent.generate(messages);
}
