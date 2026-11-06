import DemoSchema from "@/components/demos/DemoSchema";
import DemoDetail from "@/components/demos/DemoDetail";
import { publicPageMetadata } from "@/lib/pageMetadata";
export const metadata = publicPageMetadata({
  title: "School Management & Learning Platform Demo",
  shareTitle: "One learning journey. Everyone connected.",
  description:
    "Explore a connected K–12 school demo: admissions, attendance, learning plans, assignments, student evidence, and family-visible feedback in one shared journey.",
  path: "/demos/education",
  image: "/images/demos/education-workspace.webp",
});
export default function EducationDemo() {
  return (
    <>
      <DemoSchema
        path="/demos/education"
        title="School Management & Learning Platform Demo"
        description="Explore admissions, classroom learning and family-visible feedback in a connected school experience."
        image="/images/demos/education-workspace.webp"
      />
      <DemoDetail kind="education" />
    </>
  );
}
