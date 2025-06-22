"use client";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/atoms/ui/sidebar";
import { Home, Inbox, Calendar, Search, Settings, ChevronUp, User2 } from "lucide-react";
import { SearchBar } from "../molecules/SearchBar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/molecules/dropdown-menu";
import { useSession, signOut } from "next-auth/react";
import { Link as UILink } from "@/components/atoms/ui/link";

// Menu items.
const items = [
	{
		title: "Home",
		url: "#",
		icon: Home,
	},
	{
		title: "Inbox",
		url: "#",
		icon: Inbox,
	},
	{
		title: "Calendar",
		url: "#",
		icon: Calendar,
	},
	{
		title: "Search",
		url: "#",
		icon: Search,
	},
	{
		title: "Settings",
		url: "#",
		icon: Settings,
	},
];

export function AppSidebar() {
	const { data: session } = useSession();
	const username = session?.user?.name || "User";
	return (
		<Sidebar>
			<SidebarHeader>
				<UILink href="/">Commerce</UILink>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SearchBar />
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>Application</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<UILink href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</UILink>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						{session ? (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<SidebarMenuButton>
										<User2 /> {username}
										<ChevronUp className="ml-auto" />
									</SidebarMenuButton>
								</DropdownMenuTrigger>
								<DropdownMenuContent side="top" className="w-(--radix-popper-anchor-width)">
									<DropdownMenuItem asChild>
										<UILink href="/user">
											<span>Account</span>
										</UILink>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<span>Billing</span>
									</DropdownMenuItem>
									<DropdownMenuItem onClick={() => signOut()}>
										<span>Sign out</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							<SidebarMenuButton asChild>
								<UILink href="/login">
									<User2 /> Login
								</UILink>
							</SidebarMenuButton>
						)}
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
