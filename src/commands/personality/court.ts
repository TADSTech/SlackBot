import { registerCommand } from "../../utils/register";
import { pickRandom } from "../../utils/random";
import { COURT_DATA } from "../../data/court";

registerCommand({
  name: "/toc-court",
  category: "Personality",
  description: "Turn your question into a courtroom verdict",
  handler: async ({ ack, respond, command }) => {
    await ack();
    const question = command.text?.trim();
    if (!question) {
      await respond({
        text: "⚖️ Usage: `/toc-court <your question>` (e.g., `/toc-court Should I skip class?`)",
      });
      return;
    }
    const judge = pickRandom(COURT_DATA.judges);
    const verdict = pickRandom(COURT_DATA.verdicts);
    const sentence = pickRandom(COURT_DATA.sentences);
    const appeal = pickRandom(COURT_DATA.appeals);
    const lines = [
      `⚖️ Court of TOC (Presided over by: ${judge})`,
      "",
      `*Case:* ${question}`,
      "",
      `*Verdict:* ${verdict}`,
      "",
      `*Sentence:* ${sentence}`,
      "",
      `*Appeal status:* ${appeal}`,
    ];
    await respond({ text: lines.join("\n") });
  },
});
