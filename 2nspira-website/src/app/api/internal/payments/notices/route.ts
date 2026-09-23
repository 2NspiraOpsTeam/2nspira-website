import { and, eq, lte } from "drizzle-orm";
import { advanceNotifications, billingSchedules } from "@/db/schema";
import { getDb } from "@/lib/portal/db";
import { requirePaymentJob } from "@/lib/portal/internal-auth";

export async function POST(request: Request) {
  try {
    requirePaymentJob(request); const db = getDb(); const now = new Date(); const horizon = new Date(now); horizon.setUTCDate(horizon.getUTCDate() + 3);
    const schedules = await db.select().from(billingSchedules).where(and(eq(billingSchedules.status, "active"), lte(billingSchedules.nextChargeAt, horizon.toISOString()))); let created = 0;
    for (const schedule of schedules) {
      if (new Date(schedule.nextChargeAt) <= now) continue;
      const result = await db.insert(advanceNotifications).values({ id: `notice_${crypto.randomUUID()}`, organizationId: schedule.organizationId, scheduleId: schedule.id, chargeAt: schedule.nextChargeAt, status: "scheduled", createdAt: now.toISOString() }).onConflictDoNothing({ target: [advanceNotifications.scheduleId, advanceNotifications.chargeAt] });
      if (result.meta.changes) created++;
    }
    return Response.json({ created });
  } catch { return Response.json({ error: "Payment job authorization or notice generation failed" }, { status: 403 }); }
}
