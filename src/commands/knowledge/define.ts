import { registerCommand } from "../../utils/register";
import { apiGet } from "../../utils/api";

registerCommand({
  name: "/toc-define",
  category: "Knowledge",
  description: "Look up a word definition",
  handler: async ({ ack, respond, command }) => {
    await ack();
    const word = command.text?.trim();
    if (!word) {
      await respond({ text: "Usage: `/toc-define <word>` (e.g., `/toc-define serendipity`)" });
      return;
    }
    try {
      const data = await apiGet(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`,
      );
      const entry = data[0];
      const meaning = entry.meanings[0];
      const def = meaning.definitions[0];
      const lines = [`📖 *${entry.word}* (${meaning.partOfSpeech})`];
      lines.push(`> ${def.definition}`);
      if (def.example) lines.push(`_Example: ${def.example}_`);
      lines.push(`_Source: ${entry.sourceUrls?.[0] || "Dictionary API"}_`);
      await respond({ text: lines.join("\n") });
    } catch {
      await respond({ text: `Couldn't find definition for "*${word}*". Check spelling?` });
    }
  },
});
