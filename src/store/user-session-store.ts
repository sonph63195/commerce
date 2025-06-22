import { createStore } from "zustand/vanilla";

export interface IUserSessionState {
	user: {
		id: string;
		name: string;
		email: string;
		image?: string;
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		[key: string]: any;
	} | null;
	setUser: (user: IUserSessionState["user"]) => void;
	clearUser: () => void;
}

export const defaultSessionState: IUserSessionState = {
	user: null,
	setUser: () => {},
	clearUser: () => {},
};

export const createUserSessionStore = (initState: IUserSessionState = defaultSessionState) => {
	return createStore<IUserSessionState>()((set) => ({
		...initState,
		setUser: (user) => set({ user }),
		clearUser: () => set({ user: null }),
	}));
};
