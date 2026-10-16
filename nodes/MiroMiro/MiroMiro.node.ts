import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';

// Every extraction reads one public page. These operations take the page URL.
const extractionOps = ['code', 'brand', 'tokens', 'images', 'svgs', 'fonts', 'videos', 'audio', 'lottie'];
const assetOps = ['images', 'svgs', 'fonts', 'videos', 'audio', 'lottie'];

// Options shared by every extraction. Only sent when the user adds them.
const renderOption = {
	displayName: 'Render in a Browser',
	name: 'render',
	type: 'boolean' as const,
	default: false,
	description:
		'Whether to load the page in a real browser so its JavaScript runs first (+5 credits). Rarely needed: pages that only build themselves with JavaScript are re-read in a browser automatically, at no extra cost.',
	routing: { send: { type: 'query' as const, property: 'render' } },
};
const freshOption = {
	displayName: 'Skip Cache',
	name: 'fresh',
	type: 'boolean' as const,
	default: false,
	description:
		'Whether to re-read the live page instead of a result from the last 24 hours. Identical repeat calls within 24 hours are otherwise free.',
	routing: { send: { type: 'query' as const, property: 'fresh' } },
};

export class MiroMiro implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'MiroMiro',
		name: 'miroMiro',
		icon: { light: 'file:../../icons/miromiro.svg', dark: 'file:../../icons/miromiro.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description:
			'Turn any live website into code (Tailwind, HTML, React, Vue, Elementor, Shopify), brand colors, design tokens and assets',
		defaults: {
			name: 'MiroMiro',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'miroMiroApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://miromiro.app/api',
			headers: {
				Accept: 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Website', value: 'website' },
					{ name: 'Account', value: 'account' },
				],
				default: 'website',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['website'] } },
				options: [
					{
						name: 'Extract Audio',
						value: 'audio',
						action: 'List the audio files on a website',
						description: 'Audio files and podcast enclosures (1 credit)',
						routing: { request: { method: 'GET', url: '/v1/audio' } },
					},
					{
						name: 'Extract Brand',
						value: 'brand',
						action: 'Get the brand kit of a website',
						description: 'Brand colors with roles, fonts and logo (15 credits)',
						routing: { request: { method: 'GET', url: '/v1/brand' } },
					},
					{
						name: 'Extract Code',
						value: 'code',
						action: 'Turn a website section into code',
						description:
							'Turn a section of a live page into Tailwind, HTML, React or Vue, an Elementor template or a Shopify section (25 credits)',
						routing: { request: { method: 'GET', url: '/v1/code' } },
					},
					{
						name: 'Extract Design Tokens',
						value: 'tokens',
						action: 'Get the design tokens of a website',
						description: 'Every color, font, size, radius and shadow the page uses (10 credits)',
						routing: { request: { method: 'GET', url: '/v1/extract' } },
					},
					{
						name: 'Extract Fonts',
						value: 'fonts',
						action: 'Get the fonts of a website',
						description: 'Font families and font files (5 credits)',
						routing: { request: { method: 'GET', url: '/v1/fonts' } },
					},
					{
						name: 'Extract Images',
						value: 'images',
						action: 'List the images on a website',
						description: 'Every image URL on the page (1 credit)',
						routing: { request: { method: 'GET', url: '/v1/images' } },
					},
					{
						name: 'Extract Lottie Animations',
						value: 'lottie',
						action: 'Get the lottie animations on a website',
						description: 'Lottie animation files the page uses (3 credits)',
						routing: { request: { method: 'GET', url: '/v1/lottie' } },
					},
					{
						name: 'Extract SVGs',
						value: 'svgs',
						action: 'Get the SVG icons and logos of a website',
						description: 'Inline SVG markup and SVG files (1 credit)',
						routing: { request: { method: 'GET', url: '/v1/svg' } },
					},
					{
						name: 'Extract Videos',
						value: 'videos',
						action: 'List the videos on a website',
						description: 'Video files and player embeds (1 credit)',
						routing: { request: { method: 'GET', url: '/v1/videos' } },
					},
				],
				default: 'code',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['account'] } },
				options: [
					{
						name: 'Get',
						value: 'get',
						action: 'Get plan and credit balance',
						description: 'Plan, status and remaining credits for this API key (free)',
						routing: { request: { method: 'GET', url: '/v1/account' } },
					},
				],
				default: 'get',
			},
			{
				displayName: 'URL',
				name: 'url',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'https://stripe.com',
				description: 'The public web page to read',
				displayOptions: { show: { resource: ['website'], operation: extractionOps } },
				routing: { send: { type: 'query', property: 'url' } },
			},

			// ---- Extract Code ----
			{
				displayName: 'Output',
				name: 'framework',
				type: 'options',
				default: 'tailwind',
				displayOptions: { show: { resource: ['website'], operation: ['code'] } },
				options: [
					{
						name: 'Elementor Template (WordPress)',
						value: 'elementor',
						description: 'A complete template JSON to import under Templates > Saved Templates',
					},
					{ name: 'HTML + CSS', value: 'html' },
					{ name: 'React (JSX)', value: 'jsx' },
					{
						name: 'Shopify Section (Liquid)',
						value: 'shopify',
						description: 'A complete .liquid file for the theme sections folder',
					},
					{ name: 'Tailwind', value: 'tailwind' },
					{ name: 'Vue', value: 'vue' },
				],
				description: 'What to turn the section into',
				routing: { send: { type: 'query', property: 'framework' } },
			},
			{
				displayName: 'Section',
				name: 'section',
				type: 'options',
				default: 'hero',
				displayOptions: { show: { resource: ['website'], operation: ['code'] } },
				options: [
					{ name: 'Call to Action', value: 'cta' },
					{ name: 'FAQ', value: 'faq' },
					{ name: 'Features', value: 'features' },
					{ name: 'Footer', value: 'footer' },
					{ name: 'Header / Navigation', value: 'header' },
					{ name: 'Hero', value: 'hero' },
					{ name: 'Pricing', value: 'pricing' },
					{ name: 'Testimonials', value: 'testimonials' },
				],
				description:
					'Which part of the page to extract. Found on the page itself, so it works without knowing the markup. Every result also lists the page’s other sections with a ready selector.',
				routing: { send: { type: 'query', property: 'section' } },
			},
			{
				displayName: 'Additional Options',
				name: 'codeOptions',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				displayOptions: { show: { resource: ['website'], operation: ['code'] } },
				options: [
					{
						displayName: 'Selector',
						name: 'selector',
						type: 'string',
						default: '',
						placeholder: 'section.pricing-grid',
						description:
							'A CSS selector from a previous result’s sections list. Overrides Section. Do not guess one: a selector that matches nothing falls back to the hero.',
						routing: { send: { type: 'query', property: 'selector' } },
					},
					{
						displayName: 'Theme',
						name: 'theme',
						type: 'options',
						default: 'dark',
						options: [
							{ name: 'Dark', value: 'dark' },
							{ name: 'Light', value: 'light' },
						],
						description: 'Which color scheme to extract when the site has both',
						routing: { send: { type: 'query', property: 'theme' } },
					},
					{
						displayName: 'Component Name',
						name: 'name',
						type: 'string',
						default: '',
						placeholder: 'PricingSection',
						description: 'Component name for React output',
						routing: { send: { type: 'query', property: 'name' } },
					},
					renderOption,
					freshOption,
				],
			},

			// ---- Extract Design Tokens ----
			{
				displayName: 'Format',
				name: 'format',
				type: 'options',
				default: 'json',
				displayOptions: { show: { resource: ['website'], operation: ['tokens'] } },
				options: [
					{ name: 'JSON with Usage Counts', value: 'json' },
					{
						name: 'W3C Design Tokens (DTCG)',
						value: 'dtcg',
						description: 'For Style Dictionary, Terrazzo or Figma variables',
					},
				],
				routing: { send: { type: 'query', property: 'format' } },
			},

			// ---- Options for the other extractions ----
			{
				displayName: 'Additional Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				displayOptions: { show: { resource: ['website'], operation: ['brand', 'tokens', ...assetOps] } },
				options: [renderOption, freshOption],
			},
		],
	};
}
