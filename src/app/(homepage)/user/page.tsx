/**
 * User settings page for profile and preferences (e.g., dark mode).
 */

import { PageSection } from "@/components/atoms/ui/page-section";
import { UserSettings } from "@/components/organisms/user/UserSettings";

export const metadata = {
	title: "User Settings",
	description: "Manage your profile and preferences",
};

export default function UserPage() {
	return (
		<PageSection title={metadata.title} description={metadata.description}>
			<UserSettings />
		</PageSection>
	);
}
