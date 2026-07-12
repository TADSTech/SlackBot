import { registerCommand } from "../../utils/register";
import { shuffleArray } from "../../utils/random";
import { decodeHtmlEntities } from "../../utils/formatter";
import { apiGet } from "../../utils/api";

registerCommand({
  name: "/toc-trivia",
  category: "Knowledge",
  description: "Get a random trivia question",
  handler: async ({ ack, respond }) => {
    await ack();
    try {
      const data = await apiGet("https://opentdb.com/api.php?amount=1&type=multiple");
      const q = data.results[0];
      const answers = shuffleArray([...q.incorrect_answers, q.correct_answer]);
      const lines = [
        `❓ *Trivia:* ${q.category}`,
        `  ${decodeHtmlEntities(q.question)}`,
        "",
        ...answers.map((a: string) =>
          a === q.correct_answer ? `  ✅ ${decodeHtmlEntities(a)}` : `  ${decodeHtmlEntities(a)}`,
        ),
        "",
        `_Difficulty: ${q.difficulty}_`,
        `_Answer spoiler tagged — highlight to see:_ ||${decodeHtmlEntities(q.correct_answer)}||`,
      ];
      await respond({ text: lines.join("\n") });
    } catch {
      await respond({ text: "Trivia server is taking a break. Try again later." });
    }
  },
});
