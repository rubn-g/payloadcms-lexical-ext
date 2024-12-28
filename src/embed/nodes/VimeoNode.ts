import type {
	DOMConversionMap,
	DOMExportOutput,
	EditorConfig,
	LexicalEditor,
	LexicalNode,
} from '@payloadcms/richtext-lexical/lexical';
import { JSX } from 'react';
import VimeoComponent from '../components/VimeoComponent';
import { EmbedNode, SerializedEmbedNode } from './EmbedNode';

export class VimeoNode extends EmbedNode {
	static getType(): string {
		return 'vimeo';
	}

	static clone(node: EmbedNode): EmbedNode {
		return super.clone(node);
	}

	static importJSON(serializedNode: SerializedEmbedNode): VimeoNode {
		return super.importJSON(serializedNode) as VimeoNode;
	}

	exportDOM(): DOMExportOutput {
		const element = document.createElement('iframe');

		element.style.aspectRatio = '16/9';
		element.setAttribute('data-lexical-vimeo', this.__id);
		element.setAttribute('width', '100%');
		element.setAttribute('src', `https://player.vimeo.com/video/${this.__id}`);
		element.setAttribute('frameborder', '0');
		element.setAttribute(
			'allow',
			'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
		);
		element.setAttribute('allowfullscreen', 'true');

		return { element };
	}

	static importDOM(): DOMConversionMap | null {
		return {
			iframe: (domNode: HTMLElement) => {
				const src = domNode.getAttribute('src') || domNode.getAttribute('data-src')

				const match = src?.match(/vimeo\.com\/video\/([^?]+)/)

				if (match && match[1]) {
					return {
						conversion: () => ({ node: $createVimeoNode(match[2]) }),
						priority: 1,
					};
				}

				return null
			},
		};
	}

	getTextContent(): string {
		return `https://www.vimeo.com/${this.__id}`;
	}

	decorate(_editor: LexicalEditor, config: EditorConfig): JSX.Element {
		let className

		if (config.theme.embedBlock != null) {
			className = {
				base: config.theme.embedBlock.base ?? '',
				focus: config.theme.embedBlock.focus ?? '',
			};
		}

		return VimeoComponent({ id: this.__id, className });
	}

	exportJSON(): SerializedEmbedNode {
		return super.exportJSON();
	}
}

export function $createVimeoNode(videoID: string): VimeoNode {
	return new VimeoNode(videoID);
}

export function $isVimeoNode(
	node: VimeoNode | LexicalNode | null | undefined
): node is VimeoNode {
	return node instanceof VimeoNode;
}
