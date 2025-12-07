import { NodeTool } from "@/lib/nodeflow/NodeTool";
import { MemoryManager, RAGGenerationOptions, MemoryExtractionResult } from "@/lib/core/memory-manager";
import { MemoryType, MemoryContext } from "@/lib/models/memory-model";
import { LocalMemoryOperations } from "@/lib/data/roleplay/memory-operation";

export class MemoryNodeTools extends NodeTool {
  protected static readonly toolType: string = "memory";
  protected static readonly version: string = "1.0.0";

  static getToolType(): string {
    return this.toolType;
  }

  static async executeMethod(methodName: string, ...params: any[]): Promise<any> {
    const method = (this as any)[methodName];
    
    if (typeof method !== "function") {
      console.error(`Method lookup failed: ${methodName} not found in MemoryNodeTools`);
      console.log("Available methods:", Object.getOwnPropertyNames(this).filter(name => 
        typeof (this as any)[name] === "function" && !name.startsWith("_"),
      ));
      throw new Error(`Method ${methodName} not found in ${this.getToolType()}Tool`);
    }

    try {
      this.logExecution(methodName, params);
      return await (method as Function).apply(this, params);
    } catch (error) {
      this.handleError(error as Error, methodName);
    }
  }

  /**
   * Search memories based on query
   */
  static async searchMemories(
    characterId: string,
    query: string,
    apiKey: string,
    baseUrl?: string,
    topK: number = 5,
    includeTypes?: MemoryType[],
    useSemanticSearch: boolean = true,
  ): Promise<any> {
    try {
      const memoryManager = new MemoryManager(apiKey, baseUrl);

      if (useSemanticSearch) {
        const results = await memoryManager.hybridSearch(characterId, query, {
          topK,
          includeTypes,
          similarityThreshold: 0.6,
        });

        return {
          success: true,
          results: results.map(r => ({
            id: r.entry.id,
            type: r.entry.type,
            content: r.entry.content,
            tags: r.entry.tags,
            importance: r.entry.importance,
            score: r.score,
            reasoning: r.reasoning,
          })),
          count: results.length,
        };
      } else {
        // Use basic text search
        const entries = await LocalMemoryOperations.searchMemoriesByText({
          query,
          characterId,
          types: includeTypes,
          maxResults: topK,
        });

        return {
          success: true,
          results: entries.map(entry => ({
            id: entry.id,
            type: entry.type,
            content: entry.content,
            tags: entry.tags,
            importance: entry.importance,
            score: 1.0, // No similarity score for text search
            reasoning: "Text search match",
          })),
          count: entries.length,
        };
      }
    } catch (error) {
      this.handleError(error as Error, "searchMemories");
      return {
        success: false,
        error: error instanceof Error ? (error as Error).message : "Unknown error",
        results: [],
        count: 0,
      };
    }
  }

  /**
   * Create a new memory entry
   */
  static async createMemory(
    characterId: string,
    type: MemoryType,
    content: string,
    apiKey: string,
    baseUrl?: string,
    tags: string[] = [],
    importance: number = 0.5,
    metadata: any = {},
  ): Promise<any> {
    try {
      const memoryManager = new MemoryManager(apiKey, baseUrl);
      
      const memoryEntry = await memoryManager.createMemory(
        characterId,
        type,
        content,
        metadata,
        tags,
        importance,
      );

      return {
        success: true,
        memory: {
          id: memoryEntry.id,
          type: memoryEntry.type,
          content: memoryEntry.content,
          tags: memoryEntry.tags,
          importance: memoryEntry.importance,
          created_at: memoryEntry.created_at,
        },
      };
    } catch (error) {
      this.handleError(error as Error, "createMemory");
      return {
        success: false,
        error: error instanceof Error ? (error as Error).message : "Unknown error",
      };
    }
  }

  /**
   * Clear all memories for a character
   */
  static async clearMemories(characterId: string): Promise<any> {
    try {
      await LocalMemoryOperations.clearCharacterMemories(characterId);
      
      return {
        success: true,
        message: `All memories cleared for character ${characterId}`,
      };
    } catch (error) {
      this.handleError(error as Error, "clearMemories");
      return {
        success: false,
        error: error instanceof Error ? (error as Error).message : "Unknown error",
      };
    }
  }

  /**
   * Retrieve memories and enhance system message for MemoryRetrievalNode
   */
  static async retrieveAndEnhanceSystemMessage(
    characterId: string,
    userInput: string,
    systemMessage: string,
    apiKey: string,
    baseUrl?: string,
    language: "zh" | "en" | "vi" = "zh",
    maxMemories: number = 5,
  ): Promise<{
    enhancedSystemMessage: string;
    memoryPrompt: string;
    retrievedMemories: any[];
    memoryCount: number;
  }> {
    try {
      // Search for relevant memories
      const searchResult = await this.searchMemories(
        characterId,
        userInput,
        apiKey,
        baseUrl,
        maxMemories,
        undefined, // includeTypes
        true, // useSemanticSearch
      );

      if (!searchResult.success) {
        return this.createFallbackResult(systemMessage, language);
      }

      // Format memories for prompt injection
      const memoryPrompt = this.formatMemoriesForPrompt(searchResult.results, language);

      // Inject memories into system message
      const enhancedSystemMessage = this.injectMemoriesIntoSystemMessage(systemMessage, memoryPrompt);

      console.log(`Retrieved ${searchResult.count} memories for character ${characterId}`);

      return {
        enhancedSystemMessage,
        memoryPrompt,
        retrievedMemories: searchResult.results,
        memoryCount: searchResult.count,
      };
    } catch (error) {
      this.handleError(error as Error, "retrieveAndEnhanceSystemMessage");
      return this.createFallbackResult(systemMessage, language);
    }
  }

  /**
   * Extract and store memories from conversation for MemoryStorageNode
   */
  static async extractAndStoreMemories(
    characterId: string,
    userInput: string,
    assistantResponse: string,
    conversationContext: string,
    apiKey: string,
    baseUrl?: string,
    language: "zh" | "en" | "vi" = "zh",
  ): Promise<{
    success: boolean;
    extractedCount: number;
    extractedMemories?: any[];
    confidence?: number;
    reasoning?: string;
    error?: string;
  }> {
    try {
      const memories = [];
      let extractedCount = 0;

      // Check if user mentioned their name
      const nameMatch = userInput.match(/我叫(.+)|my name is (.+)|I'm (.+)/i);
      if (nameMatch) {
        const name = nameMatch[1] || nameMatch[2] || nameMatch[3];
        const result = await this.createMemory(
          characterId,
          "fact" as any,
          `用户的名字是 ${name.trim()}`,
          apiKey,
          baseUrl,
          ["name", "user", "identity"],
          0.9,
          {
            source: "conversation_extraction",
            context: conversationContext,
          },
        );
        
        if (result.success) {
          memories.push(result.memory);
          extractedCount++;
        }
      }

      // Check for preferences mentioned in conversation
      const preferenceKeywords = ["喜欢", "不喜欢", "爱好", "兴趣", "prefer", "like", "dislike", "hobby"];
      const hasPreference = preferenceKeywords.some(keyword => 
        userInput.toLowerCase().includes(keyword) || assistantResponse.toLowerCase().includes(keyword),
      );

      if (hasPreference) {
        const result = await this.createMemory(
          characterId,
          "preference" as any,
          `对话中提到了用户偏好相关内容: ${userInput.substring(0, 100)}...`,
          apiKey,
          baseUrl,
          ["preference", "likes", "interests"],
          0.7,
          {
            source: "conversation_extraction",
            context: conversationContext,
          },
        );
        
        if (result.success) {
          memories.push(result.memory);
          extractedCount++;
        }
      }

      return {
        success: true,
        extractedCount,
        extractedMemories: memories,
        confidence: extractedCount > 0 ? 0.8 : 0,
        reasoning: `Extracted ${extractedCount} memories using basic pattern matching`,
      };

    } catch (error) {
      this.handleError(error as Error, "extractAndStoreMemories");
      return {
        success: false,
        extractedCount: 0,
        error: error instanceof Error ? (error as Error).message : "Unknown error",
      };
    }
  }

  /**
   * Private helper: Format retrieved memories for prompt injection
   */
  private static formatMemoriesForPrompt(memories: any[], language: "zh" | "en" | "vi"): string {
    if (!memories || memories.length === 0) {
      if (language === "zh") return "无相关记忆";
      if (language === "vi") return "Không có ký ức liên quan";
      return "No relevant memories";
    }

    let header = "Relevant memories:";
    if (language === "zh") header = "相关记忆：";
    else if (language === "vi") header = "Ký ức liên quan:";

    const memoryTexts = memories.map((memory, index) => {
      let typeLabel = memory.type;
      if (language === "zh") typeLabel = this.getChineseTypeLabel(memory.type);
      else if (language === "vi") typeLabel = this.getVietnameseTypeLabel(memory.type);

      return `${index + 1}. [${typeLabel}] ${memory.content}`;
    });

    return `${header}\n${memoryTexts.join("\n")}`;
  }

  /**
   * Private helper: Inject memories into system message
   */
  private static injectMemoriesIntoSystemMessage(systemMessage: string, memoryPrompt: string): string {
    // Replace {{memory}} placeholder if exists
    if (systemMessage.includes("{{memory}}")) {
      return systemMessage.replace("{{memory}}", memoryPrompt);
    }

    // If no placeholder, append memory section
    return `${systemMessage}\n\n<memory>\n${memoryPrompt}\n</memory>`;
  }

  /**
   * Private helper: Get Chinese labels for memory types
   */
  private static getChineseTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      "fact": "事实",
      "relationship": "关系",
      "event": "事件",
      "preference": "偏好",
      "emotion": "情感",
      "geography": "地理",
      "concept": "概念",
      "dialogue": "对话",
    };
    return labels[type] || type;
  }

  /**
   * Private helper: Get Vietnamese labels for memory types
   */
  private static getVietnameseTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      "fact": "Sự thật",
      "relationship": "Mối quan hệ",
      "event": "Sự kiện",
      "preference": "Sở thích",
      "emotion": "Cảm xúc",
      "geography": "Địa lý",
      "concept": "Khái niệm",
      "dialogue": "Đối thoại",
    };
    return labels[type] || type;
  }

  /**
   * Private helper: Create fallback result for memory retrieval
   */
  private static createFallbackResult(systemMessage: string, language: "zh" | "en" | "vi") {
    let memoryPrompt = "No relevant memories";
    if (language === "zh") memoryPrompt = "无相关记忆";
    else if (language === "vi") memoryPrompt = "Không có ký ức liên quan";

    return {
      enhancedSystemMessage: systemMessage,
      memoryPrompt,
      retrievedMemories: [],
      memoryCount: 0,
    };
  }

  /**
   * Private helper: Enhance system message with memory context
   */
  private static enhanceSystemMessageWithMemory(
    originalSystemMessage: string,
    memoryContext: MemoryContext,
    language: "zh" | "en" | "vi",
  ): string {
    if (!memoryContext.memoryPrompt || memoryContext.activeMemories.length === 0) {
      return originalSystemMessage;
    }

    // Check if memory context already exists to avoid duplication
    let memoryKeywords = ["memory", "memories", "relevant memories"];
    if (language === "zh") memoryKeywords = ["记忆", "回忆", "相关记忆"];
    else if (language === "vi") memoryKeywords = ["ký ức", "hồi ức", "ký ức liên quan"];

    const hasMemoryContext = memoryKeywords.some(keyword =>
      originalSystemMessage.toLowerCase().includes(keyword.toLowerCase()),
    );

    if (hasMemoryContext) {
      // Replace existing memory placeholder
      let memoryPlaceholders = ["{{memories}}", "{{relevant_memories}}", "{{memory}}"];
      if (language === "zh") memoryPlaceholders = ["{{memories}}", "{{相关记忆}}", "{{记忆}}"];
      else if (language === "vi") memoryPlaceholders = ["{{memories}}", "{{ký_ức_liên_quan}}", "{{ký_ức}}"];

      let enhancedMessage = originalSystemMessage;
      for (const placeholder of memoryPlaceholders) {
        if (enhancedMessage.includes(placeholder)) {
          enhancedMessage = enhancedMessage.replace(placeholder, memoryContext.memoryPrompt);
          break;
        }
      }

      // If no placeholder found, append memory context
      if (enhancedMessage === originalSystemMessage) {
        const separator = "\n\n";
        enhancedMessage = `${originalSystemMessage}${separator}${memoryContext.memoryPrompt}`;
      }

      return enhancedMessage;
    } else {
      // Add memory context to system message
      const separator = "\n\n";
      return `${originalSystemMessage}${separator}${memoryContext.memoryPrompt}`;
    }
  }
} 
