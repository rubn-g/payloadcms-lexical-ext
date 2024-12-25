import { createServerFeature } from '@payloadcms/richtext-lexical';

export const TextColorFeature = createServerFeature({
	feature() {
		return {
			ClientFeature: 'payloadcms-lexical-ext/client#TextColorFeatureClient',
		}
	},
	key: 'textColor',
})
