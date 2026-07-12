import { registerCommand } from "../../utils/register";
import { pickRandom } from "../../utils/random";
import { ROASTS } from "../../data/roasts";

registerCommand({
  name: "/toc-roast",
  category: "Fun",
  description: "Get roasted by the bot",
  handler: async ({ ack, respond }) => {
    await ack();
    await respond({ text: `🔥 *Roast:* ${pickRandom(ROASTS)}` });
  },
});
