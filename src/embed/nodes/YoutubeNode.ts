import type {
	DOMConversionMap,
	DOMExportOutput,
	EditorConfig,
	LexicalEditor,
	LexicalNode,
} from '@payloadcms/richtext-lexical/lexical';
import { JSX } from 'react';
import YoutubeComponent from '../components/YoutubeComponent';
import { EmbedNode } from './EmbedNode';
import { SerializedEmbedNode } from '../types';

export class YouTubeNode extends EmbedNode {
	static getType(): string {
		return 'youtube';
	}

	static clone(node: EmbedNode): EmbedNode {
		return super.clone(node);
	}

	static importJSON(serializedNode: SerializedEmbedNode): YouTubeNode {
		return super.importJSON(serializedNode) as YouTubeNode;
	}

	exportDOM(): DOMExportOutput {
		const element = document.createElement('iframe');

		element.style.aspectRatio = '16/9';
		element.setAttribute('data-lexical-youtube', this.__id);
		element.setAttribute('width', '100%');
		element.setAttribute('src', `https://www.youtube-nocookie.com/embed/${this.__id}`);
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

				const match = src?.match(/youtube(\-nocookie)?\.com\/embed\/([^?]+)/)

				if (match && match[2]) {
					return {
						conversion: () => ({ node: $createYouTubeNode(match[2]) }),
						priority: 1,
					};
				}

				return null
			},
		};
	}

	getTextContent(): string {
		return `https://www.youtube.com/watch?v=${this.__id}`;
	}

	decorate(_editor: LexicalEditor, config: EditorConfig): JSX.Element {
		let className

		if (config.theme.embedBlock != null) {
			className = {
				base: config.theme.embedBlock.base ?? '',
				focus: config.theme.embedBlock.focus ?? '',
			};
		}

		return YoutubeComponent({ id: this.__id, className });
	}

	exportJSON(): SerializedEmbedNode {
		return super.exportJSON();
	}
}

export function $createYouTubeNode(videoID: string): YouTubeNode {
	return new YouTubeNode(videoID);
}

export function $isYouTubeNode(
	node: YouTubeNode | LexicalNode | null | undefined
): node is YouTubeNode {
	return node instanceof YouTubeNode;
}
