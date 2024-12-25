import {
	DecoratorBlockNode,
	type SerializedDecoratorBlockNode,
} from '@payloadcms/richtext-lexical/lexical/react/LexicalDecoratorBlockNode';

import type {
	DOMConversionMap,
	DOMExportOutput,
	EditorConfig,
	ElementFormatType,
	LexicalEditor,
	LexicalNode,
	NodeKey,
	Spread,
} from '@payloadcms/richtext-lexical/lexical';
import { JSX } from 'react';
import YoutubeComponent from '../components/YoutubeComponent';

export type SerializedYouTubeNode = Spread<{
	videoID: string;
}, SerializedDecoratorBlockNode>;

export class YouTubeNode extends DecoratorBlockNode {
	__id: string;

	static getType(): string {
		return 'youtube';
	}

	static clone(node: YouTubeNode): YouTubeNode {
		return new YouTubeNode(node.__id, node.__format, node.__key);
	}

	static importJSON(serializedNode: SerializedYouTubeNode): YouTubeNode {
		const node = $createYouTubeNode(serializedNode.videoID);

		node.setFormat(serializedNode.format);

		return node;
	}

	exportJSON(): SerializedYouTubeNode {
		return {
			...super.exportJSON(),
			type: 'youtube',
			version: 1,
			videoID: this.__id,
		};
	}

	constructor(id: string, format?: ElementFormatType, key?: NodeKey) {
		super(format, key);
		this.__id = id;
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
		element.setAttribute('title', 'YouTube video');

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

	getId(): string {
		return this.__id;
	}

	getTextContent(
		_includeInert?: boolean | undefined,
		_includeDirectionless?: false | undefined
	): string {
		return `https://www.youtube.com/watch?v=${this.__id}`;
	}

	decorate(_editor: LexicalEditor, config: EditorConfig): JSX.Element {
		let className;

		if (config.theme.embedBlock != null) {
			className = {
				base: config.theme.embedBlock.base ?? '',
				focus: config.theme.embedBlock.focus ?? '',
			};
		}

		return YoutubeComponent({ videoID: this.__id });
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
