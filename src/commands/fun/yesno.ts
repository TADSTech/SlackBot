import { registerCommand } from "../../utils/register";
import { pickRandom } from "../../utils/random";
import { apiGet } from "../../utils/api";

const FALLBACK_ANSWERS = ["✅ Yes!", "❌ No!", "🤷 Maybe!", "🌟 Absolutely!", "🙅 Nope!"];

registerCommand({
  name: "/toc-yesno",
  category: "Fun",
  description: "Get a yes/no/maybe answer",
  handler: async ({ ack, respond, command }) => {
    await ack();
    const question = command.text?.trim() || "Should I?";
    try {
      const data = await apiGet("https://yesno.wtf/api");
      const emojis: Record<string, string> = { yes: "✅", no: "❌", maybe: "🤷" };
      await respond({
        text: `${emojis[data.answer] || "🤔"} *${question}*\n${data.answer.toUpperCase()}!\n${data.image}`,
      });
    } catch {
      await respond({
        text: `🤔 *${question}*\n${pickRandom(FALLBACK_ANSWERS)}`,
      });
    }
  },
});
