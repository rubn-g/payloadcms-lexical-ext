import './ColorPicker.scss';
import React from 'react';
import { Hash, Undo } from 'lucide-react';
import { HexColorPicker, HexColorInput } from 'react-colorful';

type ColorPickerProps = {
	color: string;
	customColors?: string[];
	onChange: (color: string) => void;
}

const basicColors = [
	'#000000',
	'#1A1A1A',
	'#333333',
	'#4D4D4D',
	'#666666',
	'#B3B3B3',
	'#FFFFFF',
	'#ff0000', // red
	'#ff9900', // orange
	'#ffff00', // yellow
	'#00ff00', // green
	'#00ffff', // cyan
	'#0000ff', // blue
	'#ff00ff', // magenta
	'#fce5cd', // red
	'#f4cccc', // orange
	'#fff2cc', // yellow
	'#d9ead3', // green
	'#d0e0e3', // cyan
	'#cfe2f3', // blue
	'#ead1dc', // magenta
	'#d09999', // red
	'#dbbd9b', // orange
	'#dfcd99', // yellow
	'#adc3a3', // green
	'#9fb5ba', // cyan
	'#9bbfde', // blue
	'#c2a1b1', // magenta
	'#ac6666', // red
	'#ba9419', // orange
	'#bfa864', // yellow
	'#809c73', // green
	'#6e8a91', // cyan
	'#679cc9', // blue
	'#9a7186', // magenta
	'#883333', // red
	'#996b37', // orange
	'#9f8453', // yellow
	'#547543', // green
	'#3d6368', // cyan
	'#3379b4', // blue
	'#72415b', // magenta
	'#640000', // red
	'#783f04', // orange
	'#7f6000', // yellow
	'#274e13', // green
	'#0c343d', // cyan
	'#073763', // blue
	'#4c1130', // magenta
];

export default function ColorPicker({ color, onChange }: Readonly<ColorPickerProps>): React.JSX.Element {
	const onReset = (): void => {
		onChange('')
	};

	return (
		<div className="color-picker-wrapper">
			<div className="flex">
				<div className="w-10 h-10 mr-2 rounded-md border border-solid border-border flex-none" style={{ backgroundColor: color }}></div>
				<HexColorInput
					className="flex-1 h-10 px-2 py-1 rounded-md min-w-0 border border-solid border-border"
					onChange={onChange}
					color={color}
				/>
			</div>
			<button className="w-full p-2 mt-2 bg-transparent hover:bg-white hover:bg-opacity-10" onClick={onReset}>
				<Undo strokeWidth={1.5} className="w-5 h-5 mr-1" /> Reset color
			</button>
			<button className="w-full p-2 mt-2 bg-transparent hover:bg-white hover:bg-opacity-10" onClick={() => onChange('var(--color-category, #ccc)')}>
				<Hash strokeWidth={1.5} className="w-5 h-5 mr-1" /> Category color
			</button>
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
