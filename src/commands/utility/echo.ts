import { registerCommand } from "../../utils/register";
import { pickRandom } from "../../utils/random";

const ECHO_VARIANTS = [
  (t: string) => `You said: *${t}*`,
  (t: string) => `Echo chamber activated: ${t}`,
  (t: string) => `📢 ${t}`,
  (t: string) => `Received: \`${t}\``,
  (t: string) => `🔄 *${t}* — back at ya!`,
];

registerCommand({
  name: "/toc-echo",
  category: "Utility",
  description: "Echo your message back",
  handler: async ({ ack, respond, command }) => {
    await ack();
    const text = command.text || "say something!";
    const variant = pickRandom(ECHO_VARIANTS);
    await respond({ text: variant(text) });
  },
});
