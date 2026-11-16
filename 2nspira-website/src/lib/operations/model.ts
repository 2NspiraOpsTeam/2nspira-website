export const samples = [
  {
    title: "Possible duplicate charge",
    team: "Customer support → Finance",
    text: "To: Finance\nSubject: Review possible duplicate charge — INV-1023\n\nHi Finance, a customer reports two $480 charges for invoice INV-1023. Could you compare the payment references, check whether both charges relate to the same invoice and recommend the next step? Please prepare an internal update for Support before we respond to the customer. — Alex, sample support lead",
  },
  {
    title: "Disputed invoice amount",
    team: "Account management → Billing",
    text: "To: Billing\nSubject: Customer disputes the amount — INV-1024\n\nHi Billing, the customer says the $720 invoice INV-1024 is higher than the amount they expected. Could you compare the invoice line items with the agreed quote and flag any discrepancy? The quote is not included here. Please draft an internal update for Account Management; no adjustment has been approved. — Jordan, sample account manager",
  },
  {
    title: "Payment status question",
    team: "Collections → Accounts receivable",
    text: "To: Accounts Receivable\nSubject: Confirm payment status — INV-1024\n\nHi team, the customer says they have paid invoice INV-1024, but our statement still shows it outstanding. Could you check the payment allocation and identify what remittance details we need to reconcile it? Please prepare an internal response for Collections before the next reminder. — Casey, sample collections coordinator",
  },
  {
    title: "Credit not reflected",
    team: "Customer success → Billing",
    text: "To: Billing\nSubject: Check a reported credit — INV-1024\n\nHi Billing, the customer says a previously discussed credit is missing from their $720 invoice INV-1024. We do not have the credit approval or amount in this message. Could you verify whether an approved credit exists and explain the next step to Customer Success? Please do not promise or apply a credit. — Taylor, sample customer success lead",
  },
  {
    title: "Invoice breakdown question",
    team: "Sales → Billing",
    text: "To: Billing\nSubject: Clarify invoice line items — INV-1023\n\nHi Billing, a customer has asked what the $480 invoice INV-1023 covers and which service period it relates to. Could you check the original invoice and supporting agreement, then prepare an internal explanation for Sales to review? The line items and agreement are not attached. — Morgan, sample sales coordinator",
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
