export const generateRandomNumber = (min: number, max: number): number => {
	const array = new Uint32Array(1);
	crypto.getRandomValues(array);
	return Math.floor(array[0] / 2 ** 32 * (max - min + 1)) + min;
};