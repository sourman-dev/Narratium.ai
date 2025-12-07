# Phase 1: Configuration & Setup

## Context
- Parent Plan: [Plan](./plan.md)
- Task: [Task](./task.md)

## Overview
**Date:** 251207
**Description:** Configure Next.js to allow API routes in development (by conditionally disabling `output: "export"`) and set up the file structure for the proxy route.
**Priority:** High
**Status:** Pending

## Implementation Steps
1.  **Analyze `next.config.ts`**:
    *   Read current config.
    *   Implement conditional logic for `output` based on `process.env.NODE_ENV` or a specific flag.
2.  **Create Route Structure**:
    *   Create directory `app/api/proxy/[...path]`.
    *   Create `route.ts` file.

## Todo List
- [ ] Read `next.config.ts` again to be sure.
- [ ] Modify `next.config.ts`.
- [ ] Create `app/api/proxy/[...path]/route.ts` with basic scaffolding.

## Success Criteria
- `next start` or `next dev` runs without errors.
- API route is reachable at `http://localhost:3000/api/proxy/...`.
