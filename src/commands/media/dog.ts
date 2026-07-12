import { registerCommand } from "../../utils/register";
import { apiGet } from "../../utils/api";

registerCommand({
  name: "/toc-dog",
  category: "Media",
  description: "Get a random dog image",
  handler: async ({ ack, respond }) => {
    await ack();
    try {
      const data = await apiGet("https://dog.ceo/api/breeds/image/random");
      await respond({ text: `🐕 *Random Doggo!\n${data.message}` });
    } catch {
      await respond({ text: "The dog ran away. Try again later. 🐕" });
    }
  },
});
