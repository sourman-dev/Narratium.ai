# Phase 2: Implementation & Testing

## Context
- Parent Plan: [Plan](./plan.md)
- Task: [Task](./task.md)

## Overview
**Date:** 251207
**Description:** Implement the actual proxy logic to forward requests to the target API, handling headers, body, and streaming responses correctly.
**Priority:** High
**Status:** Pending

## Implementation Steps
1.  **Implement Proxy Logic**:
    *   Parse the target URL from the request path or query params. *Decision: Use a specific mapping or strict path forwarding?* Let's use path forwarding.
    *   Example: `/api/proxy/v3/openai/chat/completions` -> `https://api.novita.ai/v3/openai/chat/completions`.
    *   Alternatively, pass the full target URL in a custom header or query param. *Better approach for flexibility:* Pass the base URL in config or environment variable, or allow the client to specify the full endpoint via a query parameter `?target=...` or by reconstructing the path.
    *   *Proposed approach*:
        *   Client calls: `/api/proxy?url=<encoded_url>` or `/api/proxy/novita/v3/...`
        *   Let's stick to the user requirement: `app/api/proxy/[...path]/route.ts`.
        *   We will assume the user wants to map `/api/proxy/https://api.novita.ai/...` or similar.
        *   *Refined approach*: The user mentioned "target URL provided in the path or query".
        *   Simplest: `api/proxy?url=https://...`
2.  **Handle Headers**:
    *   Extract `Authorization` and `Content-Type` from the incoming request.
    *   Forward them to the target.
3.  **Handle Body**:
    *   Read body and forward.
4.  **Handle Streaming**:
    *   Use `fetch` with standard Request/Response objects.
    *   Ensure the response body is returned as a stream.
5.  **Documentation**:
    *   Create a `docs/PROXY_USAGE.md` or update `README.md`.

## Todo List
- [ ] Implement `POST` handler in `app/api/proxy/[...path]/route.ts`.
- [ ] Test with `curl` to `https://api.novita.ai`.
- [ ] Verify streaming works.
- [ ] Create usage documentation.

## Success Criteria
- Proxy successfully forwards request to Novita AI.
- Streaming response is received by the client.
- CORS errors are gone on localhost.
