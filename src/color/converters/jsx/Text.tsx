import React from 'react'
import { JSXConverters } from '@payloadcms/richtext-lexical/react'
import { IS_BOLD, IS_CODE, IS_ITALIC, IS_STRIKETHROUGH, IS_SUBSCRIPT, IS_SUPERSCRIPT, IS_UNDERLINE, SerializedTextNode } from '@payloadcms/richtext-lexical/lexical'

export const TextJSXConverter: JSXConverters<SerializedTextNode> = {
	text: ({ node }) => {
		let text: React.ReactNode = node.text

		if (node.format & IS_BOLD) {
			text = <strong>{text}</strong>
		}
		if (node.format & IS_ITALIC) {
			text = <em>{text}</em>
		}
		if (node.format & IS_STRIKETHROUGH) {
			text = <span style={{ textDecoration: 'line-through' }}>{text}</span>
		}
		if (node.format & IS_UNDERLINE) {
			text = <span style={{ textDecoration: 'underline' }}>{text}</span>
		}
		if (node.format & IS_CODE) {
			text = <code>{text}</code>
		}
		if (node.format & IS_SUBSCRIPT) {
			text = <sub>{text}</sub>
		}
		if (node.format & IS_SUPERSCRIPT) {
			text = <sup>{text}</sup>
		}

		if (node.style) {
			const style: React.CSSProperties = {}

			let match = node.style.match(/(?:^|;)\s?background-color: ([^;]+)/);
			match && (style.backgroundColor = match[1]);

			match = node.style.match(/(?:^|;)\s?color: ([^;]+)/);
			match && (style.color = match[1]);

			text = <span style={ style }>{text}</span>
		}

		return text
	},
}
