export const samples = [
  {
    title: "Possible duplicate charge",
    team: "Customer support",
    text: "Hello, our statement shows two $480 charges for invoice INV-1023. Could someone investigate whether we were charged twice? Please let us know the next steps. — Alex, sample customer",
  },
  {
    title: "Project milestone update",
    team: "Client services",
    text: "Hi team, could you share an update on our website project and confirm the next milestone? We need to prepare our internal reviewers. — Jordan, sample client",
  },
  {
    title: "New starter setup",
    team: "People operations",
    text: "Our new employee starts Monday. Which onboarding steps are still pending for their laptop, access and orientation? Please help coordinate the setup. — Casey, sample manager",
  },
  {
    title: "Incomplete weekly report",
    team: "Operations",
    text: "The weekly report is missing figures from Sales and Fulfillment. Can we identify who should supply them and coordinate a corrected report? — Taylor, sample analyst",
  },
  {
    title: "Vendor payment status",
    team: "Finance",
    text: "Hello, invoice INV-1024 appears past due. Could you confirm its payment status and let us know who will follow up? — Morgan, sample vendor",
  },
];
export const invoices = [
  {
    invoice: "INV-1023",
    amount: "$480",
    entries: ["PAY-201: $480 captured", "PAY-202: $480 captured"],
    note: "Possible duplicate; human investigation required. No refund or balance change is authorized.",
  },
  {
    invoice: "INV-1024",
    amount: "$720",
    entries: ["No payment recorded in the synthetic ledger"],
    note: "Marked overdue in this fictional snapshot; not a live accounting lookup.",
  },
];
export type Proposal = {
  classification: string;
  summary: string;
  priority: "Low" | "Normal" | "High";
  team: string;
  caseTitle: string;
  task: string;
  draft: string;
};
export type Item = { status: "pending" | "approved" | "rejected"; id?: string };
export type State = {
  phase: "empty" | "analyzing" | "review" | "error";
  input?: string;
  proposal?: Proposal;
  case: Item;
  task: Item;
  email: Item;
  sent: boolean;
  audit: {
    at: string;
    actor: "System" | "AI" | "Demo reviewer";
    event: string;
  }[];
  error?: string;
};
export const initial = (): State => ({
  phase: "empty",
  case: { status: "pending" },
  task: { status: "pending" },
  email: { status: "pending" },
  sent: false,
  audit: [],
});
export function validateProposal(value: unknown): Proposal {
  if (!value || typeof value !== "object") throw new Error("Invalid AI result");
  const p = value as Record<string, unknown>;
  const limits = {
    classification: 100,
    summary: 700,
    team: 100,
    caseTitle: 160,
    task: 500,
    draft: 1600,
  };
  for (const [key, max] of Object.entries(limits))
    if (
      typeof p[key] !== "string" ||
      !(p[key] as string).trim() ||
      (p[key] as string).length > max ||
      /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(p[key] as string)
    )
      throw new Error("Invalid AI result");
  if (!["Low", "Normal", "High"].includes(p.priority as string))
    throw new Error("Invalid priority");
  return Object.fromEntries(
    [...Object.keys(limits), "priority"].map((k) => [
      k,
      (p[k] as string).trim(),
    ]),
  ) as Proposal;
}
