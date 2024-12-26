import { createServerFeature } from '@payloadcms/richtext-lexical';
import { ColorFeatureProps } from 'src/color/types';

export const TextColorFeature = createServerFeature<ColorFeatureProps, ColorFeatureProps, ColorFeatureProps>({
	feature({ props }) {
		return {
			ClientFeature: 'payloadcms-lexical-ext/client#TextColorFeatureClient',
			clientFeatureProps: {
				colors: props.colors
			},
		}
	},
	key: 'textColor',
})
