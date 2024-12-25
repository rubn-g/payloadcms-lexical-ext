import React, { useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext';
import { COMMAND_PRIORITY_CRITICAL, SELECTION_CHANGE_COMMAND } from '@payloadcms/richtext-lexical/lexical'
import { $getSelectionStyleValueForProperty, $patchStyleText } from '@payloadcms/richtext-lexical/lexical/selection';
import { Baseline } from 'lucide-react';
import { UPDATE_TEXT_COLOR } from './command';
import getSelection from '../getSelection';

export default function Icon(): React.JSX.Element {
	const [ color, setColor ] = useState<string>('')
	const [ editor ] = useLexicalComposerContext()

	const updateCurrentColor = () => {
		const selection = getSelection()

		selection && setColor($getSelectionStyleValueForProperty(selection, 'color', ''))

		return false;
	}

	useEffect(() => {
		return editor.registerCommand(
			UPDATE_TEXT_COLOR,
			(payload) => {
				setColor(payload.color);

				editor.update(() => {
					const selection = getSelection()

					selection && $patchStyleText(selection, { color: payload.color || '' });
				})

				return false;
			},
			COMMAND_PRIORITY_CRITICAL
		);
	}, [ editor ])

	useEffect(() => {
		setTimeout(() => {
			return editor.read(updateCurrentColor)
		})

		return editor.registerCommand(
			SELECTION_CHANGE_COMMAND,
			updateCurrentColor,
			COMMAND_PRIORITY_CRITICAL
		);
	}, [ editor ])

	return <Baseline className="icon w-5 h-5" style={{ color }} />
}
