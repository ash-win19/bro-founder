// API client for backend communication

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface OrchestratorRequest {
  task: string;
  context?: {
    currentPhase?: string;
    productData?: Record<string, unknown>;
  };
  userId?: string;
  sessionId?: string;
}

export interface OrchestratorResponse {
  response: string;
  actions?: Array<{
    action: string;
    status: 'pending' | 'in_progress' | 'completed' | 'failed';
    result?: unknown;
  }>;
  suggestions?: string[];
  metadata?: {
    agentsUsed?: string[];
    timestamp?: string;
  };
}

export const callOrchestratorAgent = async (
  request: OrchestratorRequest
): Promise<OrchestratorResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/agents/orchestrator`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Handle the wrapped response format from backend
    if (data.success && data.data) {
      // Extract the text from Mastra's generate response
      const responseText = data.data.text || data.data.content || JSON.stringify(data.data);
      return {
        response: responseText,
        actions: data.data.actions,
        suggestions: data.data.suggestions,
        metadata: data.data.metadata,
      };
    } else if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error('Error calling orchestrator agent:', error);
    throw error;
  }
};
