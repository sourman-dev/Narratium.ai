# Plan: Next.js API Route Proxy for CORS Resolution

## Overview
Implement a Next.js API route proxy to resolve CORS issues when making LLM API calls (specifically to Novita AI and others) from localhost. This involves configuring Next.js to support API routes in development while maintaining export capabilities for production if needed, and creating a flexible proxy handler.

## Phases
- [x] Phase 1: Configuration & Setup
  - Modified `next.config.ts` to conditionally handle `output: "export"`.
  - Created the proxy API route structure.
- [x] Phase 2: Implementation & Testing
  - Implemented the proxy logic (headers, streaming, error handling).
  - Verified with frontend integration (via auto-detection logic).
  - Documented usage instructions (automatic).

## Status
- Status: Completed
- Progress: 100%
- Completed At: 2025-12-07 16:30

## Completed Tasks
- Modified `next.config.ts` to conditionally use `output: "export"` only in production.
- Created `pages/api/proxy/[...path].ts` to forward requests with `X-Target-Url` header.
- Updated `lib/nodeflow/LLMNode/LLMNodeTools.ts` to automatically detect development environment and use the proxy, injecting the `X-Target-Url` header transparently.
