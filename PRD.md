# PRD: ClawCache — The NanoClaw Developer Sandbox Platform

## Goal
Build a local demo of ClawCache: a browser-based NanoClaw skill development, testing, and swarm simulation playground — the missing developer infrastructure for the NanoClaw ecosystem.

## Background
NanoClaw's architecture: single Node.js host process → spawns isolated Docker/Apple Container per agent group → agents run Claude Agent SDK inside container → filesystem IPC back to host. Skills are SKILL.md folders with slash commands (e.g. /add-telegram). No playground exists. Developers must fork the repo, set up Docker locally, wire Anthropic API keys, and test blind. Pain point confirmed in community (Docker-in-Docker friction, no shared test environments, no skill validation tooling).

## What ClawCache Is
A developer platform for the NanoClaw (and OpenClaw) ecosystem:
1. **Skill Sandbox** — paste or upload a SKILL.md, run it against a simulated NanoClaw agent, see output
2. **Swarm Simulator** — define N agents with roles, simulate message passing between containers, visualize coordination
3. **Skill Registry** — browse, rate, and submit vetted NanoClaw skills (feeds into ClawFactory)
4. **Container Health Dashboard** — monitor live NanoClaw installs (opt-in telemetry)
5. **Playbook Store** — paid playbooks for NanoClaw use cases (revenue)

## Demo Requirements (local build)
Build a Node.js + Express web app at port 4000 with:

### Pages
- `/` — Landing page explaining ClawCache, with teal/orange branding matching ClawFactory
- `/sandbox` — Skill Sandbox: textarea for SKILL.md content, "Run Simulation" button, output panel showing simulated agent response, container resource usage mock
- `/swarm` — Swarm Simulator: UI to define 2-5 agents with names/roles, a message input, and a visualization of which agent handled it and how it delegated
- `/registry` — Skill registry index: 6 mock NanoClaw skill cards with name, description, compat badge, install command
- `/playbooks` — 3 paid playbook cards ($29 each): "NanoClaw Swarm Coordinator", "Container Security Hardener", "NanoClaw + Telegram Production Setup"

### Tech
- Node.js + Express
- Static HTML/CSS served from /public (same dark theme as clawfactory.net — bg #0a0c10, accent #00ffcc, nano #f97316)
- No database needed for demo — all mock data
- package.json with start script: node server.js

### Branding
- Name: ClawCache
- Tagline: "Where Claw builders test, share, and ship."
- Logo emoji: 🗄️
- Color: Blend of teal (#00ffcc) and orange (#f97316) — represents both platforms

## Out of scope
- Real Docker execution (mock it)
- Real Anthropic API calls (simulate responses)
- Auth/payment (show UI only)

## Definition of done
- `node server.js` starts on port 4000
- All 5 pages render correctly with consistent dark theme
- Sandbox accepts SKILL.md text and returns a mock simulation result
- Swarm page shows agent coordination visualization
- Registry shows 6 skill cards
- Playbooks page shows 3 paid items
- Run: openclaw system event --text "Done: clawcache demo finished" --mode now
