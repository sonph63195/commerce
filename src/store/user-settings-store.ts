import { createStore } from "zustand/vanilla";

export interface IUserSettingsState {
	theme: "light" | "dark" | "system";
	reduceMotion: boolean;
	setTheme: (theme: "light" | "dark" | "system") => void;
	setReduceMotion: (reduceMotion: boolean) => void;
}

export const defaultSettingsState: IUserSettingsState = {
	theme: "system",
	reduceMotion: false,
	setTheme: () => {},
	setReduceMotion: () => {},
};

export const createUserSettingsStore = (initState: IUserSettingsState = defaultSettingsState) => {
	return createStore<IUserSettingsState>()((set) => ({
		...initState,
		setTheme: (theme) => set({ theme }),
		setReduceMotion: (reduceMotion) => set({ reduceMotion }),
	}));
};
