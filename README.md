# n8n-nodes-miromiro

This is an n8n community node for [MiroMiro](https://miromiro.app/api). It turns any live website into something you can build with: a section as an **Elementor template** for WordPress, a **Shopify section** (Liquid), or **Tailwind, HTML/CSS, React or Vue** code, plus the site's **brand colors, fonts, design tokens** and **assets** (images, SVGs, fonts, videos, audio, Lottie).

Use it to rebuild a client's old site in Elementor or Shopify section by section, match a brand, or collect a site's assets, all inside an n8n workflow.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation) · [Operations](#operations) · [Credentials](#credentials) · [Compatibility](#compatibility) · [Usage](#usage) · [Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation and install `n8n-nodes-miromiro`.

## Operations

**Website**

| Operation | What it returns | Credits |
|---|---|---|
| Extract Code | One section of the page as Tailwind, HTML + CSS, React, Vue, an Elementor template (`.json`) or a Shopify section (`.liquid`) | 25 |
| Extract Brand | Brand colors with roles, fonts, logo, and whether each was declared by the site or inferred | 15 |
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

Ready-made workflows in [`workflows/`](workflows) (import them in n8n with *Import from File*):

* **[Rebuild website sections as Elementor templates](workflows/rebuild-website-in-elementor.json):** a list of pages and sections in, importable Elementor `.json` files out.
* **[Rebuild a website section in your Shopify theme](workflows/rebuild-section-in-shopify.json):** extracts a section as Liquid and uploads it straight into your theme through the Shopify Admin API.
* **[Migrate a site to Next.js](workflows/migrate-site-to-nextjs.json):** rebuilds the pages of a WordPress/Elementor, Shopify or any other live site as a Next.js + Tailwind project, every section in page order, and zips it. `npm install`, `npm run dev`.

## Resources

* [MiroMiro API documentation](https://miromiro.app/api/docs)
* [Elementor export](https://miromiro.app/api/html-to-elementor-api) · [Shopify export](https://miromiro.app/api/website-to-shopify-section-api)
* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)

## Version history

### 0.1.2

README lists the three ready-made workflows, including the new site-to-Next.js migration. No changes to the node.

### 0.1.1

Published through npm Trusted Publishing from GitHub Actions. No changes to the node.

### 0.1.0

First release: nine website extractions, the Elementor and Shopify outputs, and a free credential test.
