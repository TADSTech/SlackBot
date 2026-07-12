/* global document */
const COMMANDS = [
  { name: "/toc-ping", desc: "Check bot latency with a ping/pong response." },
  { name: "/toc-help", desc: "List all available commands." },
  { name: "/toc-echo <text>", desc: "Echo your message back to you." },
  { name: "/toc-time", desc: "Display the current server date and time." },
  { name: "/toc-uptime", desc: "Show how long the bot has been running." },
  {
    name: "/tadsocommand-joke",
    desc: "Get a random joke with setup and punchline pulled from the Official Joke API.",
  },
  { name: "/toc-fact", desc: "Get a random useless fact." },
  { name: "/toc-advice", desc: "Get a random piece of advice from the Advice Slip API." },
];

const container = document.getElementById("command-list");

if (container) {
  COMMANDS.forEach((cmd) => {
    const card = document.createElement("div");
    card.className = "cmd-card";
    card.innerHTML = `<div class="cmd-name">${cmd.name}</div><div class="cmd-desc">${cmd.desc}</div>`;
    container.appendChild(card);
  });
}
