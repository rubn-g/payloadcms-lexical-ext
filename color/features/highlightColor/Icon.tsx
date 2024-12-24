import React, { useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { COMMAND_PRIORITY_CRITICAL, SELECTION_CHANGE_COMMAND } from 'lexical'
import { $getSelectionStyleValueForProperty, $patchStyleText } from '@lexical/selection';
import { Highlighter } from "lucide-react";
import { UPDATE_HL_COLOR } from "./command";
import getSelection from "../getSelection";

export default function Icon(): React.JSX.Element {
	const [ color, setColor ] = useState<string>('')
	const [ editor ] = useLexicalComposerContext()

	const updateCurrentColor = () => {
		const selection = getSelection()

		selection && setColor($getSelectionStyleValueForProperty(selection, 'background-color', ''))

		return false;
	}

	useEffect(() => {
		return editor.registerCommand(
			UPDATE_HL_COLOR,
			(payload) => {
				setColor(payload.color);

				editor.update(() => {
					const selection = getSelection()

					selection && $patchStyleText(selection, { 'background-color': payload.color || '' });
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

	return <Highlighter className="icon w-5 h-5" style={{ color }} />
}
