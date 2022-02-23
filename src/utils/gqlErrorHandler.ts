import { ApolloError } from '@apollo/client';

export const gqlErrorHandler = (error: unknown) => {
  if (error && error instanceof ApolloError) {
    if (error.graphQLErrors[0].extensions.code === 'GRAPHQL_VALIDATION_FAILED')
      return 'The username that you entered is already taken. Please try again!';

    if (error.graphQLErrors[0].extensions.code === 'UNAUTHENTICATED')
      return 'The username or password that you entered is incorrect. Please try again!';

    if (error.graphQLErrors[0].extensions.code === 'FORBIDDEN')
      return 'The access code you entered is incorrect.';

    return 'The server encountered a temporary error and could not complete your request. Please try again later!';
  }

  return 'Client side error';
};
