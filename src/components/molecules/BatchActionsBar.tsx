"use client"

import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { ChevronUp, Trash2 } from "lucide-react"
import { Status } from "../atoms/StatusBadge"
import { StatusBadge } from "../atoms/StatusBadge"
import { cn } from "@/lib/utils"

const statusOptions: Status[] = ["Pending", "Approved", "Completed", "Rejected"]

interface BatchActionsBarProps {
  selectedCount: number
  onBatchStatusChange: (status: Status) => Promise<void>
  onBatchDelete: () => Promise<void>
  disabled?: boolean
}

export function BatchActionsBar({
  selectedCount,
  onBatchStatusChange,
  onBatchDelete,
  disabled = false,
}: BatchActionsBarProps) {
  const isDisabled = disabled || selectedCount === 0

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <span className={cn(
          "text-sm",
          isDisabled ? "text-[hsl(var(--muted-foreground))]/50" : "text-[hsl(var(--muted-foreground))]"
        )}>Mark As</span>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger
            disabled={isDisabled}
            className={cn(
              "inline-flex items-center justify-between gap-2 w-[140px] px-3 py-1.5 text-sm border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--card))]",
              "focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-offset-2",
              isDisabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <span className="text-[hsl(var(--muted-foreground))]">Status</span>
            <ChevronUp className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="w-40 bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-lg z-50 p-1 rounded-md"
              align="end"
              sideOffset={5}
            >
              {statusOptions.map((status) => (
                <DropdownMenu.Item
                  key={status}
                  onSelect={() => onBatchStatusChange(status)}
                  className="flex items-center cursor-pointer px-2 py-1.5 rounded-md hover:bg-transparent focus:bg-transparent outline-none"
                >
                  <span className="inline-flex items-center rounded-md px-2 py-0.5 transition-colors hover:bg-[hsl(var(--muted))]">
                    <StatusBadge status={status} />
                  </span>
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>

      <button
        onClick={onBatchDelete}
        disabled={isDisabled}
        className={cn(
          "p-2 rounded-md transition-colors",
          isDisabled
            ? "text-[hsl(var(--muted-foreground))]/50 cursor-not-allowed" 
            : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))]"
        )}
        aria-label="Delete selected"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  )
}
