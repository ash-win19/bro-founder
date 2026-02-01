import { Agent } from '@mastra/core/agent';
import { z } from 'zod';
import { pitchModel } from '../providers/keywordsai.provider';

export const PitchInputSchema = z.object({
  startup_name: z.string().describe('Name of the startup'),
  description: z.string().describe('Brief description of what the startup does'),
  industry: z.string().describe('Industry or sector (e.g., Fintech, AI, Health)'),
  stage: z.string().describe('Current stage (e.g., Idea, Pre-Seed, Seed, Series A)'),
  target_market: z.string().describe('Target audience or market segment'),
  business_model: z.string().describe('How the startup makes money'),
  traction: z.string().optional().describe('Key metrics or milestones achieved so far'),
});

export type PitchInput = z.infer<typeof PitchInputSchema>;

export const PitchOutputSchema = z.object({
  elevator_pitch: z.string().describe('A compelling 30-second elevator pitch'),
  company_snapshot: z.object({
    mission: z.string(),
    founding_team: z.string(),
    location: z.string().optional(),
  }).describe('Brief overview of the company'),
  competitive_analysis: z.object({
    direct_competitors: z.array(z.string()),
    differentiators: z.array(z.string()),
  }).describe('Analysis of the competitive landscape'),
  problem_statement: z.string().describe('Clear articulation of the problem being solved'),
  solution_description: z.string().describe('Description of the solution and value prop'),
  market_size: z.string().describe('TAM/SAM/SOM analysis'),
  business_model_slide: z.string().describe('Explanation of revenue streams and pricing'),
  ask: z.string().describe('What the founder is asking for (funding, intros, etc.)'),

  networking_opportunities: z.object({
    potential_investors: z.array(z.object({
      name: z.string(),
      title: z.string(),
      organization: z.string(),
      focus_areas: z.array(z.string()),
      stage_preference: z.string(),
      check_size: z.string().optional(),
      why_relevant: z.string(),
      linkedin: z.string().optional(),
      email: z.string().optional(),
      location: z.string().optional(),
    })),
    fellow_builders: z.array(z.object({
      name: z.string(),
      title: z.string(),
      company: z.string(),
      building: z.string(),
      stage: z.string(),
      why_relevant: z.string(),
      linkedin: z.string().optional(),
      email: z.string().optional(),
      location: z.string().optional(),
    })),
  }).describe('Networking opportunities for investors and fellow builders'),
});

export type PitchOutput = z.infer<typeof PitchOutputSchema>;

/**
 * Pitch Agent
 *
 * IMPORTANT: This agent uses Keywords AI Prompt Management.
 * The actual prompt/instructions are managed in Keywords AI dashboard.
 * Prompt ID: 5d21d12758384ebb8d71cdc23578a326
 */
export const pitchAgent = new Agent({
  id: 'pitch-agent',
  name: 'Pitch Agent',
  instructions: '',
  model: pitchModel,
});
