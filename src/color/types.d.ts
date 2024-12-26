import { ToolbarGroup, ToolbarGroupItem } from '@payloadcms/richtext-lexical';

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
	colors: Color[];
}
