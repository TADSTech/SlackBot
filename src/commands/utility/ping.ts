import { registerCommand } from "../../utils/register";
import { pickRandom } from "../../utils/random";

const PING_VARIANTS = [
  "Pong!",
  "PONG! 🏓",
  "pong pong pong!",
  "Right back atcha! 🎾",
  "Ping received. Pong sent. ✅",
];

registerCommand({
  name: "/toc-ping",
  category: "Utility",
  description: "Check bot latency",
  handler: async ({ ack, respond }) => {
    const start = Date.now();
    await ack();
    const latency = Date.now() - start;
    const msg = pickRandom(PING_VARIANTS);
    await respond({ text: `${msg}\nLatency: ${latency}ms` });
  },
});
