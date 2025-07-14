import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://192.168.2.15:8001/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2I0NGM2NThlY2Y0ZWNmY2FhMzRkMzgiLCJ0b2tlblZlcnNpb24iOjM1LCJjb21wYW55SWQiOiI2NzU3YzZlZDNhYTFlODU2MTc0YzQ5NzIiLCJicmFuY2hJZCI6IjY4NjM3ZTZjYzgwNDBlNmJkNWQyNWE3ZCIsInR5cGUiOiJ1c2VyIiwiaWF0IjoxNzUyNDc0OTM0LCJleHAiOjE3NTI3MzQxMzR9.T5PG5vST1MHd8L8BOmIuNGP1xtJ4JHWg-UJuT2rXpjI";

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
