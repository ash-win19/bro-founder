import { Agent } from "@mastra/core/agent";
import { z } from 'zod';

export const generalAgent = new Agent({
  id: "general",
  name: "General Assistant",
  instructions: "You are a helpful general-purpose assistant. Answer questions clearly, provide accurate information, and assist users with a wide range of topics. Be concise, friendly, and informative.",
  model: "openai/gpt-4o",
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
  answer: z.string().describe('The answer to the user\'s question'),
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
