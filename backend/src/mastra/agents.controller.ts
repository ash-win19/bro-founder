import {
  Controller,
  Post,
  Body,
  Logger,
  Get,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { AgentsService } from './agents.service';
import { OrchestratorInput } from './agents/orchestrator.agent';
import { GeneralInput } from './agents/general.agent';
import { AgentName } from './mastra.config';

@Controller('agents')
export class AgentsController {
  private readonly logger = new Logger(AgentsController.name);

  constructor(private readonly agentsService: AgentsService) {}

  @Post('orchestrator')
  async executeOrchestrator(@Body() input: OrchestratorInput) {
    this.logger.log('POST /agents/orchestrator');
    return this.agentsService.executeOrchestratorTask(input);
  }

  @Post('prompts/run')
  async runManagedPrompt(
    @Body() body: { promptId: string; variables?: Record<string, string> },
  ) {
    this.logger.log('POST /agents/prompts/run');

    if (!body.promptId) {
      throw new BadRequestException('promptId is required');
    }

    return this.agentsService.runManagedPrompt(
      body.promptId,
      body.variables ?? {},
    );
  }

  @Post('prompts/market-research')
  async runMarketResearchPrompt(
    @Body() body: { variables?: Record<string, string> },
  ) {
    this.logger.log('POST /agents/prompts/market-research');
    return this.agentsService.runMarketResearchWithPrompt(body.variables ?? {});
  }

  @Post('general')
  async executeGeneral(@Body() input: GeneralInput) {
    this.logger.log('POST /agents/general');
    return this.agentsService.executeGeneralTask(input);
  }

  @Post(':agentName')
  async executeAgent(
    @Param('agentName') agentName: string,
    @Body() body: { input: string },
  ) {
    this.logger.log(`POST /agents/${agentName}`);

    // Validate that agentName is a valid AgentName
    const validAgents: AgentName[] = [
      'orchestrator',
      'general',
      'business',
      'mvpPlanner',
      'brainstorm',
      'market-research',
    ];
    if (!validAgents.includes(agentName as AgentName)) {
      throw new BadRequestException(
        `Invalid agent name: ${agentName}. Valid agents: ${validAgents.join(', ')}`,
      );
    }

    return this.agentsService.executeAgent(agentName as AgentName, body.input);
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
        {
          name: 'market-research',
          description:
            'Analyzes startup ideas and generates structured market insights',
        },
        {
          name: 'general',
          description:
            'General-purpose assistant for answering questions and providing information',
        },
        {
          name: 'business',
          description:
            'Business strategy expert that helps validate ideas and create business plans',
        },
        {
          name: 'mvpPlanner',
          description:
            'Pragmatic technical co-founder that translates product ideas into actionable MVP roadmaps',
        },
      ],
    };
  }
}
