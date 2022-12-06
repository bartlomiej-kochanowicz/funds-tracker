import { ApolloClient, InMemoryCache } from '@apollo/client';
import { API_URL, IS_DEVELOPMENT } from 'config/env';

const client = new ApolloClient({
  uri: IS_DEVELOPMENT ? API_URL : '/api/graphql',
  cache: new InMemoryCache(),
});

export default client;
