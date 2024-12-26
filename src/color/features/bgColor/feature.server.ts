import { createServerFeature } from '@payloadcms/richtext-lexical';
import { CustomHeadingNode } from '../../nodes/CustomHeadingNode';
import { CustomParagraphNode } from '../../nodes/CustomParagraphNode';
import createServerNode from './createServerNode';
import { ColorFeatureProps } from 'src/color/types';

export const BgColorFeature = createServerFeature<ColorFeatureProps, ColorFeatureProps, ColorFeatureProps>({
	feature({ props }) {
		return {
			ClientFeature: 'payloadcms-lexical-ext/client#BgColorFeatureClient',
			clientFeatureProps: {
				colors: props.colors
			},
			nodes: [
				createServerNode(CustomParagraphNode),
				createServerNode(CustomHeadingNode)
			]
		}
	},
	key: 'bgColor',
})
