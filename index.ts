import "dotenv/config";
import { App } from "@slack/bolt";
import axios from "axios";

const startTime = Date.now();

const app = new App({
  token: process.env["SLACK_BOT_TOKEN"],
  appToken: process.env["SLACK_APP_TOKEN"],
  socketMode: true,
});

app.command("/toc-ping", async (_args) => {
  const { ack, respond } = _args;
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

app.command("/toc-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text: [
      "Available commands:",
      "• `/toc-ping` - Check bot latency",
      "• `/toc-help` - Show this help message",
      "• `/toc-echo <text>` - Echo your message back",
      "• `/toc-time` - Show current server time",
      "• `/toc-uptime` - Show how long the bot has been running",
      "• `/tadsocommand-joke` - Get a random joke",
      "• `/toc-fact` - Get a random fact",
      "• `/toc-advice` - Get a random piece of advice",
    ].join("\n"),
  });
});

app.command("/toc-echo", async ({ ack, respond, command }) => {
  await ack();
  const text = command.text || "say something!";
  await respond({ text: `Echo: ${text}` });
});

app.command("/toc-time", async ({ ack, respond }) => {
  await ack();
  await respond({ text: `Current time: ${new Date().toLocaleString()}` });
});

app.command("/toc-uptime", async ({ ack, respond }) => {
  await ack();
  const ms = Date.now() - startTime;
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const uptime = `${days}d ${hours % 24}h ${minutes % 60}m ${seconds % 60}s`;
  await respond({ text: `Bot uptime: ${uptime}` });
});

app.command("/tadsocommand-joke", async ({ ack, respond }) => {
  await ack();
  try {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    await respond({
      text: `${response.data.setup}\n\n${response.data.punchline}`,
    });
  } catch {
    await respond({ text: "Failed to fetch a joke." });
  }
});

app.command("/toc-fact", async ({ ack, respond }) => {
  await ack();
  try {
    const response = await axios.get(
      "https://uselessfacts.jsph.ru/api/v2/facts/random?language=en",
    );
    await respond({ text: response.data.text });
  } catch {
    await respond({ text: "Failed to fetch a fact." });
  }
});

app.command("/toc-advice", async ({ ack, respond }) => {
  await ack();
  try {
    const response = await axios.get("https://api.adviceslip.com/advice");
    const slip = response.data.slip;
    await respond({ text: slip.advice });
  } catch {
    await respond({ text: "Failed to fetch advice." });
  }
});

(async () => {
  await app.start();
  console.log("⚡️ Bolt app is running!");
})();
