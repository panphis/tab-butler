export function equality(pre: any, next: any): boolean {
	// 判断是否是同一个对象
	if (pre === next) {
		return true;
	}

	// 判断是否是对象
	if (typeof pre === 'object' && pre !== null && typeof next === 'object' && next !== null) {
		// 判断对象的键的数量是否相同
		if (Object.keys(pre).length !== Object.keys(next).length) {
			return false;
		}

		// 递归比较对象的每个键值对
		for (let key in pre) {
			if (next.hasOwnProperty(key)) {
				if (!equality(pre[key], next[key])) {
					return false;
				}
			} else {
				return false;
			}
		}

		return true;
	} else if (Array.isArray(pre) && Array.isArray(next)) {
		// 判断是否是数组
		if (pre.length !== next.length) {
			return false;
		}

		// 递归比较数组的每个元素
		for (let i = 0; i < pre.length; i++) {
			if (!equality(pre[i], next[i])) {
				return false;
			}
		}
		return true;
	}

	// 其他情况
	return false;
}