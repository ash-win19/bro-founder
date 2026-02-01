import { Controller, Post, Body, Logger, Get, Param } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { OrchestratorInput } from './orchestrator.agent';

@Controller('agents')
export class AgentsController {
  private readonly logger = new Logger(AgentsController.name);

  constructor(private readonly agentsService: AgentsService) {}

  @Post('orchestrator')
  async executeOrchestrator(@Body() input: OrchestratorInput) {
    this.logger.log('POST /agents/orchestrator');
    return this.agentsService.executeOrchestratorTask(input);
  }

  @Post(':agentName')
  async executeAgent(
    @Param('agentName') agentName: string,
    @Body() body: { input: string },
  ) {
    this.logger.log(`POST /agents/${agentName}`);
    return this.agentsService.executeAgent(agentName, body.input);
  }

  @Get('list')
  async listAgents() {
    this.logger.log('GET /agents/list');
    return {
      agents: [
        {
          name: 'orchestrator',
          description:
            'Main coordinator agent for breaking down and managing complex tasks',
        },
        // Add more agents here as you create them
      ],
    };
  }
}
