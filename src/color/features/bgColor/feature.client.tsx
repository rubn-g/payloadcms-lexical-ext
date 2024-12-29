'use client'

import { createClientFeature } from '@payloadcms/richtext-lexical/client';
import { $getSelection, $isElementNode, $isRangeSelection } from '@payloadcms/richtext-lexical/lexical';
import { $isTableSelection } from '@lexical/table';
import Dropdown from '../../components/Dropdown';
import Icon from './Icon';
import { UPDATE_BG_COLOR } from './command';
import { ColorDropdownGroup, ColorFeatureProps } from '../../types';
import { CustomParagraphNode } from '../../nodes/CustomParagraphNode';
import { CustomHeadingNode } from '../../nodes/CustomHeadingNode';

export default createClientFeature<ColorFeatureProps>(({ props }) => {
	const groups: ColorDropdownGroup[] = [ {
		type: 'dropdown',
		ChildComponent: Icon,
		isEnabled({ selection }) {
			return $isRangeSelection(selection) || $isTableSelection(selection);
		},
		items: [{
			...props,
			Component: Dropdown,
			key: 'bgColor',
			command: UPDATE_BG_COLOR,
			current() {
				const selection = $getSelection()
				const element = selection?.getNodes()[0].getTopLevelElement()

				if ($isElementNode(element)) {
					return element.getStyle().match(/background-color: (.*)/)?.[1] || null
				}

				return null;
			}
		}],
		key: 'bgColorDropdown',
		order: 62,
	} ]

	return {
		nodes: [
			CustomParagraphNode,
			CustomHeadingNode,
		],
		enableFormats: [ 'bgColor' ],
		toolbarFixed: {
			groups,
		},
		toolbarInline: {
			groups,
		},
	}
})
