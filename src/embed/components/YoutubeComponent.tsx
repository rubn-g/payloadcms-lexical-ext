import React from 'react';

type YouTubeComponentProps = Readonly<{
	videoID: string;
}>;

export default function({
	videoID,
}: YouTubeComponentProps): React.JSX.Element {
	return (
		<div>
			<iframe
				width="100%"
				src={`https://www.youtube-nocookie.com/embed/${videoID}?modestbranding=1&rel=0&hl=es`}
				allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
				title = "Play video"
				style = {{ aspectRatio: '16/9' }}
			/>
		</div>
	);
}
