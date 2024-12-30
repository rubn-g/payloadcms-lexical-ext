import React, { useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext';
import { $getSelection, $isElementNode, COMMAND_PRIORITY_CRITICAL, ParagraphNode, SELECTION_CHANGE_COMMAND } from '@payloadcms/richtext-lexical/lexical'
import { HeadingNode } from '@payloadcms/richtext-lexical/lexical/rich-text';
import { PaintBucket } from 'lucide-react';
import { UPDATE_BG_COLOR } from './command';
import { CustomHeadingNode } from '../../nodes/CustomHeadingNode';
import { CustomParagraphNode } from '../../nodes/CustomParagraphNode';

export default function Icon(): React.JSX.Element {
	const [ color, setColor ] = useState<string>('')
	const [ editor ] = useLexicalComposerContext()

	const updateCurrentColor = () => {
		const selection = $getSelection()
		const element = selection?.getNodes()[0].getTopLevelElement()

		if ($isElementNode(element)) {
			setColor(element.getStyle().match(/background-color: (.*)/)?.[1] || '')
		}

		return false;
	}

	useEffect(() => {
		return editor.registerCommand(
			UPDATE_BG_COLOR,
			(payload) => {
				setColor(payload.color);

				editor.update(() => {
					const selection = $getSelection()

					const element = selection?.getNodes()[0].getTopLevelElement()

					if ($isElementNode(element)) {
						element.setStyle('background-color: ' + (payload.color || '') + ';')
						console.log(element)
					}
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

		editor.registerNodeTransform(HeadingNode, (node) => {
			node.replace(new CustomHeadingNode(node.getTag()), true)
		})
		editor.registerNodeTransform(ParagraphNode, (node) => {
			node.replace(new CustomParagraphNode(), true)
		})

		return editor.registerCommand(
			SELECTION_CHANGE_COMMAND,
			updateCurrentColor,
			COMMAND_PRIORITY_CRITICAL
		);
	}, [ editor ])

	return <PaintBucket className="icon w-5 h-5" style={{ color }} />
}
