import { setup } from "jest-dev-server"

export default async function globalSetup() {
    const global : any = globalThis;
    global.servers = await setup({
    command: `ts-node server/server.ts --port=3002`,
    launchTimeout: 50000,
    port: 3002,
  });

  console.log('global setup was invoked')
};