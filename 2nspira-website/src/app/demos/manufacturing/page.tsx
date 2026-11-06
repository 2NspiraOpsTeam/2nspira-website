import DemoDetail from "@/components/demos/DemoDetail";
import { publicPageMetadata } from "@/lib/pageMetadata";
export const metadata = publicPageMetadata({
  title: "Manufacturing Operations Platform Demo",
  shareTitle: "From order to shipment. Fewer blind spots.",
  description:
    "Explore linked production work orders, inventory, procurement, quality checks, simulated fulfillment, and operational reporting in a fictional factory.",
  path: "/demos/manufacturing",
});
export default function ManufacturingDemoPage() {
  return <DemoDetail kind="manufacturing" />;
}
