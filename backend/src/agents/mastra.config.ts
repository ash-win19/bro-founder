import { Mastra } from '@mastra/core';
import { orchestratorAgent } from './orchestrator.agent';

/**
 * Mastra Configuration
 *
 * This file configures the Mastra instance with all available agents.
 * Add new agents here as you create them.
 */

export const mastra = new Mastra({
  agents: {
    orchestrator: orchestratorAgent,
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
};

// Helper function to get any agent by name
export function getAgent(name: string) {
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
  return await agent.generate(JSON.stringify(input));
}
