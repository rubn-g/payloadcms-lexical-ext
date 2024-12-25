import { createServerFeature } from '@payloadcms/richtext-lexical';
import { CustomHeadingNode } from '../../nodes/CustomHeadingNode';
import { CustomParagraphNode } from '../../nodes/CustomParagraphNode';
import createServerNode from './createServerNode';

export const BgColorFeature = createServerFeature({
	feature() {
		return {
			ClientFeature: 'payloadcms-lexical-ext/client#BgColorFeatureClient',
			nodes: [
				createServerNode(CustomParagraphNode),
				createServerNode(CustomHeadingNode)
			]
		}
	},
	key: 'bgColor',
})
