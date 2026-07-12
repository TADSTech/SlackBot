import { registerCommand } from "../../utils/register";
import { apiGet } from "../../utils/api";

registerCommand({
  name: "/toc-fact",
  category: "Knowledge",
  description: "Get a random fact",
  handler: async ({ ack, respond }) => {
    await ack();
    try {
      const data = await apiGet("https://api.popcat.xyz/fact");
      await respond({ text: `💡 *Did you know?*\n${data.fact}` });
    } catch {
      await respond({ text: "Fact pipeline ran dry. Try again later." });
    }
  },
});
