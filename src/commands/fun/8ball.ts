import { registerCommand } from "../../utils/register";
import { pickRandom } from "../../utils/random";

const EIGHTBALL_ANSWERS = [
  "🎱 It is certain.",
  "🎱 It is decidedly so.",
  "🎱 Without a doubt.",
  "🎱 Yes — definitely.",
  "🎱 You may rely on it.",
  "🎱 As I see it, yes.",
  "🎱 Most likely.",
  "🎱 Outlook good.",
  "🎱 Yes.",
  "🎱 Signs point to yes.",
  "🎱 Reply hazy, try again.",
  "🎱 Ask again later.",
  "🎱 Better not tell you now.",
  "🎱 Cannot predict now.",
  "🎱 Concentrate and ask again.",
  "🎱 Don't count on it.",
  "🎱 My reply is no.",
  "🎱 My sources say no.",
  "🎱 Outlook not so good.",
  "🎱 Very doubtful.",
];

registerCommand({
  name: "/toc-8ball",
  category: "Fun",
  description: "Ask the magic 8-ball a question",
  handler: async ({ ack, respond, command }) => {
    await ack();
    const question = command.text?.trim();
    if (!question) {
      await respond({ text: "🎱 Ask me a question! Usage: `/toc-8ball <question>`" });
      return;
    }
    await respond({
      text: `🎱 *Question:* ${question}\n\n${pickRandom(EIGHTBALL_ANSWERS)}`,
    });
  },
});
