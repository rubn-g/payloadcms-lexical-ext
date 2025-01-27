import { SerializedHeadingNode, SerializedParagraphNode, ToolbarGroup, ToolbarGroupItem, Spread } from '@payloadcms/richtext-lexical';

export type Color = {
	type: 'button' | 'palette';
	color: string;
	label?: string;
}

export type ColorDropdownGroupItem = ToolbarGroupItem & {
	command: Record<string, any>,
	current: () => string | null,
	colors?: Color[],
}

export type ColorDropdownGroup = ToolbarGroup & {
	items: ColorDropdownGroupItem[]
}

export type ColorFeatureProps = {
	colors?: Color[];
}

export type SerializedCustomParagraphNode = Spread<{
	type: 'custom-paragraph';
	style: string;
	textStyle: string;
	tag: 'p';
}, SerializedParagraphNode>;

export type SerializedCustomHeadingNode = Spread<{
	type: 'custom-heading';
	style: string;
	tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}, SerializedHeadingNode>;
