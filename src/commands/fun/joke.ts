import { registerCommand } from "../../utils/register";
import { apiGet } from "../../utils/api";

registerCommand({
  name: "/toc-joke",
  category: "Fun",
  description: "Get a random joke",
  handler: async ({ ack, respond }) => {
    await ack();
    try {
      const data = await apiGet("https://official-joke-api.appspot.com/random_joke");
      await respond({ text: `*${data.setup}*\n\n${data.punchline} 😄` });
    } catch {
      await respond({ text: "Couldn't fetch a joke. Tell one yourself!" });
    }
  },
});
