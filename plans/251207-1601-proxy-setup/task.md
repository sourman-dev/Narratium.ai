# Task: Create Next.js API Proxy for CORS

## Description
Create a Next.js API route proxy to resolve CORS issues for LLM API calls on localhost.
1. Modify `next.config.ts` to conditionally use `output: "export"`.
2. Create `app/api/proxy/[...path]/route.ts` to handle POST requests (and potentially others), forwarding them to the target URL provided in the path or query, specifically for `https://api.novita.ai/v3/openai/chat/completions` but generalizable.
3. Ensure headers (Authorization, Content-Type) and body are forwarded correctly.
4. Support streaming responses.
5. Provide instructions on how to use this proxy in the frontend.

## Requirements
- Works with Next.js App Router.
- Supports streaming (essential for LLM chat).
- Handles CORS headers for localhost.
- Securely forwards Authorization headers.
