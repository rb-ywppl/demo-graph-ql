# 🚀 GraphQL Integration Guide

![Apollo Client](https://img.shields.io/badge/Apollo--Client-GraphQL-blue?logo=apollo-graphql&style=for-the-badge)
![React](https://img.shields.io/badge/React-UI-blue?logo=react&style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-Strong%20Typing-blue?logo=typescript&style=for-the-badge)
![MIT License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen?style=for-the-badge)

> ✨ _Built with ❤️ using Apollo Client and React_

---

This guide covers how GraphQL is integrated using **Apollo Client** in the Material Category management module. It includes setup, folder structure, query/mutation usage, and integration within form, table, and view pages.

---

## 🗂️ Project Structure

```
📁 client/
└── 📁 querys/
└── 📁 crud/
└── apolloClient.ts

📁 components/
└── 📁 ui/ # Custom UI elements
└── Switch.tsx # Toggle component

📁 pages/
└── 📁 Crud/
├── Index.tsx # Table with actions
├── Form.tsx # Add/Edit form
├── View.tsx # View-only dialog
└── types.ts # TypeScript interfaces
```

---

## ⚙️ Apollo Client Setup

📄 **File**: `client/apolloClient.ts`

```ts
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

🔗 Add the client to the root provider:

```tsx
<ApolloProvider client={client}>
  <App />
</ApolloProvider>
```

---

## 📡 GraphQL Operations

📄 **File**: `client/querys/crud/Index.ts`

```ts
export const FIND_RECORDS; // Get all records by type
export const GET_RECORDS; // Get single record by ID
export const CREATE_RECORDS; // Add new record
export const UPDATE_RECORDS; // Modify existing record
export const DELETE_RECORDS; // Remove record by ID
```

---

## 🧾 Table + Actions (📁 `Crud/Index.tsx`)

- Fetches data via `useQuery(FIND_RECORDS)`
- Renders table with view, edit, delete functionality
- Reuses form and view components

🔑 Sample Logic:

```ts
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

## 📝 Create / Update Form (📁 `Crud/Form.tsx`)

- Reusable form for both create and update operations
- Uses dynamic mutation based on presence of `editData`

```ts
const [createUser] = useMutation(CREATE_RECORDS);
const [updateUser] = useMutation(UPDATE_RECORDS);

const onSubmit = async (data) => {
  const mutation = editData ? updateUser : createUser;
  const variables = editData
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
      };

  const response = await mutation({ variables });

  if (
    response?.data?.[editData ? "updateReferenceData" : "createReferenceData"]
      ?.success
  ) {
    toast.success("Saved");
    refetch();
    onClose();
  }
};
```

---

## 👁️ View Dialog (📁 `Crud/View.tsx`)

- Read-only view of a record
- Clean dialog with labels and localized timestamps

---

## 🧾 TypeScript Interface (📁 `Crud/types.ts`)

```ts
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

## 🔁 Data Refreshing Strategy

Each mutation triggers `refetch()` on success to keep the table in sync with the backend.

---

## ✅ Best Practices

- 🧩 **Modular structure**: Keep GraphQL operations grouped by domain.
- ⚠️ **Error handling**: Wrap queries/mutations in `try/catch`.
- 🔔 **User feedback**: Use `toast` or `Snackbar` for success/error alerts.
- 🧠 **Optimistic UI**: Use `cache.modify` or `refetch` for a better UX.
- 🔄 **Reusable UI**: Use form field generators for large/dynamic forms.

---

## 🔗 Full Documentation

👉 [**Open Full Docs in Notion**](https://www.notion.so/GraphQL-Integration-Guide-230afd3d3fe580578ac3f0085d6cc626?source=copy_link)

> _(Right click to open in a new tab if markdown doesn’t support target)_

---

## 🙌 Contribution & Feedback

If you have suggestions or improvements for this guide, feel free to open a PR or create an issue. Happy coding!
