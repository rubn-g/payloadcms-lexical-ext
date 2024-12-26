'use client'

import { createClientFeature } from '@payloadcms/richtext-lexical/client';
import { $getSelectionStyleValueForProperty } from '@payloadcms/richtext-lexical/lexical/selection';
import Dropdown from '../../components/Dropdown';
import Icon from './Icon';
import { UPDATE_TEXT_COLOR } from './command';
import { ColorDropdownGroup, ColorFeatureProps } from '../../types';
import getSelection from '../getSelection';

export default createClientFeature<ColorFeatureProps>(({ props }) => {
	const groups: ColorDropdownGroup[] = [ {
		type: 'dropdown',
		ChildComponent: Icon,
		isEnabled({ selection }) {
			return !!getSelection(selection);
		},
		items: [{
			...props,
			Component: Dropdown,
			key: 'textColor',
			command: UPDATE_TEXT_COLOR,
			current() {
				const selection = getSelection()

				return selection ? $getSelectionStyleValueForProperty(selection, 'color', '') : null
			},
		}],
		key: 'textColorDropdown',
		order: 60,
	} ]

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
