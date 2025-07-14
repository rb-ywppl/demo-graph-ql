// Create Mutation -->
mutation CreateReferenceData($createInput: CreateReferenceDataInput!) {
  createReferenceData(createInput: $createInput) {
    success
    message
    data {
      _id
      type
      name
      description
      status
      isArchived
    }
  }
}

// Variable -->
{
  "createInput": {
    "type": "materialCategory",
    "name": "Steel",
    "description": "All steel materials including TMT bars and structural steel."
  }
}

// Get All Query -->
query AllReferenceData($type: String!) {
  allReferenceData(type: $type) {
    success
    message
    data {
      _id
      type
      name
      description
      status
      isArchived
      companyId {
        _id
        companyName
      }
      branchId {
        _id
        branchName
      }
      createdAt
      updatedAt
    }
  }
}


// Variable -->
{
  "type": "materialCategory"
}

// Get All With Pagination Query -->
query AllReferenceDataWithPagination($type: String!
$page: Int
    $limit: Int
    $search: String) {
    allReferenceDataWithPagination(type: $type,page: $page, limit: $limit, search: $search) {
        success
        message
        totalRecords
        currentPage
        totalPages
        data {
            type
            _id
            name
            description
            status
            isArchived
            createdAt
            updatedAt
            companyId {
                _id
                companyName
            }
            branchId {
                _id
                branchName
            }
        }
    }
}


// Variable -->
{
    "type": "materialCategory",
    "page": 1,
    "limit": 5,
    "search": "Cement"
}

// Single Get Query -->
query ReferenceData($id: ID!) {
    ReferenceData(id: $id) {
        success
        message
        data {
            type
            _id
            name
            description
            status
            isArchived
            createdAt
            updatedAt
            companyId {
                _id
                companyName
            }
            branchId {
                _id
                branchName
            }
        }
    }
}


// Variable -->
{
    "id": "68724ed42e65432726387ebd"
}


// Update Mutation -->
mutation UpdateReferenceData($updateReferenceDataInput: UpdateReferenceDataInput!) {
  updateReferenceData(updateReferenceDataInput: $updateReferenceDataInput) {
    success
    message
    data {
      _id
      type
      name
      description
      status
      isArchived
    }
  }
}


Variable -->
{
  "updateReferenceDataInput": {
    "id": "68724ed42e65432726387ebd",
    "type": "materialCategory",
    "name": "Steel",
    "description": "Structural steel materials",
    "status": true
  }
}


Delete Mutation -->
mutation RemoveReferenceData($id: ID!)  {
    removeReferenceData(id: $id) {
        success
        message
    }
}


Variable -->
