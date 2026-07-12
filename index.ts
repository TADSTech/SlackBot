import "dotenv/config";
import { App } from "@slack/bolt";
import axios from "axios";

const startTime = Date.now();

const app = new App({
  token: process.env["SLACK_BOT_TOKEN"],
  appToken: process.env["SLACK_APP_TOKEN"],
  socketMode: true,
});

const PING_VARIANTS = [
  "Pong!",
  "PONG! 🏓",
  "pong pong pong!",
  "Right back atcha! 🎾",
  "Ping received. Pong sent. ✅",
];

const ECHO_VARIANTS = [
  (t: string) => `You said: *${t}*`,
  (t: string) => `Echo chamber activated: ${t}`,
  (t: string) => `📢 ${t}`,
  (t: string) => `Received: \`${t}\``,
  (t: string) => `🔄 *${t}* — back at ya!`,
];

app.command("/toc-ping", async ({ ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  const msg = PING_VARIANTS[Math.floor(Math.random() * PING_VARIANTS.length)];
  await respond({ text: `${msg}\nLatency: ${latency}ms` });
});

app.command("/toc-help", async ({ ack, respond }) => {
  await ack();
  const categories = {
    Utility: ["/toc-ping", "/toc-help", "/toc-echo", "/toc-time", "/toc-uptime"],
    Fun: [
      "/tadsocommand-joke",
      "/toc-roast",
      "/toc-8ball",
      "/toc-wyr",
      "/toc-yesno",
      "/toc-insult",
      "/toc-bored",
      "/toc-kanye",
    ],
    Knowledge: [
      "/toc-fact",
      "/toc-advice",
      "/toc-quote",
      "/toc-define",
      "/toc-number",
      "/toc-trivia",
    ],
    Media: ["/toc-cat", "/toc-dog", "/toc-crypto"],
  };
  const lines = [
    "*╔══════════════════════════════╗*",
    "*║   TOC SLACKBOT — COMMANDS    ║*",
    "*╚══════════════════════════════╝*",
    "",
  ];
  for (const [cat, cmds] of Object.entries(categories)) {
    lines.push(`*▸ ${cat}*`);
    for (const cmd of cmds) {
      const desc = DESCS[cmd as keyof typeof DESCS] || "";
      lines.push(`  \`${cmd}\` — ${desc}`);
    }
    lines.push("");
  }
  lines.push("_Tip: Most commands work with no arguments. Try them out!_");
  await respond({ text: lines.join("\n") });
});

const DESCS = {
  "/toc-ping": "Check bot latency",
  "/toc-help": "Show this help message",
  "/toc-echo": "Echo your message back",
  "/toc-time": "Show current server time",
  "/toc-uptime": "Show bot uptime",
  "/tadsocommand-joke": "Get a random joke",
  "/toc-fact": "Get a random fact",
  "/toc-advice": "Get a piece of advice",
  "/toc-quote": "Get an inspirational quote",
  "/toc-define": "Look up a word definition",
  "/toc-number": "Get a random number fact",
  "/toc-trivia": "Get a random trivia question",
  "/toc-cat": "Get a random cat fact + image",
  "/toc-dog": "Get a random dog image",
  "/toc-roast": "Get roasted by the bot",
  "/toc-insult": "Get a playful insult",
  "/toc-8ball": "Ask the magic 8-ball a question",
  "/toc-wyr": "Get a Would You Rather question",
  "/toc-yesno": "Get a yes/no/maybe answer",
  "/toc-bored": "Get an activity suggestion",
  "/toc-kanye": "Get a Kanye West quote",
  "/toc-crypto": "Check a cryptocurrency price",
  "/toc-weather": "Check weather for a city",
};

const API_TIMEOUT = 8000;
const apiGet = async (url: string) => {
  const res = await axios.get(url, { timeout: API_TIMEOUT });
  return res.data;
};

// ─── Echo ───
app.command("/toc-echo", async ({ ack, respond, command }) => {
  await ack();
  const text = command.text || "say something!";
  const variant = ECHO_VARIANTS[Math.floor(Math.random() * ECHO_VARIANTS.length)]!;
  await respond({ text: variant(text) });
});

// ─── Time ───
app.command("/toc-time", async ({ ack, respond }) => {
  await ack();
  const now = new Date();
  const formats = [
    `Current time: ${now.toLocaleString()}`,
    `🕐 ${now.toLocaleString()}`,
    `According to my clock, it's *${now.toLocaleTimeString()}* on *${now.toLocaleDateString()}*`,
    `⏰ Server time: ${now.toLocaleString()}`,
  ];
  await respond({ text: formats[Math.floor(Math.random() * formats.length)] });
});

// ─── Uptime ───
app.command("/toc-uptime", async ({ ack, respond }) => {
  await ack();
  const ms = Date.now() - startTime;
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);
  const uptime = `${d}d ${h % 24}h ${m % 60}m ${s % 60}s`;
  const msgs = [
    `Bot uptime: ${uptime}`,
    `⏱ Been running for *${uptime}*`,
    `Alive for: \`${uptime}\``,
    `Uptime: ${uptime} and counting!`,
  ];
  await respond({ text: msgs[Math.floor(Math.random() * msgs.length)] });
});

// ─── Joke ───
app.command("/tadsocommand-joke", async ({ ack, respond }) => {
  await ack();
  try {
    const data = await apiGet("https://official-joke-api.appspot.com/random_joke");
    await respond({ text: `*${data.setup}*\n\n${data.punchline} 😄` });
  } catch {
    await respond({ text: "Couldn't fetch a joke. Tell one yourself!" });
  }
});

// ─── Fact ───
app.command("/toc-fact", async ({ ack, respond }) => {
  await ack();
  try {
    const data = await apiGet("https://uselessfacts.jsph.ru/api/v2/facts/random?language=en");
    await respond({ text: `💡 *Did you know?*\n${data.text}` });
  } catch {
    await respond({ text: "Fact pipeline ran dry. Try again later." });
  }
});

// ─── Advice ───
app.command("/toc-advice", async ({ ack, respond }) => {
  await ack();
  try {
    const data = await apiGet("https://api.adviceslip.com/advice");
    await respond({ text: `🧠 *Advice:*\n${data.slip.advice}` });
  } catch {
    await respond({ text: "Out of wisdom for now. Check back later." });
  }
});

// ─── Quote ───
app.command("/toc-quote", async ({ ack, respond }) => {
  await ack();
  try {
    const data = await apiGet("https://zenquotes.io/api/random");
    const q = data[0];
    await respond({ text: `"*${q.q}*"\n— ${q.a}` });
  } catch {
    const fallbacks = [
      '"The only way to do great work is to love what you do." — Steve Jobs',
      '"Be yourself; everyone else is already taken." — Oscar Wilde',
      '"Stay hungry, stay foolish." — Steve Jobs',
      '"That which does not kill us makes us stronger." — Nietzsche',
    ];
    await respond({ text: fallbacks[Math.floor(Math.random() * fallbacks.length)] });
  }
});

// ─── Define ───
app.command("/toc-define", async ({ ack, respond, command }) => {
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
});

// ─── Number Fact ───
app.command("/toc-number", async ({ ack, respond, command }) => {
  await ack();
  const num = command.text?.trim() || "random";
  try {
    const data = await apiGet(`http://numbersapi.com/${encodeURIComponent(num)}?json`);
    await respond({ text: `🔢 *Number Fact:* ${data.text}` });
  } catch {
    await respond({ text: `Couldn't get a fact about "${num}". Try a different number.` });
  }
});

// ─── Trivia ───
app.command("/toc-trivia", async ({ ack, respond }) => {
  await ack();
  try {
    const data = await apiGet("https://opentdb.com/api.php?amount=1&type=multiple");
    const q = data.results[0];
    const answers = [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5);
    const lines = [
      `❓ *Trivia:* ${q.category}`,
      `  ${q.question}`,
      "",
      ...answers.map((a: string) => (a === q.correct_answer ? `  ✅ ${a}` : `  ${a}`)),
      "",
      `_Difficulty: ${q.difficulty}_`,
      `_Answer spoiler tagged — highlight to see:_ ||${q.correct_answer}||`,
    ];
    await respond({ text: lines.join("\n") });
  } catch {
    await respond({ text: "Trivia server is taking a break. Try again later." });
  }
});

// ─── Cat ───
app.command("/toc-cat", async ({ ack, respond }) => {
  await ack();
  try {
    const factData = await apiGet("https://catfact.ninja/fact");
    await respond({
      text: `🐱 *Cat Fact:* ${factData.fact}`,
    });
  } catch {
    await respond({ text: "The cat is napping. Try again later. 🐱" });
  }
});

// ─── Dog ───
app.command("/toc-dog", async ({ ack, respond }) => {
  await ack();
  try {
    const data = await apiGet("https://dog.ceo/api/breeds/image/random");
    await respond({ text: `🐕 *Random Doggo!*\n${data.message}` });
  } catch {
    await respond({ text: "The dog ran away. Try again later. 🐕" });
  }
});

// ─── Roast ───
app.command("/toc-roast", async ({ ack, respond }) => {
  await ack();
  try {
    const data = await apiGet("https://evilinsult.com/generate_insult.php?lang=en&type=json");
    await respond({ text: `🔥 *Roast:* ${data.insult}` });
  } catch {
    const roasts = [
      "You're not stupid; you just have bad luck thinking.",
      "I'd agree with you, but then we'd both be wrong.",
      "You bring everyone so much joy — when you leave.",
      "Somewhere a village is missing its idiot.",
      "Your secrets are safe with me. I never listen anyway.",
    ];
    await respond({ text: `🔥 *Roast:* ${roasts[Math.floor(Math.random() * roasts.length)]}` });
  }
});

// ─── Insult ───
app.command("/toc-insult", async ({ ack, respond }) => {
  await ack();
  try {
    const data = await apiGet("https://insult.mattbas.org/api/en/insult.json");
    await respond({ text: `😤 ${data.replace(/<\/?[^>]+(>|$)/g, "")}` });
  } catch {
    const insults = [
      "You're like a cloud. When you disappear, it's a beautiful day.",
      "I've seen snails faster than you.",
      "You're not a complete idiot — some parts are missing.",
    ];
    await respond({ text: `😤 ${insults[Math.floor(Math.random() * insults.length)]}` });
  }
});

// ─── Magic 8-Ball ───
app.command("/toc-8ball", async ({ ack, respond, command }) => {
  await ack();
  const question = command.text?.trim();
  if (!question) {
    await respond({ text: "🎱 Ask me a question! Usage: `/toc-8ball <question>`" });
    return;
  }
  const answers = [
    "🎱 It is certain.",
    "🎱 It is decidedly so.",
    "🎱 Without a doubt.",
    "🎱 Yes — definitely.",
    "🎱 You may rely on it.",
    "🎱 As I see it, yes.",
    "🎱 Most likely.",
    "🎱 Outlook good.",
    "🎱 Yes.",
    "🎱 Signs point to yes.",
    "🎱 Reply hazy, try again.",
    "🎱 Ask again later.",
    "🎱 Better not tell you now.",
    "🎱 Cannot predict now.",
    "🎱 Concentrate and ask again.",
    "🎱 Don't count on it.",
    "🎱 My reply is no.",
    "🎱 My sources say no.",
    "🎱 Outlook not so good.",
    "🎱 Very doubtful.",
  ];
  const answer = answers[Math.floor(Math.random() * answers.length)];
  await respond({ text: `🎱 *Question:* ${question}\n\n${answer}` });
});

// ─── Would You Rather ───
app.command("/toc-wyr", async ({ ack, respond }) => {
  await ack();
  try {
    const data = await apiGet("https://would-you-rather-api.abaanshanid.repl.co/");
    await respond({ text: `🤔 *Would You Rather...*\n\n${data.data[0].question}` });
  } catch {
    const wyr = [
      "Have the ability to fly or be invisible?",
      "Live in the past or the future?",
      "Be famous but poor, or unknown but rich?",
      "Never have to sleep again or never have to eat again?",
      "Be able to talk to animals or speak every language?",
    ];
    await respond({
      text: `🤔 *Would You Rather...*\n\n${wyr[Math.floor(Math.random() * wyr.length)]}`,
    });
  }
});

// ─── Yes/No ───
app.command("/toc-yesno", async ({ ack, respond, command }) => {
  await ack();
  const question = command.text?.trim() || "Should I?";
  try {
    const data = await apiGet("https://yesno.wtf/api");
    const emojis: Record<string, string> = { yes: "✅", no: "❌", maybe: "🤷" };
    await respond({
      text: `${emojis[data.answer] || "🤔"} *${question}*\n${data.answer.toUpperCase()}!\n${data.image}`,
    });
  } catch {
    const answers = ["✅ Yes!", "❌ No!", "🤷 Maybe!", "🌟 Absolutely!", "🙅 Nope!"];
    await respond({
      text: `🤔 *${question}*\n${answers[Math.floor(Math.random() * answers.length)]}`,
    });
  }
});

// ─── Bored ───
app.command("/toc-bored", async ({ ack, respond }) => {
  await ack();
  try {
    const data = await apiGet("https://bored-api.appbrewery.com/random");
    const type = data.type || "general";
    await respond({
      text: `😐 *Bored? Try this:*\n${data.activity}\n_Type: ${type} | Participants: ${data.participants}_`,
    });
  } catch {
    const ideas = [
      "Learn to juggle!",
      "Write a poem about your toaster.",
      "Count how many tiles are in your ceiling.",
      "Start learning a new language on Duolingo.",
      "Go for a walk and take photos of weird things.",
    ];
    await respond({
      text: `😐 *Bored? Try this:*\n${ideas[Math.floor(Math.random() * ideas.length)]}`,
    });
  }
});

// ─── Kanye ───
app.command("/toc-kanye", async ({ ack, respond }) => {
  await ack();
  try {
    const data = await apiGet("https://api.kanye.rest");
    await respond({ text: `🌊 *Kanye says:* "${data.quote}"` });
  } catch {
    const quotes = [
      "I am Warhol! I am the number one most impactful artist of our generation.",
      "Believe in your flyness...",
      "I'm a creative genius.",
      "The idea is to stay in a constant state of frustration.",
    ];
    await respond({
      text: `🌊 *Kanye says:* "${quotes[Math.floor(Math.random() * quotes.length)]}"`,
    });
  }
});

// ─── Crypto ───
app.command("/toc-crypto", async ({ ack, respond, command }) => {
  await ack();
  const coin = command.text?.trim().toLowerCase() || "bitcoin";
  try {
    const data = await apiGet(
      `https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(coin)}&vs_currencies=usd&include_24hr_change=true`,
    );
    if (!data[coin]) {
      await respond({
        text: `Couldn't find crypto "${coin}". Try: bitcoin, ethereum, solana, dogecoin`,
      });
      return;
    }
    const price = data[coin].usd;
    const change = data[coin]["usd_24h_change"]?.toFixed(2);
    const arrow = change && parseFloat(change) >= 0 ? "📈" : "📉";
    await respond({
      text: `${arrow} *${coin.charAt(0).toUpperCase() + coin.slice(1)}*\nPrice: $${price.toLocaleString()}\n24h Change: ${change || "N/A"}%`,
    });
  } catch {
    await respond({ text: "Crypto market is volatile — even the API is down. Try again later." });
  }
});

// ─── Weather ───
app.command("/toc-weather", async ({ ack, respond, command }) => {
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
});

// ─── Error handler ───
app.error(async (error) => {
  console.error("App error:", error);
});

(async () => {
  await app.start();
  console.log("⚡️ Bolt app is running!");
  console.log(`  Commands loaded: ${Object.keys(DESCS).length}`);
})();
