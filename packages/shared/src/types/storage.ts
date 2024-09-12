


export type ValueOrUpdate<D> = D | ((prev: D) => Promise<D> | D);


export type BaseStorage<D> = {
	get: () => Promise<D>;
	set: (value: ValueOrUpdate<D>) => Promise<void>;
	getSnapshot: () => D | null;
	subscribe: (listener: () => void) => () => void;
};