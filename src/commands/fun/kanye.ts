import { registerCommand } from "../../utils/register";
import { pickRandom } from "../../utils/random";
import { apiGet } from "../../utils/api";

const FALLBACK_QUOTES = [
  "I am Warhol! I am the number one most impactful artist of our generation.",
  "Believe in your flyness...",
  "I'm a creative genius.",
  "The idea is to stay in a constant state of frustration.",
];

registerCommand({
  name: "/toc-kanye",
  category: "Fun",
  description: "Get a Kanye West quote",
  handler: async ({ ack, respond }) => {
    await ack();
    try {
      const data = await apiGet("https://api.kanye.rest");
      await respond({ text: `🌊 *Kanye says:* "${data.quote}"` });
    } catch {
      await respond({
        text: `🌊 *Kanye says:* "${pickRandom(FALLBACK_QUOTES)}"`,
      });
    }
  },
});
