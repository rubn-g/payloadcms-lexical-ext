import { createNode } from '@payloadcms/richtext-lexical';
import { VimeoNode } from '../../nodes/VimeoNode';
import { createEmbedServerFeature } from '../createServerEmbed';

export const VimeoFeature = createEmbedServerFeature({
	ClientFeature: 'payloadcms-lexical-ext/client#VimeoFeatureClient',
	node: createNode({
		node: VimeoNode,
		converters: {
			html: {
				nodeTypes: [ VimeoNode.getType() ],
				async converter({ node }) {
					return `
						<div>
							<iframe
								src="https://player.vimeo.com/video/${node.id}"
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
	}),
	key: 'vimeo',
})
