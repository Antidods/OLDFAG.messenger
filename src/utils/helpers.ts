// My helpers

type Indexed<T = any> = {
	[key in string]: T;
};

export function isObject(item: any): boolean {
	return typeof item === 'object' && !Array.isArray(item) && item !== null;
}

export function merge(lhs: any, ...rhs: any): any {
	if (!rhs.length) return lhs;

	const source = rhs.shift();
	if (isObject(lhs) && isObject(source)) {
		for (const key in source) {
			if (isObject(source[key])) {
				if (!lhs[key])
					Object.assign(lhs, {
						[key]: {},
					});
				merge(lhs[key], source[key]);
			} else {
				Object.assign(lhs, {
					[key]: source[key],
				});
			}
		}
	}
	return merge(lhs, ...rhs);
}

export function set(
	object: Indexed | unknown,
	path: string | any,
	value: unknown
): Indexed | unknown {
	if (!isObject(object)) return object;
	if (typeof path !== 'string') return new Error('path must be string');

	const patchArr: string[] = path.split('.');
	const patchObj: any = patchArr.reduceRight((accumulator: any, currentValue): any => {
		return { [currentValue]: accumulator };
	}, value);

	return merge(object, patchObj);
}

export function isPlainObject(value: any): boolean {
	return (
		typeof value === 'object' &&
		value !== null &&
		value.constructor === Object &&
		Object.prototype.toString.call(value) === '[object Object]'
	);
}

export function isArray(value: any): value is [] {
	return Array.isArray(value);
}

export function isArrayOrObject(value: any): boolean {
	return isPlainObject(value) || isArray(value);
}

export function isEqual(lhs: any, rhs: any) {
	if (typeof lhs === 'string' && typeof rhs === 'string') {
		return lhs === rhs;
	}
	if (Object.keys(lhs).length !== Object.keys(rhs).length) {
		return false;
	}

	for (const [key, value] of Object.entries(lhs)) {
		const rightValue = rhs[key];
		if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
			if (isEqual(value, rightValue)) {
				continue;
			}
			return false;
		}

		if (value !== rightValue) {
			return false;
		}
	}

	return true;
}

export function sleep(ms = 200) {
	return new Promise((r) => {
		setTimeout(r, ms);
	});
}
