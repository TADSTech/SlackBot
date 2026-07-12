import { registerCommand } from "../../utils/register";
import { pickRandom } from "../../utils/random";
import { apiGet } from "../../utils/api";

const FALLBACK_IDEAS = [
  "Learn to juggle!",
  "Write a poem about your toaster.",
  "Count how many tiles are in your ceiling.",
  "Start learning a new language on Duolingo.",
  "Go for a walk and take photos of weird things.",
];

registerCommand({
  name: "/toc-bored",
  category: "Fun",
  description: "Get an activity suggestion",
  handler: async ({ ack, respond }) => {
    await ack();
    try {
      const data = await apiGet("https://bored-api.appbrewery.com/random");
      const type = data.type || "general";
      await respond({
        text: `😐 *Bored? Try this:*\n${data.activity}\n_Type: ${type} | Participants: ${data.participants}_`,
      });
    } catch {
      await respond({
        text: `😐 *Bored? Try this:*\n${pickRandom(FALLBACK_IDEAS)}`,
      });
    }
  },
});
