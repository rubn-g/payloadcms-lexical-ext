import React from 'react'
import { JSXConverters } from '@payloadcms/richtext-lexical/react'
import { SerializedEmbedNode } from 'src/embed/types'

export const VimeoJSXConverter: JSXConverters<SerializedEmbedNode> = {
	'vimeo': ({ node }) => {
		return (
			<iframe
				src={`https://player.vimeo.com/video/${node.id}`}
				width="100%"
				style={{ aspectRatio: '16/9' }}
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			></iframe>
		)
	},
}
