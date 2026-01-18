"use client"

import { cn } from "@/lib/utils"

export type FilterTab = "All" | "Pending" | "Approved" | "Completed" | "Rejected"

interface FilterTabsProps {
  activeTab: FilterTab
  onTabChange: (tab: FilterTab) => void
}

const tabs: FilterTab[] = ["All", "Pending", "Approved", "Completed", "Rejected"]

export function FilterTabs({ activeTab, onTabChange }: FilterTabsProps) {
  return (
    <div className="inline-flex items-center gap-1 p-1 bg-[hsl(var(--muted))] rounded-lg">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={cn(
            "px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200",
            activeTab === tab
              ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-sm"
              : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--background))]"
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
