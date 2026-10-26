export type Question = {
  id: string;
  label: string;
  type: "short" | "long" | "choice" | "checkbox";
  required: boolean;
  options: string[];
};
export type Job = {
  additionalDetails?: string;
  resumeOrProfile?: boolean;
  id: string;
  title: string;
  location: string;
  employmentType: string;
  compensation: string;
  description: string;
  responsibilities: string;
  qualifications: string;
  hiringEmail: string;
  coverRequired: boolean;
  questions: Question[];
  status: "draft" | "published" | "closed";
  revision: number;
  postingReviewed: boolean;
  updatedAt?: string;
};
export type Settings = {
  retentionStatus?: "pending" | "approved";
  retentionBasis?: string;
  privacyEmail: string;
  accommodationEmail: string;
  retentionDays: number;
};
export const questions = [
  "Describe how you helped a consulting or professional services business acquire new clients. What was your personal contribution?",
  "How would you approach finding 2Nspira’s first clients during your first 30 days?",
  "Which industries and types of decision-makers do you have experience working with?",
  "How do you determine whether a prospect is a qualified opportunity?",
  "Describe your approach to outreach, follow-up, and moving an opportunity toward a signed agreement.",
  "What is your availability and preferred engagement arrangement?",
];
export const firstJob: Job = {
  id: "business-development-lead-client-acquisition",
  title: "Business Development Lead — Client Acquisition",
  location: "",
  employmentType: "",
  compensation: "",
  description: "",
  responsibilities: "",
  qualifications: "",
  hiringEmail: "",
  coverRequired: false,
  questions: questions.map((label, i) => ({
    id: `q${i + 1}`,
    label,
    type: "long",
    required: true,
    options: [],
  })),
  status: "draft",
  revision: 1,
  postingReviewed: false,
};
export const emailValid = (s: string) =>
  typeof s === "string" &&
  s.length <= 254 &&
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)+$/.test(
    s,
  );
export function validateJob(j: Job, publishing = false): string[] {
  const errors: string[] = [];
  if (!j || typeof j !== "object") return ["Invalid opening."];
  for (const k of [
    "id",
    "title",
    "location",
    "employmentType",
    "compensation",
    "description",
    "responsibilities",
    "qualifications",
    "hiringEmail",
  ] as const)
    if (
      typeof j[k] !== "string" ||
      j[k].length >
        (["description", "responsibilities", "qualifications"].includes(k)
          ? 20000
          : 300)
    )
      errors.push(`Invalid ${k}.`);
  if (
    !/^[a-z0-9-]{1,100}$/.test(j.id) ||
    typeof j.title !== "string" ||
    !j.title.trim()
  )
    errors.push("A title and valid identifier are required.");
  if (
    !["draft", "published", "closed"].includes(j.status) ||
    !Number.isInteger(j.revision)
  )
    errors.push("Invalid opening state.");
  if (!Array.isArray(j.questions) || j.questions.length > 25)
    errors.push("Use at most 25 questions.");
  else {
    const ids = new Set<string>();
    for (const q of j.questions) {
      if (
        !q ||
        typeof q.id !== "string" ||
        !/^[a-zA-Z0-9-]{1,80}$/.test(q.id) ||
        ids.has(q.id) ||
        typeof q.label !== "string" ||
        !q.label.trim() ||
        q.label.length > 1500 ||
        !["short", "long", "choice", "checkbox"].includes(q.type) ||
        typeof q.required !== "boolean" ||
        !Array.isArray(q.options) ||
        q.options.length > 30 ||
        q.options.some(
          (x) => typeof x !== "string" || !x.trim() || x.length > 300,
        ) ||
        new Set(q.options).size !== q.options.length ||
        (["choice", "checkbox"].includes(q.type) && q.options.length < 2)
      )
        errors.push(
          "Each question needs a unique ID, text, type and valid choices.",
        );
      ids.add(q?.id);
    }
  }
  if (
    typeof j.coverRequired !== "boolean" ||
    typeof j.postingReviewed !== "boolean"
  )
    errors.push("Invalid required-field settings.");
  if (
    j.additionalDetails !== undefined &&
    (typeof j.additionalDetails !== "string" ||
      j.additionalDetails.length > 30000)
  )
    errors.push("Additional details must be at most 30,000 characters.");
  if (j.resumeOrProfile !== undefined && typeof j.resumeOrProfile !== "boolean")
    errors.push("Invalid résumé requirement.");
  if (publishing) {
    for (const k of [
      "location",
      "employmentType",
      "compensation",
      "description",
      "responsibilities",
      "qualifications",
    ] as const)
      if (!j[k]?.trim()) errors.push(`Complete ${k} before publishing.`);
    if (!emailValid(j.hiringEmail || ""))
      errors.push("Provide the hiring contact email.");
    if (!j.postingReviewed)
      errors.push(
        "Confirm location-specific posting requirements before publishing.",
      );
  }
  return errors;
}
export function validateAnswers(
  job: Job,
  answers: Record<string, unknown>,
): string[] {
  const errors: string[] = [];
  if (!answers || typeof answers !== "object" || Array.isArray(answers))
    return ["Invalid questionnaire responses."];
  if (
    Object.keys(answers).some((id) => !job.questions.some((q) => q.id === id))
  )
    errors.push("The questionnaire changed. Reload the role before applying.");
  for (const q of job.questions) {
    const a = answers[q.id];
    if (
      q.required &&
      (a === undefined || a === "" || (Array.isArray(a) && !a.length))
    )
      errors.push(`Required: ${q.label}`);
    if (a === undefined) continue;
    if (q.type === "checkbox") {
      if (
        !Array.isArray(a) ||
        a.length > q.options.length ||
        new Set(a).size !== a.length ||
        a.some((x) => typeof x !== "string" || !q.options.includes(x))
      )
        errors.push(`Invalid response: ${q.label}`);
    } else if (
      typeof a !== "string" ||
      a.length > (q.type === "short" ? 500 : 6000) ||
      (q.type === "choice" && a !== "" && !q.options.includes(a)) ||
      (q.required && !a.trim())
    )
      errors.push(`Invalid response: ${q.label}`);
  }
  return errors;
}
