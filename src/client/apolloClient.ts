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
