import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AgentsService } from './agents.service';
import { AgentsController } from './agents.controller';
import { KeywordsAIPromptService } from './keywordsai-prompt.service';

@Module({
  imports: [ConfigModule],
  controllers: [AgentsController],
  providers: [AgentsService, KeywordsAIPromptService],
  exports: [AgentsService, KeywordsAIPromptService],
})
export class AgentsModule {}
