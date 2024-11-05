import { generateRandomNumber } from "./";

interface ColorHSL {
	h: number;
	s: number;
	l: number;
	value: string
}

interface ColorPair {
	base: ColorHSL;
	lighter: ColorHSL;
	darker: ColorHSL;
}

class HSLValue {
	h: number;
	s: number;
	l: number;
	value: string;

	constructor(hue: number, saturation: number, lightness: number) {
		this.h = hue;
		this.s = saturation;
		this.l = lightness;
		this.value = `hsl(${hue},${saturation}%,${lightness}%)`;
	}
}

function generateColorPair(hue: number, saturation: number): ColorPair {
	const baseLightness = 40; // 基础亮度
	const lightnessOffset = 10; // 亮度偏移量

	const base = new HSLValue(hue, saturation, baseLightness);
	const lighter = new HSLValue(hue, saturation, baseLightness + lightnessOffset);
	const darker = new HSLValue(hue, saturation, baseLightness - lightnessOffset);

	return {
		base, lighter, darker
	}
}

export function generateRandomColorPairs(count: number): ColorPair[] {
	const initialHue = generateRandomNumber(0, 360);
	/**
	 * Hue（色相）：颜色的基本色调，以角度表示，范围是 0° 到 360°。
		0° 是红色
		120° 是绿色
		240° 是蓝色
		其他值在这些颜色之间逐渐过渡，形成彩虹般的颜色过渡。
	 */
	const hueStep = 360 * 6 / count; // 计算每个颜色之间的角度间隔
	/**
	 * Saturation（饱和度）：颜色的鲜艳度或纯度，以百分比表示，范围是 0% 到 100%。
		0% 表示完全没有颜色（灰色）
		100% 表示完全饱和的颜色（最鲜艳）
	*/
	const saturation = 100;

	const colorPairs: ColorPair[] = [];

	for (let i = 0; i < count; i++) {
		const hue = (initialHue + i * hueStep) % 360;
		const colorPair = generateColorPair(hue, saturation);
		colorPairs.push(colorPair);
	}
	return colorPairs;
}