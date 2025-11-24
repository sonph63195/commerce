import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components";
import { SettingThemeToggle } from "@/components/pages/settings/theme-toggle";

export default function SettingsPage() {
  return (
    <>
      <h1>Settings</h1>

      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="appearance">
          <SettingThemeToggle />
        </TabsContent>
      </Tabs>
    </>
  );
}
