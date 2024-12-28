import React from 'react';
import { EmbedComponentProps } from '../types';

export default function({
	id,
}: EmbedComponentProps): React.JSX.Element {
	return (
		<div>
			<iframe
				width="100%"
				src={`https://player.vimeo.com/video/${id}`}
				allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
				title = "Play video"
				style = {{ aspectRatio: '16/9' }}
			/>
		</div>
	);
}
