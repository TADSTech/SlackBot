import { registerCommand } from "../../utils/register";
import { getCommandsByCategory } from "../../utils/register";

registerCommand({
  name: "/toc-help",
  category: "Utility",
  description: "Show this help message",
  handler: async ({ ack, respond }) => {
    await ack();
    const commandsByCat = getCommandsByCategory();
    const lines = [
      "*╔══════════════════════════════╗*",
      "*║   TOC SLACKBOT — COMMANDS    ║*",
      "*╚══════════════════════════════╝*",
      "",
    ];
    for (const [cat, cmds] of Object.entries(commandsByCat)) {
      lines.push(`*▸ ${cat}*`);
      for (const cmd of cmds) {
        lines.push(`  \`${cmd.name}\` — ${cmd.description}`);
      }
      lines.push("");
    }
    lines.push("_Tip: Most commands work with no arguments. Try them out!_");
    await respond({ text: lines.join("\n") });
  },
});
