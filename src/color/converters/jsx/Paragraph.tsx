import React from 'react'
import { JSXConverters } from '@payloadcms/richtext-lexical/react'
import { SerializedCustomParagraphNode } from 'src/color/types'

export const ParagraphJSXConverter: JSXConverters<SerializedCustomParagraphNode> = {
	'custom-paragraph': ({ node, nodesToJSX }) => {
		const children = nodesToJSX({
			nodes: node.children,
		})

		if (!children?.length) {
			return (
				<p>
					<br />
				</p>
			)
		}

		const style: React.CSSProperties = { paddingTop: '.5rem', paddingBottom: '.5rem' }
		const match = node.style.match(/background-color: ([^;]+)/)

		match && (style.backgroundColor = match[1])

		return <p style={style}>{children }</p>
	},
}
