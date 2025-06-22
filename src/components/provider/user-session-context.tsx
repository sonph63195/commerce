"use client";
import { createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import type { ReactNode } from "react";
import type { IUserSessionState } from "@/store/user-session-store";
import { createUserSessionStore, defaultSessionState } from "@/store/user-session-store";

export type UserSessionStoreApi = ReturnType<typeof createUserSessionStore>;

export const UserSessionStoreContext = createContext<UserSessionStoreApi | undefined>(undefined);

export interface UserSessionStoreProviderProps {
	children: ReactNode;
}

export const UserSessionStoreProvider = ({ children }: UserSessionStoreProviderProps) => {
	const storeRef = useRef<UserSessionStoreApi | null>(null);
	if (storeRef.current === null) {
		storeRef.current = createUserSessionStore(defaultSessionState);
	}
	return (
		<UserSessionStoreContext.Provider value={storeRef.current}>
			{children}
		</UserSessionStoreContext.Provider>
	);
};

export const useUserSessionStore = <T,>(selector: (store: IUserSessionState) => T): T => {
	const userSessionStoreContext = useContext(UserSessionStoreContext);
	if (!userSessionStoreContext) {
		throw new Error("useUserSessionStore must be used within UserSessionStoreProvider");
	}
	return useStore(userSessionStoreContext, selector);
};
