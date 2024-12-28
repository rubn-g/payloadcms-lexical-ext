import { createServerFeature } from '@payloadcms/richtext-lexical';

export const createEmbedServerFeature = ({ key, ClientFeature, node }) => createServerFeature({
	feature() {
		return {
			ClientFeature,
			generateSchemaMap: () => {
				const map = new Map()

				map.set(key, {
					fields: [{
						name: 'id',
						type: 'text',
						label: 'Embed ID',
						required: true
					}]
				})

				return map
			},
			nodes: [ node ]
		}
	},
	key,
})
