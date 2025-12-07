# Plan: Update Translation Files

## Status
- [x] Check for missing translation keys in en.json and zh.json compared to vi.json
- [x] Update en.json with missing keys (None found)
- [x] Update zh.json with missing keys (Added `game.requestFailed` and `game.checkNetworkOrAPI`)

## Details
### 2025-12-07
- Compared `vi.json` with `en.json` and `zh.json`.
- Identified missing keys in `zh.json`: `game.requestFailed` and `game.checkNetworkOrAPI`.
- Updated `zh.json` to include the missing keys.
- Confirmed `en.json` is up to date relative to `vi.json`.
- Translate prompts in `lib/prompts/preset-prompts.ts` to Vietnamese.
  - Translated `mirror_realm` prompt, COT, and structure.
  - Translated `novel_king` prompt, COT, and structure.
  - Translated `professional_heart` prompt, COT, and structure.
  - Translated `magician` prompt, COT, and structure.
  - Translated `whisperer` prompt, COT, and structure.
  - Updated `PromptLibrary` to include Vietnamese translations.
- Fix hardcoded values and imports in `lib/core/preset-assembler.ts` to support Vietnamese.
  - Updated `assemblePrompts` to handle `language === "vi"` with Vietnamese output format instructions.
  - Updated `_getDefaultFramework` to handle `language === "vi"` with Vietnamese output format instructions.

