import { createServerFeature } from '@payloadcms/richtext-lexical';

export const HighlightColorFeature = createServerFeature({
	feature() {
		return {
			ClientFeature: process.cwd() + '/feature.client',
		}
	},
	key: 'highlightColor',
})
