import { Agent } from '@mastra/core/agent';
import { z } from 'zod';

/**
 * Overview Agent: The Final Decision Engine
 * Integrates data from Brainstorm, Market, Strategist, and Dev agents to
 * provide a single, unified Build/Pivot/Kill verdict.
 */
export const overviewAgent = new Agent({
  id: 'overview',
  name: 'Overview Agent',
  instructions: `
    You are the Final Decision Engine for Bro Founder. Your sole purpose is to solve the thinking problem before the building problem by synthesizing the work of the specialized agents[cite: 22].

    Your directives:
    1. **Integrate, Don't Invent:** You do not generate new advice. You summarize the consensus of the Brainstorm, MarketIntel, ProductStrategist, and DevPlanner agents[cite: 73, 83, 94, 105].
    2. **Resolve Conflicts:** If MarketIntel shows high competition but Brainstorm suggests a unique wedge, highlight how the Wedge overcomes the competition[cite: 26, 27].
    3. **Reality Enforcement:** Ensure the final execution plan uses time ranges instead of fake dates and clearly lists complexity multipliers identified by the Dev agent[cite: 39, 40].
    4. **The Bottom Line:** End the synthesis with a definitive Build, Pivot, or Kill decision[cite: 46].
  `,
  model: 'openai/gpt-4o',
});

// Schema for the aggregated reports from previous steps
export const OverviewInputSchema = z.object({
  brainstormData: z
    .record(z.any())
    .describe('The core idea and initial validation [cite: 58-64]'),
  marketData: z
    .record(z.any())
    .describe('The competitor landscape and market map [cite: 24-27]'),
  strategyData: z
    .record(z.any())
    .describe('The feature prioritization and unique wedge [cite: 94-104]'),
  devData: z
    .record(z.any())
    .describe('The technical roadmap and backend architecture [cite: 105-112]'),
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
      .describe('Final market assessment [cite: 168]'),
    theWedge: z.string().describe('The identified market gap [cite: 169]'),
  }),
  technicalBlueprint: z.object({
    moat: z.string().describe('The primary technical advantage [cite: 37]'),
    risks: z
      .array(z.string())
      .describe(
        'Infrastructure and third-party risks like outages [cite: 19, 40]',
      ),
  }),
  executionRadar: z.object({
    timeline: z
      .string()
      .describe('Realistic time ranges, not fake dates [cite: 39]'),
    multipliers: z
      .array(z.string())
      .describe(
        'Complexity multipliers that could impact the build [cite: 40]',
      ),
  }),
  finalVerdict: z
    .enum(['Build', 'Pivot', 'Kill'])
    .describe('The definitive recommendation [cite: 46]'),
  nextSteps: z
    .array(z.string())
    .describe('Clear, actionable items for the founder [cite: 47]'),
});

export type OverviewInput = z.infer<typeof OverviewInputSchema>;
export type OverviewOutput = z.infer<typeof OverviewOutputSchema>;
