# TOC SlackBot

[![TypeScript](https://img.shields.io/badge/lang-TypeScript-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Bun](https://img.shields.io/badge/runtime-Bun-000?logo=bun)](https://bun.sh)
[![Bolt](https://img.shields.io/badge/sdk-Bolt-4A154B?logo=slack)](https://slack.dev/bolt-js)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/hosted-GitHub%20Pages-222?logo=github)](https://tadstech.github.io/SlackBot)

A Slack bot I built with **Bun**, **TypeScript**, and **Slack Bolt**. It runs entirely through **Socket Mode**, so you don't need to expose a public server just to test or use it.

I mainly built this as a fun project to explore Slack's API while keeping the codebase clean, strongly typed, and easy to extend.

**Live demo:** https://tadstech.github.io/SlackBot

---

## What it does

Right now the bot comes with **25 slash commands** split into five groups:

- Utility
- Fun
- Knowledge
- Media
- Random

Some commands are simple quality-of-life tools like ping, uptime, and echo. Others pull data from free public APIs for things like:

- jokes
- quotes
- trivia
- weather
- cryptocurrency prices
- dictionary definitions
- random facts
- dog images
- cat facts
- and a few more

Most responses have multiple variants so the bot doesn't repeat the exact same message every time.

Since everything runs through **Socket Mode**, there's no Request URL to host or tunnel during development.

---

## Commands

| Category      | Commands                                                                        |
| ------------- | ------------------------------------------------------------------------------- |
| **Utility**   | `/toc-ping`, `/toc-help`, `/toc-echo`, `/toc-time`, `/toc-uptime`               |
| **Fun**       | `/toc-joke`, `/toc-roast`, `/toc-8ball`, `/toc-wyr`, `/toc-bored`, `/toc-kanye` |
| **Knowledge** | `/toc-fact`, `/toc-quote`, `/toc-define`, `/toc-number`, `/toc-trivia`          |
| **Media**     | `/toc-cat`, `/toc-dog`, `/toc-weather`, `/toc-crypto`                           |
| **Random**    | `/toc-court`, `/toc-fortune`, `/toc-corporate`, `/toc-therapy`, `/toc-plot`     |

---

## Tech Stack

- Bun
- TypeScript (strict mode)
- Slack Bolt
- Axios
- ESLint
- Prettier
- Husky
- lint-staged

Nothing too fancy—just tools that make development smoother.

---

## Getting started

Clone the repository:

```bash
git clone https://github.com/TADSTech/SlackBot.git
cd SlackBot
bun install
```

Create a Slack app, enable **Socket Mode**, then add the required scopes:

- `chat:write`
- `commands`

Copy the environment template:

```bash
cp .env.example .env
```

Fill it in:

```env
SLACK_BOT_TOKEN=xoxb-your-token
SLACK_APP_TOKEN=xapp-your-token
```

Then create the slash commands in your Slack app using the names listed above.

Since this uses Socket Mode, you don't need a Request URL.

Run the bot:

```bash
bun run index.ts
```

That's it.

---

## Project structure

```text
SlackBot/
├── index.ts
├── frontend/
├── .husky/
├── commands.txt
├── tsconfig.json
├── eslint.config.js
├── .prettierrc
└── package.json
```

The project intentionally stays pretty small. Most of the logic lives in `index.ts`, making it easy to add new commands without digging through a huge folder structure.

---

## Useful scripts

```bash
bun run index.ts       # Start the bot
bun run lint           # Lint
bun run lint:fix       # Auto-fix lint issues
bun run format         # Format everything
bun run format:check   # Check formatting
bun run typecheck      # TypeScript checks
bun run check          # Run all checks
```

A Husky pre-push hook runs `bun run check`, so I don't accidentally push broken code.

---

## Deployment

If Bun runs there, the bot runs there.

For development I usually just start it locally:

```bash
bun run index.ts
```

For something long-running, you can throw it on a VPS with PM2, systemd, Docker, or whatever you normally use.

The frontend demo is hosted with GitHub Pages.

---

## License

MIT.
