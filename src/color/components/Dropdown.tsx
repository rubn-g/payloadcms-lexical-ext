import { LexicalEditor } from '@payloadcms/richtext-lexical/lexical';
import { JSX, useEffect, useState } from 'react';
import ColorPicker from './ColorPicker';
import { ColorDropdownGroupItem } from '../types';

type Props = {
	active?: boolean
	anchorElem: HTMLElement
	editor: LexicalEditor
	enabled?: boolean
	item: ColorDropdownGroupItem
}

export default function Toolbar({
	active = false,
	anchorElem,
	editor,
	enabled = true,
	item,
}: Props): JSX.Element {
	const [ activeColor, setActiveColor ] = useState<string>('')

	const onChange = (color: string) => {
		editor.dispatchCommand(item.command, { color });
		setActiveColor(color || '');
	}

	useEffect(() => {
		editor.read(() => {
			const current = item.current()

			current && setActiveColor(current)
		})
	}, [ editor ])

	return (
		<ColorPicker color={activeColor} onChange={onChange} />
	)
}