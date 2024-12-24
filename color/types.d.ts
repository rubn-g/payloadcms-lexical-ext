import { ToolbarGroup, ToolbarGroupItem } from '@payloadcms/richtext-lexical';

export type ColorDropdownGroupItem = ToolbarGroupItem & {
	command: Record<string, any>,
	current: () => string | null
}

export type ColorDropdownGroup = ToolbarGroup & {
	items: ColorDropdownGroupItem[]
}
