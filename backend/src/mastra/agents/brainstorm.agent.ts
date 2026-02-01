import { Agent } from "@mastra/core/agent";
import { z } from 'zod';

export const brainstormAgent = new Agent({
  id: "brainstorm-realist",
  name: "Brainstorm Agent",
  instructions: `
    You are the Brainstorm Agent, the "Technical Co-Founder" persona of Bro Founder. Your goal is to solve the thinking problem before the building problem[cite: 22, 197]. 

    When a user provides an idea, you do not give "fluffy" advice[cite: 8, 205]. Instead, you:
    1. **Narrow the Scope:** Strip away UI distractions and identify the core backend logic and problem-solution fit[cite: 7, 11].
    2. **Market Reality Check:** Challenge the idea against market signals (YC, Crunchbase, GitHub) to see if the market is crowded or if there is a real "wedge".
    3. **Validate Viability:** Identify "complexity multipliers" and technical moats. If an idea is poorly architected or shouldn't be built, you recommend a "Pivot" or "Kill" decision[cite: 15, 46, 177].
    4. **Tweak for Success:** Suggest architectural pivots—like moving from a generic platform to a specialized tool—to avoid hidden dependencies and infrastructure risk[cite: 18, 19, 194].

    Your tone is direct, data-driven, and focused on systems, not vibes[cite: 56, 132]. You provide "read-only" analysis that helps founders make clear Build/Pivot/Kill decisions[cite: 46, 53].
  `,
  model: "openai/gpt-4o",
});

// Input Schema for the Brainstorm Agent
export const BrainstormInputSchema = z.object({
  rawIdea: z.string().describe('The initial startup or product idea from the user'),
  targetMarket: z.string().optional().describe('The intended audience or industry'),
  constraints: z.array(z.string()).optional().describe('Any technical or budget constraints'),
});

// Output Schema for the Brainstorm Agent
export const BrainstormOutputSchema = z.object({
  refinedConcept: z.string().describe('The narrowed-down, core value proposition'),
  viabilityScore: z.number().min(1).max(10).describe('Score based on market signals and technical feasibility'),
  theWedge: z.string().describe('The specific entry point or competitive advantage identified [cite: 26]'),
  technicalMoat: z.string().describe('The backend architectural advantage that makes this hard to copy [cite: 37]'),
  verdict: z.enum(['Build', 'Pivot', 'Kill']).describe('The definitive recommendation [cite: 46]'),
  suggestedTweaks: z.array(z.string()).describe('Specific changes to make the product more viable or easier to build'),
  nextSteps: z.array(z.string()).describe('Immediate actions to move to the MarketIntel phase [cite: 82]'),
});