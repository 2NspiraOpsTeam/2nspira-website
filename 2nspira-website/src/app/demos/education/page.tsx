import DemoDetail from "@/components/demos/DemoDetail";
import { publicPageMetadata } from "@/lib/pageMetadata";
export const metadata = publicPageMetadata({
  title: "School Management & Learning Platform Demo",
  shareTitle: "One student journey. A clearer school day.",
  description:
    "Explore connected admissions, enrollment, attendance, coursework, assignments, and progress through administrator, teacher, student, and parent demo experiences.",
  path: "/demos/education",
});
export default function EducationDemo() {
  return <DemoDetail kind="education" />;
}
