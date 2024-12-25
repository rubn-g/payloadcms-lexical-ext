'use client'

import { createClientFeature, toolbarAddDropdownGroupWithItems } from '@payloadcms/richtext-lexical/client';
import { $isNodeSelection } from '@payloadcms/richtext-lexical/lexical'
import { INSERT_YOUTUBE_EMBED } from './command';
import { $isYouTubeNode, YouTubeNode } from '../../nodes/YoutubeNode';
import Icon from './Icon';
import { YoutubePlugin } from './plugin';

const groups = toolbarAddDropdownGroupWithItems([
	{
		ChildComponent: Icon,
		isActive: ({ selection }) => {
			if (!$isNodeSelection(selection) || !selection.getNodes().length) {
				return false
			}

			const firstNode = selection.getNodes()[ 0 ]

			return $isYouTubeNode(firstNode);
		},
		key: 'youtube',
		label: 'Youtube',
		onSelect: ({ editor }) => {
			editor.dispatchCommand(INSERT_YOUTUBE_EMBED, { replace: false })
		},
	},
])

export default createClientFeature(() => {
	return {
		plugins: [{
			Component: YoutubePlugin,
			position: 'normal',
		}],
		nodes: [ YouTubeNode ],
		toolbarFixed: {
			groups: [ groups ],
		},
		toolbarInline: {
			groups: [ groups ],
		},
	}
})
