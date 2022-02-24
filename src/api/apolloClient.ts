import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  split,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition, Reference } from '@apollo/client/utilities';

console.log(process.env.REACT_APP_HTTP_SERVER);
console.log(process.env.REACT_APP_WS_SERVER);

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_HTTP_SERVER,
  credentials: 'include',
});

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_WS_SERVER as string,
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
