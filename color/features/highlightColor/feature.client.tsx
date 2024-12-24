'use client'

import { createClientFeature } from '@payloadcms/richtext-lexical/client';
import { $getSelectionStyleValueForProperty } from '@lexical/selection';
import Dropdown from '../../components/Dropdown';
import Icon from './Icon';
import { UPDATE_HL_COLOR } from './command';
import { ColorDropdownGroup } from '../../types';
import getSelection from '../getSelection';

const groups: ColorDropdownGroup[] = [ {
	type: 'dropdown',
	ChildComponent: Icon,
	isEnabled({ selection }) {
		return !!getSelection(selection);
	},
	items: [{
		Component: Dropdown,
		key: 'highlightColor',
		command: UPDATE_HL_COLOR,
		current() {
			const selection = getSelection()

			return selection ? $getSelectionStyleValueForProperty(selection, 'background-color', '') : null
		}
	}],
	key: 'highlightColorDropdown',
	order: 61,
} ]

export default createClientFeature(() => {
	return {
		enableFormats: [ 'highlightColor' ],
		toolbarFixed: {
			groups,
		},
		toolbarInline: {
			groups,
		},
	}
})
