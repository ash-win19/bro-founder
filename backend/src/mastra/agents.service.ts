import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  mastra,
  executeOrchestrator,
  executeGeneral,
  AgentName,
} from './mastra.config';
import { OrchestratorInput } from './agents/orchestrator.agent';
import { KeywordsAIPromptService } from './keywordsai-prompt.service';
import { GeneralInput } from './agents/general.agent';

@Injectable()
export class AgentsService {
  private readonly logger = new Logger(AgentsService.name);

  constructor(
    private configService: ConfigService,
    private keywordsAIPromptService: KeywordsAIPromptService,
  ) {
    this.logger.log('AgentsService initialized');
  }

  /**
   * Execute the orchestrator agent with a task
   */
  async executeOrchestratorTask(input: OrchestratorInput) {
    try {
      this.logger.log(`Executing orchestrator task: ${input.task}`);
      const result = await executeOrchestrator(input);

      // Extract the text response from Mastra's generate result
      const responseText = result?.text || '';

      return {
        success: true,
        data: {
          ...result, // Include all properties from Mastra first
          response: responseText, // Add response field for frontend compatibility
        },
      };
    } catch (error) {
      this.logger.error('Error executing orchestrator task:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Execute the general agent with a question
   */
  async executeGeneralTask(input: GeneralInput) {
    try {
      this.logger.log(`Executing general task: ${input.question}`);
      const result = await executeGeneral(input);
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      this.logger.error('Error executing general task:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Get a specific agent by name
   */
  getAgent(name: AgentName) {
    try {
      return mastra.getAgent(name);
    } catch (error) {
      this.logger.error(`Error getting agent ${name}:`, error);
      throw error;
    }
  }

  /**
   * Execute any agent by name with custom input
   */
  async executeAgent(agentName: AgentName, input: string) {
    try {
      this.logger.log(`Executing agent: ${agentName}`);
      const agent = this.getAgent(agentName);
      const result = await agent.generate(input);
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      this.logger.error(`Error executing agent ${agentName}:`, error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Stream responses from an agent
   */
  async *streamAgent(agentName: AgentName, input: string) {
    try {
      const agent = this.getAgent(agentName);
      const stream = await agent.stream(input);

      // According to Mastra docs, iterate over textStream
      for await (const chunk of stream.textStream) {
        yield chunk;
      }
    } catch (error) {
      this.logger.error(`Error streaming from agent ${agentName}:`, error);
      throw error;
    }
  }

  /**
   * Run a managed prompt from Keywords AI
   */
  async runManagedPrompt(
    promptId: string,
    variables: Record<string, string> = {},
  ) {
    try {
      this.logger.log(`Running managed prompt: ${promptId}`);
      const result = await this.keywordsAIPromptService.runPrompt({
        promptId,
        variables,
      });
      return {
        success: true,
        data: { content: result.content },
      };
    } catch (error) {
      this.logger.error(`Error running managed prompt ${promptId}:`, error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Run market research using Keywords AI prompt management
   */
  async runMarketResearchWithPrompt(variables: Record<string, string> = {}) {
    try {
      this.logger.log('Running market research with Keywords AI prompt management');
      const result = await this.keywordsAIPromptService.runAgentPrompt(
        'market-research',
        variables,
      );
      return {
        success: true,
        data: { content: result.content },
      };
    } catch (error) {
      this.logger.error('Error running market research prompt:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
