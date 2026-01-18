"use client"

import { useState } from "react"
import { StatusDropdown } from "../atoms/StatusDropdown"
import { Status } from "../atoms/StatusBadge"
import { Checkbox } from "../ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { cn } from "@/lib/utils"
import { ItemRequest as ImportedItemRequest } from "@/lib/types/request"

type ItemRequest = ImportedItemRequest & { _id: string }

interface ItemRequestsTableProps {
  requests?: ItemRequest[]
  onStatusChange: (id: string, newStatus: Status) => Promise<void>
  selectedIds?: string[]
  onSelectionChange?: (ids: string[]) => void
  showCheckboxes?: boolean
}

export function ItemRequestsTable({
  requests = [],
  onStatusChange,
  selectedIds = [],
  onSelectionChange,
  showCheckboxes = true,
}: ItemRequestsTableProps) {
  const [updatingIds, setUpdatingIds] = useState<Set<string>>(new Set())

  const handleStatusChange = async (id: string, newStatus: Status) => {
    setUpdatingIds((prev) => new Set(prev).add(id))
    try {
      await onStatusChange(id, newStatus)
    } finally {
      setUpdatingIds((prev) => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (onSelectionChange) {
      const newSelection = checked ? requests.map(r => r._id) : []
      console.log('Select all:', checked, 'IDs:', newSelection)
      onSelectionChange(newSelection)
    }
  }

  const handleSelectOne = (id: string, checked: boolean) => {
    if (onSelectionChange) {
      const newSelection = checked
        ? [...selectedIds, id]
        : selectedIds.filter(sid => sid !== id)
      console.log('Select one:', id, checked, 'New selection:', newSelection)
      onSelectionChange(newSelection)
    }
  }

  const allSelected = requests.length > 0 && selectedIds.length === requests.length

  // Map RequestStatus to Status
  const mapStatus = (status: ImportedItemRequest["status"]): Status => {
    const mapping: Record<string, Status> = {
      pending: "Pending",
      approved: "Approved",
      completed: "Completed",
      rejected: "Rejected"
    }
    return mapping[status] || "Pending"
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          {showCheckboxes && (
            <TableHead className="w-[50px] pl-6">
              <div className="w-6 h-6 flex items-center justify-center">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all"
                />
              </div>
            </TableHead>
          )}
          <TableHead className="text-[hsl(var(--muted-foreground))] font-medium">Name</TableHead>
          <TableHead className="text-[hsl(var(--muted-foreground))] font-medium w-[280px]">Item Requested</TableHead>
          <TableHead className="text-[hsl(var(--muted-foreground))] font-medium">Created</TableHead>
          <TableHead className="text-[hsl(var(--muted-foreground))] font-medium">Updated</TableHead>
          <TableHead className="text-[hsl(var(--muted-foreground))] font-medium w-[140px]">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.length === 0 ? (
          <TableRow>
            <TableCell colSpan={showCheckboxes ? 6 : 5} className="text-center py-12 text-[hsl(var(--muted-foreground))]">
              No requests found
            </TableCell>
          </TableRow>
        ) : (
          requests.map((request) => {
            const isUpdating = updatingIds.has(request._id)
            const isSelected = selectedIds.includes(request._id)

            return (
              <TableRow 
                key={request._id}
                className={cn(
                  "transition-colors",
                  isSelected ? "bg-[hsl(var(--primary))]/5" : "hover:bg-[hsl(var(--muted))]/50"
                )}
              >
                {showCheckboxes && (
                  <TableCell className="pl-6">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) => handleSelectOne(request._id, !!checked)}
                      aria-label={`Select ${request.requestorName}`}
                    />
                  </TableCell>
                )}
                <TableCell className="font-medium text-[hsl(var(--foreground))]">
                  {request.requestorName}
                </TableCell>
                <TableCell className="text-[hsl(var(--muted-foreground))]">
                  {request.itemRequested}
                </TableCell>
                <TableCell className="text-[hsl(var(--muted-foreground))]">
                  {new Date(request.requestCreatedDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-[hsl(var(--muted-foreground))]">
                  {request.lastEditedDate
                    ? new Date(request.lastEditedDate).toLocaleDateString()
                    : "-"}
                </TableCell>
                <TableCell>
                  <StatusDropdown
                    currentStatus={mapStatus(request.status)}
                    onStatusChange={(newStatus) =>
                      handleStatusChange(request._id, newStatus)
                    }
                    disabled={isUpdating}
                  />
                </TableCell>
              </TableRow>
            )
          })
        )}
      </TableBody>
    </Table>
  )
}
