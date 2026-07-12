import { registerCommand } from "../../utils/register";
import { pickRandom } from "../../utils/random";
import { apiGet } from "../../utils/api";

const FALLBACK_QUOTES = [
  { q: "The only way to do great work is to love what you do.", a: "Steve Jobs" },
  { q: "Be yourself; everyone else is already taken.", a: "Oscar Wilde" },
  { q: "Stay hungry, stay foolish.", a: "Steve Jobs" },
  { q: "That which does not kill us makes us stronger.", a: "Nietzsche" },
];

registerCommand({
  name: "/toc-quote",
  category: "Knowledge",
  description: "Get an inspirational quote",
  handler: async ({ ack, respond }) => {
    await ack();
    try {
      const data = await apiGet("https://zenquotes.io/api/random");
      const q = data[0];
      await respond({ text: `"*${q.q}*"\n— ${q.a}` });
    } catch {
      const q = pickRandom(FALLBACK_QUOTES);
      await respond({ text: `"*${q.q}*"\n— ${q.a}` });
    }
  },
});
