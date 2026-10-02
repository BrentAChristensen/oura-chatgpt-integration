import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { validateMode } from "./client.js";
import { createAnthemMcpServer } from "./mcp.js";
import { createSandboxClientFromEnv } from "./anthem-api.js";
validateMode(process.env.ANTHEM_MODE);
await createAnthemMcpServer(process.env.ANTHEM_MODE === "sandbox" ? createSandboxClientFromEnv() : undefined).connect(new StdioServerTransport());
