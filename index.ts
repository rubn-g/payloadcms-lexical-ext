export { BgColorFeature } from './src/color/features/bgColor/feature.server';
export { TextColorFeature } from './src/color/features/textColor/feature.server';
export { HighlightColorFeature } from './src/color/features/highlightColor/feature.server';
export { YoutubeFeature } from './src/embed/features/youtube/feature.server';
export { VimeoFeature } from './src/embed/features/vimeo/feature.server';

export { default as HTMLConverters } from './src/color/converters/html';

import ColorJSXConverters from './src/color/converters/jsx';
import EmbedJSXConverters from './src/embed/converters/jsx';

export const JSXConverters = {
	...ColorJSXConverters,
	...EmbedJSXConverters
}

export type { ColorFeatureProps, Color } from './src/color/types';
