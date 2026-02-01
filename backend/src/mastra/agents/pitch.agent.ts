import { Agent } from '@mastra/core/agent';
import { z } from 'zod';

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

export const pitchAgent = new Agent({
  id: 'pitch-agent',
  name: 'Pitch Agent',
  instructions: `You are the Pitch Agent for Bro Founder. Your goal is to help founders articulate their vision and connect with the right people.

  ## CORE RESPONSIBILITIES
  1. Generate compelling pitch materials (elevator pitch, problem/solution, etc.).
  2. Identify relevant networking opportunities (investors and fellow builders).

  ## PITCH GENERATION
  - Create a punchy, memorable elevator pitch.
  - Clearly define the problem and solution.
  - Estimate market size based on industry standards.
  - Articulate the business model clearly.

  ## NETWORKING OPPORTUNITIES GENERATION
  After generating the pitch, you must also provide networking opportunities.

  For POTENTIAL INVESTORS:
  - Identify 3-5 real venture capital firms or angel investors active in this industry
  - Match based on the startup's stage (pre-seed, seed, Series A), industry, and geography
  - For each investor, provide:
    * Name (real person, not generic)
    * Title and organization
    * Focus areas (2-3 specific sectors they invest in)
    * Stage preference and typical check size
    * Specific explanation of why they're a good match for THIS startup
    * LinkedIn profile URL if known
    * Location

  For FELLOW BUILDERS:
  - Identify 3-5 founders or companies working in adjacent or complementary spaces
  - Look for potential partnerships, integrations, or collaboration opportunities
  - For each builder, provide:
    * Name (founder/co-founder)
    * Title and company name
    * Brief description of what they're building
    * Current stage
    * Specific explanation of why connecting would be valuable
    * LinkedIn profile URL if known
    * Location

  IMPORTANT: All networking suggestions should be:
  - Based on real, publicly known investors and companies (not fictional)
  - Highly relevant to the specific startup and its unique positioning
  - Actionable with clear next steps for outreach
  - Include diverse representation across different backgrounds and geographies

  ## OUTPUT FORMAT
  You must output a valid JSON object matching the following structure:
  
  \`\`\`json
  {
    "elevator_pitch": "...",
    "problem_statement": "...",
    "solution_description": "...",
    "market_size": "...",
    "business_model_slide": "...",
    "ask": "...",
    "networking_opportunities": {
      "potential_investors": [
        {
          "name": "Sarah Chen",
          "title": "Partner",
          "organization": "Sequoia Capital",
          "focus_areas": ["AI/ML", "Developer Tools"],
          "stage_preference": "Seed to Series A",
          "check_size": "$5M-$20M",
          "why_relevant": "Invests in AI infrastructure tools for developers...",
          "linkedin": "linkedin.com/in/sarahchen",
          "location": "San Francisco, CA"
        }
      ],
      "fellow_builders": [
        {
          "name": "Marcus Rodriguez",
          "title": "Co-Founder & CTO",
          "company": "DataFlow AI",
          "building": "AI-powered data pipeline automation",
          "stage": "Seed",
          "why_relevant": "Building complementary infrastructure...",
          "linkedin": "linkedin.com/in/marcusrod",
          "location": "New York, NY"
        }
      ]
    }
  }
  \`\`\`
  `,
  model: {
    id: "openai/gpt-4o",
  },
});
