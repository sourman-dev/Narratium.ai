import { LLMNodeTools, LLMConfig } from "@/lib/nodeflow/LLMNode/LLMNodeTools";

/**
 * Translates character greeting to Vietnamese using the active LLM.
 * @param text The text to translate
 * @param config The LLM configuration
 * @returns The translated text
 */
export async function translateGreeting(
  text: string,
  config: LLMConfig
): Promise<string> {
  const systemMessage = `Translate the following roleplay character greeting to Vietnamese.
Maintain the character's tone, style, and personality.
Output ONLY the translated text without any explanations or notes.`;

  const userMessage = text;

  try {
    const translatedText = await LLMNodeTools.invokeLLM(
      systemMessage,
      userMessage,
      config
    );
    return translatedText.trim();
  } catch (error) {
    console.error("Translation failed:", error);
    throw error;
  }
}
