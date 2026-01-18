import { cn } from "@/lib/utils"

export type Status = "Completed" | "Pending" | "Approved" | "Rejected"

const statusStyles: Record<Status, string> = {
  Completed: "bg-[hsl(var(--status-completed-bg))] text-[hsl(var(--status-completed))]",
  Approved: "bg-[hsl(var(--status-approved-bg))] text-[hsl(var(--status-approved))]",
  Pending: "bg-[hsl(var(--status-pending-bg))] text-[hsl(var(--status-pending))]",
  Rejected: "bg-[hsl(var(--status-rejected-bg))] text-[hsl(var(--status-rejected))]",
}

interface StatusBadgeProps {
  status: Status
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md",
        statusStyles[status],
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status}
    </span>
  )
}
