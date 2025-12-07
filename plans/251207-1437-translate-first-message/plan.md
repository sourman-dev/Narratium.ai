# Plan: Translate First Message on Regenerate

## Overview
Implement a feature to manually translate the first character greeting (first_mes or alternate_greetings) to Vietnamese using the active LLM when the "Regenerate" button is clicked on the first message.

## Context
- **Trigger**: "Regenerate" button on the first message (where no previous user message exists).
- **Goal**: Translate the text to Vietnamese and save it back to the character card data (IndexedDB) so it persists.
- **Tools**: Active LLM (OpenAI/Ollama) configured in settings.

## Phases

### Phase 1: Implementation
- [x] **Hijack `handleRegenerate`**: Detect when regeneration is requested for the first message (no preceding user message).
- [x] **Identify Source**: Find whether the message comes from `first_mes` or `alternate_greetings` in the `CharacterRecord`.
- [x] **Translate**: Use the active LLM to translate the content to Vietnamese (Roleplay style).
- [x] **Persist**: Save the translated text back to IndexedDB using `LocalCharacterRecordOperations` (using new `translated_greetings` field).
- [x] **Update UI**: Reflect the translation immediately in the chat interface.

## Implementation Details

### 1. Modify `app/character/page.tsx`
- Update `handleRegenerate(nodeId)`:
  - Find the message with `nodeId`.
  - Check if a previous user message exists.
  - If NOT (it's the first message), call `handleTranslateFirstMessage(nodeId, messageContent)`.
  - Else, proceed with existing logic.

### 2. Implement `handleTranslateFirstMessage`
- **Fetch Character**: `await LocalCharacterRecordOperations.getCharacterById(characterId)`.
- **Match Source**:
  - Check if `content` exists in `translated_greetings` map.
  - If yes, use cached translation.
  - If no, proceed to translate.
- **Translate**:
  - Construct a prompt:
    ```
    Translate the following roleplay character greeting to Vietnamese.
    Maintain the character's tone, style, and personality.
    Output ONLY the translated text.

    Original Text:
    {content}
    ```
  - Retrieve LLM config from `localStorage` (`llmType`, `modelName`, `baseUrl`, `apiKey`).
  - Invoke LLM.
- **Save**:
  - Update `translated_greetings` field in `character` record with `{[originalContent]: translatedContent}`.
  - Call `await LocalCharacterRecordOperations.updateCharacter(character)`.
- **Update State**:
  - Update `messages` state to replace the content of the target node.
  - Show a toast notification ("Translation completed and saved").

## Risks
- **LLM Availability**: If LLM is not configured or offline, show error.
- **Matching**: If the message content in UI differs slightly from DB (e.g., formatting), matching might fail. (Should be exact match since it's loaded from DB).
- **Permissions**: `LocalCharacterRecordOperations` runs on client (IndexedDB), so permissions are fine.

## Status
- **Completed**: 2025-12-07
- **Notes**: Implemented using `translated_greetings` field to avoid overwriting original character data.
