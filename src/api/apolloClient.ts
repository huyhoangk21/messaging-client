import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  split,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition, Reference } from '@apollo/client/utilities';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true,
    reconnectionAttempts: 5,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  credentials: 'include',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getMessagesByChannel: {
            keyArgs: ['channel'],
            merge(existing, incoming, { readField }) {
              const uniqueMessages = new Set<string>();
              const messages: Reference[] = [];

              incoming.messages.forEach((message: Reference) => {
                if (!uniqueMessages.has(readField('_id', message) as string)) {
                  messages.push(message);
                  uniqueMessages.add(readField('_id', message) as string);
                }
              });

              if (existing) {
                existing.messages.forEach((message: Reference) => {
                  if (
                    !uniqueMessages.has(readField('_id', message) as string)
                  ) {
                    messages.push(message);
                    uniqueMessages.add(readField('_id', message) as string);
                  }
                });
              }

              return {
                hasMore: incoming.hasMore,
                cursor: incoming.cursor,
                messages,
              };
            },
            read(existing) {
              if (existing) {
                return {
                  hasMore: existing.hasMore,
                  cursor: existing.cursor,
                  messages: existing.messages,
                };
              }
            },
          },
        },
      },
    },
  }),
  link: splitLink,
});
