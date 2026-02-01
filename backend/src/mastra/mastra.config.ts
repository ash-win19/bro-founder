import { Mastra } from '@mastra/core';
import { orchestratorAgent } from './agents/orchestrator.agent';
import { generalAgent } from './agents/general.agent';
import { businessAgent } from './agents/business.agent';
import { mvpPlannerAgent } from './agents/mvp.agent';

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
};

// Type for available agent names
export type AgentName = 'orchestrator' | 'general' | 'business' | 'mvpPlanner';
// Add more agent names here as you create them
// Example: export type AgentName = 'orchestrator' | 'dataAnalyst' | 'codeReviewer';

// Helper function to get any agent by name
export function getAgent(name: AgentName) {
  return mastra.getAgent(name);
}

// Helper function to execute orchestrator agent
export async function executeOrchestrator(input: {
  task: string;
  context?: Record<string, any>;
  userId?: string;
  sessionId?: string;
}) {
  const agent = mastra.getAgent('orchestrator');

  // Format the input as a user message with context
  const messages = [
    { role: 'user' as const, content: input.task },
  ];

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
  const messages = [
    { role: 'user' as const, content: input.question },
  ];

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
  const messages = [
    { role: 'user' as const, content: input.question },
  ];

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
  const messages = [
    { role: 'user' as const, content: input.idea },
  ];

  // Add context as additional messages if provided
  if (input.context) {
    messages.push({
      role: 'user' as const,
      content: `Additional context: ${JSON.stringify(input.context)}`,
    });
  }

  return await agent.generate(messages);
}
