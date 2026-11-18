import DemoSchema from "@/components/demos/DemoSchema";
import DemoDetail from "@/components/demos/DemoDetail";
import { publicPageMetadata } from "@/lib/pageMetadata";
export const metadata = publicPageMetadata({
  title: "2Nspira Campus — School & Learning Demo",
  shareTitle: "2Nspira Campus — Learning opens possibilities.",
  description:
    "Explore 2Nspira Campus: connected school-office priorities, curriculum publishing, calendars, announcements, classroom learning, and family-visible feedback.",
  path: "/demos/education",
  image: "/images/demos/education-workspace.webp",
});
export default function EducationDemo() {
  return (
    <>
      <DemoSchema
        path="/demos/education"
        title="2Nspira Campus — School & Learning Demo"
        description="Explore 2Nspira Campus with connected school-office workflows, curriculum, classroom learning and family-visible feedback."
        image="/images/demos/education-workspace.webp"
      />
      <DemoDetail kind="education" />
    </>
  );
}
