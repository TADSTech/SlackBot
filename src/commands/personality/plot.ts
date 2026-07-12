import { registerCommand } from "../../utils/register";
import { pickRandom } from "../../utils/random";
import { PLOT_TWISTS } from "../../data/plot";

registerCommand({
  name: "/toc-plot",
  category: "Personality",
  description: "Get a random plot twist",
  handler: async ({ ack, respond }) => {
    await ack();
    const twist = pickRandom(PLOT_TWISTS);
    await respond({
      text: `🎬 *Today's Plot Twist*\n\n${twist.setup}\n\n${twist.punchline}`,
    });
  },
});
