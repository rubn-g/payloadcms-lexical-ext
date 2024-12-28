import {
	DecoratorBlockNode,
	type SerializedDecoratorBlockNode,
} from '@payloadcms/richtext-lexical/lexical/react/LexicalDecoratorBlockNode';

import type {
	ElementFormatType,
	NodeKey,
	Spread,
} from '@payloadcms/richtext-lexical/lexical';

export type SerializedEmbedNode = Spread<{
	id: string;
}, SerializedDecoratorBlockNode>;

export class EmbedNode extends DecoratorBlockNode {
	__id: string;

	static getType(): string {
		return 'embed';
	}

	static clone(node: EmbedNode): EmbedNode {
		return new this(node.__id, node.__format, node.__key);
	}

	static importJSON(serializedNode: SerializedEmbedNode): EmbedNode {
		const node = new this(serializedNode.id);

		node.setFormat(serializedNode.format);

		return node;
	}

	constructor(id: string, format?: ElementFormatType, key?: NodeKey) {
		super(format, key);
		this.__id = id;
	}

	getId(): string {
		return this.__id;
	}

	exportJSON(): SerializedEmbedNode {
		return {
			...super.exportJSON(),
			type: this.getType(),
			version: 1,
			id: this.__id,
		};
	}
}