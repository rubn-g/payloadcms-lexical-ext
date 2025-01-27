import { Spread } from '@payloadcms/richtext-lexical';
import { SerializedDecoratorBlockNode } from "@payloadcms/richtext-lexical/lexical/react/LexicalDecoratorBlockNode";

export type EmbedComponentProps = Readonly<{
	id: string;
	className?: string;
}>;

export type SerializedEmbedNode = Spread<{
	id: string;
}, SerializedDecoratorBlockNode>;
