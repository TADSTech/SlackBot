import { registerCommand } from "../../utils/register";
import { apiGet } from "../../utils/api";

registerCommand({
  name: "/toc-weather",
  category: "Media",
  description: "Check weather for a city",
  handler: async ({ ack, respond, command }) => {
    await ack();
    const city = command.text?.trim();
    if (!city) {
      await respond({ text: "Usage: `/toc-weather <city>` (e.g., `/toc-weather London`)" });
      return;
    }
    try {
      const data = await apiGet(`https://wttr.in/${encodeURIComponent(city)}?format=%C+%t+%w+%h`);
      await respond({ text: `🌤 *Weather in ${city}*\n${data}` });
    } catch {
      await respond({ text: `Couldn't get weather for "${city}". Maybe try a major city?` });
    }
  },
});
