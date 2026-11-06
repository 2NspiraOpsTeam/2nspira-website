import DemoSchema from "@/components/demos/DemoSchema";
import DemoDetail from "@/components/demos/DemoDetail";
import { publicPageMetadata } from "@/lib/pageMetadata";
export const metadata = publicPageMetadata({
  title: "Manufacturing Operations Platform Demo",
  shareTitle: "From order to shipment. Fewer blind spots.",
  description:
    "Explore linked production work orders, inventory, procurement, quality checks, simulated fulfillment, and operational reporting in a fictional factory.",
  path: "/demos/manufacturing",
  image: "/images/demos/manufacturing-workspace.webp",
});
export default function ManufacturingDemoPage() {
  return (
    <>
      <DemoSchema
        path="/demos/manufacturing"
        title="Manufacturing Operations Platform Demo"
        description="Explore materials, production and quality through a connected manufacturing workflow."
        image="/images/demos/manufacturing-workspace.webp"
      />
      <DemoDetail kind="manufacturing" />
    </>
  );
}
