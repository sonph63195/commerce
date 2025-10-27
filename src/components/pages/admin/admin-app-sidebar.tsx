import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";

export function AdminAppSidebar() {
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader >
        Sidebar header
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
      <SidebarRail />
    </Sidebar>
  )
}
