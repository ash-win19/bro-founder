import { Agent } from "@mastra/core/agent";
import { z } from 'zod';
import { devplannerModel } from '../providers/keywordsai.provider';

/**
 * Dev Planner Agent (CTO)
 *
 * IMPORTANT: This agent uses Keywords AI Prompt Management.
 * The actual prompt/instructions are managed in Keywords AI dashboard.
 * Prompt ID: 087d34eea6b74a63a823af1c5f230802
 */
export const devPlannerAgent = new Agent({
  id: "dev-planner-cto",
  name: "CTO / Lead Architect",
  instructions: '',
  model: devplannerModel,
});

// Schema for Page 3 (The Blueprint)
export const DevPlannerOutputSchema = z.object({
  estimatedDuration: z.string(),
  complexityScore: z.number().min(0).max(100),
  techStack: z.array(z.object({
    category: z.string(),
    tool: z.string(),
    justification: z.string()
  })),
  roadmap: z.array(z.object({
    phase: z.string(),
    duration: z.string(),
    tasks: z.array(z.string()),
    milestone: z.string()
  })),
  masterSystemPrompt: z.string()
});
