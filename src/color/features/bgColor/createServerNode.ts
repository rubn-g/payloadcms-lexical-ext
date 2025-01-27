import { convertLexicalNodesToHTML, createNode, HTMLConverter } from '@payloadcms/richtext-lexical';
import { SerializedCustomHeadingNode, SerializedCustomParagraphNode } from 'src/color/types';

export default (node) => {
	const html: HTMLConverter<SerializedCustomHeadingNode | SerializedCustomParagraphNode> = {
		nodeTypes: [ node.getType() ],
		async converter({
			converters,
			currentDepth,
			depth,
			draft,
			node,
			overrideAccess,
			parent,
			req,
			showHiddenFields,
		}) {
			const childrenText = await convertLexicalNodesToHTML({
				converters,
				currentDepth,
				depth,
				draft,
				lexicalNodes: node.children,
				overrideAccess,
				parent: {
					...node,
					parent,
				},
				req,
				showHiddenFields,
			})

			const style = [
				node.format ? `text-align: ${node.format};` : '',
				node.indent > 0 ? `padding-inline-start: ${node.indent * 40}px;` : '',
				node.style.match(/background-color: (.+);?/) ? node.style : null,
				'padding-top: .5rem; padding-bottom: .5rem;',
			]
				.filter(Boolean)
				.join(' ')

			return `<${node.tag || 'p'}${style ? ` style="${style}"` : ''}>${childrenText}</${node.tag || 'p'}>`
		},
	}

	return createNode({
		node,
		converters: { html },
	})
}
