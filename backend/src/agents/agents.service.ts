import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  mastra,
  executeOrchestrator,
  OrchestratorInput,
} from './mastra.config';

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
   * Get a specific agent by name
   */
  getAgent(name: string) {
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
  async executeAgent(agentName: string, input: string) {
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
  async *streamAgent(agentName: string, input: string) {
    try {
      const agent = this.getAgent(agentName);
      const stream = await agent.stream(input);

      for await (const chunk of stream) {
        yield chunk;
      }
    } catch (error) {
      this.logger.error(`Error streaming from agent ${agentName}:`, error);
      throw error;
    }
  }
}
