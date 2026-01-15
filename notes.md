# Checklist

<!-- Make sure you fill out this checklist with what you've done before submitting! -->

- [x] Read the README [please please please]
- [wip] Something cool!
- [ ] Back-end
  - [x] Minimum Requirements
    - [x] Setup MongoDB database
    - [x] Setup item requests collection
    - [x] `PUT /api/request`
    - [x] `GET /api/request?page=_`
  - [x] Main Requirements
    - [x] `GET /api/request?status=pending`
    - [x] `PATCH /api/request`
  - [ ] Above and Beyond
    - [ ] Batch edits
    - [ ] Batch deletes
- [ ] Front-end
  - [ ] Minimum Requirements
    - [ ] Dropdown component
    - [ ] Table component
    - [ ] Base page [table with data]
    - [ ] Table dropdown interactivity
  - [ ] Main Requirements
    - [ ] Pagination
    - [ ] Tabs
  - [ ] Above and Beyond
    - [ ] Batch edits
    - [ ] Batch deletes

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
- MONGODB_URI=mongodb+srv://crisis_admin:dLtIQVoseVMCymcO@bog-takehome.ue7xolq.mongodb.net/crisis-corner?appName=bog-takehome

### IP Whitelist
- Network access set to 0.0.0.0/0 (all IPs allowed)
