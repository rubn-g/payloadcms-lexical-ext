import { createServerFeature } from '@payloadcms/richtext-lexical';
import { CustomHeadingNode } from '../../nodes/CustomHeadingNode';
import { CustomParagraphNode } from '../../nodes/CustomParagraphNode';
import createServerNode from './createServerNode';

export const BgColorFeature = createServerFeature({
	feature() {
		return {
			ClientFeature: process.cwd() + '/feature.client',
			nodes: [
				createServerNode(CustomParagraphNode),
				createServerNode(CustomHeadingNode)
			]
		}
	},
	key: 'bgColor',
})
