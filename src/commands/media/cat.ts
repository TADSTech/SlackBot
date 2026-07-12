import { registerCommand } from "../../utils/register";
import { apiGet } from "../../utils/api";

registerCommand({
  name: "/toc-cat",
  category: "Media",
  description: "Get a random cat fact + image",
  handler: async ({ ack, respond }) => {
    await ack();
    try {
      const factData = await apiGet("https://catfact.ninja/fact");
      await respond({
        text: `🐱 *Cat Fact:* ${factData.fact}`,
      });
    } catch {
      await respond({ text: "The cat is napping. Try again later. 🐱" });
    }
  },
});
