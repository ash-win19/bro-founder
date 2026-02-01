import { Agent } from "@mastra/core/agent";
import { z } from "zod";
import { marketResearchModel } from "../providers/keywordsai.provider";

/**
 * MarketResearchAgent
 *
 * Analyzes startup ideas and generates structured, actionable market insights.
 *
 * IMPORTANT: This agent uses Keywords AI Prompt Management.
 * The actual prompt/instructions are managed in Keywords AI dashboard.
 * Prompt ID: c08ddf9b5ad4473ba30dd41121cdd1be
 *
 * To update the prompt, go to Keywords AI dashboard and edit the prompt there.
 */
export const marketResearchAgent = new Agent({
  id: "market-research",
  name: "Market Research Agent",
  // Instructions are managed via Keywords AI prompt management
  // The prompt_id is injected into requests via the custom fetch wrapper
  instructions: "",
  model: marketResearchModel,
});

// Schema for market research input
export const MarketResearchInputSchema = z.object({
  ideaName: z.string().describe("The name or title of the startup idea"),
  ideaDescription: z
    .string()
    .describe("Detailed description of the startup idea"),
  problemStatement: z
    .string()
    .optional()
    .describe("The problem the startup aims to solve"),
  proposedSolution: z
    .string()
    .optional()
    .describe("The proposed solution or product"),
  targetIndustry: z
    .string()
    .optional()
    .describe("The target industry or sector"),
  additionalContext: z
    .record(z.any())
    .optional()
    .describe("Any additional context from previous agents (e.g., brainstorm)"),
});

// Schema for market research output
export const MarketResearchOutputSchema = z.object({
  marketSummary: z
    .string()
    .describe("Executive summary of the market opportunity"),

  targetMarket: z.object({
    primaryUsers: z
      .string()
      .describe("Description of the primary target user segment"),
    secondaryUsers: z
      .string()
      .describe("Description of secondary user segments"),
    userNeeds: z
      .array(z.string())
      .describe("List of key user needs and pain points"),
  }),

  marketSize: z.object({
    tam: z.string().describe("Total Addressable Market estimate"),
    sam: z.string().describe("Serviceable Available Market estimate"),
    som: z.string().describe("Serviceable Obtainable Market estimate"),
    reasoning: z
      .string()
      .describe("Explanation of how these figures were determined"),
  }),

  competitors: z
    .array(
      z.object({
        name: z.string().describe("Competitor name"),
        type: z
          .enum(["direct", "indirect"])
          .describe("Whether competitor is direct or indirect"),
        strengths: z.array(z.string()).describe("Competitor strengths"),
        weaknesses: z.array(z.string()).describe("Competitor weaknesses"),
      })
    )
    .describe("Analysis of key competitors"),

  trends: z
    .array(z.string())
    .describe("Key industry or market trends relevant to this idea"),

  risks: z
    .array(z.string())
    .describe("Key risks and feasibility factors to consider"),

  validationSuggestions: z
    .array(z.string())
    .describe("Suggestions for further market and user validation"),
});

export type MarketResearchInput = z.infer<typeof MarketResearchInputSchema>;
export type MarketResearchOutput = z.infer<typeof MarketResearchOutputSchema>;
