import { registerCommand } from "../../utils/register";
import { apiGet } from "../../utils/api";

registerCommand({
  name: "/toc-number",
  category: "Knowledge",
  description: "Get a random number fact",
  handler: async ({ ack, respond }) => {
    await ack();
    try {
      const data = await apiGet("http://numbersapi.com/random/trivia?json");
      await respond({ text: `🔢 *Number Fact:* ${data.text}` });
    } catch {
      await respond({ text: "Couldn't get a number fact. Try again later." });
    }
  },
});
