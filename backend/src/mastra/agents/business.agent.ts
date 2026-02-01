import { Agent } from '@mastra/core/agent';
import { z } from 'zod';
import { businessModel } from '../providers/keywordsai.provider';

/**
 * Business Agent (CFO)
 *
 * IMPORTANT: This agent uses Keywords AI Prompt Management.
 * The actual prompt/instructions are managed in Keywords AI dashboard.
 * Prompt ID: e985a908733c49088eeefd75309a384a
 */
export const businessAgent = new Agent({
  id: 'business-cfo',
  name: 'CFO Business Strategist',
  instructions: '',
  model: businessModel,
});

// Schema for the CFO's output to ensure the UI can render it
export const BusinessModelSchema = z.object({
  modelType: z.enum([
    'SaaS',
    'Marketplace',
    'Transactional',
    'Ads',
    'Open Core',
  ]),
  suggestedPricing: z.array(
    z.object({
      tier: z.string(),
      price: z.string(),
      features: z.array(z.string()),
    }),
  ),
  unitEconomicsRisk: z
    .string()
    .describe('Potential hidden costs or margin issues'),
  verdict: z.string().describe('Final summary of business viability'),
});
