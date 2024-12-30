import React from 'react'
import { NodeFormat } from '@payloadcms/richtext-lexical'
import { JSXConverters } from '@payloadcms/richtext-lexical/react'
import { SerializedTextNode } from '@payloadcms/richtext-lexical/lexical'

export const TextJSXConverter: JSXConverters<SerializedTextNode> = {
	text: ({ node }) => {
		let text: React.ReactNode = node.text

		if (node.format & NodeFormat.IS_BOLD) {
			text = <strong>{text}</strong>
		}
		if (node.format & NodeFormat.IS_ITALIC) {
			text = <em>{text}</em>
		}
		if (node.format & NodeFormat.IS_STRIKETHROUGH) {
			text = <span style={{ textDecoration: 'line-through' }}>{text}</span>
		}
		if (node.format & NodeFormat.IS_UNDERLINE) {
			text = <span style={{ textDecoration: 'underline' }}>{text}</span>
		}
		if (node.format & NodeFormat.IS_CODE) {
			text = <code>{text}</code>
		}
		if (node.format & NodeFormat.IS_SUBSCRIPT) {
			text = <sub>{text}</sub>
		}
		if (node.format & NodeFormat.IS_SUPERSCRIPT) {
			text = <sup>{text}</sup>
		}

		if (node.style) {
			const style: React.CSSProperties = {}

			let match = node.style.match(/background-color: (.+);?/)
			match && (style.backgroundColor = match[1]);

			match = node.style.match(/color: (.+);?/)
			match && (style.color = match[1]);

			text = <span style={ style }>{text}</span>
		}

		return text
	},
}
