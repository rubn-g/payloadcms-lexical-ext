'use client'

import { createClientFeature } from '@payloadcms/richtext-lexical/client';
import { $getSelectionStyleValueForProperty } from '@lexical/selection';
import Dropdown from '../../components/Dropdown';
import Icon from './Icon';
import { UPDATE_TEXT_COLOR } from './command';
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
		key: 'textColor',
		command: UPDATE_TEXT_COLOR,
		current() {
			const selection = getSelection()

			return selection ? $getSelectionStyleValueForProperty(selection, 'color', '') : null
		}
	}],
	key: 'textColorDropdown',
	order: 60,
} ]

export default createClientFeature(() => {
	return {
		enableFormats: [ 'textColor' ],
		toolbarFixed: {
			groups,
		},
		toolbarInline: {
			groups,
		},
	}
})
