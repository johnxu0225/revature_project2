import { create } from 'zustand';

// Only fetch necessary fields
export interface UserInfo {
	loggedIn: boolean,

	user_id: number,
	username: string,
	role: string,
	first_name: string,
	last_name: string,
	access_token: string,
}

interface storeFuncs {
	setUser: (newUser: UserInfo) => void,
}

interface storeInterface {
	user: UserInfo,
}

const useStore = create<storeInterface & storeFuncs>()((set) => ({
	user: {
		loggedIn: false,
	
		user_id: -1,
		username: "",
		role: "",
		first_name: "",
		last_name: "",
		access_token: ""
	},

	// There's probably a better way to do this lmfao
	setUser: (newUser) => set((state) => ({
		user: newUser
	})),

}));

export default useStore;