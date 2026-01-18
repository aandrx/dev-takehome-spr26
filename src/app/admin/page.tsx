"use client"

import { useState, useEffect, useMemo } from "react"
import { ItemRequestsTable } from "@/components/molecules/ItemRequestsTable"
import { FilterTabs } from "@/components/molecules/FilterTabs"
import { BatchActionsBar } from "@/components/molecules/BatchActionsBar"
import Pagination from "@/components/molecules/Pagination"
import { ItemRequest } from "@/lib/types/request"
import { Status } from "@/components/atoms/StatusBadge"

export default function AdminPage() {
  const [allItems, setAllItems] = useState<ItemRequest[]>([])
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [activeFilter, setActiveFilter] = useState<Status | "All">("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const pageSize = 10

  // Filter items on the client side
  const filteredItems = useMemo(() => {
    if (activeFilter === "All") return allItems
    return allItems.filter((item) => {
      const mapping: Record<string, Status> = {
        pending: "Pending",
        approved: "Approved",
        completed: "Completed",
        rejected: "Rejected"
      }
      return mapping[item.status] === activeFilter
    })
  }, [allItems, activeFilter, refreshKey])

  // Paginate filtered items
  const totalRecords = filteredItems.length
  const startIndex = (currentPage - 1) * pageSize
  const paginatedItems = filteredItems.slice(startIndex, startIndex + pageSize)

  useEffect(() => {
    fetchItems()
  }, [])

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1)
    setSelectedIds([])
  }, [activeFilter])

  const fetchItems = async () => {
    setIsLoading(true)
    try {
      // Fetch all items without status filter, add timestamp to prevent caching
      const response = await fetch(`/api/request?page=1&pageSize=1000&t=${Date.now()}`, {
        cache: 'no-store'
      })
      const data = await response.json()
      
      console.log('Fetched items:', data)
      
      if (data.success) {
        const items = data.data.requests.filter((r: ItemRequest) => r._id)
        console.log('Setting allItems:', items.length, 'items', items.map((i: any) => ({ id: i._id, status: i.status })))
        // Force a new array reference to trigger re-render
        setAllItems([...items])
        setRefreshKey(prev => prev + 1)
      }
    } catch (error) {
      console.error("Failed to fetch items:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusChange = async (id: string, newStatus: Status) => {
    try {
      // Convert Status to lowercase for API
      const apiStatus = newStatus.toLowerCase()
      const response = await fetch(`/api/request`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: apiStatus }),
      })

      if (response.ok) {
        await fetchItems()
      }
    } catch (error) {
      console.error("Failed to update status:", error)
    }
  }

  const handleBatchStatusChange = async (newStatus: Status) => {
    try {
      console.log('Batch status change:', { newStatus, selectedIds })
      // Convert Status to lowercase for API
      const apiStatus = newStatus.toLowerCase()
      
      // Use batch update endpoint
      const response = await fetch(`/api/request`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedIds, status: apiStatus }),
      })
      
      const data = await response.json()
      console.log('Batch update result:', response.status, data)
      
      if (response.ok) {
        // Clear selection
        setSelectedIds([])
        // Force fresh data fetch
        setAllItems([])
        await fetchItems()
      } else {
        console.error('Batch update failed:', data)
      }
    } catch (error) {
      console.error("Failed to batch update:", error)
    }
  }

  const handleBatchDelete = async () => {
    try {
      console.log('Batch delete:', selectedIds)
      
      // Use batch delete endpoint
      const response = await fetch(`/api/request?ids=${selectedIds.join(',')}`, {
        method: "DELETE",
      })
      
      const data = await response.json()
      console.log('Batch delete result:', response.status, data)
      
      if (response.ok) {
        setSelectedIds([])
        // Force fresh data fetch
        setAllItems([])
        await fetchItems()
      } else {
        console.error('Batch delete failed:', data)
      }
    } catch (error) {
      console.error("Failed to batch delete:", error)
    }
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    setSelectedIds([])
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[hsl(var(--card))] rounded-lg border border-[hsl(var(--border))] shadow-sm">
          {/* Header */}
          <div className="flex flex-col gap-4 p-6 border-b border-[hsl(var(--border))]">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-[hsl(var(--foreground))]">
                Item Requests
              </h1>
              <BatchActionsBar
                selectedCount={selectedIds.length}
                onBatchStatusChange={handleBatchStatusChange}
                onBatchDelete={handleBatchDelete}
                disabled={isLoading}
              />
            </div>
            <FilterTabs activeTab={activeFilter} onTabChange={setActiveFilter} />
          </div>

          {/* Table */}
          <div className="p-6">
            <ItemRequestsTable
              requests={paginatedItems as any}
              selectedIds={selectedIds}
              onSelectionChange={setSelectedIds}
              onStatusChange={handleStatusChange}
              showCheckboxes={true}
            />
          </div>

          {/* Footer with Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-[hsl(var(--border))]">
            <div className="text-sm text-[hsl(var(--muted-foreground))]">
              Showing {paginatedItems.length > 0 ? startIndex + 1 : 0} to{" "}
              {Math.min(startIndex + pageSize, totalRecords)} of {totalRecords} results
            </div>
            <Pagination
              pageNumber={currentPage}
              pageSize={pageSize}
              totalRecords={totalRecords}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

//legacy code 

// "use client";

// import Button from "@/components/atoms/Button";
// import Input from "@/components/atoms/Input";
// import { useState } from "react";

// /**
//  * Legacy front-end code from Crisis Corner's previous admin page!
//  */
// export default function ItemRequestsPage() {
//   const [item, setItem] = useState<string>("");
//   const [itemList, setItemList] = useState<string[]>([]);

//   const handleAddItem = (): void => {
//     if (item.trim()) {
//       setItemList((prevList) => [...prevList, item.trim()]);
//       setItem("");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-8 flex flex-col items-center gap-6">
//       <h2 className="font-bold">Approve Items</h2>

//       <div className="flex flex-col w-full gap-4">
//         <Input
//           type="text"
//           placeholder="Type an item"
//           value={item}
//           onChange={(e) => setItem(e.target.value)}
//           label="Item"
//         />
//         <Button onClick={handleAddItem}>Approve</Button>
//       </div>
//       <div className="flex flex-col gap-3">
//         <h3 className="underline">Currently approved items:</h3>
//         {itemList.length > 0 ? (
//           <ul className="list-disc pl-5">
//             {itemList.map((listItem, index) => (
//               <li key={index}>{listItem}</li>
//             ))}
//           </ul>
//         ) : (
//           "None :("
//         )}
//       </div>
//     </div>
//   );
// }
