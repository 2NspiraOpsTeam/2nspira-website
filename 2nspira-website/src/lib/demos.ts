export const EDUCATION_DEMO_URL =
  "https://learning-grove-school-demo.jcortez-36a.workers.dev/";
export const MANUFACTURING_DEMO_URL = "https://demo.2nspira.com/manufacturing/";
export const demos = {
  education: {
    category: "Education",
    title: "School Management & Learning Platform",
    headline: "One student journey. A clearer school day.",
    intro:
      "Explore how your school could connect family information, administrative decisions, and classroom learning—without asking people to enter the same details again.",
    audience:
      "For small private K–12 day schools evaluating a connected admissions, student-management, and learning experience. This example follows one Grade 7 learner at a fictional school.",
    challenge:
      "When applications, schedules, attendance, and assignments live in separate places, staff repeat work and families struggle to see what comes next.",
    benefit:
      "Explore how a shared student record could reduce repeated entry, make handoffs clearer, and give teachers and families a more useful view of progress.",
    url: EDUCATION_DEMO_URL,
    cta: "Discuss a solution for your school",
    workflows: [
      [
        "Registration & admissions",
        "Complete a sample application, attach fictional document placeholders, verify details, and record an admission decision.",
      ],
      [
        "Enrollment & scheduling",
        "Reuse the student record for core classes and a timetable. Try a full elective’s waitlist and a prerequisite check.",
      ],
      [
        "Attendance & student records",
        "See guardian contacts and enrollment history; record Science 7 attendance and see the family view update.",
      ],
      [
        "Coursework & assignments",
        "Publish reading material and an assignment, submit field notes, save a private grade draft, then publish feedback.",
      ],
      [
        "Progress & communication",
        "See published feedback and attendance, browse sample announcements, and add a simulated school-support message.",
      ],
      [
        "Illustrative tuition",
        "See a single enrollment-linked charge and generate a simulated payment receipt. No money moves.",
      ],
    ],
    steps: [
      [
        "Begin as a parent",
        "Submit Riley Morgan’s pre-filled application with both required sample documents.",
      ],
      [
        "Make the administrative handoff",
        "Switch to Administrator, verify documents, admit Riley, and enroll in Mathematics 7 and Science 7. Try the full Robotics waitlist.",
      ],
      [
        "Bring the classroom to life",
        "Switch to Teacher to publish material and an assignment, and record attendance. Switch to Student to submit field notes.",
      ],
      [
        "Close the loop",
        "As Teacher, save then publish grade and feedback. As Parent, see progress and try the clearly simulated tuition payment.",
      ],
    ],
    limits:
      "One campus, one term, one linked family, two core classes, one assignment, and one dated attendance record. Document attachments are sample placeholders. Advanced timetabling, transcripts, multi-child accounts, real uploads, live messaging, and payment integrations are not included.",
  },
  manufacturing: {
    category: "Manufacturing",
    title: "Manufacturing Operations Platform",
    headline: "From order to shipment. Fewer blind spots.",
    intro:
      "Follow an order across materials, production, quality, and fulfillment. See how connected workflows could help your teams make decisions using the same operational picture.",
    audience:
      "For small and midsize manufacturers evaluating a connected operations workspace. Explore a fictional single-product factory with illustrative teams, stock, suppliers, and orders.",
    challenge:
      "Disconnected spreadsheets and paper handoffs make it harder to see shortages, production status, quality holds, and the next action an order needs.",
    benefit:
      "Explore how linked work orders, stock movements, and quality gates could reduce missed handoffs and improve visibility before a shipment is released.",
    url: MANUFACTURING_DEMO_URL,
    cta: "Discuss a solution for your manufacturing business",
    workflows: [
      [
        "Production planning & work orders",
        "Create an order and linked work order. Review cell workload and move through controlled stages; this is not an automated scheduling optimizer.",
      ],
      [
        "Inventory & procurement",
        "Test a material shortage, approve a sample purchase request, receive goods, and see stock update once.",
      ],
      [
        "Quality checks",
        "Record a failed inspection, keep the shipment on hold, document corrective work, and pass reinspection.",
      ],
      [
        "Orders & fulfillment",
        "See how material release and quality approval affect the order. Simulate dispatch and create a demo tracking reference.",
      ],
      [
        "Workforce coordination",
        "Explore fictional shift teams, cell workload, and task completion. Personnel administration is not included.",
      ],
      [
        "Operational reporting",
        "Inspect state-derived KPIs and activity. Explore labeled historical chart fixtures and local rules-based assistance—not a live AI model.",
      ],
    ],
    steps: [
      [
        "Start with a customer order",
        "Launch the demo and choose Take a 3-minute tour. Create an order for 50 units to generate a linked queued work order.",
      ],
      [
        "Resolve a material shortage",
        "Try releasing the work order. In Procurement, approve and receive PO-701, then release production with enough material.",
      ],
      [
        "Follow the quality gate",
        "Advance through Machining and Assembly. Fail an inspection, document corrective work, and pass reinspection.",
      ],
      [
        "See the operational result",
        "Simulate shipment, then inspect stock, order status, executive metrics, and activity. Refresh or reset to try again.",
      ],
    ],
    limits:
      "One product and bill of materials, full-batch quality acceptance, illustrative capacity and shifts, and synthetic historical charts. Multi-product planning, resource calendars, partial batches, traceability, real carrier events, enterprise role controls, forecasting, and live integrations are not included. These are follow-on gaps for a broader manufacturing solution, not available demo features.",
  },
} as const;
