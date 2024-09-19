export function formatFileSize(sizeInBytes: number): string {
	const KB = 1 << 10; // 1024
	const MB = KB << 10; // 1024 * 1024
	const GB = MB << 10; // 1024 * 1024 * 1024
	const TB = GB << 10; // 1024 * 1024 * 1024 * 1024

	const units = [
		{ factor: 1, unit: 'B' },
		{ factor: KB, unit: 'KB' },
		{ factor: MB, unit: 'MB' },
		{ factor: GB, unit: 'GB' },
		{ factor: TB, unit: 'TB' }
	];
	for (const unit of units) {
		if (sizeInBytes < unit.factor * 1024) {
			let formattedSize = (sizeInBytes / unit.factor).toFixed(1);
			if (formattedSize.endsWith('.0')) {
				formattedSize = formattedSize.slice(0, -2); // 移除末尾的 .0
			}
			return `${formattedSize} ${unit.unit}`;
		}
	}

	// 默认最大单位
	let formattedSize = (sizeInBytes / units[units.length - 1].factor).toFixed(1);
	if (formattedSize.endsWith('.0')) {
		formattedSize = formattedSize.slice(0, -2); // 移除末尾的 .0
	}
	return `${formattedSize} TB`;
}


interface DurationProps {
	title: string;
	endTime?: number;
	startTime?: number;
}
export class Duration {
	private startTime?: number;
	private endTime?: number;
	public duration!: number;
	public readonly title: string;
	constructor({ title, endTime, startTime }: DurationProps) {
		this.title = title;
		this.startTime = startTime;
		this.endTime = endTime;
	}

	start() {
		this.startTime = Date.now();
		return this;
	}

	end() {
		this.endTime = this.endTime ?? Date.now();
		this.duration = this.endTime - this.startTime!;
		console.log(`${this.title} 耗时：${this.duration}ms`)
		return this.duration
	}
}

