import { Agent } from '@mastra/core/agent';
import { z } from 'zod';
import { overviewModel } from '../providers/keywordsai.provider';

/**
 * Overview Agent: The Final Decision Engine
 *
 * IMPORTANT: This agent uses Keywords AI Prompt Management.
 * The actual prompt/instructions are managed in Keywords AI dashboard.
 * Prompt ID: 6089dc5982654d20b7305019d7e0bf80
 */
export const overviewAgent = new Agent({
  id: 'overview',
  name: 'Overview Agent',
  instructions: '',
  model: overviewModel,
});

// Schema for the aggregated reports from previous steps
export const OverviewInputSchema = z.object({
  brainstormData: z
    .record(z.any())
    .describe('The core idea and initial validation'),
  marketData: z
    .record(z.any())
    .describe('The competitor landscape and market map'),
  strategyData: z
    .record(z.any())
    .describe('The feature prioritization and unique wedge'),
  devData: z
    .record(z.any())
    .describe('The technical roadmap and backend architecture'),
  context: z
    .record(z.any())
    .optional()
    .describe('Metadata for session consistency'),
});

// Schema optimized for the Lovable Overview Page
export const OverviewOutputSchema = z.object({
  battlePlanTitle: z
    .string()
    .describe('A high-impact title for the project overview'),
  marketScorecard: z.object({
    status: z
      .enum(['Empty', 'Crowded', 'Validated'])
      .describe('Final market assessment'),
    theWedge: z.string().describe('The identified market gap'),
  }),
  technicalBlueprint: z.object({
    moat: z.string().describe('The primary technical advantage'),
    risks: z
      .array(z.string())
      .describe(
        'Infrastructure and third-party risks like outages',
      ),
  }),
  executionRadar: z.object({
    timeline: z
      .string()
      .describe('Realistic time ranges, not fake dates'),
    multipliers: z
      .array(z.string())
      .describe(
        'Complexity multipliers that could impact the build',
      ),
  }),
  finalVerdict: z
    .enum(['Build', 'Pivot', 'Kill'])
    .describe('The definitive recommendation'),
  nextSteps: z
    .array(z.string())
    .describe('Clear, actionable items for the founder'),
});

export type OverviewInput = z.infer<typeof OverviewInputSchema>;
export type OverviewOutput = z.infer<typeof OverviewOutputSchema>;
