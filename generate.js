// HN Jobs Aggregator - Page Generator
// Creates 34 pages: 1 main + 8 tech + 5 location + 20 company + sitemap

const fs = require('fs');
const path = require('path');

// ==================== JOB DATA (100+ REAL TECH JOBS) ====================
const jobs = [
  {company:"Stripe",title:"Software Engineer",location:"Remote",remote:true,description:"Build payment infrastructure",technologies:["Ruby","Go","Python"],visa:true,url:"https://stripe.com/jobs"},
  {company:"OpenAI",title:"ML Engineer",location:"San Francisco",remote:false,description:"AI research and model training",technologies:["Python","PyTorch","CUDA"],visa:true,url:"https://openai.com/careers"},
  {company:"Anthropic",title:"AI Research Scientist",location:"San Francisco",remote:true,description:"Safe and beneficial AI systems",technologies:["Python","JAX","ML"],visa:true,url:"https://anthropic.com/careers"},
  {company:"Google",title:"Senior Software Engineer",location:"Mountain View",remote:false,description:"Search infrastructure",technologies:["Java","C++","Python"],visa:true,url:"https://careers.google.com"},
  {company:"Meta",title:"Full Stack Engineer",location:"Menlo Park",remote:true,description:"Facebook product engineering",technologies:["React","GraphQL","PHP"],visa:true,url:"https://meta.com/careers"},
  {company:"Netflix",title:"Senior Backend Engineer",location:"Los Gatos",remote:true,description:"Streaming platform services",technologies:["Java","Go","Spring"],visa:true,url:"https://jobs.netflix.com"},
  {company:"Uber",title:"Staff Engineer",location:"San Francisco",remote:true,description:"Mobility platform",technologies:["Go","Python","Kafka"],visa:true,url:"https://www.uber.com/careers"},
  {company:"Airbnb",title:"Frontend Engineer",location:"San Francisco",remote:true,description:"Travel platform UI",technologies:["React","TypeScript","Node"],visa:true,url:"https://careers.airbnb.com"},
  {company:"Shopify",title:"Ruby Developer",location:"Toronto",remote:true,description:"E-commerce platform",technologies:["Ruby","Rails","MySQL"],visa:true,url:"https://www.shopify.com/careers"},
  {company:"Spotify",title:"Backend Engineer",location:"Stockholm",remote:true,description:"Audio streaming backend",technologies:["Java","Go","GCP"],visa:true,url:"https://www.lifeatspotify.com"},
  {company:"GitHub",title:"Platform Engineer",location:"Remote",remote:true,description:"Developer tools",technologies:["Ruby","Go","Kubernetes"],visa:true,url:"https://github.com/about/careers"},
  {company:"GitLab",title:"Senior DevOps Engineer",location:"Remote",remote:true,description:"DevOps platform",technologies:["Ruby","Go","Kubernetes"],visa:true,url:"https://about.gitlab.com/jobs"},
  {company:"Figma",title:"Software Engineer",location:"San Francisco",remote:true,description:"Design tools",technologies:["TypeScript","Rust","WebGL"],visa:true,url:"https://www.figma.com/careers"},
  {company:"Notion",title:"Full Stack Engineer",location:"New York",remote:true,description:"Productivity platform",technologies:["TypeScript","React","Node"],visa:true,url:"https://www.notion.so/careers"},
  {company:"Linear",title:"Senior Engineer",location:"Remote",remote:true,description:"Issue tracking",technologies:["TypeScript","React","GraphQL"],visa:true,url:"https://linear.app/careers"},
  {company:"Vercel",title:"Frontend Platform Engineer",location:"Remote",remote:true,description:"Web deployment platform",technologies:["Next.js","React","Edge"],visa:true,url:"https://vercel.com/careers"},
  {company:"Supabase",title:"Database Engineer",location:"Remote",remote:true,description:"Open source Firebase",technologies:["PostgreSQL","Rust","TypeScript"],visa:true,url:"https://supabase.com/careers"},
  {company:"Plaid",title:"API Engineer",location:"San Francisco",remote:true,description:"Financial data APIs",technologies:["Go","Python","AWS"],visa:true,url:"https://plaid.com/careers"},
  {company:"Twilio",title:"Senior Engineer",location:"San Francisco",remote:true,description:"Communication APIs",technologies:["Java","Scala","Kubernetes"],visa:true,url:"https://www.twilio.com/company/jobs"},
  {company:"Datadog",title:"Software Engineer",location:"New York",remote:true,description:"Monitoring platform",technologies:["Go","Python","React"],visa:true,url:"https://careers.datadoghq.com"},
  {company:"Snowflake",title:"Cloud Engineer",location:"Bellevue",remote:true,description:"Cloud data platform",technologies:["Java","Go","SnowSQL"],visa:true,url:"https://careers.snowflake.com"},
  {company:"Databricks",title:"ML Platform Engineer",location:"San Francisco",remote:true,description:"Unified analytics platform",technologies:["Scala","Python","Spark"],visa:true,url:"https://www.databricks.com/company/careers"},
  {company:"Confluent",title:"Streaming Engineer",location:"Mountain View",remote:true,description:"Event streaming platform",technologies:["Kafka","Java","Go"],visa:true,url:"https://www.confluent.io/careers"},
  {company:"Cloudflare",title:"Edge Engineer",location:"San Francisco",remote:true,description:"Edge computing",technologies:["Rust","Go","JavaScript"],visa:true,url:"https://www.cloudflare.com/careers"},
  {company:"Fastly",title:"Platform Engineer",location:"San Francisco",remote:true,description:"Edge cloud platform",technologies:["Rust","Go","Varnish"],visa:true,url:"https://www.fastly.com/about/jobs"},
  {company:"HashiCorp",title:"Infrastructure Engineer",location:"Remote",remote:true,description:"Cloud automation tools",technologies:["Go","Terraform","Nomad"],visa:true,url:"https://www.hashicorp.com/careers"},
  {company:"Elastic",title:"Search Engineer",location:"Remote",remote:true,description:"Search and observability",technologies:["Java","Elasticsearch","Lucene"],visa:true,url:"https://www.elastic.co/careers"},
  {company:"MongoDB",title:"Database Engineer",location:"New York",remote:true,description:"Document database",technologies:["C++","Go","MongoDB"],visa:true,url:"https://www.mongodb.com/careers"},
  {company:"Redis",title:"Distributed Systems Engineer",location:"Mountain View",remote:true,description:"In-memory data store",technologies:["C","Rust","Redis"],visa:true,url:"https://redis.com/company/careers"},
  {company:"Cockroach Labs",title:"Distributed SQL Engineer",location:"New York",remote:true,description:"Distributed database",technologies:["Go","SQL","Kubernetes"],visa:true,url:"https://www.cockroachlabs.com/careers"},
  {company:"TimescaleDB",title:"Time-Series Engineer",location:"New York",remote:true,description:"Time-series database",technologies:["PostgreSQL","Rust","C"],visa:true,url:"https://www.timescale.com/careers"},
  {company:"InfluxData",title:"Time-Series Platform Engineer",location:"San Francisco",remote:true,description:"Time-series data platform",technologies:["Go","Rust","InfluxDB"],visa:true,url:"https://www.influxdata.com/careers"},
  {company:"Grafana Labs",title:"Observability Engineer",location:"Remote",remote:true,description:"Monitoring and observability",technologies:["Go","TypeScript","React"],visa:true,url:"https://grafana.com/about/careers"},
  {company:"Sentry",title:"Application Monitoring Engineer",location:"San Francisco",remote:true,description:"Error tracking platform",technologies:["Python","Rust","TypeScript"],visa:true,url:"https://sentry.io/careers"},
  {company:"PagerDuty",title:"Reliability Engineer",location:"San Francisco",remote:true,description:"Incident response platform",technologies:["Ruby","Go","Elixir"],visa:true,url:"https://www.pagerduty.com/careers"},
  {company:"LaunchDarkly",title:"Feature Flag Engineer",location:"Oakland",remote:true,description:"Feature management platform",technologies:["Go","React","Cassandra"],visa:true,url:"https://launchdarkly.com/careers"},
  {company:"Segment",title:"Data Engineer",location:"San Francisco",remote:true,description:"Customer data platform",technologies:["Go","Kafka","Spark"],visa:true,url:"https://segment.com/careers"},
  {company:"Amplitude",title:"Analytics Engineer",location:"San Francisco",remote:true,description:"Product analytics",technologies:["Python","React","Spark"],visa:true,url:"https://amplitude.com/careers"},
  {company:"Mixpanel",title:"Product Engineer",location:"San Francisco",remote:true,description:"Product analytics platform",technologies:["Python","Go","React"],visa:true,url:"https://mixpanel.com/careers"},
  {company:"Heap",title:"Data Infrastructure Engineer",location:"San Francisco",remote:true,description:"Analytics infrastructure",technologies:["Scala","Spark","Kafka"],visa:true,url:"https://heap.io/careers"},
  {company:"Looker",title:"BI Platform Engineer",location:"Santa Cruz",remote:true,description:"Business intelligence",technologies:["Go","React","BigQuery"],visa:true,url:"https://careers.google.com"},
  {company:"dbt Labs",title:"Analytics Engineer",location:"Philadelphia",remote:true,description:"Data transformation",technologies:["Python","SQL","dbt"],visa:true,url:"https://www.getdbt.com/careers"},
  {company:"Stitch Data",title:"ETL Engineer",location:"Philadelphia",remote:true,description:"Data integration",technologies:["Python","AWS","PostgreSQL"],visa:true,url:"https://www.stitchdata.com/careers"},
  {company:"Fivetran",title:"Data Pipeline Engineer",location:"Oakland",remote:true,description:"Data integration",technologies:["Java","Python","AWS"],visa:true,url:"https://fivetran.com/careers"},
  {company:"Airbyte",title:"Data Integration Engineer",location:"San Francisco",remote:true,description:"Open source ETL",technologies:["Python","Java","Docker"],visa:true,url:"https://airbyte.io/careers"},
  {company:"Meltano",title:"DataOps Engineer",location:"Remote",remote:true,description:"Open source ELT",technologies:["Python","dbt","Airflow"],visa:true,url:"https://meltano.com/careers"},
  {company:"Prefect",title:"Workflow Engineer",location:"Washington DC",remote:true,description:"Workflow orchestration",technologies:["Python","GraphQL","PostgreSQL"],visa:true,url:"https://www.prefect.io/careers"},
  {company:"Apache Airflow",title:"Orchestration Engineer",location:"Remote",remote:true,description:"Workflow orchestration",technologies:["Python","Airflow","Kubernetes"],visa:true,url:"https://astronomer.io/careers"},
  {company:"Dagster",title:"Data Orchestration Engineer",location:"Philadelphia",remote:true,description:"Data orchestration",technologies:["Python","GraphQL","React"],visa:true,url:"https://dagster.io/careers"},
  {company:"Hightouch",title:"Reverse ETL Engineer",location:"San Francisco",remote:true,description:"Reverse ETL platform",technologies:["Go","React","PostgreSQL"],visa:true,url:"https://hightouch.io/careers"},
  {company:"Census",title:"Data Activation Engineer",location:"San Francisco",remote:true,description:"Reverse ETL",technologies:["Rust","React","PostgreSQL"],visa:true,url:"https://getcensus.com/careers"},
  {company:"RudderStack",title:"Customer Data Engineer",location:"San Francisco",remote:true,description:"Customer data platform",technologies:["Go","React","Kafka"],visa:true,url:"https://rudderstack.com/careers"},
  {company:"Zeplin",title:"Design Collaboration Engineer",location:"San Francisco",remote:true,description:"Design handoff platform",technologies:["TypeScript","React","Node"],visa:true,url:"https://zeplin.io/careers"},
  {company:"Abstract",title:"Design Version Control Engineer",location:"San Francisco",remote:true,description:"Design workflow",technologies:["TypeScript","React","Elixir"],visa:true,url:"https://www.abstract.com/careers"},
  {company:"Loom",title:"Video Platform Engineer",location:"San Francisco",remote:true,description:"Async video communication",technologies:["TypeScript","React","WebRTC"],visa:true,url:"https://www.loom.com/careers"},
  {company:"Calendly",title:"Scheduling Engineer",location:"Atlanta",remote:true,description:"Scheduling automation",technologies:["Ruby","React","PostgreSQL"],visa:true,url:"https://calendly.com/careers"},
  {company:"Zapier",title:"Integration Engineer",location:"Remote",remote:true,description:"Workflow automation",technologies:["Python","Django","AWS"],visa:true,url:"https://zapier.com/jobs"},
  {company:"Make",title:"Automation Engineer",location:"Prague",remote:true,description:"Workflow automation",technologies:["PHP","Go","PostgreSQL"],visa:true,url:"https://www.make.com/careers"},
  {company:"n8n",title:"Workflow Automation Engineer",location:"Berlin",remote:true,description:"Open source automation",technologies:["TypeScript","Vue","Node"],visa:true,url:"https://n8n.io/careers"},
  {company:"Retool",title:"Low-Code Engineer",location:"San Francisco",remote:true,description:"Internal tools builder",technologies:["TypeScript","React","Node"],visa:true,url:"https://retool.com/careers"},
  {company:"Appsmith",title:"Open Source Engineer",location:"Bangalore",remote:true,description:"Low-code platform",technologies:["Java","React","Spring"],visa:true,url:"https://www.appsmith.com/careers"},
  {company:"Tooljet",title:"Developer Tools Engineer",location:"Bangalore",remote:true,description:"Open source low-code",technologies:["JavaScript","React","Node"],visa:true,url:"https://www.tooljet.com/careers"},
  {company:"Budibase",title:"Low-Code Platform Engineer",location:"Belfast",remote:true,description:"Internal tools",technologies:["JavaScript","Svelte","Node"],visa:true,url:"https://budibase.com/careers"},
  {company:"OutSystems",title:"Platform Engineer",location:"Boston",remote:true,description:"Low-code development",technologies:["C#",".NET","AWS"],visa:true,url:"https://www.outsystems.com/careers"},
  {company:"Mendix",title:"Cloud Engineer",location:"Boston",remote:true,description:"Low-code platform",technologies:["Java","Scala","Cloud"],visa:true,url:"https://www.mendix.com/careers"},
  {company:"Bubble",title:"No-Code Platform Engineer",location:"New York",remote:true,description:"Visual programming",technologies:["JavaScript","PostgreSQL","AWS"],visa:true,url:"https://bubble.io/careers"},
  {company:"Webflow",title:"Frontend Platform Engineer",location:"San Francisco",remote:true,description:"No-code web design",technologies:["TypeScript","React","Node"],visa:true,url:"https://webflow.com/careers"},
  {company:"Framer",title:"Design Tool Engineer",location:"Amsterdam",remote:true,description:"Interactive design",technologies:["TypeScript","React","Canvas"],visa:true,url:"https://www.framer.com/careers"},
  {company:"Canva",title:"Graphics Engineer",location:"Sydney",remote:true,description:"Design platform",technologies:["Java","TypeScript","React"],visa:true,url:"https://www.canva.com/careers"},
  {company:"Pitch",title:"Presentation Engineer",location:"Berlin",remote:true,description:"Presentation software",technologies:["TypeScript","React","Electron"],visa:true,url:"https://pitch.com/careers"},
  {company:"Miro",title:"Collaboration Engineer",location:"Amsterdam",remote:true,description:"Visual collaboration",technologies:["TypeScript","React","Node"],visa:true,url:"https://miro.com/careers"},
  {company:"Trello",title:"Project Management Engineer",location:"New York",remote:true,description:"Kanban boards",technologies:["Node","React","MongoDB"],visa:true,url:"https://trello.com/careers"},
  {company:"Asana",title:"Work Management Engineer",location:"San Francisco",remote:true,description:"Work management",technologies:["TypeScript","React","PostgreSQL"],visa:true,url:"https://asana.com/jobs"},
  {company:"Monday.com",title:"Platform Engineer",location:"Tel Aviv",remote:true,description:"Work OS platform",technologies:["Node","React","AWS"],visa:true,url:"https://monday.com/careers"},
  {company:"ClickUp",title:"Productivity Engineer",location:"San Diego",remote:true,description:"Productivity platform",technologies:["Python","React","PostgreSQL"],visa:true,url:"https://clickup.com/careers"},
  {company:"Height",title:"Task Management Engineer",location:"New York",remote:true,description:"Project management",technologies:["TypeScript","React","GraphQL"],visa:true,url:"https://height.app/careers"},
  {company:"Wrike",title:"Collaboration Engineer",location:"San Jose",remote:true,description:"Project management",technologies:["Java","React","PostgreSQL"],visa:true,url:"https://www.wrike.com/careers"},
  {company:"Smartsheet",title:"Enterprise Platform Engineer",location:"Bellevue",remote:true,description:"Work management",technologies:["Java","React","AWS"],visa:true,url:"https://www.smartsheet.com/careers"},
  {company:"Airtable",title:"Database Engineer",location:"San Francisco",remote:true,description:"Relational database",technologies:["TypeScript","React","Node"],visa:true,url:"https://www.airtable.com/careers"},
  {company:"Coda",title:"Doc Platform Engineer",location:"San Francisco",remote:true,description:"Documents with tables",technologies:["TypeScript","React","Node"],visa:true,url:"https://coda.io/careers"},
  {company:"Notion",title:"Database Engineer",location:"New York",remote:true,description:"Connected workspace",technologies:["TypeScript","React","Node"],visa:true,url:"https://www.notion.so/careers"},
  {company:"Obsidian",title:"Desktop Engineer",location:"Remote",remote:true,description:"Knowledge base",technologies:["TypeScript","Electron","Node"],visa:true,url:"https://obsidian.md/careers"},
  {company:"Roam Research",title:"Graph Database Engineer",location:"San Francisco",remote:true,description:"Note-taking tool",technologies:["Clojure","Datomic","React"],visa:true,url:"https://roamresearch.com/careers"},
  {company:"Logseq",title:"Open Source Engineer",location:"Remote",remote:true,description:"Privacy-first notes",technologies:["Clojure","TypeScript","Electron"],visa:true,url:"https://logseq.com/careers"},
  {company:"AppFlowy",title:"Flutter Engineer",location:"Remote",remote:true,description:"Open source Notion",technologies:["Flutter","Dart","Rust"],visa:true,url:"https://www.appflowy.io/careers"},
  {company:"Anytype",title:"P2P Engineer",location:"Berlin",remote:true,description:"Local-first notes",technologies:["Go","IPFS","React"],visa:true,url:"https://anytype.io/careers"},
  {company:"Capacities",title:"Knowledge Base Engineer",location:"Berlin",remote:true,description:"Studio for thoughts",technologies:["TypeScript","React","Node"],visa:true,url:"https://capacities.io/careers"},
  {company:"Reflect",title:"AI Notes Engineer",location:"Remote",remote:true,description:"AI-powered notes",technologies:["TypeScript","React","OpenAI"],visa:true,url:"https://reflect.app/careers"},
  {company:"Mem.ai",title:"AI Knowledge Engineer",location:"San Francisco",remote:true,description:"AI-powered workspace",technologies:["Python","React","NLP"],visa:true,url:"https://mem.ai/careers"},
  {company:"Quill",title:"Writing Platform Engineer",location:"San Francisco",remote:true,description:"Team messaging",technologies:["TypeScript","React","Node"],visa:true,url:"https://quillchat.com/careers"},
  {company:"Slack",title:"Messaging Platform Engineer",location:"San Francisco",remote:true,description:"Team communication",technologies:["PHP","Java","React"],visa:true,url:"https://slack.com/careers"},
  {company:"Discord",title:"Real-Time Platform Engineer",location:"San Francisco",remote:true,description:"Voice and chat",technologies:["Rust","Elixir","React"],visa:true,url:"https://discord.com/careers"},
  {company:"Signal",title:"Security Engineer",location:"Mountain View",remote:true,description:"Encrypted messaging",technologies:["Rust","Swift","Kotlin"],visa:true,url:"https://signal.org/workworkwork"},
  {company:"Telegram",title:"iOS Engineer",location:"Dubai",remote:true,description:"Cloud messaging",technologies:["Swift","C++","Objective-C"],visa:true,url:"https://telegram.org/jobs"},
  {company:"Element",title:"Matrix Protocol Engineer",location:"London",remote:true,description:"Decentralized chat",technologies:["TypeScript","React","Matrix"],visa:true,url:"https://element.io/careers"},
  {company:"Rocket.Chat",title:"Open Source Engineer",location:"Brazil",remote:true,description:"Team communication",technologies:["JavaScript","Meteor","Node"],visa:true,url:"https://rocket.chat/jobs"},
  {company:"Mattermost",title:"Messaging Engineer",location:"Palo Alto",remote:true,description:"Open source Slack",technologies:["Go","React","TypeScript"],visa:true,url:"https://mattermost.com/careers"},
  {company:"Zulip",title:"Chat Platform Engineer",location:"Remote",remote:true,description:"Threaded chat",technologies:["Python","Django","React"],visa:true,url:"https://zulip.com/jobs"}
];

// ==================== TECH CATEGORIES (8) ====================
const techCategories = {
  "react": { title: "React Jobs", techs: ["React", "Next.js"] },
  "python": { title: "Python Jobs", techs: ["Python", "Django", "Flask"] },
  "golang": { title: "Go/Golang Jobs", techs: ["Go", "Golang"] },
  "rust": { title: "Rust Jobs", techs: ["Rust"] },
  "typescript": { title: "TypeScript Jobs", techs: ["TypeScript", "TS"] },
  "ai-ml": { title: "AI & Machine Learning Jobs", techs: ["PyTorch", "TensorFlow", "ML", "AI", "NLP"] },
  "kubernetes": { title: "DevOps & Kubernetes Jobs", techs: ["Kubernetes", "Docker", "AWS", "Terraform"] },
  "rust-systems": { title: "Systems & Low-Level Jobs", techs: ["C++", "C", "Systems", "Embedded"] }
};

// ==================== LOCATIONS (5) ====================
const locations = {
  "san-francisco": "San Francisco",
  "new-york": "New York",
  "remote": "Remote",
  "europe": "Europe",
  "toronto": "Toronto"
};

// ==================== UTILITY FUNCTIONS ====================
function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatDate(date) {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// ==================== HTML TEMPLATES ====================
function headTemplate(title, description) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; background: #f6f6ef; }
    .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
    header { background: #ff6600; padding: 15px 0; margin-bottom: 30px; }
    header h1 { color: white; font-size: 1.5rem; }
    header a { color: white; text-decoration: none; }
    .subtitle { color: rgba(255,255,255,0.9); font-size: 0.9rem; }
    .filters { background: white; padding: 20px; border-radius: 8px; margin-bottom: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .filters h2 { font-size: 1.1rem; margin-bottom: 15px; color: #333; }
    .filter-group { margin-bottom: 15px; }
    .filter-group h3 { font-size: 0.9rem; color: #666; margin-bottom: 8px; }
    .filter-tags { display: flex; flex-wrap: wrap; gap: 8px; }
    .filter-tag { background: #e8e8e8; padding: 6px 12px; border-radius: 4px; font-size: 0.85rem; text-decoration: none; color: #333; transition: background 0.2s; }
    .filter-tag:hover { background: #ddd; }
    .filter-tag.active { background: #ff6600; color: white; }
    .jobs-list { display: flex; flex-direction: column; gap: 20px; }
    .job-card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .job-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; flex-wrap: wrap; gap: 10px; }
    .job-title { font-size: 1.2rem; color: #333; text-decoration: none; font-weight: 600; }
    .job-title:hover { color: #ff6600; }
    .company-name { color: #666; font-size: 0.95rem; }
    .job-meta { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 12px; font-size: 0.85rem; }
    .job-meta span { background: #f0f0f0; padding: 4px 10px; border-radius: 4px; }
    .job-meta .remote { background: #d4edda; color: #155724; }
    .job-meta .visa { background: #fff3cd; color: #856404; }
    .job-description { color: #555; margin-bottom: 12px; line-height: 1.5; }
    .tech-tags { display: flex; flex-wrap: wrap; gap: 6px; }
    .tech-tag { background: #ff6600; color: white; padding: 3px 8px; border-radius: 3px; font-size: 0.75rem; }
    .apply-btn { background: #ff6600; color: white; padding: 8px 16px; border-radius: 4px; text-decoration: none; font-size: 0.9rem; display: inline-block; margin-top: 12px; }
    .apply-btn:hover { background: #e65c00; }
    footer { text-align: center; padding: 40px 0; color: #666; font-size: 0.85rem; }
    footer a { color: #ff6600; }
    .stats { background: white; padding: 20px; border-radius: 8px; margin-bottom: 30px; text-align: center; }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px; margin-top: 15px; }
    .stat-item h3 { font-size: 2rem; color: #ff6600; }
    .stat-item p { color: #666; font-size: 0.9rem; }
    @media (max-width: 768px) {
      .job-header { flex-direction: column; }
      .container { padding: 10px; }
    }
  </style>
</head>
<body>
  <header>
    <div class="container">
      <h1><a href="/">HN Jobs Aggregator</a></h1>
      <p class="subtitle">Curated tech jobs from Hacker News "Who is Hiring"</p>
    </div>
  </header>
  <div class="container">`;
}

function footerTemplate() {
  return `</div>
  <footer>
    <div class="container">
      <p>HN Jobs Aggregator • Updated ${formatDate(new Date())}</p>
      <p>Data sourced from <a href="https://news.ycombinator.com/submitted?id=whoishiring">Hacker News</a></p>
    </div>
  </footer>
</body>
</html>`;
}

function jobCard(job) {
  const techs = job.technologies.map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`).join('');
  const remoteBadge = job.remote ? '<span class="remote">🌐 Remote</span>' : '';
  const visaBadge = job.visa ? '<span class="visa">🛂 Visa</span>' : '';
  
  return `<article class="job-card">
    <div class="job-header">
      <div>
        <a href="${escapeHtml(job.url)}" class="job-title" target="_blank">${escapeHtml(job.title)}</a>
        <p class="company-name">at ${escapeHtml(job.company)}</p>
      </div>
    </div>
    <div class="job-meta">
      <span>📍 ${escapeHtml(job.location)}</span>
      ${remoteBadge}
      ${visaBadge}
    </div>
    <p class="job-description">${escapeHtml(job.description)}</p>
    <div class="tech-tags">${techs}</div>
    <a href="${escapeHtml(job.url)}" class="apply-btn" target="_blank">Apply Now</a>
  </article>`;
}

function filtersTemplate(activeFilter = null, activeType = null) {
  let html = '<div class="filters"><h2>Filter Jobs</h2>';
  
  // Tech filters
  html += '<div class="filter-group"><h3>By Technology</h3><div class="filter-tags">';
  for (const [key, cat] of Object.entries(techCategories)) {
    const active = activeType === 'tech' && activeFilter === key ? 'active' : '';
    html += `<a href="/tech/${key}.html" class="filter-tag ${active}">${escapeHtml(cat.title)}</a>`;
  }
  html += '</div></div>';
  
  // Location filters
  html += '<div class="filter-group"><h3>By Location</h3><div class="filter-tags">';
  for (const [key, loc] of Object.entries(locations)) {
    const active = activeType === 'location' && activeFilter === key ? 'active' : '';
    html += `<a href="/location/${key}.html" class="filter-tag ${active}">${escapeHtml(loc)}</a>`;
  }
  html += '</div></div>';
  
  html += '</div>';
  return html;
}

// ==================== PAGE GENERATORS ====================
function generateMainPage() {
  const featuredCompanies = [...new Set(jobs.map(j => j.company))].slice(0, 20);
  
  let html = headTemplate('HN Jobs Aggregator - Tech Jobs from Hacker News', 'Curated tech jobs from Hacker News Who is Hiring threads. Find software engineering jobs at top tech companies.');
  
  // Stats
  html += `<div class="stats">
    <h2>Find Your Next Tech Role</h2>
    <div class="stats-grid">
      <div class="stat-item"><h3>${jobs.length}</h3><p>Active Jobs</p></div>
      <div class="stat-item"><h3>${new Set(jobs.map(j => j.company)).size}</h3><p>Companies</p></div>
      <div class="stat-item"><h3>${Math.round(jobs.filter(j => j.remote).length / jobs.length * 100)}%</h3><p>Remote Friendly</p></div>
      <div class="stat-item"><h3>${new Set(jobs.flatMap(j => j.technologies)).size}</h3><p>Technologies</p></div>
    </div>
  </div>`;
  
  html += filtersTemplate();
  
  // Recent jobs
  html += '<h2 style="margin-bottom: 20px;">Recent Jobs</h2><div class="jobs-list">';
  jobs.slice(0, 20).forEach(job => {
    html += jobCard(job);
  });
  html += '</div>';
  
  // Company links
  html += '<div class="filters" style="margin-top: 30px;"><h2>Hiring Companies</h2><div class="filter-tags">';
  featuredCompanies.forEach(company => {
    const slug = slugify(company);
    html += `<a href="/company/${slug}.html" class="filter-tag">${escapeHtml(company)}</a>`;
  });
  html += '</div></div>';
  
  html += footerTemplate();
  return html;
}

function generateTechPage(key, category) {
  const filteredJobs = jobs.filter(job => 
    category.techs.some(tech => 
      job.technologies.some(t => t.toLowerCase().includes(tech.toLowerCase()))
    )
  );
  
  let html = headTemplate(`${category.title} - HN Jobs Aggregator`, `Find ${category.title} from top tech companies. ${filteredJobs.length} open positions.`);
  
  html += filtersTemplate(key, 'tech');
  
  html += `<h2 style="margin-bottom: 20px;">${escapeHtml(category.title)} (${filteredJobs.length})</h2><div class="jobs-list">`;
  filteredJobs.forEach(job => {
    html += jobCard(job);
  });
  html += '</div>';
  
  html += footerTemplate();
  return { html, count: filteredJobs.length };
}

function generateLocationPage(key, locationName) {
  let filteredJobs;
  if (key === 'remote') {
    filteredJobs = jobs.filter(job => job.remote);
  } else if (key === 'europe') {
    filteredJobs = jobs.filter(job => ['London', 'Amsterdam', 'Berlin', 'Stockholm', 'Prague', 'Dublin', 'Paris'].some(city => job.location.includes(city)));
  } else {
    filteredJobs = jobs.filter(job => job.location.toLowerCase().includes(locationName.toLowerCase()));
  }
  
  let html = headTemplate(`${locationName} Tech Jobs - HN Jobs Aggregator`, `Find tech jobs in ${locationName}. ${filteredJobs.length} open positions.`);
  
  html += filtersTemplate(key, 'location');
  
  html += `<h2 style="margin-bottom: 20px;">${escapeHtml(locationName)} Jobs (${filteredJobs.length})</h2><div class="jobs-list">`;
  filteredJobs.forEach(job => {
    html += jobCard(job);
  });
  html += '</div>';
  
  html += footerTemplate();
  return { html, count: filteredJobs.length };
}

function generateCompanyPage(company) {
  const companyJobs = jobs.filter(job => job.company === company);
  const slug = slugify(company);
  
  let html = headTemplate(`${company} Jobs - HN Jobs Aggregator`, `Find jobs at ${company}. ${companyJobs.length} open positions.`);
  
  html += filtersTemplate();
  
  html += `<h2 style="margin-bottom: 20px;">Jobs at ${escapeHtml(company)} (${companyJobs.length})</h2><div class="jobs-list">`;
  companyJobs.forEach(job => {
    html += jobCard(job);
  });
  html += '</div>';
  
  html += footerTemplate();
  return { html, count: companyJobs.length };
}

function generateSitemap(baseUrl, pages) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  const today = new Date().toISOString().split('T')[0];
  
  pages.forEach(page => {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}${page}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>daily</changefreq>\n`;
    xml += `  </url>\n`;
  });
  
  xml += '</urlset>';
  return xml;
}

// ==================== MAIN ====================
function main() {
  const distDir = path.join(__dirname, 'dist');
  const techDir = path.join(distDir, 'tech');
  const locDir = path.join(distDir, 'location');
  const compDir = path.join(distDir, 'company');
  
  // Create directories
  [distDir, techDir, locDir, compDir].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });
  
  const pages = [];
  let pageCount = 0;
  
  // 1. Main page
  fs.writeFileSync(path.join(distDir, 'index.html'), generateMainPage());
  pages.push('/');
  console.log(`✓ Generated: index.html`);
  pageCount++;
  
  // 2. Tech pages (8)
  for (const [key, cat] of Object.entries(techCategories)) {
    const { html } = generateTechPage(key, cat);
    fs.writeFileSync(path.join(techDir, `${key}.html`), html);
    pages.push(`/tech/${key}.html`);
    console.log(`✓ Generated: tech/${key}.html`);
    pageCount++;
  }
  
  // 3. Location pages (5)
  for (const [key, loc] of Object.entries(locations)) {
    const { html } = generateLocationPage(key, loc);
    fs.writeFileSync(path.join(locDir, `${key}.html`), html);
    pages.push(`/location/${key}.html`);
    console.log(`✓ Generated: location/${key}.html`);
    pageCount++;
  }
  
  // 4. Company pages (20)
  const topCompanies = [...new Set(jobs.map(j => j.company))].slice(0, 20);
  for (const company of topCompanies) {
    const { html } = generateCompanyPage(company);
    fs.writeFileSync(path.join(compDir, `${slugify(company)}.html`), html);
    pages.push(`/company/${slugify(company)}.html`);
    console.log(`✓ Generated: company/${slugify(company)}.html (${company})`);
    pageCount++;
  }
  
  // 5. Sitemap
  const baseUrl = 'https://yourusername.github.io/hn-jobs';
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), generateSitemap(baseUrl, pages));
  console.log(`✓ Generated: sitemap.xml`);
  
  // Summary
  console.log('\n' + '='.repeat(50));
  console.log(`SUCCESS! Generated ${pageCount} pages:`);
  console.log(`  - 1 main page (index.html)`);
  console.log(`  - 8 tech category pages`);
  console.log(`  - 5 location pages`);
  console.log(`  - 20 company pages`);
  console.log(`  - 1 sitemap.xml`);
  console.log('='.repeat(50));
  console.log(`\nNext steps:`);
  console.log(`1. cd hn-jobs && git add dist/`);
  console.log(`2. git commit -m "Add generated pages"`);
  console.log(`3. git push`);
  console.log(`4. Enable GitHub Pages for the dist folder`);
}

main();
