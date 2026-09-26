export function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: "bg-emerald-100 text-emerald-700",
    paid: "bg-emerald-100 text-emerald-700",
    succeeded: "bg-emerald-100 text-emerald-700",
    processing: "bg-blue-100 text-blue-700",
    pending: "bg-amber-100 text-amber-700",
    paused: "bg-amber-100 text-amber-700",
    draft: "bg-gray-100 text-gray-600",
    overdue: "bg-red-100 text-red-700",
    failed: "bg-red-100 text-red-700",
    canceled: "bg-red-100 text-red-700",
    refunded: "bg-gray-100 text-gray-600",
    terminated: "bg-red-100 text-red-700",
    expired: "bg-red-100 text-red-700",
    revoked: "bg-red-100 text-red-700",
  };

  const cls = styles[status] || "badge-neutral";
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${cls}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
