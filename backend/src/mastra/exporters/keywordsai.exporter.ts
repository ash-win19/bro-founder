import type {
  TracingEvent,
  TracingEventType,
  ObservabilityExporter,
  InitExporterOptions,
  AnyExportedSpan,
} from '@mastra/core/observability';
import type { IMastraLogger } from '@mastra/core/logger';

export interface KeywordsAIExporterConfig {
  apiKey?: string;
  baseUrl?: string;
  debug?: boolean;
}

/**
 * KeywordsAI Exporter for Mastra Observability
 *
 * Sends tracing data to KeywordsAI for monitoring and analytics.
 */
export class KeywordsAIExporter implements ObservabilityExporter {
  name = 'keywordsai';

  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly debug: boolean;
  private logger?: IMastraLogger;

  constructor(config?: KeywordsAIExporterConfig) {
    this.apiKey = config?.apiKey || process.env.KEYWORDSAI_API_KEY || '';
    this.baseUrl =
      config?.baseUrl ||
      process.env.KEYWORDSAI_BASE_URL ||
      'https://api.keywordsai.co';
    this.debug = config?.debug ?? false;

    if (!this.apiKey) {
      console.warn(
        '[KeywordsAIExporter] No API key provided. Exporter will be disabled.',
      );
    }
  }

  init(_options: InitExporterOptions): void {
    if (this.debug) {
      console.log('[KeywordsAIExporter] Initialized');
    }
  }

  __setLogger(logger: IMastraLogger): void {
    this.logger = logger;
  }

  async exportTracingEvent(event: TracingEvent): Promise<void> {
    if (!this.apiKey) {
      return;
    }

    // Only export on span end to get complete data
    if (event.type !== 'span_ended') {
      return;
    }

    try {
      const payload = this.createPayload(event.exportedSpan);

      if (this.debug) {
        console.log('[KeywordsAIExporter] Sending event:', JSON.stringify(payload, null, 2));
      }

      const response = await fetch(`${this.baseUrl}/api/request-logs/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        this.log('error', `Failed to send event: ${response.status} ${errorText}`);
      } else if (this.debug) {
        console.log('[KeywordsAIExporter] Event sent successfully');
      }
    } catch (error) {
      this.log('error', `Error sending event: ${error}`);
    }
  }

  private createPayload(span: AnyExportedSpan): Record<string, any> {
    const attributes = span.attributes as Record<string, any> | undefined;

    return {
      // Identifiers
      unique_id: span.id,
      trace_id: span.traceId,
      parent_id: span.parentSpanId,

      // Timing
      timestamp: span.startTime?.toISOString(),
      latency: span.endTime && span.startTime
        ? (span.endTime.getTime() - span.startTime.getTime()) / 1000
        : undefined,

      // Model info
      model: attributes?.model || 'unknown',
      provider: attributes?.provider || 'openai',

      // Messages
      prompt_messages: this.formatInput(span.input),
      completion_message: this.formatOutput(span.output),

      // Token usage
      prompt_tokens: attributes?.usage?.inputTokens,
      completion_tokens: attributes?.usage?.outputTokens,

      // Metadata
      metadata: {
        spanType: span.type,
        name: span.name,
        entityType: span.entityType,
        entityId: span.entityId,
        entityName: span.entityName,
        ...attributes,
      },

      // Status
      status: span.errorInfo ? 'failed' : 'success',
      error_message: span.errorInfo?.message,
    };
  }

  private formatInput(input: unknown): Array<{ role: string; content: string }> {
    if (!input) return [];

    if (Array.isArray(input)) {
      return input.map((msg) => ({
        role: msg.role || 'user',
        content: typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content),
      }));
    }

    if (typeof input === 'string') {
      return [{ role: 'user', content: input }];
    }

    return [{ role: 'user', content: JSON.stringify(input) }];
  }

  private formatOutput(output: unknown): { role: string; content: string } | undefined {
    if (!output) return undefined;

    if (typeof output === 'string') {
      return { role: 'assistant', content: output };
    }

    if (typeof output === 'object' && output !== null) {
      const obj = output as Record<string, unknown>;
      if ('content' in obj) {
        return {
          role: (obj.role as string) || 'assistant',
          content: typeof obj.content === 'string' ? obj.content : JSON.stringify(obj.content),
        };
      }
    }

    return { role: 'assistant', content: JSON.stringify(output) };
  }

  private log(level: 'info' | 'warn' | 'error', message: string): void {
    if (this.logger) {
      this.logger[level](message);
    } else if (this.debug) {
      console[level](`[KeywordsAIExporter] ${message}`);
    }
  }

  async flush(): Promise<void> {
    // No buffering, nothing to flush
  }

  async shutdown(): Promise<void> {
    if (this.debug) {
      console.log('[KeywordsAIExporter] Shutdown');
    }
  }
}
