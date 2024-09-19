import { create } from 'zustand'

import {
	ID, WebSite, CreateWebSiteParams,
	createWebSite, queryAllWebSite, deleteWebSite, updateWebSiteById

} from "../";


type State = {
	websites: WebSite[],
	loadingWebSite: boolean,
}




type Action = {
	createWebSite: (params: CreateWebSiteParams) => void;
	getWebSites: () => void;
	removeWebSite: (id: ID) => void;
	updateWebSite: (params: WebSite) => void;
}

const initValue = await queryAllWebSite()

export const useWebSiteStore = create<State & Action>((set, get) => ({
	websites: initValue,
	loadingWebSite: false,

	createWebSite: async (params) => {
		await createWebSite(params)
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

