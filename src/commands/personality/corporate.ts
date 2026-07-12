import { registerCommand } from "../../utils/register";
import { pickRandom } from "../../utils/random";
import { CORPORATE_FRAGMENTS } from "../../data/corporate";

registerCommand({
  name: "/toc-corporate",
  category: "Personality",
  description: "Translate plain English into corporate jargon",
  handler: async ({ ack, respond }) => {
    await ack();
    const opening = pickRandom(CORPORATE_FRAGMENTS.openings);
    const action = pickRandom(CORPORATE_FRAGMENTS.actions);
    const target = pickRandom(CORPORATE_FRAGMENTS.targets);
    const closing = pickRandom(CORPORATE_FRAGMENTS.closings);
    const corporateSpeak = `${opening} ${action} ${target} ${closing}`;
    await respond({ text: corporateSpeak });
  },
});
