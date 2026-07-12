import { registerCommand } from "../../utils/register";
import { pickRandom } from "../../utils/random";

registerCommand({
  name: "/toc-time",
  category: "Utility",
  description: "Show current server time",
  handler: async ({ ack, respond }) => {
    await ack();
    const now = new Date();
    const formats = [
      `Current time: ${now.toLocaleString()}`,
      `🕐 ${now.toLocaleString()}`,
      `According to my clock, it's *${now.toLocaleTimeString()}* on *${now.toLocaleDateString()}*`,
      `⏰ Server time: ${now.toLocaleString()}`,
    ];
    await respond({ text: pickRandom(formats) });
  },
});
