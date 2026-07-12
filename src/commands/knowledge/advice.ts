import { registerCommand } from "../../utils/register";
import { apiGet } from "../../utils/api";

registerCommand({
  name: "/toc-advice",
  category: "Knowledge",
  description: "Get a piece of advice",
  handler: async ({ ack, respond }) => {
    await ack();
    try {
      const data = await apiGet("https://api.adviceslip.com/advice");
      await respond({ text: `🧠 *Advice:*\n${data.slip.advice}` });
    } catch {
      await respond({ text: "Out of wisdom for now. Check back later." });
    }
  },
});
