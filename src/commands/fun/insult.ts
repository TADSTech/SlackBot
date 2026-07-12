import { registerCommand } from "../../utils/register";
import { pickRandom } from "../../utils/random";
import { apiGet } from "../../utils/api";

const FALLBACK_INSULTS = [
  "You're like a cloud. When you disappear, it's a beautiful day.",
  "I've seen snails faster than you.",
  "You're not a complete idiot — some parts are missing.",
];

registerCommand({
  name: "/toc-insult",
  category: "Fun",
  description: "Get a playful insult",
  handler: async ({ ack, respond }) => {
    await ack();
    try {
      const data = await apiGet("https://insult.mattbas.org/api/en/insult.json");
      await respond({ text: `😤 ${data.replace(/<\/?[^>]+(>|$)/g, "")}` });
    } catch {
      await respond({ text: `😤 ${pickRandom(FALLBACK_INSULTS)}` });
    }
  },
});
