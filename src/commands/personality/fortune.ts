import { registerCommand } from "../../utils/register";
import { pickRandom } from "../../utils/random";
import { FORTUNES } from "../../data/fortunes";

registerCommand({
  name: "/toc-fortune",
  category: "Personality",
  description: "Receive a suspiciously accurate fortune",
  handler: async ({ ack, respond }) => {
    await ack();
    const fortune = pickRandom(FORTUNES);
    await respond({
      text: `🥠 *Your fortune:* ${fortune.fortune}\n\n${fortune.twist}`,
    });
  },
});
