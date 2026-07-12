import { registerCommand } from "../../utils/register";
import { pickRandom } from "../../utils/random";
import { START_TIME } from "../../constants";

registerCommand({
  name: "/toc-uptime",
  category: "Utility",
  description: "Show bot uptime",
  handler: async ({ ack, respond }) => {
    await ack();
    const ms = Date.now() - START_TIME;
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    const d = Math.floor(h / 24);
    const uptime = `${d}d ${h % 24}h ${m % 60}m ${s % 60}s`;
    const msgs = [
      `Bot uptime: ${uptime}`,
      `⏱ Been running for *${uptime}*`,
      `Alive for: \`${uptime}\``,
      `Uptime: ${uptime} and counting!`,
    ];
    await respond({ text: pickRandom(msgs) });
  },
});
