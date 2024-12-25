import { createServerFeature } from '@payloadcms/richtext-lexical';

export const HighlightColorFeature = createServerFeature({
	feature() {
		return {
			ClientFeature: 'payloadcms-lexical-ext/client#HighlightColorFeatureClient',
		}
	},
	key: 'highlightColor',
})
