# Phase 1: Implementation of First Message Translation

## Overview
Implement the logic to intercept the "Regenerate" action on the first message, translate it using the active LLM, and persist the change.

## Requirements
1.  **Trigger**: Clicking "Regenerate" on the first assistant message (when `userMessage` is undefined).
2.  **Translation**:
    - Use active LLM settings.
    - Prompt: "Translate to Vietnamese, Roleplay style".
3.  **Persistence**:
    - Identify if `first_mes` or `alternate_greetings` was shown.
    - Update the correct field in IndexedDB.
4.  **UI**:
    - Show loading state during translation.
    - Update message content in place.
    - Show success/error toast.

## Implementation Steps

### Step 1: Create Translation Utility
- Create `function/translate/translate-greeting.ts` (or similar).
- It should accept `text` and `llmConfig`.
- It calls `LLMNodeTools.invokeLLM` with the translation prompt.

### Step 2: Implement Logic in `app/character/page.tsx`
- **Imports**: `LocalCharacterRecordOperations`, `LLMNodeTools` (or the new utility).
- **State**: Maybe need `isTranslating` state? Or reuse `isLoading`.
- **`handleRegenerate` Modification**:
  ```typescript
  const handleRegenerate = async (nodeId: string) => {
    // ... existing finding logic ...
    if (!userMessage) {
       // It's the first message
       await handleTranslateGreeting(nodeId, assistantMessage.content);
       return;
    }
    // ... existing logic ...
  }
  ```

### Step 3: Implement `handleTranslateGreeting`
- **Loading**: Set `isLoading(true)`.
- **Fetch Data**: Get character record.
- **Identify**: Loop through `alternate_greetings` and `first_mes` to find match.
- **Translate**: Call translation utility.
- **Update Record**: Modify character object and save to IndexedDB.
- **Update UI**:
  - Update `messages` array.
  - Call `updateDialogueNode` (if needed to sync dialogue tree) - strictly speaking, we are updating the *Character Definition*, the dialogue tree might need update too if it stores content copy.
    - *Check*: Does `DialogueNode` store content? Yes.
    - So we need to update *both* the Character Record (for future) AND the current Dialogue Node (for current session/history).
    - Use `LocalCharacterDialogueOperations.updateNode` (if exists) or just update the state if the dialogue is re-loaded next time?
    - If we update Character Record, next time we load, it will pull the new text.
    - But current dialogue tree has the old text.
    - We should update the current dialogue node too.
- **Cleanup**: `isLoading(false)`.

## Todo List
- [ ] Create translation utility `function/translate/character-translator.ts`.
- [ ] Modify `app/character/page.tsx` to import dependencies.
- [ ] Implement `handleTranslateGreeting` function.
- [ ] Modify `handleRegenerate` to branch to translation logic.
- [ ] Test with a character having `first_mes` and `alternate_greetings`.

## Key Files
- `app/character/page.tsx`
- `function/translate/character-translator.ts` (New)
- `lib/data/roleplay/character-record-operation.ts`
