import { registerCommand } from "../../utils/register";
import { pickRandom } from "../../utils/random";
import { THERAPY_RESPONSES } from "../../data/therapy";

registerCommand({
  name: "/toc-therapy",
  category: "Personality",
  description: "Talk to a developer therapist",
  handler: async ({ ack, respond }) => {
    await ack();
    const response = pickRandom(THERAPY_RESPONSES);
    const lines = [
      "🧘 *Therapist:*",
      "",
      response.empathizer,
      "",
      response.question,
      "",
      "...",
      "",
      response.followUp,
    ];
    await respond({ text: lines.join("\n") });
  },
});
