import { createNode, createServerFeature } from '@payloadcms/richtext-lexical';
import { YouTubeNode } from '../../nodes/YoutubeNode';

export const YoutubeFeature = createServerFeature({
	feature() {
		return {
			ClientFeature: 'payloadcms-lexical-ext/client#YoutubeFeatureClient',
			generateSchemaMap: () => {
				const map = new Map()

				map.set('youtube', {
					fields: [{
						name: 'url',
						type: 'text',
						label: 'URL',
						required: true
					}]
				})

				return map
			},
			nodes: [
				createNode({
					node: YouTubeNode,
					converters: {
						html: {
							nodeTypes: [ YouTubeNode.getType() ],
							async converter({ node }) {
								return `
									<div>
										<iframe
											src="https://www.youtube-nocookie.com/embed/${node.videoID}?modestbranding=1&rel=0&hl=es"
											width="100%"
											style="aspect-ratio: 16/9"
											allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
											allowfullscreen
										></iframe>
									</div>
								`
							},
						}
					},
				})
			]
		}
	},
	key: 'youtube',
})
