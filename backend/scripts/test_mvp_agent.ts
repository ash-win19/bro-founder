
import { mvpPlannerAgent, MVPPlannerInput } from '../src/mastra/agents/mvp.agent';

async function main() {
  console.log('Testing MVP Planner Agent configuration...');

  try {
    // Check if agent is defined
    if (!mvpPlannerAgent) {
        throw new Error("mvpPlannerAgent is undefined");
    }

    console.log(`Agent Name: ${mvpPlannerAgent.name}`);
    console.log(`Agent ID: ${mvpPlannerAgent.id}`);

    // Verify instructions contain the injected strategies
    // @ts-ignore - instructions might be private or accessed via getter depending on version
    const instructions = typeof mvpPlannerAgent.getInstructions === 'function' 
        ? await mvpPlannerAgent.getInstructions() 
        : (mvpPlannerAgent as any).instructions;
    
    if (typeof instructions !== 'string') {
        console.error("Instructions type:", typeof instructions);
        throw new Error("Instructions is not a string");
    }

    console.log('\n--- Instructions Verification ---');
    
    const strategiesCheck = instructions.includes('For AI-Heavy Products');
    console.log(`Contains AI-Heavy Strategy: ${strategiesCheck ? '✅' : '❌'}`);

    const communicationCheck = instructions.includes('Direct and specific - No fluff');
    console.log(`Contains Communication Style: ${communicationCheck ? '✅' : '❌'}`);

    const pushbackCheck = instructions.includes('That\'s a great v2 feature');
    console.log(`Contains Pushback Responses: ${pushbackCheck ? '✅' : '❌'}`);

    const metricsCheck = instructions.includes('Founders can start coding within 24 hours');
    console.log(`Contains Success Metrics: ${metricsCheck ? '✅' : '❌'}`);

    if (strategiesCheck && communicationCheck && pushbackCheck && metricsCheck) {
        console.log('\nAll configuration parts successfully integrated into agent instructions.');
    } else {
        console.error('\nSome configuration parts are missing from instructions!');
    }

  } catch (error) {
    console.error('Error during test:', error);
    process.exit(1);
  }
}

main();
