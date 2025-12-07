# Plan: Update Translation Files

## Status
- [x] Check for missing translation keys in en.json and zh.json compared to vi.json
- [x] Update en.json with missing keys (None found)
- [x] Update zh.json with missing keys (Added `game.requestFailed` and `game.checkNetworkOrAPI`)
- [x] Fix hardcoded values and imports in `lib/core/preset-assembler.ts` to support Vietnamese
  - [x] Updated `assemblePrompts` to handle `language === "vi"` with Vietnamese output format instructions.
  - [x] Updated `_getDefaultFramework` to handle `language === "vi"` with Vietnamese output format instructions.

## Completed
### 2025-12-07
- Translation update completed successfully.
- Added Vietnamese translations for all preset prompts (`mirror_realm`, `novel_king`, `professional_heart`, `magician`, `whisperer`).
- Updated `PresetAssembler` to correctly handle `vi` language code, including specific output formatting instructions.
- Verified and updated `zh.json` with missing keys. `en.json` was already up to date.


