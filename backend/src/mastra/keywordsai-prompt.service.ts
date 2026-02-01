import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatOpenAI } from '@langchain/openai';

// Import prompt IDs from provider (single source of truth)
import { KEYWORDSAI_PROMPT_IDS } from './providers/keywordsai.provider';

export type ManagedAgentName = keyof typeof KEYWORDSAI_PROMPT_IDS;

export interface RunPromptOptions {
  promptId: string;
  variables?: Record<string, string>;
  model?: string;
  customerIdentifier?: string;
}

export interface RunPromptResult {
  content: string;
}

@Injectable()
export class KeywordsAIPromptService {
  private readonly logger = new Logger(KeywordsAIPromptService.name);
  private readonly apiKey: string | undefined;
  private readonly baseUrl: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('KEYWORDSAI_API_KEY');
    let baseUrl = this.configService.get<string>('KEYWORDSAI_BASE_URL') || 'https://api.keywordsai.co';

    // Ensure base URL ends with /api/
    if (!baseUrl.endsWith('/api/')) {
      baseUrl = baseUrl.endsWith('/api') ? `${baseUrl}/` : `${baseUrl}/api/`;
    }
    this.baseUrl = baseUrl;

    if (!this.apiKey) {
      this.logger.warn(
        'KEYWORDSAI_API_KEY not configured. Managed prompts are disabled.',
      );
    } else {
      this.logger.log('KeywordsAIPromptService initialized');
    }
  }

  async runPrompt(options: RunPromptOptions): Promise<RunPromptResult> {
    if (!this.apiKey) {
      throw new Error(
        'Keywords AI is not configured. Set KEYWORDSAI_API_KEY in environment.',
      );
    }

    const {
      promptId,
      variables = {},
      model = 'gpt-4o',
      customerIdentifier = 'bro-founder-user',
    } = options;

    this.logger.log(`Running managed prompt: ${promptId}`);

    const llm = new ChatOpenAI({
      configuration: {
        baseURL: this.baseUrl,
      },
      openAIApiKey: this.apiKey,
      modelName: model,
      modelKwargs: {
        prompt: {
          prompt_id: promptId,
          variables,
        },
        customer_identifier: customerIdentifier,
      },
    });

    const response = await llm.invoke('placeholder');
    const content = typeof response.content === 'string'
      ? response.content
      : JSON.stringify(response.content);

    return { content };
  }

  /**
   * Run a managed prompt for a specific agent by name
   */
  async runAgentPrompt(
    agentName: ManagedAgentName,
    variables: Record<string, string> = {},
  ): Promise<RunPromptResult> {
    const promptId = KEYWORDSAI_PROMPT_IDS[agentName];
    if (!promptId) {
      throw new Error(`No prompt ID configured for agent: ${agentName}`);
    }
    return this.runPrompt({ promptId, variables });
  }
}
