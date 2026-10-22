import { chromium } from 'playwright';
import { resolve, dirname } from 'path';
import { mkdirSync } from 'fs';

async function generateResume() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Don Shammah — Backend & Systems Engineer</title>
  <style>
    @page { size: letter; margin: 0.4in 0.5in; }
    :root {
      --ink: #0b1220;
      --body: #2b3648;
      --muted: #64708a;
      --rule: #dfe4ee;
      --accent: #4338ca;
      --accent-soft: #eef0ff;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: var(--body);
      font-size: 8.9pt;
      line-height: 1.42;
      background: #fff;
      -webkit-font-smoothing: antialiased;
    }
    a { color: inherit; text-decoration: none; }
    strong { color: var(--ink); font-weight: 650; }
    code {
      font-family: "SF Mono", Menlo, Consolas, monospace;
      font-size: 0.92em;
      background: var(--accent-soft);
      color: var(--accent);
      padding: 0 3px;
      border-radius: 2px;
    }

    /* Header */
    header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding-bottom: 9px;
      border-bottom: 2.5px solid var(--ink);
    }
    h1 {
      font-size: 24pt;
      font-weight: 800;
      letter-spacing: -0.03em;
      line-height: 1;
      color: var(--ink);
    }
    .title {
      margin-top: 5px;
      font-size: 10pt;
      font-weight: 600;
      color: var(--accent);
      letter-spacing: 0.01em;
    }
    .contacts {
      text-align: right;
      font-size: 8.3pt;
      color: var(--muted);
      line-height: 1.55;
    }
    .contacts a { color: var(--ink); font-weight: 500; }

    /* Metrics strip */
    .metrics {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      margin: 9px 0 10px;
      border: 1px solid var(--rule);
      border-radius: 4px;
      background: #fafbfe;
    }
    .metric { padding: 6px 10px; border-right: 1px solid var(--rule); }
    .metric:last-child { border-right: none; }
    .metric .n {
      font-size: 15pt;
      font-weight: 800;
      color: var(--accent);
      line-height: 1.05;
      letter-spacing: -0.02em;
    }
    .metric .l {
      font-size: 7.4pt;
      color: var(--muted);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      font-weight: 600;
      margin-top: 1px;
    }

    /* Layout */
    .summary { margin-bottom: 10px; color: var(--body); }
    .cols { display: grid; grid-template-columns: 1fr 2.05in; column-gap: 20px; }
    h2 {
      font-size: 8.2pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: var(--accent);
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    h2::after { content: ""; flex: 1; height: 1px; background: var(--rule); }
    section { margin-bottom: 11px; }

    /* Experience */
    .role-row { display: flex; justify-content: space-between; align-items: baseline; }
    .role { font-size: 10pt; font-weight: 700; color: var(--ink); }
    .date { font-size: 8.2pt; color: var(--muted); font-weight: 500; white-space: nowrap; }
    .company { font-weight: 600; color: var(--accent); font-size: 9pt; }
    .stack { font-size: 8pt; color: var(--muted); margin: 2px 0 4px; }
    ul { list-style: none; }
    li { position: relative; padding-left: 11px; margin-bottom: 3.6px; }
    li::before {
      content: "";
      position: absolute;
      left: 1px; top: 0.58em;
      width: 4px; height: 4px;
      background: var(--accent);
      border-radius: 1px;
    }

    /* Projects */
    .project { margin-bottom: 6px; }
    .project-head { font-weight: 700; color: var(--ink); }
    .project-links { font-size: 7.9pt; color: var(--accent); font-weight: 500; margin-left: 5px; }

    /* Sidebar */
    .skill-group { margin-bottom: 7px; }
    .skill-cat { font-size: 7.9pt; font-weight: 700; color: var(--ink); margin-bottom: 2px; }
    .chips { display: flex; flex-wrap: wrap; gap: 3px; }
    .chip {
      font-size: 7.6pt;
      padding: 1px 5px;
      border: 1px solid var(--rule);
      border-radius: 3px;
      background: #fff;
      color: var(--body);
      line-height: 1.35;
    }
    .edu { margin-bottom: 7px; }
    .edu-title { font-weight: 700; color: var(--ink); font-size: 8.7pt; line-height: 1.3; }
    .edu-org { color: var(--accent); font-weight: 600; font-size: 8.2pt; }
    .edu-meta { color: var(--muted); font-size: 7.8pt; }
    .edu-desc { font-size: 7.9pt; color: var(--body); margin-top: 1px; line-height: 1.38; }
    .badge {
      display: inline-block;
      font-size: 7pt;
      font-weight: 700;
      color: var(--accent);
      background: var(--accent-soft);
      border-radius: 3px;
      padding: 0 4px;
      margin-top: 2px;
      letter-spacing: 0.03em;
      text-transform: uppercase;
    }
  </style>
</head>
<body>

  <header>
    <div>
      <h1>Don Shammah</h1>
      <div class="title">Backend &amp; Distributed Systems Engineer</div>
    </div>
    <div class="contacts">
      <div>Nairobi, Kenya · <a href="mailto:donshammah1@gmail.com">donshammah1@gmail.com</a></div>
      <div><a href="https://donshammah.tech">donshammah.tech</a> · <a href="https://github.com/donshammah96">github.com/donshammah96</a> · <a href="https://www.linkedin.com/in/don-shammah-4340422b2">linkedin.com/in/don-shammah-4340422b2</a></div>
    </div>
  </header>

  <div class="metrics">
    <div class="metric"><div class="n">4</div><div class="l">Apps in one monorepo</div></div>
    <div class="metric"><div class="n">9</div><div class="l">Regulatory boards integrated</div></div>
    <div class="metric"><div class="n">26</div><div class="l">Ratified ADRs authored</div></div>
    <div class="metric"><div class="n">47</div><div class="l">Counties served</div></div>
  </div>

  <p class="summary">
    Backend engineer who designs and ships <strong>money-moving, compliance-critical systems</strong> end to end. Solo architect of <strong>Build Market</strong>, a live East African construction marketplace built on milestone escrow (M-Pesa), event-driven pipelines, and statutory credential verification. Pairs a commerce background with CS fundamentals, and writes down the reasoning behind every major decision.
  </p>

  <div class="cols">
    <main>
      <section>
        <h2>Experience</h2>
        <div class="role-row">
          <div><span class="role">Solo Architect &amp; Lead Engineer</span> · <span class="company">Build Market</span></div>
          <span class="date">2024 – Present</span>
        </div>
        <div class="stack">East African construction marketplace &amp; regulatory infrastructure · Turborepo · Node.js 24 · TypeScript · Next.js · Cloudflare · Render</div>
        <ul>
          <li><strong>Escrow payments:</strong> Built milestone-based escrow on M-Pesa Daraja 2.0 (STK push, B2C disbursements) with idempotency keys and automated KRA eTIMS invoice reconciliation, designed to prevent double-spend and unauthorized releases.</li>
          <li><strong>Compliance state machines:</strong> Modelled credential verification across 9 regulatory boards (NCA, EBK, BORAQS, EARB, EPRA, VRB, ISK, NEMA, KEBS), with an operator-queue fallback when board portals go down.</li>
          <li><strong>Event-driven backbone:</strong> Engineered asynchronous pipelines on NATS JetStream and Redis-backed BullMQ worker pools, with dead-letter queues and poison-pill isolation so one bad message never stalls a queue.</li>
          <li><strong>Monorepo topology:</strong> Split the platform into 4 apps: edge BFFs on Cloudflare Workers (OpenNext), an admin control plane, a regulatory ops queue, and containerized Node.js 24 worker daemons on Render.</li>
          <li><strong>Security &amp; audit:</strong> Designed capability-based authorization with typed <code>safeAction</code> boundary adapters, step-up session freshness checks, and append-only immutable audit logs.</li>
          <li><strong>Engineering governance:</strong> Authored 26 ratified Architecture Decision Records defining domain slicing, client-layer boundaries, and data-classification invariants.</li>
        </ul>
      </section>

      <section>
        <h2>Selected Projects</h2>
        <div class="project">
          <div><span class="project-head">Build Market Platform</span><span class="project-links"><a href="https://buildmarket.app">buildmarket.app</a> · <a href="https://donshammah.tech/work/build-market">case study</a></span></div>
          <p>Live marketplace connecting homeowners, accredited contractors, and materials suppliers, with county-level fulfillment across all 47 Kenyan counties and milestone-protected payouts.</p>
        </div>
        <div class="project">
          <div><span class="project-head">donshammah.tech</span><span class="project-links"><a href="https://github.com/donshammah96/donshammah.tech">source</a></span></div>
          <p>Static engineering portfolio on Cloudflare Workers Static Assets: Mermaid diagrams rendered to inline SVG at build time (zero client-side JS), plus a security-redaction gate before publish.</p>
        </div>
      </section>
    </main>

    <aside>
      <section>
        <h2>Skills</h2>
        <div class="skill-group">
          <div class="skill-cat">Languages</div>
          <div class="chips"><span class="chip">TypeScript</span><span class="chip">Node.js 24</span><span class="chip">Python</span><span class="chip">SQL</span><span class="chip">C</span></div>
        </div>
        <div class="skill-group">
          <div class="skill-cat">Distributed systems</div>
          <div class="chips"><span class="chip">NATS JetStream</span><span class="chip">BullMQ</span><span class="chip">Event-driven</span><span class="chip">State machines</span><span class="chip">Idempotency</span></div>
        </div>
        <div class="skill-group">
          <div class="skill-cat">Data</div>
          <div class="chips"><span class="chip">PostgreSQL</span><span class="chip">Prisma</span><span class="chip">Redis</span><span class="chip">Cloudflare R2</span></div>
        </div>
        <div class="skill-group">
          <div class="skill-cat">Cloud &amp; DevOps</div>
          <div class="chips"><span class="chip">Cloudflare Workers</span><span class="chip">Render</span><span class="chip">Docker</span><span class="chip">GitHub Actions</span><span class="chip">Turborepo</span><span class="chip">Linux</span></div>
        </div>
        <div class="skill-group">
          <div class="skill-cat">Integrations &amp; security</div>
          <div class="chips"><span class="chip">M-Pesa Daraja 2.0</span><span class="chip">KRA eTIMS</span><span class="chip">Capability RBAC</span><span class="chip">Clerk</span><span class="chip">OpenTelemetry</span><span class="chip">Pino</span></div>
        </div>
      </section>

      <section>
        <h2>Education</h2>
        <div class="edu">
          <div class="edu-title">Bachelor of Commerce</div>
          <div class="edu-org">University of Nairobi</div>
          <div class="edu-meta">2019 – 2022</div>
          <div class="edu-desc">Contracts, accounting systems, financial governance.</div>
        </div>
        <div class="edu">
          <div class="edu-title">CS50x: Intro to Computer Science</div>
          <div class="edu-org">Harvard University</div>
          <div class="edu-desc">Algorithms, data structures, C memory management, SQL.</div>
          <span class="badge">Verified certificate</span>
        </div>
        <div class="edu">
          <div class="edu-title">CS50P: Programming with Python</div>
          <div class="edu-org">Harvard University</div>
          <div class="edu-desc">OOP, test-driven development (pytest), regex, exception handling.</div>
          <span class="badge">Verified certificate</span>
        </div>
      </section>
    </aside>
  </div>

</body>
</html>`;

  await page.setContent(html, { waitUntil: 'networkidle' });
  const outputPath = resolve('public/resume.pdf');
  mkdirSync(dirname(outputPath), { recursive: true });
  await page.pdf({
    path: outputPath,
    format: 'Letter',
    printBackground: true,
    preferCSSPageSize: true, // @page margins are the single source of truth
    tagged: true,
  });

  await browser.close();
  console.log(`Successfully generated resume at: ${outputPath}`);
}

generateResume().catch((err) => {
  console.error(err);
  process.exit(1);
});
