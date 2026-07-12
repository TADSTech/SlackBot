/* global document, setTimeout, requestAnimationFrame */
/* eslint-env browser */

// ─── Command Data ───
const COMMANDS = [
  { name: "/toc-ping", desc: "Check bot latency with a ping/pong response.", cat: "Utility", catLabel: "Utility" },
  { name: "/toc-help", desc: "List all available commands in a categorized view.", cat: "Utility", catLabel: "Utility" },
  { name: "/toc-echo", desc: "Echo your message back with a random response variant.", cat: "Utility", catLabel: "Utility" },
  { name: "/toc-time", desc: "Display the current server date and time.", cat: "Utility", catLabel: "Utility" },
  { name: "/toc-uptime", desc: "Show how long the bot has been running.", cat: "Utility", catLabel: "Utility" },
  { name: "/toc-weather", desc: "Check current weather for any city.", cat: "Media", catLabel: "Media" },
  { name: "/toc-crypto", desc: "Get the latest crypto price & 24h change.", cat: "Media", catLabel: "Media" },
  { name: "/tadsocommand-joke", desc: "Get a random joke with setup and punchline.", cat: "Fun", catLabel: "Fun" },
  { name: "/toc-roast", desc: "Get roasted by the bot. Bring thick skin.", cat: "Fun", catLabel: "Fun" },
  { name: "/toc-insult", desc: "A playful insult to keep you humble.", cat: "Fun", catLabel: "Fun" },
  { name: "/toc-8ball", desc: "Ask the magic 8-ball a yes/no question.", cat: "Fun", catLabel: "Fun" },
  { name: "/toc-wyr", desc: "Get a Would You Rather question.", cat: "Fun", catLabel: "Fun" },
  { name: "/toc-yesno", desc: "Get a definitive yes/no/maybe answer.", cat: "Fun", catLabel: "Fun" },
  { name: "/toc-bored", desc: "Get an activity suggestion when you're bored.", cat: "Fun", catLabel: "Fun" },
  { name: "/toc-kanye", desc: "Get a Kanye West quote.", cat: "Fun", catLabel: "Fun" },
  { name: "/toc-fact", desc: "Get a random useless fact.", cat: "Knowledge", catLabel: "Knowledge" },
  { name: "/toc-advice", desc: "Get a random piece of advice.", cat: "Knowledge", catLabel: "Knowledge" },
  { name: "/toc-quote", desc: "Get an inspirational quote.", cat: "Knowledge", catLabel: "Knowledge" },
  { name: "/toc-define", desc: "Look up the definition of any word.", cat: "Knowledge", catLabel: "Knowledge" },
  { name: "/toc-number", desc: "Get a random or specific number fact.", cat: "Knowledge", catLabel: "Knowledge" },
  { name: "/toc-trivia", desc: "Get a random trivia question.", cat: "Knowledge", catLabel: "Knowledge" },
  { name: "/toc-cat", desc: "Get a random cat fact.", cat: "Media", catLabel: "Media" },
  { name: "/toc-dog", desc: "Get a random dog image.", cat: "Media", catLabel: "Media" },
];

const CAT_CLASSES = {
  Utility: "cmd-utility",
  Fun: "cmd-fun",
  Knowledge: "cmd-knowledge",
  Media: "cmd-media",
};

// ─── Render Commands ───
function renderCommands(filter = "all", search = "") {
  const container = document.getElementById("command-list");
  if (!container) return;

  const filtered = COMMANDS.filter((cmd) => {
    if (filter !== "all" && cmd.cat !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return cmd.name.toLowerCase().includes(q) || cmd.desc.toLowerCase().includes(q);
    }
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<div class="cmd-empty">No commands match your search. Try something else?</div>`;
    return;
  }

  container.innerHTML = filtered.map((cmd) => {
    const catClass = CAT_CLASSES[cmd.cat] || "";
    return `<div class="cmd-card">
      <div class="cmd-category ${catClass}">${cmd.cat}</div>
      <div class="cmd-name">${cmd.name}</div>
      <div class="cmd-desc">${cmd.desc}</div>
    </div>`;
  }).join("");
}

// ─── Search & Filter ───
const searchInput = document.getElementById("cmdSearch");
const filterBtns = document.querySelectorAll(".filter-btn");
let currentFilter = "all";

searchInput?.addEventListener("input", () => {
  renderCommands(currentFilter, searchInput.value);
});

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter || "all";
    renderCommands(currentFilter, searchInput?.value || "");
  });
});

// ─── Particles ───
function initParticles() {
  const canvas = document.getElementById("particles");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w, h, particles = [];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.06)";
      ctx.fill();
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(255,255,255,${0.04 * (1 - dist / 120)})`;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }
  draw();
}

// ─── Demo Terminal ───
const DEMO_RESPONSES = {
  ping: "Pong! 🏓\nLatency: 12ms",
  help: "Available commands:\n• /toc-ping — Check bot latency\n• /toc-help — Show this help\n• /toc-echo — Echo your message\n• /toc-time — Current server time\n• /toc-uptime — Bot uptime\n• /tadsocommand-joke — Random joke\n... and 16 more!",
  echo: "Echo chamber activated: ⚡ totally got this",
  time: "🕐 7/12/2026, 3:42:17 PM",
  uptime: "⏱ Been running for 2d 14h 23m 7s",
  fact: "💡 Did you know?\nA group of flamingos is called a 'flamboyance'.",
  advice: "🧠 Advice:\nThe best time to start is now.",
  quote: '"The only limit to our realization of tomorrow is our doubts of today." — Franklin D. Roosevelt',
  joke: "Why do programmers prefer dark mode?\n\nBecause light attracts bugs! 😄",
  roast: "🔥 Roast: You're not stupid; you just have bad luck thinking.",
  insult: "😤 I'd agree with you, but then we'd both be wrong.",
  "8ball": "🎱 Question: Will I win?\n\nMy sources say no.",
  wyr: "🤔 Would You Rather...\n\nHave the ability to fly or be invisible?",
  yesno: "✅ *Should I do it?\nYES!",
  bored: "😐 Bored? Try this:\nLearn to juggle!",
  kanye: '🌊 Kanye says: "I am Warhol! I am the number one most impactful artist of our generation."',
  weather: "🌤 Weather in London\n☁️ +15°C 10mph 75%",
  crypto: "📈 *Bitcoin*\nPrice: $62,431\n24h Change: +2.34%",
  cat: "🐱 Cat Fact: A cat's tail contains nearly 10% of all the bones in its body.",
  dog: "🐕 Random Doggo!\nhttps://images.dog.ceo/breeds/hound-walker/n02089867_1234.jpg",
  trivia: "❓ Trivia: Science & Nature\n  What is the chemical symbol for gold?\n  \n  Au ✅\n  Ag\n  Fe\n  Cu\n  \n_Difficulty: easy_",
  define: "📖 *Serendipity* (noun)\n> The occurrence of events by chance in a happy or beneficial way.\n_Example: Finding that book was pure serendipity._",
  number: "🔢 Number Fact: 42 is the number of laws of robotics according to Isaac Asimov's books.",
};

const terminalBody = document.getElementById("terminalBody");
const demoInput = document.getElementById("demoInput");
const demoSend = document.getElementById("demoSend");

function addTerminalLine(text, className = "response") {
  if (!terminalBody) return;
  const div = document.createElement("div");
  div.className = `terminal-line ${className}`;
  div.innerHTML = `<span class="prompt ${className === "user" ? "" : "success"}">${className === "user" ? ">" : "✓"}</span> ${text.replace(/\n/g, "<br>")}`;
  terminalBody.appendChild(div);
  terminalBody.scrollTop = terminalBody.scrollHeight;
}

function simulateResponse(cmd) {
  const key = cmd.replace("/toc-", "").replace("/tadsocommand-", "");
  const response = DEMO_RESPONSES[key] || DEMO_RESPONSES["ping"];

  // Remove ready line
  const ready = document.getElementById("terminalReady");
  if (ready) ready.remove();

  // Remove old ready messages
  const oldReady = terminalBody?.querySelector(".terminal-line.response:last-child");
  if (oldReady && oldReady.textContent?.includes("Ready for commands")) oldReady.remove();

  const typingDiv = document.createElement("div");
  typingDiv.className = "terminal-line typing";
  typingDiv.innerHTML = `<span class="prompt success">_</span> <span style="color:#505070">processing...</span>`;
  terminalBody?.appendChild(typingDiv);
  terminalBody?.scrollTo(0, terminalBody.scrollHeight);

  setTimeout(() => {
    typingDiv.remove();
    addTerminalLine(response);

    setTimeout(() => {
      addTerminalLine("Ready for commands. Type one below!", "response");
    }, 500);
  }, 600 + Math.random() * 400);
}

function handleDemoCommand() {
  if (!demoInput || !terminalBody) return;
  const raw = demoInput.value.trim();
  if (!raw) return;

  const fullCmd = raw.startsWith("/") ? raw : `/${raw}`;
  addTerminalLine(fullCmd, "user");
  demoInput.value = "";
  simulateResponse(fullCmd);
}

demoSend?.addEventListener("click", handleDemoCommand);
demoInput?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleDemoCommand();
});

// Suggestion buttons
document.querySelectorAll(".suggestion").forEach((btn) => {
  btn.addEventListener("click", () => {
    const cmd = btn.dataset.cmd || "";
    if (demoInput) {
      demoInput.value = cmd;
      handleDemoCommand();
    }
  });
});

// ─── Copy Button ───
document.querySelectorAll(".copy-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const text = btn.dataset.cmd;
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      btn.classList.add("copied");
      const orig = btn.innerHTML;
      btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`;
      setTimeout(() => {
        btn.classList.remove("copied");
        btn.innerHTML = orig;
      }, 2000);
    }).catch(() => {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    });
  });
});

// ─── Scroll Fade ───
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".section").forEach((section) => {
  section.classList.add("fade-section");
  observer.observe(section);
});

// ─── Init ───
initParticles();
renderCommands();
