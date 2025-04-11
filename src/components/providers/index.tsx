import type React from "react";

export default function Providers({ children, lang }: React.PropsWithChildren<{ lang: string }>) {
	return <>{children}</>;
}
