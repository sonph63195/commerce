"use client";
import { createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import type { ReactNode } from "react";
import type { IUserCartState } from "@/store/user-cart-store";
import { createUserCartStore, defaultCartState } from "@/store/user-cart-store";

export type UserCartStoreApi = ReturnType<typeof createUserCartStore>;

export const UserCartStoreContext = createContext<UserCartStoreApi | undefined>(undefined);

export interface UserCartStoreProviderProps {
	children: ReactNode;
}

export const UserCartStoreProvider = ({ children }: UserCartStoreProviderProps) => {
	const storeRef = useRef<UserCartStoreApi | null>(null);
	if (storeRef.current === null) {
		storeRef.current = createUserCartStore(defaultCartState);
	}
	return (
		<UserCartStoreContext.Provider value={storeRef.current}>
			{children}
		</UserCartStoreContext.Provider>
	);
};

export const useUserCartStore = <T,>(selector: (store: IUserCartState) => T): T => {
	const userCartStoreContext = useContext(UserCartStoreContext);
	if (!userCartStoreContext) {
		throw new Error("useUserCartStore must be used within UserCartStoreProvider");
	}
	return useStore(userCartStoreContext, selector);
};
