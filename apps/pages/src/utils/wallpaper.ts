

interface WallpaperConstructor {
	file: File;
}


interface WallpaperProps {
	file: File,
	type: string;
	callback: (wallpaper: WallpaperType) => void;
}


interface PosterInfo {
	width: number | undefined;
	height: number | undefined;
	poster: Blob | undefined;
}


export interface WallpaperType extends WallpaperConstructor, PosterInfo {
	type: string;
	loading: boolean;
}



export abstract class WallpaperBase implements WallpaperConstructor {
	public file: File;
	public type: string;
	constructor(parameters: WallpaperProps) {
		this.file = parameters.file;
		this.type = parameters.type;
	}
}



export class PictureWallpaper extends WallpaperBase {
	public poster: PosterInfo['poster'] | undefined;
	public width: number | undefined;
	public height: number | undefined;
	public loading: boolean;
	constructor(parameters: WallpaperProps) {
		super(parameters);
		this.loading = true;
		this.generatePosterInfo(this.file)
			.then(({ height, width, poster }) => {
				this.height = height
				this.width = width
				this.poster = poster
			})
			.finally(() => {
				this.loading = false
				parameters.callback(this)
			})
	}


	private async generatePosterInfo(file: File): Promise<PosterInfo> {

		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = async (event) => {
				const img = new Image();
				img.onload = async () => {
					const originalWidth = img.width;
					const originalHeight = img.height;

					const maxWidth = 800;
					const maxHeight = 600;
					let width = originalWidth;
					let height = originalHeight;

					if (originalWidth > maxWidth || originalHeight > maxHeight) {
						if (originalWidth > originalHeight) {
							width = maxWidth;
							height = Math.round((maxWidth / originalWidth) * originalHeight);
						} else {
							height = maxHeight;
							width = Math.round((maxHeight / originalHeight) * originalWidth);
						}
					}

					const canvas = document.createElement('canvas');
					canvas.width = width;
					canvas.height = height;
					const ctx = canvas.getContext('2d');
					if (ctx) {
						ctx.drawImage(img, 0, 0, width, height);

						canvas.toBlob((blob) => {
							if (blob) {
								resolve({
									width: originalWidth,
									height: originalHeight,
									poster: blob,
								});
							} else {
								reject(new Error('Failed to convert canvas to blob'));
							}
						}, file.type);
					} else {
						reject(new Error('Canvas context not available'));
					}
				};
				img.src = event.target?.result as string;
			};
			reader.readAsDataURL(file as Blob);
		});
	}
}

export class VideoWallpaper extends WallpaperBase {

	public poster: PosterInfo['poster'];
	public width: PosterInfo['width'];
	public height: PosterInfo['height'];
	public loading: boolean;

	constructor(parameters: WallpaperProps) {
		super(parameters);
		this.loading = true;
		this.generatePosterInfo(this.file).then(({ height, width, poster }) => {
			this.height = height
			this.width = width
			this.poster = poster
		}).finally(() => {
			this.loading = false
			parameters.callback(this)
		})
	}



	private async generatePosterInfo(file: File): Promise<PosterInfo> {
		return new Promise((resolve, reject) => {
			const video = document.createElement('video');
			video.preload = 'metadata';

			video.onloadedmetadata = () => {
				const originalWidth = video.videoWidth;
				const originalHeight = video.videoHeight;

				video.currentTime = 0; // 设置视频时间到第一帧
				video.play().then(() => {
					const canvas = document.createElement('canvas');
					canvas.width = originalWidth;
					canvas.height = originalHeight;
					const ctx = canvas.getContext('2d');
					if (ctx) {
						// 绘制视频的第一帧到 canvas
						ctx.drawImage(video, 0, 0, originalWidth, originalHeight);

						// 将 canvas 转换为 blob，指定较低的质量参数
						canvas.toBlob((blob) => {
							if (blob) {
								resolve({
									width: originalWidth,
									height: originalHeight,
									poster: blob,
								});
							} else {
								reject(new Error('Failed to convert canvas to blob'));
							}
						}, 'image/jpeg', 0.5); // 0.5 表示 50% 的质量
					} else {
						reject(new Error('Canvas context not available'));
					}
				}).catch((error) => {
					console.error('Error playing video:', error);
					reject(new Error('Failed to play video'));
				});
			};

			video.onerror = (error) => {
				console.error('Error loading video:', error);
				reject(new Error('Failed to load video metadata'));
			};

			video.src = URL.createObjectURL(file as Blob);
		});
	}
}



export function createWallpaper(params: { file: File, callback: (value: WallpaperType) => void }): WallpaperType {
	const { file } = params;
	const type = getFileType(file);
	const parameters = {
		...params,
		type
	}
	switch (type) {
		case 'picture':
			return new PictureWallpaper(parameters);
		case 'video':
			return new VideoWallpaper(parameters);
		default:
			throw new Error('Invalid file type');
	}
}

export function getFileType(file: File): 'picture' | 'video' | never {
	switch (true) {
		case file.type.startsWith('video/'):
			return 'video';
		case file.type.startsWith('image/'):
			return 'picture';
		default:
			return new Error('Invalid file type') as never;
	}
}





