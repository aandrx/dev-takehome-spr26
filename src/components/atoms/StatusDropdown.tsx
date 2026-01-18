"use client"

import { useState } from "react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { ChevronDown, Check } from "lucide-react"
import { StatusBadge, Status } from "./StatusBadge"
import { cn } from "@/lib/utils"

const statusOptions: Status[] = ["Completed", "Pending", "Approved", "Rejected"]

interface StatusDropdownProps {
  currentStatus: Status
  onStatusChange: (newStatus: Status) => Promise<void>
  disabled?: boolean
}

export function StatusDropdown({ 
  currentStatus, 
  onStatusChange,
  disabled = false 
}: StatusDropdownProps) {
  const [localStatus, setLocalStatus] = useState(currentStatus)

  const handleStatusChange = async (newStatus: Status) => {
    setLocalStatus(newStatus)
    await onStatusChange(newStatus)
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        disabled={disabled}
        className="inline-flex items-center justify-between gap-2 w-[140px] px-3 py-1 border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--card))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <StatusBadge status={localStatus} />
        <ChevronDown className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
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
              onClick={() => handleStatusChange(status)}
              className={cn(
                "flex items-center justify-between cursor-pointer px-2 py-1.5 rounded-md hover:bg-transparent focus:bg-transparent outline-none",
                localStatus === status && "bg-[hsl(var(--muted))]"
              )}
            >
              <span className="inline-flex items-center rounded-md px-2 py-0.5 transition-colors hover:bg-[hsl(var(--muted))]">
                <StatusBadge status={status} />
              </span>
              {localStatus === status && <Check className="w-4 h-4 text-[hsl(var(--foreground))]" />}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
