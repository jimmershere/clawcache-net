# ClawCache Deploy

## Static site (Cloudflare Pages)
- Pages: public/ folder → clawcache.net
- GitHub repo: jimmershere/clawcache-net (create this)
- Build: none, output: /public

## API backend (Railway)
- Same Railway project as ClawFactory OR separate service
- server.js handles /api/simulate and /api/swarm
- Update HTML files to point to Railway URL once deployed

## Current API URLs in HTML
- sandbox.html: /api/simulate → update to https://api.clawcache.net/api/simulate
- swarm.html: /api/swarm → update to https://api.clawcache.net/api/swarm
