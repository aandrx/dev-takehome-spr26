# Checklist

<!-- Make sure you fill out this checklist with what you've done before submitting! -->

- [x] Read the README [please please please]
- [wip] Something cool!
- [x] Back-end
  - [x] Minimum Requirements
    - [x] Setup MongoDB database
    - [x] Setup item requests collection
    - [x] `PUT /api/request`
    - [x] `GET /api/request?page=_`
  - [x] Main Requirements
    - [x] `GET /api/request?status=pending`
    - [x] `PATCH /api/request`
  - [x] Above and Beyond
    - [x] Batch edits - `PATCH /api/request` with `{ids: [], status: "status"}`
    - [x] Batch deletes - `DELETE /api/request?ids=id1,id2,id3`
- [x] Front-end
  - [x] Minimum Requirements
    - [x] Dropdown component (StatusDropdown)
    - [x] Table component (ItemRequestsTable)
    - [x] Base page [table with data]
    - [x] Table dropdown interactivity
  - [x] Main Requirements
    - [x] Pagination
    - [x] Tabs (FilterTabs)
  - [x] Above and Beyond
    - [x] Batch edits (BatchActionsBar with Mark As dropdown)
    - [x] Batch deletes (BatchActionsBar with Delete button)

## Testing Notes
- [ ] Verify filtering and batch operations work correctly
- [ ] Test pagination and status updates
- [ ] Check that all dropdowns and buttons function properly

# Notes

<!-- Notes go here -->

## Backend Implementation Notes

### Database
- **Database Name:** crisis-corner
- **Collection:** requests
- **Connection:** MongoDB Atlas (cloud)

### API Endpoints

**PUT /api/request**
- Creates new request with pending status
- Validates: requestorName (3-30 chars), itemRequested (2-100 chars)
- Returns: Created item with _id

**GET /api/request?page=1&status=pending**
- Returns paginated results (6 items per page)
- Optional status filter (pending/approved/completed/rejected)
- Sorted by requestCreatedDate descending
- Returns: { data: [], total: number }

**PATCH /api/request**
- Updates request status by ID
- Updates lastEditedDate to current time
- Validates status enum
- Returns: Updated item

### Environment Variables
- See `.env.example` for required environment variables
- Copy `.env.example` to `.env.local` and populate with your MongoDB credentials
- **IMPORTANT**: Never commit `.env.local` or actual credentials to version control

### IP Whitelist
- Network access set to 0.0.0.0/0 (all IPs allowed)
- **Security Note**: Consider restricting to specific IP ranges in production
