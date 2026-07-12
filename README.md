# TOC SlackBot

[![TypeScript](https://img.shields.io/badge/lang-TypeScript-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Bun](https://img.shields.io/badge/runtime-Bun-000?logo=bun)](https://bun.sh)
[![Bolt](https://img.shields.io/badge/sdk-Bolt-4A154B?logo=slack)](https://slack.dev/bolt-js)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/hosted-GitHub%20Pages-222?logo=github)](https://tadstech.github.io/SlackBot)

A lightweight, extensible Slack bot that runs via **Socket Mode** — no public HTTP endpoint needed. Built with Bun, TypeScript, and the Bolt framework.

> **Live showcase:** [tadstech.github.io/SlackBot](https://tadstech.github.io/SlackBot)

---

## Features

- **8 slash commands** — ping, help, echo, time, uptime, jokes, facts, advice
- **Socket Mode** — no public URL required; ideal for local or ephemeral deployments
- **External API integration** — pulls from the Official Joke API, uselessfacts.jsph.ru, and Advice Slip API
- **Type safety** — strict TypeScript configuration, fully type-checked
- **Code quality** — ESLint + Prettier, enforced via Husky pre-push hooks

## Commands

| Command              | Description                                 |
| -------------------- | ------------------------------------------- |
| `/toc-ping`          | Check bot latency with a ping/pong response |
| `/toc-help`          | List all available commands                 |
| `/toc-echo <text>`   | Echo your message back                      |
| `/toc-time`          | Show current server date and time           |
| `/toc-uptime`        | Show how long the bot has been running      |
| `/tadsocommand-joke` | Get a random joke (setup + punchline)       |
| `/toc-fact`          | Get a random useless fact                   |
| `/toc-advice`        | Get a random piece of advice                |

## Tech Stack

| Layer           | Technology                                                    |
| --------------- | ------------------------------------------------------------- |
| Runtime         | [Bun](https://bun.sh) 1.3+                                    |
| Language        | [TypeScript](https://www.typescriptlang.org) 5+ (strict mode) |
| Slack SDK       | [Bolt](https://slack.dev/bolt-js) (via `@slack/bolt`)         |
| HTTP client     | [Axios](https://axios-http.com)                               |
| Linter          | [ESLint](https://eslint.org) + `typescript-eslint`            |
| Formatter       | [Prettier](https://prettier.io)                               |
| Git hooks       | [Husky](https://typicode.github.io/husky) + `lint-staged`     |
| Package manager | `bun` (built-in)                                              |

## Quick Start

### Prerequisites

- [Bun](https://bun.sh) 1.3 or later
- A Slack workspace with [Slash Command](https://api.slack.com/interactivity/slash-commands) and [Socket Mode](https://api.slack.com/apis/connections/socket) enabled

### Installation

```bash
git clone https://github.com/TADSTech/SlackBot.git
cd SlackBot
bun install
```

### Configuration

1. Create a Slack app at [api.slack.com/apps](https://api.slack.com/apps)
2. Enable **Socket Mode** in your app settings
3. Add the required **Bot Token Scopes**: `chat:write`, `commands`
4. Install the app to your workspace
5. Copy the environment file and fill in your tokens:

```bash
cp .env.example .env
```

**.env** contents:

```
SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_APP_TOKEN=xapp-your-app-level-token
```

6. Create each [Slash Command](https://api.slack.com/interactivity/slash-commands) in your app settings — use the command names listed above. The Request URL can be left blank when using Socket Mode.

### Running

```bash
bun run index.ts
```

The bot will connect via Socket Mode and start responding to commands immediately.

## Project Structure

```
SlackBot/
├── index.ts              # Entry point — all command handlers
├── tsconfig.json         # Strict TypeScript configuration
├── eslint.config.js      # ESLint flat config
├── .prettierrc           # Prettier formatting rules
├── .husky/
│   ├── pre-commit        # Runs lint-staged on staged files
│   └── pre-push          # Runs typecheck + lint + format check
├── commands.txt          # Reference for Slack API command registration
├── generate_banner.py    # Banner image generator (optional)
├── frontend/             # GitHub Pages showcase site
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── slackbot-banner.png
└── package.json
```

## Scripts

| Command                | Action                                         |
| ---------------------- | ---------------------------------------------- |
| `bun run index.ts`     | Start the bot                                  |
| `bun run lint`         | Check for lint errors                          |
| `bun run lint:fix`     | Auto-fix lint errors                           |
| `bun run format`       | Auto-format all files with Prettier            |
| `bun run format:check` | Check formatting without writing               |
| `bun run typecheck`    | Run `tsc --noEmit` for type errors             |
| `bun run check`        | Run all three: typecheck + lint + format:check |

## Development

```bash
# Type-check continuously
bun run typecheck

# Lint + format before pushing
bun run check
```

The pre-push hook runs `bun run check` automatically — pushes that fail linting or type-checking are rejected.

## Deployment

The bot runs wherever Bun is available:

```bash
# Local development
bun run index.ts

# Persistent server (example using PM2 or systemd)
# or deploy to any VPS / cloud VM with Bun installed
```

For the frontend showcase site, push the `frontend/` directory to GitHub Pages:

1. Go to your repo **Settings > Pages**
2. Set source to **GitHub Actions** or **Deploy from a branch > main > /frontend**
3. The site will be available at `https://tadstech.github.io/SlackBot`

## License

MIT — see [LICENSE](LICENSE) for details.
