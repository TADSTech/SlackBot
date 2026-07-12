import { registerCommand } from "../../utils/register";
import { pickRandom } from "../../utils/random";
import { apiGet } from "../../utils/api";

const FALLBACK_WYRS = [
  "Have the ability to fly or be invisible?",
  "Live in the past or the future?",
  "Be famous but poor, or unknown but rich?",
  "Never have to sleep again or never have to eat again?",
  "Be able to talk to animals or speak every language?",
];

registerCommand({
  name: "/toc-wyr",
  category: "Fun",
  description: "Get a Would You Rather question",
  handler: async ({ ack, respond }) => {
    await ack();
    try {
      const data = await apiGet("https://api.truthordarebot.xyz/api/wyr");
      await respond({ text: `🤔 *Would You Rather...*\n\n${data.question}` });
    } catch {
      await respond({
        text: `🤔 *Would You Rather...*\n\n${pickRandom(FALLBACK_WYRS)}`,
      });
    }
  },
});
