import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { RetryLink } from '@apollo/client/link/retry';
import { API_URL, IS_DEVELOPMENT } from 'config/env';

const client = new ApolloClient({
  link: ApolloLink.from([
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
    new HttpLink({
      uri: IS_DEVELOPMENT ? API_URL : '/api/graphql',
      credentials: 'include',
    }),
  ]),
  cache: new InMemoryCache(),
  connectToDevTools: IS_DEVELOPMENT,
});

client.onResetStore(async () => {
  window.location.reload();
});

export default client;
