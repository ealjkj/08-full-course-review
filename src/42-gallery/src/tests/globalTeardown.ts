import { teardown } from "jest-dev-server";

export default async function globalTeardown() {
  const global : any = globalThis
  await teardown(global.servers);

};