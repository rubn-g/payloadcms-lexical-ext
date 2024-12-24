'use client'

import React, { useEffect, useState } from 'react'
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getPreviousSelection, $getSelection, $isRangeSelection, $setSelection, BaseSelection, COMMAND_PRIORITY_EDITOR } from 'lexical'
import { $insertNodeToNearestRoot } from '@lexical/utils'
import { FieldsDrawer } from '@payloadcms/richtext-lexical/client';
import { useModal } from '@payloadcms/ui';
import type { PluginComponent } from '@payloadcms/richtext-lexical';
import { INSERT_YOUTUBE_EMBED } from './command'
import { $createYouTubeNode } from '../../nodes/YoutubeNode'

export const YoutubePlugin: PluginComponent = (): React.JSX.Element => {
	const [ editor ] = useLexicalComposerContext()
	const [ selectionState, setSelectionState ] = useState<BaseSelection | null>(null)
	const { openModal } = useModal()

	useEffect(() => {
		return editor.registerCommand(
			INSERT_YOUTUBE_EMBED,
			() => {
				editor.read(() => {
					const selection = $getSelection() ?? $getPreviousSelection()
					setSelectionState(selection)
				})

				openModal('youtube-drawer')

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
					const youTubeNode = $createYouTubeNode(data.url);
					$insertNodeToNearestRoot(youTubeNode);
				}

				return true
			}

			return false;
		})
	}

	return (
		<FieldsDrawer
			featureKey="youtube"
			drawerSlug="youtube-drawer"
			handleDrawerSubmit={onSubmit}
			schemaPath="posts.content"
			schemaPathSuffix="youtube"
		/>
	)
}
