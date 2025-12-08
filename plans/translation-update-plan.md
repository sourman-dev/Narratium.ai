# Plan: Update Translation Files

## Status
- [x] Check for missing translation keys in en.json and zh.json compared to vi.json
- [x] Update en.json with missing keys (None found)
- [x] Update zh.json with missing keys (Added `game.requestFailed` and `game.checkNetworkOrAPI`)
- [x] Fix hardcoded values and imports in `lib/core/preset-assembler.ts` to support Vietnamese
  - [x] Updated `assemblePrompts` to handle `language === "vi"` with Vietnamese output format instructions.
  - [x] Updated `_getDefaultFramework` to handle `language === "vi"` with Vietnamese output format instructions.
- [x] Add Vietnamese versions for character-prompts functions
  - [x] Added `getCharacterCompressorPromptVi`
  - [x] Added `getStatusPromptVi`
  - [x] Added `getStoryProgressPromptVi`
  - [x] Added `getNovelPerspectivePromptVi`
  - [x] Added `getProtagonistPerspectivePromptVi`
  - [x] Added `getSceneTransitionPromptVi`
- [x] Update `lib/core/character-dialogue.ts` to support Vietnamese language

## Completed
### 2025-12-08
- Added Vietnamese translations for all character-prompts functions.
- Updated `CharacterDialogue` class to support `vi` language in `compressStory()` method.
- Updated language type to include `"vi"` in:
  - `lib/core/character-dialogue.ts` (line 17)
  - `lib/core/prompt-assembler.ts` (interface PromptAssemblerOptions and class property)
  - `lib/models/character-dialogue-model.ts` (DialogueOptions interface)
- Fixed TypeScript type errors for Vietnamese language support.
- **Enhanced Vietnamese response length enforcement** in `lib/core/preset-assembler.ts`:
  - Added explicit "QUAN TRỌNG" (IMPORTANT) prefix to length instruction
  - Changed from passive "xuất ra" to assertive "PHẢI xuất ra CHÍNH XÁC X từ"
  - Added guidance to expand descriptions (chi tiết, tâm lý, bối cảnh) to meet length
  - Emphasized "không được ít hơn" (must not be less than)
  - Repeated length requirement in both header and footer
  - Updated both `assemblePrompts()` and `_getDefaultFramework()` functions

### 2025-12-07
- Translation update completed successfully.
- Added Vietnamese translations for all preset prompts (`mirror_realm`, `novel_king`, `professional_heart`, `magician`, `whisperer`).
- Updated `PresetAssembler` to correctly handle `vi` language code, including specific output formatting instructions.
- Verified and updated `zh.json` with missing keys. `en.json` was already up to date.


