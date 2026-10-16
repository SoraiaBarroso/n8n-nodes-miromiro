import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class MiroMiroApi implements ICredentialType {
	name = 'miroMiroApi';

	displayName = 'MiroMiro API';

	icon: Icon = { light: 'file:../icons/miromiro.svg', dark: 'file:../icons/miromiro.dark.svg' };

	documentationUrl = 'https://miromiro.app/api/docs/authentication';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description:
				'Your MiroMiro API key (starts with mm_live_). Get one free at https://miromiro.app/api/onboarding - 300 credits every month, no card.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	// GET /v1/account costs 0 credits, so testing the key never spends any.
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://miromiro.app/api',
			url: '/v1/account',
			method: 'GET',
		},
	};
}
