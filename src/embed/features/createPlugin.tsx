'use client'

import React, { useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
	$getPreviousSelection,
	$getSelection,
	$isRangeSelection,
	$setSelection,
	BaseSelection,
	COMMAND_PRIORITY_EDITOR,
	LexicalCommand
} from '@payloadcms/richtext-lexical/lexical';
import { $insertNodeToNearestRoot } from '@payloadcms/richtext-lexical/lexical/utils'
import { FieldsDrawer } from '@payloadcms/richtext-lexical/client';
import { useDocumentInfo, useModal } from '@payloadcms/ui';
import type { PluginComponent } from '@payloadcms/richtext-lexical';

type PluginProps = {
	command: LexicalCommand<unknown>
	featureKey: string
	createNode: Function
}

export const createPlugin = ({ featureKey, command, createNode }: PluginProps): PluginComponent => {
	return (): React.JSX.Element => {
		const [ editor ] = useLexicalComposerContext()
		const [ selectionState, setSelectionState ] = useState<BaseSelection | null>(null)
		const { openModal } = useModal()
		const { collectionSlug } = useDocumentInfo()

		useEffect(() => {
			return editor.registerCommand(
				command,
				() => {
					editor.read(() => {
						const selection = $getSelection() ?? $getPreviousSelection()
						setSelectionState(selection)
					})

					openModal(featureKey + '-drawer')

					return true;
				},
				COMMAND_PRIORITY_EDITOR,
			)
		}, [ editor ])

		const onSubmit = (_, data) => {
			editor.update(() => {
				selectionState && $setSelection(selectionState.clone())

				if ($isRangeSelection(selectionState)) {
					const focusNode = selectionState.focus.getNode()

					if (focusNode !== null) {
						const youTubeNode = createNode(data.id);
						$insertNodeToNearestRoot(youTubeNode);
					}

					return true
				}

				return false;
			})
		}

		return (
			<FieldsDrawer
				featureKey={ featureKey }
				drawerSlug={ featureKey + '-drawer' }
				handleDrawerSubmit={onSubmit}
				schemaPath={ collectionSlug + '.content' }
				schemaPathSuffix={ featureKey }
			/>
		)
	}
}
