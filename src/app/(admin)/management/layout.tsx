import { SidebarInset, SidebarProvider } from "@/components";
import { AdminAppSidebar } from "@/components/pages/admin/admin-app-sidebar";

export default function AdminRootLayout({ children }: LayoutProps<"/management">) {
  return (
    <SidebarProvider>
      <AdminAppSidebar />

      <SidebarInset>
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
