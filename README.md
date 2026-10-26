# n8n-nodes-miromiro

This is an n8n community node for [MiroMiro](https://miromiro.app/api). It turns any live website into something you can build with: a section as an **Elementor template** for WordPress, a **Shopify section** (Liquid), or **Tailwind, HTML/CSS, React or Vue** code, plus the site's **brand colors, fonts, design tokens** and **assets** (images, SVGs, fonts, videos, audio, Lottie).

**What you can do with it, each one a ready-made [template](#templates) you import in one click:**

* Download every image from a website into one zip
* Rebuild a whole page as code (Tailwind, React, HTML or Vue)
* Rebuild a whole page in Elementor, as one template to import into WordPress
* Rebuild a whole page as Shopify theme sections
* Get any website's brand kit as files: logo, CSS variables, design tokens
* Compare the brands of many websites in one spreadsheet
* Give your AI agent MiroMiro as a tool: "turn linear.app's hero into React"

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation) · [Templates](#templates) · [Operations](#operations) · [Credentials](#credentials) · [Usage](#usage) · [Compatibility](#compatibility) · [Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation and install `n8n-nodes-miromiro`.

## Operations

**Website**

| Operation | What it returns | Credits |
|---|---|---|
| Extract Code | One section of the page as Tailwind, HTML + CSS, React, Vue, an Elementor template (`.json`) or a Shopify section (`.liquid`) | 10 |
| Extract Brand | Brand colors with roles, fonts, logo, and whether each was declared by the site or inferred | 10 |
| Extract Design Tokens | Every color, font, size, radius and shadow with usage counts, or a W3C Design Tokens (DTCG) file | 10 |
| Extract Images | Every image URL on the page | 1 |
| Extract SVGs | Inline SVG markup and SVG files | 1 |
| Extract Fonts | Font families and font files | 5 |
| Extract Videos | Video files and player embeds | 1 |
| Extract Audio | Audio files and podcast enclosures | 1 |
| Extract Lottie Animations | Lottie animation files | 3 |

**Account**

| Operation | What it returns | Credits |
|---|---|---|
| Get | The API key's plan, status and remaining credits | 0 |

Every extraction can also **render the page in a real browser** first (+5 credits) and **skip the 24-hour cache**. Identical repeat calls within 24 hours cost nothing, and failed calls are never charged.

The node can also be used as a **tool by n8n AI agents**.

## Credentials

1. Create a free MiroMiro API key at [miromiro.app/api/onboarding](https://miromiro.app/api/onboarding): 300 credits every month, no card.
2. In n8n, add a **MiroMiro API** credential and paste the key (it starts with `mm_live_`).
3. **Test** checks the key without spending credits.

Paid plans and one-off credit packs are on the [pricing page](https://miromiro.app/api/pricing).

## Compatibility

Built with the n8n node CLI and tested on n8n 1.123. Uses no runtime dependencies.

## Usage

**Rebuild a section in Elementor:** set **Operation** to *Extract Code*, **Output** to *Elementor Template (WordPress)*, pick a **Section** (Hero, Pricing, Footer...) and pass the URL. The `code` field is the complete template JSON: send it through **Convert to File** and import it in WordPress under *Templates > Saved Templates > Import*.

**Rebuild a section in Shopify:** same, with **Output** set to *Shopify Section (Liquid)*. The `code` field is the complete `.liquid` file. Upload it to your theme with Shopify's Admin API (`PUT /themes/{id}/assets.json`, key `sections/<name>.liquid`), then add the section from the theme editor.

Both arrive as one styled block with responsive and hover styles included, edited as code rather than as native widgets. The text and images belong to the site they came from: replace them with your own unless it is your site.

**Pick the right section:** every Extract Code result lists the page's other sections in `sections`, each with a ready `selector`. Pass one under *Additional Options > Selector* to extract it.

## Templates

Ready-made workflows in [`workflows/`](workflows). Every one was run end to end before it was published.

**Import one:** in n8n, open the **⋯** menu (top right of a workflow) > **Import from URL** and paste the template's raw link, for example:

```
https://raw.githubusercontent.com/SoraiaBarroso/n8n-nodes-miromiro/main/workflows/download-every-image.json
```

Or download the `.json` and use **Import from File**. Then open any MiroMiro node, create the credential with your [free API key](https://miromiro.app/api/onboarding) (300 credits a month, no card), change the website in **Settings**, and click **Execute workflow**.

### Start here

| Template | What you get | Credits |
|---|---|---|
| **[Download every image from a website](workflows/download-every-image.json)** | Every image on the page (photos, backgrounds, logos, `og:image`) in one `.zip` | 1 |
| **[Rebuild a whole page as code](workflows/rebuild-whole-page-as-code.json)** | Every section as Tailwind, React (JSX), HTML or Vue, one file per section in a `.zip`, plus a link to the whole page assembled with a Download HTML button | 10 per section |
| **[Rebuild a whole page in Elementor](workflows/rebuild-whole-page-in-elementor.json)** | Every section joined, in page order, into **one Elementor page template** to import into WordPress | 10 per section |
| **[Turn a website section into an Elementor template](workflows/section-to-elementor.json)** | One section (hero, pricing, footer...) as an importable Elementor `.json` | 10 |
| **[Rebuild a whole page as Shopify sections](workflows/rebuild-whole-page-as-shopify-sections.json)** | Every section as a Shopify Online Store 2.0 section (`.liquid`), zipped, ready for *Edit code > sections* | 10 per section |
| **[Get any website's brand kit as files](workflows/brand-kit-files.json)** | A `.zip` with the logo, `brand.css` (colors and fonts as CSS variables), `tokens.json` (W3C Design Tokens for Figma, Style Dictionary or Tokens Studio) and a readable `brand.md` | 20 |
| **[Compare the brands of many websites](workflows/compare-brands-csv.json)** | A list of websites in, one spreadsheet out: brand colors, fonts, logo and confidence per site, for competitor research or pitches | 10 per site |

A whole page is usually 6 to 12 sections, so 60 to 120 credits. The free plan's 300 credits a month covers two to five full pages.

Identical calls within 24 hours are free, so re-running a template while you try it costs nothing.

### More workflows

* **[The MiroMiro showcase](workflows/miromiro-showcase.json):** images, Elementor and whole page side by side, plus MiroMiro as an AI agent tool, in one workflow.
* **[Rebuild any website (form)](workflows/rebuild-any-website-form.json):** paste a URL into a form, pick Tailwind, React, HTML or Vue, and the browser opens the whole page rebuilt section by section.
* **[AI agent that rebuilds websites](workflows/ai-agent-rebuild-websites.json):** a chat agent with MiroMiro as its tools: "turn the hero of linear.app into a React component", "what are airbnb.com's brand colors?". Works with any chat model.
* **[Rebuild many sections as Elementor templates](workflows/rebuild-website-in-elementor.json):** a list of pages and sections in, one importable Elementor `.json` per section out.
* **[Rebuild a website section in your Shopify theme](workflows/rebuild-section-in-shopify.json):** extracts a section as Liquid and uploads it straight into your theme through the Shopify Admin API.
* **[Brand board from any website](workflows/brand-board.json):** open `/webhook/brand-board?url=stripe.com` in a browser and get a designed brand board: logo, brand colors with their roles, the full palette, fonts, and how sure MiroMiro is.
* **[Migrate a site to Next.js](workflows/migrate-site-to-nextjs.json):** rebuilds the pages of a WordPress/Elementor, Shopify or any other live site as a Next.js + Tailwind project, every section in page order, and zips it. `npm install`, `npm run dev`.

**What to expect:** sections come back styled like the original (colors, fonts, spacing, responsive and hover styles), rebuilt from what a real browser shows. Content that only appears after interaction (carousels, tabs) may come back as its first state. Respect the sites you extract from: check their terms before reusing content commercially.

## Resources

* [MiroMiro API documentation](https://miromiro.app/api/docs)
* [Elementor export](https://miromiro.app/api/html-to-elementor-api) · [Shopify export](https://miromiro.app/api/website-to-shopify-section-api)
* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)

## Version history

### 0.1.4

Credit costs in the node match the API: a section as code (Tailwind, HTML, React, Vue, Elementor or Shopify) is 10 credits, a brand kit 10.

### 0.1.3

Clearer action names in the node picker (for example "Get the brand kit of a website").

### 0.1.2

README lists the three ready-made workflows, including the new site-to-Next.js migration. No changes to the node.

### 0.1.1

Published through npm Trusted Publishing from GitHub Actions. No changes to the node.

### 0.1.0

First release: nine website extractions, the Elementor and Shopify outputs, and a free credential test.
