import { createServerFeature } from '@payloadcms/richtext-lexical';

export const TextColorFeature = createServerFeature({
	feature() {
		return {
			ClientFeature: process.cwd() + '/feature.client',
		}
	},
	key: 'textColor',
})
