## Code Review Summary

### Scope
- Files reviewed:
  - `app/i18n/index.ts`
  - `app/metadata.ts`
  - `lib/core/preset-assembler.ts`
  - `lib/nodeflow/MemoryNode/MemoryNodeTools.ts`
  - `lib/adapter/tagReplacer.ts`
  - `lib/prompts/preset-prompts.ts`
  - `components/SettingsDropdown.tsx`
  - `components/UserTour.tsx`
  - `app/i18n/locales/vi.json` (Missing)
- Review focus: Vietnamese language support implementation

### Overall Assessment
The implementation of Vietnamese language support is **incomplete** and contains critical logic issues that will prevent it from functioning correctly. While the scaffolding (types, UI buttons) is present, the core translation data is missing, and the prompt assembly logic incorrectly forces English output for Vietnamese users.

### Critical Issues
1.  **Missing Translation File**: `app/i18n/locales/vi.json` does not exist.
    -   **Impact**: All UI text will display raw translation keys (e.g., `common.settings`) instead of Vietnamese text.
2.  **Incorrect Prompt Output Instructions**: In `lib/core/preset-assembler.ts`, the logic falls back to English instructions for any language other than Chinese.
    -   **Impact**: When a user selects Vietnamese (`vi`), the system prompt explicitly instructs the AI to "Output in English".
    -   **Location**: `PresetAssembler.assemblePrompts` (lines 147-166) and `_getDefaultFramework` (lines 261-283).

### High Priority Findings
1.  **Prompt Library Fallback**: `lib/prompts/preset-prompts.ts` implements a fallback to English for Vietnamese prompts.
    -   **Impact**: The system prompts (Persona definitions like "Mirror Realm") will be injected in English, not Vietnamese. While this prevents crashes, it creates a mixed-language experience (English instructions, English/Vietnamese outputs).
    -   **Recommendation**: Translate the core prompts to Vietnamese in `preset-prompts.ts` instead of relying on runtime fallback.

### Medium Priority Improvements
1.  **Hardcoded Strings in UI**:
    -   `components/SettingsDropdown.tsx`: Contains hardcoded Chinese alerts: `alert("导入成功！")` and `alert("上传成功")`.
    -   `components/UserTour.tsx`: Contains hardcoded Chinese fallbacks: `t("tour.skip") || "跳过"`.
    -   **Recommendation**: Move these strings to the locale JSON files and use `t()` consistently.
2.  **Memory Node Fallback**: `MemoryNodeTools.ts` has specific `vi` support (Good), but double-check `getVietnameseTypeLabel` translations for accuracy.

### Positive Observations
1.  **Type Safety**: TypeScript definitions for `Language` type have been correctly updated to include `"vi"`.
2.  **UI Integration**: Language switching logic in `SettingsDropdown` and `UserTour` is correctly implemented to cycle through three languages.
3.  **Tag Replacement**: `lib/adapter/tagReplacer.ts` correctly handles Vietnamese pronouns ("Tôi").

### Recommended Actions
1.  **Create `app/i18n/locales/vi.json`** with complete translations matching `en.json` keys.
2.  **Fix `PresetAssembler.ts`**: Add specific `if (language === "vi")` blocks to instruct the AI to output in Vietnamese (similar to the Chinese block).
3.  **Localize Prompts**: Add `vi` entries to `PromptLibrary` in `lib/prompts/preset-prompts.ts`.
4.  **Refactor Alerts**: Replace hardcoded Chinese alerts in `SettingsDropdown.tsx` with localized strings.

### Unresolved Questions
- Is the intention to have the AI roleplay in Vietnamese? If so, the system prompts *must* be translated, otherwise the AI might struggle to maintain Vietnamese persona while following English system instructions.
