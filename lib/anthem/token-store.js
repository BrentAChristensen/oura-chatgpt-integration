export function sandboxTokenPath() {
  return "hosted-environment";
}

export function loadSandboxToken() {
  return undefined;
}

export function hasSandboxToken() {
  return false;
}

export function saveSandboxToken() {
  throw new Error("Hosted MCP token persistence is managed through environment variables.");
}
