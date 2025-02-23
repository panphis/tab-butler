import { create } from 'zustand'



import {
	ID, WebSite, CreateWebSiteParams,
} from "@/type";

import {
	createOrUpdateWebSite, queryAllWebSite, deleteWebSite, updateWebSiteById
} from "@/db";


type State = {
	websites: WebSite[],
	loadingWebSite: boolean,
}




type Action = {
	createOrUpdateWebSite: (params: CreateWebSiteParams) => Promise<void>;
	getWebSites: () => Promise<void>;
	removeWebSite: (id: ID) => Promise<void>;
	updateWebSite: (params: WebSite) => Promise<void>;
}

const initValue = await queryAllWebSite()

export const useWebSiteStore = create<State & Action>((set, get) => ({
	websites: initValue,
	loadingWebSite: false,

	createOrUpdateWebSite: async (params) => {
		const preSet = await createOrUpdateWebSite(params)
		const list = await queryAllWebSite()
		set({ websites: list })
	},

	getWebSites: async () => {
		set({ loadingWebSite: true })
		const list = await queryAllWebSite()
		set({ websites: list, loadingWebSite: false })
	},

	removeWebSite: async (id) => {
		await deleteWebSite(id)
		const list = await queryAllWebSite()
		set({ websites: list })
	},

	updateWebSite: async (params) => {
		const { id, ...others } = params
		await updateWebSiteById(id, others)
		const list = await queryAllWebSite()
		set({ websites: list })
	}
}))

