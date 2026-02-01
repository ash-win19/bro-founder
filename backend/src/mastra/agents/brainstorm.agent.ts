import { Agent } from '@mastra/core/agent';
import { z } from 'zod';
import { brainstormModel } from '../providers/keywordsai.provider';

/**
 * Brainstorm Agent
 *
 * IMPORTANT: This agent uses Keywords AI Prompt Management.
 * The actual prompt/instructions are managed in Keywords AI dashboard.
 * Prompt ID: b311f8e47d9c426fa43028fe0afb195a
 */
export const brainstormAgent = new Agent({
  id: 'brainstorm-realist',
  name: 'Brainstorm Agent',
  instructions: '',
  model: brainstormModel,
});

// Input Schema for the Brainstorm Agent
export const BrainstormInputSchema = z.object({
  rawIdea: z
    .string()
    .describe('The initial startup or product idea from the user'),
  targetMarket: z
    .string()
    .optional()
    .describe('The intended audience or industry'),
  constraints: z
    .array(z.string())
    .optional()
    .describe('Any technical or budget constraints'),
});

// Output Schema for the Brainstorm Agent
export const BrainstormOutputSchema = z.object({
  refinedConcept: z
    .string()
    .describe('The narrowed-down, core value proposition'),
  viabilityScore: z
    .number()
    .min(1)
    .max(10)
    .describe('Score based on market signals and technical feasibility'),
  theWedge: z
    .string()
    .describe(
      'The specific entry point or competitive advantage identified',
    ),
  technicalMoat: z
    .string()
    .describe(
      'The backend architectural advantage that makes this hard to copy',
    ),
  verdict: z
    .enum(['Build', 'Pivot', 'Kill'])
    .describe('The definitive recommendation'),
  suggestedTweaks: z
    .array(z.string())
    .describe(
      'Specific changes to make the product more viable or easier to build',
    ),
  nextSteps: z
    .array(z.string())
    .describe('Immediate actions to move to the MarketIntel phase'),
});
