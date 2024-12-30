import type { SerializedTextNode } from 'lexical'
import escapeHTML from 'escape-html'
import { HTMLConverter, NodeFormat } from '@payloadcms/richtext-lexical'

export const TextHTMLConverter: HTMLConverter<SerializedTextNode> = {
	converter({ node }) {
		let text = escapeHTML(node.text)

		if (!text) {
			return ''
		}

		if (node.format & NodeFormat.IS_BOLD) {
			text = `<strong>${text}</strong>`
		}
		if (node.format & NodeFormat.IS_ITALIC) {
			text = `<em>${text}</em>`
		}
		if (node.format & NodeFormat.IS_STRIKETHROUGH) {
			text = `<span style="text-decoration: line-through">${text}</span>`
		}
		if (node.format & NodeFormat.IS_UNDERLINE) {
			text = `<span style="text-decoration: underline">${text}</span>`
		}
		if (node.format & NodeFormat.IS_CODE) {
			text = `<code>${text}</code>`
		}
		if (node.format & NodeFormat.IS_SUBSCRIPT) {
			text = `<sub>${text}</sub>`
		}
		if (node.format & NodeFormat.IS_SUPERSCRIPT) {
			text = `<sup>${text}</sup>`
		}
		if (node.style) {
			text = `<span style="${node.style}">${text}</span>`
		}

		return text
	},
	nodeTypes: [ 'text' ],
}
