import React from 'react'
import { JSXConverters } from '@payloadcms/richtext-lexical/react'
import { SerializedTextNode } from '@payloadcms/richtext-lexical/lexical'

const IS_BOLD = 1
const IS_ITALIC = 2
const IS_STRIKETHROUGH = 4
const IS_UNDERLINE = 8
const IS_CODE = 16
const IS_SUBSCRIPT = 32
const IS_SUPERSCRIPT = 64

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

			let match = node.style.match(/background-color: ([^;]+)/)
			match && (style.backgroundColor = match[1]);

			match = node.style.match(/^color: ([^;]+)/)
			match && (style.color = match[1]);

			text = <span style={ style }>{text}</span>
		}

		return text
	},
}
