# GraphQL Integration Guide

this guide documents how GraphQL is integrated into the Material Category management module using Apollo Client, including setup, query structure, and usage in form, table, and view components.

---

### 🧱 Folder Structure

```
client/
  └── querys/
      └── crud/
          └── Index.ts   # Contains all related queries/mutations
apolloClient.ts           # Apollo Client setup

components/
  └── ui/                 # Custom UI components (Input, Dialog, Table, etc.)
  └── Switch.tsx          # Toggle switch component

pages/
  └── Crud/
      ├── Index.tsx       # Table + actions
      ├── Form.tsx        # Create/Update form
      ├── View.tsx        # View dialog
      └── types.ts        # Type definitions

```

---

## ⚙️ Apollo Client Setup

**File**: `apolloClient.ts`

```
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://192.168.2.15:8001/graphql",
});

export const setAuthToken = (token: string) => {
  localStorage.setItem("AUTH_KEY", token);
};

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("AUTH_KEY");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

```

Use this `client` in your root provider:

```tsx
import { ApolloProvider } from "@apollo/client";
import { client } from "./client/apolloClient";

<ApolloProvider client={client}>
  <App />
</ApolloProvider>;
```

---

## 📡 GraphQL Queries & Mutations

**File**: `client/querys/crud/Index.ts`

- `FIND_RECORDS`: Fetch all reference data by type
- `GET_RECORDS`: Fetch by ID
- `CREATE_RECORDS`: Create new
- `UPDATE_RECORDS`: Update existing
- `DELETE_RECORDS`: Delete by ID

---

## 🧾 Table + Actions (Index Page)

**File**: `Crud/Index.tsx`

- Fetches data using `useQuery(FIND_RECORDS)`
- Shows records in a table
- Handles add, edit, view, delete actions
- Uses `Form.tsx` and `View.tsx` components

Key logic:

```
const { data, loading, refetch } = useQuery(FIND_RECORDS, {
  variables: { type: "materialCategory" },
});

const [deleteCategory] = useMutation(DELETE_RECORDS);

const handleDelete = async (item: DATAI) => {
  const res = await deleteCategory({ variables: { id: item._id } });
  if (res?.data?.removeReferenceData?.success) {
    toast.success(res.data.removeReferenceData.message);
    refetch();
  }
};

```

---

## 📝 Create / Update Form

**File**: `Crud/Form.tsx`

Uses `useMutation(CREATE_RECORDS)` and `useMutation(UPDATE_RECORDS)`:

```
const [createUser] = useMutation(CREATE_RECORDS);
const [updateUser] = useMutation(UPDATE_RECORDS);

const onSubmit = async (data) => {
  const mutation = editData ? updateUser : createUser;
  const response = await mutation({
    variables: {
      ...(editData
        ? {
            updateReferenceDataInput: {
              id: editData._id,
              type: "materialCategory",
              ...data,
            },
          }
        : {
            createInput: {
              type: "materialCategory",
              ...data,
            },
          }),
    },
  });

  if (response?.data?.[editData ? "updateReferenceData" : "createReferenceData"]?.success) {
    toast.success("Saved");
    refetch();
    onClose();
  }
};

```

---

## 👁️ View Dialog

**File**: `Crud/View.tsx`

- Accepts `data` of type `DATAI`
- Shows non-editable info using custom dialog and labels
- Dates formatted using `toLocaleString`

---

## 📦 TypeScript Interface

**File**: `Crud/types.ts`

```
export interface DATAI {
  _id: string;
  type: string;
  name: string;
  description: string;
  status: boolean;
  isArchived: boolean;
  companyId: {
    _id: string;
    companyName: string;
  };
  branchId: {
    _id: string;
    branchName: string;
  };
  createdAt: string;
  updatedAt: string;
}

```

---

## 🔁 Refetching Data

Each mutation triggers a `refetch()` on success to update the table UI with the latest data.

---

## ✅ Final Tips

- Separate queries by domain/module like you’ve done for scalability.
- Always handle errors (GraphQL + Network).
- Use `toast` or `Snackbar` for user feedback.
- For large forms, break into sections and use reusable field components.
- Use optimistic UI or `cache.modify` for performance tuning
