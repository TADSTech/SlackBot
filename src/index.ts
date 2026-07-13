import "dotenv/config";
import { App } from "@slack/bolt";
import { START_TIME, STARTUP_MESSAGES } from "./constants";
import { pickRandom } from "./utils/random";
import { registerAllCommands, getAllCommands } from "./utils/register";

// Import all commands to register them
import "./commands/utility/help";
import "./commands/utility/ping";
import "./commands/utility/echo";
import "./commands/utility/time";
import "./commands/utility/uptime";

import "./commands/fun/joke";
import "./commands/fun/roast";
import "./commands/fun/8ball";
import "./commands/fun/wyr";
import "./commands/fun/bored";
import "./commands/fun/kanye";

import "./commands/knowledge/fact";
import "./commands/knowledge/quote";
import "./commands/knowledge/define";
import "./commands/knowledge/number";
import "./commands/knowledge/trivia";

import "./commands/media/cat";
import "./commands/media/dog";
import "./commands/media/crypto";
import "./commands/media/weather";

import "./commands/personality/court";
import "./commands/personality/fortune";
import "./commands/personality/corporate";
import "./commands/personality/therapy";
import "./commands/personality/plot";

const app = new App({
  token: process.env["SLACK_BOT_TOKEN"],
  appToken: process.env["SLACK_APP_TOKEN"],
  socketMode: true,
});

// Error handler
app.error(async (error) => {
  console.error("App error:", error);
});

const main = async () => {
  registerAllCommands(app);
  await app.start();
  console.log("╔════════════════════════════════════════╗");
  console.log("║      TOC SlackBot - Now With Soul!      ║");
  console.log("╚════════════════════════════════════════╝");
  console.log(pickRandom(STARTUP_MESSAGES));
  console.log("\n📊 Bot Stats:");
  console.log(`  Commands loaded: ${getAllCommands().length}`);
  console.log(`  Started at: ${new Date(START_TIME).toLocaleString()}`);
  console.log("\n🚀 Ready for duty!");
};

main();
