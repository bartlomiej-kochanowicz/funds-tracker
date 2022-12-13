/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, Observable } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { API_URL, IS_DEVELOPMENT } from 'config/env';
import { REFRESH_TOKEN } from 'graphql/mutations';
import { RefreshTokenMutation } from '__generated__/graphql';

const refreshTokensLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors?.[0]?.extensions?.code === 'UNAUTHENTICATED') {
    if (operation.operationName === 'RefreshToken') return;

    return new Observable(observer => {
      (async () => {
        try {
          const success = await refreshTokenMutation();

          if (!success) {
            observer.error(new Error('Refresh token failed'));
            return;
          }

          const subscriber = {
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          };

          forward(operation).subscribe(subscriber);
        } catch (error) {
          observer.error(error);
        }
      })();
    });
  }
});

const httpLink = new HttpLink({
  uri: IS_DEVELOPMENT ? API_URL : '/api/graphql',
  credentials: 'include',
});

const client = new ApolloClient({
  link: ApolloLink.from([refreshTokensLink, httpLink]),
  cache: new InMemoryCache(),
  connectToDevTools: IS_DEVELOPMENT,
});

const refreshTokenMutation = async () => {
  try {
    const refreshResolverResponse = await client.mutate<RefreshTokenMutation>({
      mutation: REFRESH_TOKEN,
    });

    const success = refreshResolverResponse.data?.refreshToken.success;

    return success ?? false;
  } catch {
    return false;
  }
};

client.onResetStore(async () => {
  window.location.reload();
});

export default client;
