import { publicPageMetadata } from "@/lib/pageMetadata";
import OperationsHub from "./OperationsHub";
export const metadata = publicPageMetadata({
  title: "AI Operations Hub · Interactive Demo | 2Nspira",
  description:
    "AI prepares the work. Your people make the decisions. Explore real AI analysis with synthetic invoices, human-approved sandbox cases and simulated email.",
  path: "/demos/ai-operations",
});
export default function Page() {
  return <OperationsHub />;
}
