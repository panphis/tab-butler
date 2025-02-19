import { ID } from "./common"

export interface CreateSearchEngineParams {
	title: string,
	url: string,
	selected?: number,
	docUrl?: string
}

/**
 * 搜索需要拼接的参数
 * eg
 * 百度搜索 less.js 需要排除 csdn 选项
 * https://www.baidu.com/s?q1=less.js
 * q1: less.js
 * q4: csdn+CSDN
 */
type Arg = {
	key?: string
	prefix?: string
	value: string[],
	connectors?: string,
	suffix?: string
	description?: string
}

type Args = Arg[]

// export interface SearchEngine extends CreateSearchEngineParams {
// 	id: ID,
// 	args?: Args,
// 	argStr?: string
// }


export interface SearchEngine extends CreateSearchEngineParams {
	id: ID,
	args?: string
}