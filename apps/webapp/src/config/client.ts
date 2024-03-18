/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { gql } from "__generated__";
import { RefreshTokenMutation } from "__generated__/graphql";
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, Observable } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";
import { IS_DEVELOPMENT } from "config/env";

const REFRESH_TOKEN = gql(/* GraphQL */ `
	mutation RefreshToken {
		refreshToken {
			success
		}
	}
`);

const refreshTokensLink = onError(({ graphQLErrors, operation, forward }) => {
	if (!graphQLErrors) return;

	if (graphQLErrors?.[0]?.extensions?.code === "UNAUTHENTICATED") {
		if (operation.operationName === "RefreshToken") return;

		return new Observable(observer => {
			(async () => {
				try {
					const success = await refreshTokenMutation();

					if (!success) {
						observer.error(new Error("Refresh token failed"));
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

const retryLink = new RetryLink({
	delay: {
		initial: 300,
		max: Infinity,
		jitter: true,
	},
	attempts: {
		max: 3,
		retryIf: error => !!error,
	},
});

const httpLink = new HttpLink({
	uri: "http://localhost:4000/graphql",
	credentials: "include",
});

export const cache = new InMemoryCache();
const client = new ApolloClient({
	link: ApolloLink.from([retryLink, refreshTokensLink, httpLink]),
	cache,
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
