import fetch from 'node-fetch'
import Client from 'shopify-buy'
import { domain } from '/lib/constants'

const storefrontAccessToken = '662510a2eec4bf6b0ffb413754a86205'
export const storefrontAPI = Client.buildClient(
	{
		domain,
		storefrontAccessToken,
	},
	fetch
)
