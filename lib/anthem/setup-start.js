import { createSetupServer, SETUP_HOST, SETUP_PORT } from "./setup-server.js";
const server = createSetupServer();
server.on("error", () => { console.error("Cannot start the local sandbox setup listener."); process.exitCode = 1; });
server.listen(SETUP_PORT, SETUP_HOST, () => console.error("Sandbox setup listener ready at http://127.0.0.1:8787"));
