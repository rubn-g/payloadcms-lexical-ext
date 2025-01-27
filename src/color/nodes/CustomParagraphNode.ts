import { DOMConversionMap, DOMConversionOutput, ElementFormatType, ParagraphNode, setNodeIndentFromDOM } from '@payloadcms/richtext-lexical/lexical';
import { SerializedCustomParagraphNode } from '../types';

export class CustomParagraphNode extends ParagraphNode {
	static override getType() {
		return 'custom-paragraph';
	}

	static override clone(node) {
		return new CustomParagraphNode(node.__key);
	}

	static override importJSON(serializedNode: SerializedCustomParagraphNode): CustomParagraphNode {
		const node = new CustomParagraphNode();

		node.setFormat(serializedNode.format);
		node.setIndent(serializedNode.indent);
		node.setDirection(serializedNode.direction);
		node.setTextFormat(serializedNode.textFormat);
		node.setTextStyle(serializedNode.textStyle);
		node.setStyle(serializedNode.style);

		return node;
	}

	static override importDOM(): DOMConversionMap | null {
		return {
			p: (_: Node) => ({
				conversion(element: HTMLElement): DOMConversionOutput {
					const node = new CustomParagraphNode();

					if (element.style) {
						node.setFormat(element.style.textAlign as ElementFormatType);

						if (element.style.backgroundColor) {
							node.setStyle('background-color: ' + element.style.backgroundColor);
						}

						setNodeIndentFromDOM(element, node);
					}

					return { node };
				},
				priority: 0,
			}),
		};
	}

	override createDOM(config) {
		const dom = super.createDOM(config);

		dom.setAttribute('style', this.__style);

		return dom;
	}

	override updateDOM(_: ParagraphNode, dom: HTMLElement): boolean {
		dom.setAttribute('style', this.__style);

		return true;
	}

	override exportJSON(): SerializedCustomParagraphNode {
		return {
			...super.exportJSON(),
			type: 'custom-paragraph',
			style: this.__style,
			tag: 'p',
		};
	}
}
