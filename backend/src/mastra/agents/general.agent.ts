import { Agent } from '@mastra/core/agent';
import { z } from 'zod';
import { generalModel } from '../providers/keywordsai.provider';

/**
 * General Agent
 *
 * IMPORTANT: This agent uses Keywords AI Prompt Management.
 * The actual prompt/instructions are managed in Keywords AI dashboard.
 * Prompt ID: 5e05e954e77547358dd06ae14c689a3f
 */
export const generalAgent = new Agent({
  id: 'general',
  name: 'General Assistant',
  instructions: '',
  model: generalModel,
});

// Schema for general agent input
export const GeneralInputSchema = z.object({
  question: z.string().describe('The question or request from the user'),
  context: z
    .record(z.any())
    .optional()
    .describe('Additional context for the question'),
  userId: z.string().optional().describe('User identifier for tracking'),
  sessionId: z.string().optional().describe('Session identifier for context'),
});

// Schema for general agent output
export const GeneralOutputSchema = z.object({
  answer: z.string().describe("The answer to the user's question"),
  sources: z
    .array(z.string())
    .optional()
    .describe('Sources or references used'),
  relatedTopics: z
    .array(z.string())
    .optional()
    .describe('Related topics the user might be interested in'),
  metadata: z
    .record(z.any())
    .optional()
    .describe('Additional metadata about the response'),
});

export type GeneralInput = z.infer<typeof GeneralInputSchema>;
export type GeneralOutput = z.infer<typeof GeneralOutputSchema>;
