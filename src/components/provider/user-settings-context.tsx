"use client";
import { createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import type { ReactNode } from "react";
import type { IUserSettingsState } from "@/store/user-settings-store";
import { createUserSettingsStore, defaultSettingsState } from "@/store/user-settings-store";

export type UserSettingsStoreApi = ReturnType<typeof createUserSettingsStore>;

export const UserSettingsStoreContext = createContext<UserSettingsStoreApi | undefined>(undefined);

export interface UserSettingsStoreProviderProps {
	children: ReactNode;
}

export const UserSettingsStoreProvider = ({ children }: UserSettingsStoreProviderProps) => {
	const storeRef = useRef<UserSettingsStoreApi | null>(null);
	if (storeRef.current === null) {
		storeRef.current = createUserSettingsStore(defaultSettingsState);
	}
	return (
		<UserSettingsStoreContext.Provider value={storeRef.current}>
			{children}
		</UserSettingsStoreContext.Provider>
	);
};

export const useUserSettingsStore = <T,>(selector: (store: IUserSettingsState) => T): T => {
	const userSettingsStoreContext = useContext(UserSettingsStoreContext);
	if (!userSettingsStoreContext) {
		throw new Error("useUserSettingsStore must be used within UserSettingsStoreProvider");
	}
	return useStore(userSettingsStoreContext, selector);
};
