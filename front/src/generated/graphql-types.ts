import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
};

export type History = {
  __typename?: 'History';
  created_at: Scalars['DateTimeISO']['output'];
  id: Scalars['String']['output'];
  response: Scalars['String']['output'];
  status_code: Scalars['Float']['output'];
  url: Url;
};

export type Mutation = {
  __typename?: 'Mutation';
  addUrl: Url;
  createUser: Scalars['String']['output'];
};


export type MutationAddUrlArgs = {
  urlData: UrlInput;
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  histories: Array<History>;
  history: History;
  url: Url;
  urls: Array<Url>;
};


export type QueryHistoryArgs = {
  id: Scalars['String']['input'];
};


export type QueryUrlArgs = {
  id: Scalars['String']['input'];
};

export type Url = {
  __typename?: 'Url';
  createdAt: Scalars['DateTimeISO']['output'];
  histories: Array<History>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  path: Scalars['String']['output'];
};

export type UrlInput = {
  name: Scalars['String']['input'];
  path: Scalars['String']['input'];
};

export type AddUrlMutationVariables = Exact<{
  urlData: UrlInput;
}>;


export type AddUrlMutation = { __typename?: 'Mutation', addUrl: { __typename?: 'Url', name: string, path: string } };

export type AddUserMutationVariables = Exact<{
  username: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type AddUserMutation = { __typename?: 'Mutation', createUser: string };

export type GetAllURlsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllURlsQuery = { __typename?: 'Query', urls: Array<{ __typename?: 'Url', id: string, name: string, path: string, createdAt: any, histories: Array<{ __typename?: 'History', id: string, response: string, status_code: number }> }> };

export type UrlQueryVariables = Exact<{
  urlId: Scalars['String']['input'];
}>;


export type UrlQuery = { __typename?: 'Query', url: { __typename?: 'Url', id: string, name: string, path: string, histories: Array<{ __typename?: 'History', id: string, response: string, status_code: number, created_at: any }> } };


export const AddUrlDocument = gql`
    mutation AddUrl($urlData: UrlInput!) {
  addUrl(urlData: $urlData) {
    name
    path
  }
}
    `;
export type AddUrlMutationFn = Apollo.MutationFunction<AddUrlMutation, AddUrlMutationVariables>;

/**
 * __useAddUrlMutation__
 *
 * To run a mutation, you first call `useAddUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUrlMutation, { data, loading, error }] = useAddUrlMutation({
 *   variables: {
 *      urlData: // value for 'urlData'
 *   },
 * });
 */
export function useAddUrlMutation(baseOptions?: Apollo.MutationHookOptions<AddUrlMutation, AddUrlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddUrlMutation, AddUrlMutationVariables>(AddUrlDocument, options);
      }
export type AddUrlMutationHookResult = ReturnType<typeof useAddUrlMutation>;
export type AddUrlMutationResult = Apollo.MutationResult<AddUrlMutation>;
export type AddUrlMutationOptions = Apollo.BaseMutationOptions<AddUrlMutation, AddUrlMutationVariables>;
export const AddUserDocument = gql`
    mutation AddUser($username: String!, $email: String!, $password: String!) {
  createUser(username: $username, email: $email, password: $password)
}
    `;
export type AddUserMutationFn = Apollo.MutationFunction<AddUserMutation, AddUserMutationVariables>;

/**
 * __useAddUserMutation__
 *
 * To run a mutation, you first call `useAddUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserMutation, { data, loading, error }] = useAddUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useAddUserMutation(baseOptions?: Apollo.MutationHookOptions<AddUserMutation, AddUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddUserMutation, AddUserMutationVariables>(AddUserDocument, options);
      }
export type AddUserMutationHookResult = ReturnType<typeof useAddUserMutation>;
export type AddUserMutationResult = Apollo.MutationResult<AddUserMutation>;
export type AddUserMutationOptions = Apollo.BaseMutationOptions<AddUserMutation, AddUserMutationVariables>;
export const GetAllURlsDocument = gql`
    query GetAllURls {
  urls {
    id
    name
    path
    createdAt
    histories {
      id
      response
      status_code
    }
  }
}
    `;

/**
 * __useGetAllURlsQuery__
 *
 * To run a query within a React component, call `useGetAllURlsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllURlsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllURlsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllURlsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllURlsQuery, GetAllURlsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllURlsQuery, GetAllURlsQueryVariables>(GetAllURlsDocument, options);
      }
export function useGetAllURlsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllURlsQuery, GetAllURlsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllURlsQuery, GetAllURlsQueryVariables>(GetAllURlsDocument, options);
        }
export function useGetAllURlsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllURlsQuery, GetAllURlsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllURlsQuery, GetAllURlsQueryVariables>(GetAllURlsDocument, options);
        }
export type GetAllURlsQueryHookResult = ReturnType<typeof useGetAllURlsQuery>;
export type GetAllURlsLazyQueryHookResult = ReturnType<typeof useGetAllURlsLazyQuery>;
export type GetAllURlsSuspenseQueryHookResult = ReturnType<typeof useGetAllURlsSuspenseQuery>;
export type GetAllURlsQueryResult = Apollo.QueryResult<GetAllURlsQuery, GetAllURlsQueryVariables>;
export const UrlDocument = gql`
    query Url($urlId: String!) {
  url(id: $urlId) {
    histories {
      id
      response
      status_code
      created_at
    }
    id
    name
    path
  }
}
    `;

/**
 * __useUrlQuery__
 *
 * To run a query within a React component, call `useUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUrlQuery({
 *   variables: {
 *      urlId: // value for 'urlId'
 *   },
 * });
 */
export function useUrlQuery(baseOptions: Apollo.QueryHookOptions<UrlQuery, UrlQueryVariables> & ({ variables: UrlQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UrlQuery, UrlQueryVariables>(UrlDocument, options);
      }
export function useUrlLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UrlQuery, UrlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UrlQuery, UrlQueryVariables>(UrlDocument, options);
        }
export function useUrlSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UrlQuery, UrlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UrlQuery, UrlQueryVariables>(UrlDocument, options);
        }
export type UrlQueryHookResult = ReturnType<typeof useUrlQuery>;
export type UrlLazyQueryHookResult = ReturnType<typeof useUrlLazyQuery>;
export type UrlSuspenseQueryHookResult = ReturnType<typeof useUrlSuspenseQuery>;
export type UrlQueryResult = Apollo.QueryResult<UrlQuery, UrlQueryVariables>;