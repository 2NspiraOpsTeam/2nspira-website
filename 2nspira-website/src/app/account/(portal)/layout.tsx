import PortalShell from "@/components/portal/PortalShell";
import { getPortalContext } from "@/lib/portal/context";

export default async function AuthenticatedPortalLayout({ children }: { children: React.ReactNode }) {
  const { user, organization } = await getPortalContext();
  return <PortalShell organizationName={organization.name} userName={user.name} userEmail={user.email}>{children}</PortalShell>;
}
