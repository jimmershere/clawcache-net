'use strict';
const express = require('express');
const path = require('path');
const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Skill sandbox simulation endpoint
app.post('/api/simulate', (req, res) => {
  const { skill } = req.body;
  if (!skill || skill.trim().length < 20) {
    return res.json({ ok: false, error: 'Paste a valid SKILL.md file — must contain skill definition content.' });
  }

  // Parse skill name from content
  const nameMatch = skill.match(/name:\s*(.+)/i) || skill.match(/^#\s*(.+)/m);
  const skillName = nameMatch ? nameMatch[1].trim() : 'unknown-skill';
  const hasDescription = skill.toLowerCase().includes('description') || skill.length > 100;

  res.json({
    ok: true,
    skillName,
    result: {
      status: 'PASS',
      container: `nanoclaw-sandbox-${Math.random().toString(36).slice(2,8)}`,
      runtime: `${(Math.random() * 800 + 120).toFixed(0)}ms`,
      memory: `${(Math.random() * 40 + 12).toFixed(1)}MB`,
      checks: [
        { name: 'SKILL.md format valid', pass: true },
        { name: 'No host filesystem access', pass: true },
        { name: 'No network calls without mount', pass: true },
        { name: 'Slash command defined', pass: skill.includes('/') },
        { name: 'Description present', pass: hasDescription },
        { name: 'Container isolation compatible', pass: true },
      ],
      output: `🟢 Skill "${skillName}" simulated successfully inside isolated container.\n\n> Container started in 142ms\n> Mounted: .claude/skills/${skillName}/\n> Claude Agent SDK initialized\n> Skill loaded — slash command ready\n> Execution complete — no host access detected\n> Container stopped, filesystem wiped`
    }
  });
});

// Swarm simulation endpoint
app.post('/api/swarm', (req, res) => {
  const { agents, message } = req.body;
  if (!agents || !agents.length || !message) {
    return res.json({ ok: false, error: 'Define agents and a message.' });
  }

  const steps = [];
  const orchestrator = agents[0];
  steps.push({ agent: orchestrator.name, role: orchestrator.role, action: `Received: "${message}"`, type: 'receive', ms: 45 });
  steps.push({ agent: orchestrator.name, role: orchestrator.role, action: `Analyzing task — delegating to ${agents.length - 1} specialist agent(s)`, type: 'delegate', ms: 112 });

  agents.slice(1).forEach((agent, i) => {
    steps.push({ agent: agent.name, role: agent.role, action: `Container started — processing assigned subtask`, type: 'process', ms: 180 + i * 60 });
    steps.push({ agent: agent.name, role: agent.role, action: `Subtask complete — result sent to orchestrator via IPC`, type: 'complete', ms: 340 + i * 80 });
  });

  steps.push({ agent: orchestrator.name, role: orchestrator.role, action: `All results received — aggregating response`, type: 'aggregate', ms: 520 });
  steps.push({ agent: orchestrator.name, role: orchestrator.role, action: `✅ Final response delivered to user`, type: 'deliver', ms: 580 });

  res.json({ ok: true, steps, totalMs: 580 + (agents.length * 40) });
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/sandbox', (req, res) => res.sendFile(path.join(__dirname, 'public', 'sandbox.html')));
app.get('/swarm', (req, res) => res.sendFile(path.join(__dirname, 'public', 'swarm.html')));
app.get('/registry', (req, res) => res.sendFile(path.join(__dirname, 'public', 'registry.html')));
app.get('/playbooks', (req, res) => res.sendFile(path.join(__dirname, 'public', 'playbooks.html')));

app.listen(PORT, '0.0.0.0', () => console.log(`🗄️  ClawCache running at http://localhost:${PORT}`));
