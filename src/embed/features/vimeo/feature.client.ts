'use client'

import { createClientFeature, toolbarAddDropdownGroupWithItems } from '@payloadcms/richtext-lexical/client';
import { $isNodeSelection } from '@payloadcms/richtext-lexical/lexical'
import { INSERT_VIMEO_EMBED } from './command';
import Icon from './Icon';
import { $createVimeoNode, $isVimeoNode, VimeoNode } from 'src/embed/nodes/VimeoNode';
import { createPlugin } from '../createPlugin';

const groups = toolbarAddDropdownGroupWithItems([
	{
		ChildComponent: Icon,
		isActive: ({ selection }) => {
			if (!$isNodeSelection(selection) || !selection.getNodes().length) {
				return false
			}

			const firstNode = selection.getNodes()[ 0 ]

			return $isVimeoNode(firstNode);
		},
		key: 'vimeo',
		label: 'Vimeo',
		onSelect: ({ editor }) => {
			editor.dispatchCommand(INSERT_VIMEO_EMBED, { replace: false })
		},
	},
])

export default createClientFeature(() => {
	return {
		plugins: [{
			Component: createPlugin({
				featureKey: 'vimeo',
				command: INSERT_VIMEO_EMBED,
				createNode: $createVimeoNode
			}),
			position: 'normal',
		}],
		nodes: [ VimeoNode ],
		toolbarFixed: {
			groups: [ groups ],
		},
		toolbarInline: {
			groups: [ groups ],
		},
	}
})
