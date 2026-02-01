import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { mastra, executeOrchestrator, executeGeneral, AgentName } from './mastra.config';
import { OrchestratorInput } from './agents/orchestrator.agent';
import { GeneralInput } from './agents/general.agent';

@Injectable()
export class AgentsService {
  private readonly logger = new Logger(AgentsService.name);

  constructor(private configService: ConfigService) {
    this.logger.log('AgentsService initialized');
  }

  /**
   * Execute the orchestrator agent with a task
   */
  async executeOrchestratorTask(input: OrchestratorInput) {
    try {
      this.logger.log(`Executing orchestrator task: ${input.task}`);
      const result = await executeOrchestrator(input);
      return {
        success: true,
        data: result,
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
}
