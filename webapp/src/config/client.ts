import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { RetryLink } from '@apollo/client/link/retry';
import { API_URL, IS_DEVELOPMENT } from 'config/env';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: IS_DEVELOPMENT ? API_URL : '/api/graphql',
    credentials: 'include',
  }).concat(
    new RetryLink({
      delay: {
        initial: 300,
        max: Infinity,
        jitter: true,
      },
      attempts: {
        max: 3,
        retryIf: error => Boolean(error),
      },
    }),
  ),
});

client.onResetStore(async () => {
  window.location.reload();
});

export default client;
