import { Agent } from '@mastra/core/agent';
import { z } from 'zod';

export const orchestratorAgent = new Agent({
  id: 'orchestrator',
  name: 'Orchestrator Agent',
  instructions:
    'You are an intelligent orchestrator agent designed to coordinate and manage complex tasks. Break down user requests into manageable subtasks, coordinate execution, and synthesize results into coherent responses.',
  model: 'openai/gpt-4o',
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
