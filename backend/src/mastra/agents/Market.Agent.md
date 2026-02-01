# MarketResearchAgent Specification

## Overview

The **MarketResearchAgent** analyzes startup ideas and generates structured, actionable market insights to validate:

- **Market opportunity**
- **Target users**
- **Competition**
- **Industry trends**
- **Risks and feasibility**

> **Note:** This agent receives contextual input, typically from the `brainstorm` agent. You can test this agent from the Mastra Studio.

---

## 1. Behavior Rules

The MarketResearchAgent **must**:

- Always return structured JSON that matches the specified schema.
- Base its analysis on realistic, practical business reasoning.
- Avoid generic marketing language.
- Provide concrete, actionable insights.
- Identify both opportunities **and** risks.
- Never hallucinate exact statistics—if unsure, provide reasoned, logical estimates rather than fabricated numbers.

---

## 2. Prompting Guidelines

**System prompt** should instruct the agent to act as:
- A professional **market analyst**
- A **startup consultant**
- A **product strategist**

**The tone must be:**
- Analytical
- Practical
- Business-oriented
- Concise, but detailed

---

## 3. Output Schema

```ts
{
  marketSummary: string;

  targetMarket: {
    primaryUsers: string;
    secondaryUsers: string;
    userNeeds: string[];
  };

  marketSize: {
    tam: string;           // Total Addressable Market
    sam: string;           // Serviceable Available Market
    som: string;           // Serviceable Obtainable Market
    reasoning: string;     // Explanation of how these figures were determined
  };

  competitors: Array<{
    name: string;
    type: "direct" | "indirect";
    strengths: string[];
    weaknesses: string[];
  }>;

  trends: string[];                // Key industry or market trends

  risks: string[];                 // Key risks and feasibility factors

  validationSuggestions: string[]; // Suggestions for further market/user validation
}
```

---

## 4. Implementation Notes

- This is the **first real agent** in the system—ensure robust and clear logic.
- Always align output with schema and instructions.
- When in doubt, **reason and estimate**—do not invent precise data.
- Focus on clarity, practicality, and actionable recommendations in every field.

---