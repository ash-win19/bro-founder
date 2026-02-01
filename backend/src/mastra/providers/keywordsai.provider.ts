import { createOpenAI } from '@ai-sdk/openai';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Prompt IDs for managed prompts in Keywords AI
 * Update these with your prompt IDs from the Keywords AI dashboard
 */
export const KEYWORDSAI_PROMPT_IDS = {
  'market-research': 'c08ddf9b5ad4473ba30dd41121cdd1be',
  'business': 'e985a908733c49088eeefd75309a384a',
  'brainstorm': 'b311f8e47d9c426fa43028fe0afb195a',
  'devplanner': '087d34eea6b74a63a823af1c5f230802',
  'general': '5e05e954e77547358dd06ae14c689a3f',
  'overview': '6089dc5982654d20b7305019d7e0bf80',
  'pitch': '5d21d12758384ebb8d71cdc23578a326',
} as const;

/**
 * Creates a custom fetch function that injects prompt management config
 * into the request body for Keywords AI
 */
function createPromptManagedFetch(promptId: string, variables: Record<string, string> = {}) {
  return async (url: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    // Convert URL to string for manipulation
    let urlString = url.toString();

    // Force chat completions endpoint instead of responses API
    if (urlString.includes('/responses')) {
      urlString = urlString.replace('/responses', '/chat/completions');
    }

    if (init?.body) {
      try {
        const body = JSON.parse(init.body as string);

        // Inject prompt management config
        body.prompt = {
          prompt_id: promptId,
          variables,
        };
        body.customer_identifier = 'bro-founder-mastra';

        // Convert from responses API format to chat completions format if needed
        if (body.input && !body.messages) {
          body.messages = body.input.map((msg: any) => {
            if (msg.content && Array.isArray(msg.content)) {
              // Convert input_text format to simple string
              const textContent = msg.content
                .filter((c: any) => c.type === 'input_text')
                .map((c: any) => c.text)
                .join('\n');
              return { role: msg.role, content: textContent };
            }
            return msg;
          });
          delete body.input;
        }

        init = {
          ...init,
          body: JSON.stringify(body),
        };
      } catch (e) {
        // If body isn't JSON, pass through unchanged
        console.error('Failed to parse request body:', e);
      }
    }

    return fetch(urlString, init);
  };
}

/**
 * Helper function to create a Keywords AI provider with prompt management
 */
function createKeywordsAIProvider(promptId: string) {
  return createOpenAI({
    apiKey: process.env.KEYWORDSAI_API_KEY,
    baseURL: 'https://api.keywordsai.co/api/',
    fetch: createPromptManagedFetch(promptId),
  });
}

// Create providers for each agent
const marketResearchProvider = createKeywordsAIProvider(KEYWORDSAI_PROMPT_IDS['market-research']);
const businessProvider = createKeywordsAIProvider(KEYWORDSAI_PROMPT_IDS['business']);
const brainstormProvider = createKeywordsAIProvider(KEYWORDSAI_PROMPT_IDS['brainstorm']);
const devplannerProvider = createKeywordsAIProvider(KEYWORDSAI_PROMPT_IDS['devplanner']);
const generalProvider = createKeywordsAIProvider(KEYWORDSAI_PROMPT_IDS['general']);
const overviewProvider = createKeywordsAIProvider(KEYWORDSAI_PROMPT_IDS['overview']);
const pitchProvider = createKeywordsAIProvider(KEYWORDSAI_PROMPT_IDS['pitch']);

/**
 * Pre-configured models for each agent
 * Uses .chat() to ensure chat completions API is used
 */
export const marketResearchModel = marketResearchProvider.chat('gpt-4o');
export const businessModel = businessProvider.chat('gpt-4o');
export const brainstormModel = brainstormProvider.chat('gpt-4o');
export const devplannerModel = devplannerProvider.chat('gpt-4o');
export const generalModel = generalProvider.chat('gpt-4o');
export const overviewModel = overviewProvider.chat('gpt-4o');
export const pitchModel = pitchProvider.chat('gpt-4o');

/**
 * Basic Keywords AI provider (for observability only, no prompt management)
 */
export const keywordsai = createOpenAI({
  apiKey: process.env.KEYWORDSAI_API_KEY,
  baseURL: 'https://api.keywordsai.co/api/',
});
