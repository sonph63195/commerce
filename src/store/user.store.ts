import { create } from "zustand";
import { TUser } from "@/models/user.model";

interface UserState {
	user: TUser | null;
	setUser: (user: TUser | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
	user: null,
	setUser: (user) => set({ user }),
}));
