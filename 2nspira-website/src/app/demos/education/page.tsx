import DemoDetail from "@/components/demos/DemoDetail";
import { publicPageMetadata } from "@/lib/pageMetadata";
export const metadata = publicPageMetadata({
  title: "School Management & Learning Platform Demo",
  shareTitle: "A connected school. A visible learning journey.",
  description:
    "Explore a connected K–12 school demo: admissions, attendance, learning plans, assignments, student evidence, and family-visible feedback in one shared journey.",
  path: "/demos/education",
});
export default function EducationDemo() {
  return <DemoDetail kind="education" />;
}
