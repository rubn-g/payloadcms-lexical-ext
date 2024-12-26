import './ColorPicker.css';
import colors from 'tailwindcss/colors'
import React from 'react';
import { Hash, Undo } from 'lucide-react';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import { Color } from '../types';

type ColorPickerProps = {
	color: string;
	colors?: Color[],
	customColors?: string[];
	onChange: (color: string) => void;
}

const yellow = {
	100: '#FFFDE7',
	200: '#FFF9C4',
	300: '#FFF59D',
	400: '#FFF176',
	500: '#FFEE58',
	600: '#FFEB3B',
	700: '#FDD835',
	800: '#FBC02D',
	900: '#F9A825',
	950: '#F57F17',
}

const orange = {
	100: '#FFF3E0',
	200: '#FFE0B2',
	300: '#FFCC80',
	400: '#FFB74D',
	500: '#FFA726',
	600: '#FF9800',
	700: '#FB8C00',
	800: '#F57C00',
	900: '#EF6C00',
	950: '#E65100',
}

const basicColors = [
	'#000000',
	'#1A1A1A',
	'#333333',
	'#4D4D4D',
	'#666666',
	'#B3B3B3',
	'#FFFFFF',
	colors.red[500],
	orange[500],
	yellow[500],
	colors.green[500],
	colors.cyan[500],
	colors.blue[500],
	colors.fuchsia[500],
	colors.red[200],
	orange[200],
	yellow[200],
	colors.green[200],
	colors.cyan[200],
	colors.blue[200],
	colors.fuchsia[200],
	colors.red[400],
	orange[400],
	yellow[400],
	colors.green[400],
	colors.cyan[400],
	colors.blue[400],
	colors.fuchsia[400],
	colors.red[600],
	orange[600],
	yellow[600],
	colors.green[600],
	colors.cyan[600],
	colors.blue[600],
	colors.fuchsia[600],
	colors.red[800],
	orange[800],
	yellow[800],
	colors.green[800],
	colors.cyan[800],
	colors.blue[800],
	colors.fuchsia[800],
	colors.red[950],
	orange[950],
	yellow[950],
	colors.green[950],
	colors.cyan[950],
	colors.blue[950],
	colors.fuchsia[950],
];

export default function ColorPicker({ color, colors, onChange }: Readonly<ColorPickerProps>): React.JSX.Element {
	const onReset = (): void => {
		onChange('')
	};

	return (
		<div className="color-picker-wrapper">
			<div className="flex color-input">
				<div className="w-10 mr-2 flex-none" style={{ backgroundColor: color }}></div>
				<HexColorInput
					className="flex-1 px-2 py-1 min-w-0"
					onChange={onChange}
					color={color}
				/>
			</div>
			<button className="w-full p-2 mt-2 bg-transparent hover:bg-black dark:hover:bg-white hover:bg-opacity-10" onClick={onReset}>
				<Undo strokeWidth={1.5} className="w-5 h-5 mr-1" /> Reset color
			</button>
			{colors?.filter(c => c.type === 'button').map((color, i) => (
				<button key={i} className="w-full p-2 mt-2 bg-transparent hover:bg-black dark:hover:bg-white hover:bg-opacity-10" onClick={() => onChange('var(--color-category, #ccc)')}>
					<Hash strokeWidth={1.5} className="w-5 h-5 mr-1" /> {color.label}
				</button>
			))}
			<div className="color-picker-basic-color mt-2">
				{basicColors.map((basicColor) => (
					<button
						className={basicColor === color ? ' active' : ''}
						key={basicColor}
						style={{ backgroundColor: basicColor }}
						onClick={() => onChange(basicColor)}
					/>
				))}
			</div>
			<HexColorPicker color={color} onChange={onChange} />
		</div>
	);
}
