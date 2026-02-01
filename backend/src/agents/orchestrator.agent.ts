import { Agent } from '@mastra/core';
import { z } from 'zod';

/**
 * Orchestrator Agent
 *
 * This agent serves as the main coordinator for complex AI tasks.
 * It can break down user requests, delegate to specialized agents,
 * and synthesize results into coherent responses.
 */

export const orchestratorAgent = new Agent({
  name: 'orchestrator',
  instructions: `You are an intelligent orchestrator agent designed to coordinate and manage complex tasks.

Your responsibilities include:
1. Understanding user requests and breaking them down into manageable subtasks
2. Determining which specialized agents or tools should handle each subtask
3. Coordinating the execution of multiple operations in the correct sequence
4. Synthesizing results from various sources into coherent, helpful responses
5. Handling errors gracefully and providing alternative solutions when needed

You should:
- Think step-by-step through complex problems
- Be proactive in asking clarifying questions when requirements are ambiguous
- Provide clear, actionable responses
- Maintain context throughout multi-turn conversations
- Suggest relevant next steps or actions to the user

Communication style:
- Be concise but thorough
- Use clear, professional language
- Break down complex information into digestible parts
- Acknowledge limitations when you encounter them`,

  model: {
    provider: 'OPEN_AI',
    name: 'gpt-4-turbo-preview',
    toolChoice: 'auto',
  },

  enabledTools: {
    // Add your tools here as needed
    // Example: webSearch, fileProcessor, dataAnalyzer, etc.
  },
});

// Schema for orchestrator input
export const OrchestratorInputSchema = z.object({
  task: z.string().describe('The main task or request from the user'),
  context: z
    .record(z.any())
    .optional()
    .describe('Additional context or metadata for the task'),
  userId: z.string().optional().describe('User identifier for tracking'),
  sessionId: z.string().optional().describe('Session identifier for context'),
});

// Schema for orchestrator output
export const OrchestratorOutputSchema = z.object({
  response: z.string().describe('The main response to the user'),
  actions: z
    .array(
      z.object({
        type: z.string(),
        description: z.string(),
        status: z.enum(['pending', 'completed', 'failed']),
        result: z.any().optional(),
      }),
    )
    .optional()
    .describe('Actions taken during task execution'),
  suggestions: z
    .array(z.string())
    .optional()
    .describe('Suggested next steps or actions'),
  metadata: z
    .record(z.any())
    .optional()
    .describe('Additional metadata about the execution'),
});

export type OrchestratorInput = z.infer<typeof OrchestratorInputSchema>;
export type OrchestratorOutput = z.infer<typeof OrchestratorOutputSchema>;
