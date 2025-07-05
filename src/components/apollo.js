import {ApolloClient, InMemoryCache, createHttpLink} from "@apollo/client/core";

const httpLink = new createHttpLink ({
    url: "http://localhost:4000"
});

export const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});