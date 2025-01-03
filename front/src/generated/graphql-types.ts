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

export type CheckFrequency = {
  __typename?: 'CheckFrequency';
  created_at: Scalars['DateTimeISO']['output'];
  id: Scalars['String']['output'];
  interval: Scalars['String']['output'];
  urls: Array<Url>;
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
  checkUrl: Url;
  createUser: Scalars['String']['output'];
  deleteAllNotifications: Scalars['String']['output'];
  deleteNotification: Scalars['String']['output'];
  login: Scalars['String']['output'];
  readNotification: Scalars['String']['output'];
  subscribe: Scalars['String']['output'];
};


export type MutationAddUrlArgs = {
  checkFrequencyId?: InputMaybe<Scalars['String']['input']>;
  isPrivate?: Scalars['Boolean']['input'];
  urlData: UrlInput;
};


export type MutationCheckUrlArgs = {
  id: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationDeleteNotificationArgs = {
  notificationId: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationReadNotificationArgs = {
  notificationId: Scalars['String']['input'];
};


export type MutationSubscribeArgs = {
  role: Scalars['String']['input'];
};

export type Notification = {
  __typename?: 'Notification';
  content: Scalars['String']['output'];
  created_at: Scalars['DateTimeISO']['output'];
  id: Scalars['String']['output'];
  is_read: Scalars['Boolean']['output'];
  user: User;
};

export type PaginateUrls = {
  __typename?: 'PaginateUrls';
  currentPage: Scalars['Float']['output'];
  nextPage: Scalars['Float']['output'];
  previousPage: Scalars['Float']['output'];
  totalPages: Scalars['Float']['output'];
  urls: Array<Url>;
};

export type PaginatesHistories = {
  __typename?: 'PaginatesHistories';
  currentPage: Scalars['Float']['output'];
  histories: Array<History>;
  nextPage: Scalars['Float']['output'];
  previousPage: Scalars['Float']['output'];
  totalPages: Scalars['Float']['output'];
};

export type Query = {
  __typename?: 'Query';
  checkFrequencies: Array<CheckFrequency>;
  getAllUsers: Scalars['String']['output'];
  histories: Array<History>;
  history: History;
  historyWithResponse: History;
  logout: Scalars['String']['output'];
  me: Scalars['String']['output'];
  notifications: Array<Notification>;
  paginatesHistories: PaginatesHistories;
  recentPrivateHistories: Array<History>;
  recentPrivateUrls: Array<Url>;
  url: Url;
  urls: PaginateUrls;
};


export type QueryHistoryArgs = {
  id: Scalars['String']['input'];
};


export type QueryHistoryWithResponseArgs = {
  urlId: Scalars['String']['input'];
};


export type QueryPaginatesHistoriesArgs = {
  currentPage?: Scalars['Float']['input'];
  privateHistories?: InputMaybe<Scalars['Boolean']['input']>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  sortField?: InputMaybe<Scalars['String']['input']>;
  urlId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUrlArgs = {
  id: Scalars['String']['input'];
};


export type QueryUrlsArgs = {
  currentPage?: Scalars['Float']['input'];
  privateUrls?: InputMaybe<Scalars['Boolean']['input']>;
  searchText: Scalars['String']['input'];
  sortField: Scalars['String']['input'];
};

export type Url = {
  __typename?: 'Url';
  checkFrequency?: Maybe<CheckFrequency>;
  createdAt: Scalars['DateTimeISO']['output'];
  histories: Array<History>;
  id: Scalars['String']['output'];
  lastCheckDate: Scalars['DateTimeISO']['output'];
  name: Scalars['String']['output'];
  path: Scalars['String']['output'];
  private: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type UrlInput = {
  name: Scalars['String']['input'];
  path: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  notifications: Array<Notification>;
  role: Scalars['String']['output'];
  urls?: Maybe<Array<Url>>;
  username: Scalars['String']['output'];
};

export type AddUrlMutationVariables = Exact<{
  urlData: UrlInput;
  isPrivate: Scalars['Boolean']['input'];
  checkFrequencyId?: InputMaybe<Scalars['String']['input']>;
}>;


export type AddUrlMutation = { __typename?: 'Mutation', addUrl: { __typename?: 'Url', name: string, path: string } };

export type AddUserMutationVariables = Exact<{
  username: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type AddUserMutation = { __typename?: 'Mutation', createUser: string };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type CheckUrlMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type CheckUrlMutation = { __typename?: 'Mutation', checkUrl: { __typename?: 'Url', name: string, path: string } };

export type SubscribeMutationVariables = Exact<{
  role: Scalars['String']['input'];
}>;


export type SubscribeMutation = { __typename?: 'Mutation', subscribe: string };

export type ReadNotificationMutationVariables = Exact<{
  notificationId: Scalars['String']['input'];
}>;


export type ReadNotificationMutation = { __typename?: 'Mutation', readNotification: string };

export type DeleteNotificationMutationVariables = Exact<{
  notificationId: Scalars['String']['input'];
}>;


export type DeleteNotificationMutation = { __typename?: 'Mutation', deleteNotification: string };

export type DeleteAllNotificationsMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteAllNotificationsMutation = { __typename?: 'Mutation', deleteAllNotifications: string };

export type GetAllURlsQueryVariables = Exact<{
  currentPage: Scalars['Float']['input'];
  sortField: Scalars['String']['input'];
  searchText: Scalars['String']['input'];
  privateUrls?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetAllURlsQuery = { __typename?: 'Query', urls: { __typename?: 'PaginateUrls', totalPages: number, currentPage: number, previousPage: number, nextPage: number, urls: Array<{ __typename?: 'Url', id: string, name: string, path: string, createdAt: any, histories: Array<{ __typename?: 'History', id: string, response: string, status_code: number, created_at: any }> }> } };

export type UrlQueryVariables = Exact<{
  urlId: Scalars['String']['input'];
}>;


export type UrlQuery = { __typename?: 'Query', url: { __typename?: 'Url', id: string, name: string, path: string, private: boolean, histories: Array<{ __typename?: 'History', id: string, response: string, status_code: number, created_at: any }>, user?: { __typename?: 'User', id: string } | null } };

export type PaginatesHistoriesQueryVariables = Exact<{
  privateHistories?: InputMaybe<Scalars['Boolean']['input']>;
  currentPage: Scalars['Float']['input'];
  searchText?: InputMaybe<Scalars['String']['input']>;
  sortField?: InputMaybe<Scalars['String']['input']>;
  urlId?: InputMaybe<Scalars['String']['input']>;
}>;


export type PaginatesHistoriesQuery = { __typename?: 'Query', paginatesHistories: { __typename?: 'PaginatesHistories', currentPage: number, nextPage: number, previousPage: number, totalPages: number, histories: Array<{ __typename?: 'History', id: string, created_at: any, status_code: number, url: { __typename?: 'Url', id: string, name: string, path: string } }> } };

export type RecentPrivateUrlsQueryVariables = Exact<{ [key: string]: never; }>;


export type RecentPrivateUrlsQuery = { __typename?: 'Query', recentPrivateUrls: Array<{ __typename?: 'Url', id: string, name: string, path: string, createdAt: any, histories: Array<{ __typename?: 'History', id: string, status_code: number, created_at: any }> }> };

export type RecentPrivateHistoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type RecentPrivateHistoriesQuery = { __typename?: 'Query', recentPrivateHistories: Array<{ __typename?: 'History', id: string, status_code: number, created_at: any, url: { __typename?: 'Url', name: string, path: string } }> };

export type LogoutQueryVariables = Exact<{ [key: string]: never; }>;


export type LogoutQuery = { __typename?: 'Query', logout: string };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: string };

export type CheckFrequenciesQueryVariables = Exact<{ [key: string]: never; }>;


export type CheckFrequenciesQuery = { __typename?: 'Query', checkFrequencies: Array<{ __typename?: 'CheckFrequency', id: string, interval: string }> };

export type NotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type NotificationsQuery = { __typename?: 'Query', notifications: Array<{ __typename?: 'Notification', id: string, is_read: boolean, created_at: any, content: string }> };

export type HistoryWithResponseQueryVariables = Exact<{
  historyWithResponseUrlId: Scalars['String']['input'];
}>;


export type HistoryWithResponseQuery = { __typename?: 'Query', historyWithResponse: { __typename?: 'History', response: string, id: string, status_code: number } };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', getAllUsers: string };


export const AddUrlDocument = gql`
    mutation AddUrl($urlData: UrlInput!, $isPrivate: Boolean!, $checkFrequencyId: String) {
  addUrl(
    urlData: $urlData
    isPrivate: $isPrivate
    checkFrequencyId: $checkFrequencyId
  ) {
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
 *      isPrivate: // value for 'isPrivate'
 *      checkFrequencyId: // value for 'checkFrequencyId'
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
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const CheckUrlDocument = gql`
    mutation CheckUrl($id: String!) {
  checkUrl(id: $id) {
    name
    path
  }
}
    `;
export type CheckUrlMutationFn = Apollo.MutationFunction<CheckUrlMutation, CheckUrlMutationVariables>;

/**
 * __useCheckUrlMutation__
 *
 * To run a mutation, you first call `useCheckUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkUrlMutation, { data, loading, error }] = useCheckUrlMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCheckUrlMutation(baseOptions?: Apollo.MutationHookOptions<CheckUrlMutation, CheckUrlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CheckUrlMutation, CheckUrlMutationVariables>(CheckUrlDocument, options);
      }
export type CheckUrlMutationHookResult = ReturnType<typeof useCheckUrlMutation>;
export type CheckUrlMutationResult = Apollo.MutationResult<CheckUrlMutation>;
export type CheckUrlMutationOptions = Apollo.BaseMutationOptions<CheckUrlMutation, CheckUrlMutationVariables>;
export const SubscribeDocument = gql`
    mutation Subscribe($role: String!) {
  subscribe(role: $role)
}
    `;
export type SubscribeMutationFn = Apollo.MutationFunction<SubscribeMutation, SubscribeMutationVariables>;

/**
 * __useSubscribeMutation__
 *
 * To run a mutation, you first call `useSubscribeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubscribeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [subscribeMutation, { data, loading, error }] = useSubscribeMutation({
 *   variables: {
 *      role: // value for 'role'
 *   },
 * });
 */
export function useSubscribeMutation(baseOptions?: Apollo.MutationHookOptions<SubscribeMutation, SubscribeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubscribeMutation, SubscribeMutationVariables>(SubscribeDocument, options);
      }
export type SubscribeMutationHookResult = ReturnType<typeof useSubscribeMutation>;
export type SubscribeMutationResult = Apollo.MutationResult<SubscribeMutation>;
export type SubscribeMutationOptions = Apollo.BaseMutationOptions<SubscribeMutation, SubscribeMutationVariables>;
export const ReadNotificationDocument = gql`
    mutation ReadNotification($notificationId: String!) {
  readNotification(notificationId: $notificationId)
}
    `;
export type ReadNotificationMutationFn = Apollo.MutationFunction<ReadNotificationMutation, ReadNotificationMutationVariables>;

/**
 * __useReadNotificationMutation__
 *
 * To run a mutation, you first call `useReadNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReadNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [readNotificationMutation, { data, loading, error }] = useReadNotificationMutation({
 *   variables: {
 *      notificationId: // value for 'notificationId'
 *   },
 * });
 */
export function useReadNotificationMutation(baseOptions?: Apollo.MutationHookOptions<ReadNotificationMutation, ReadNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReadNotificationMutation, ReadNotificationMutationVariables>(ReadNotificationDocument, options);
      }
export type ReadNotificationMutationHookResult = ReturnType<typeof useReadNotificationMutation>;
export type ReadNotificationMutationResult = Apollo.MutationResult<ReadNotificationMutation>;
export type ReadNotificationMutationOptions = Apollo.BaseMutationOptions<ReadNotificationMutation, ReadNotificationMutationVariables>;
export const DeleteNotificationDocument = gql`
    mutation DeleteNotification($notificationId: String!) {
  deleteNotification(notificationId: $notificationId)
}
    `;
export type DeleteNotificationMutationFn = Apollo.MutationFunction<DeleteNotificationMutation, DeleteNotificationMutationVariables>;

/**
 * __useDeleteNotificationMutation__
 *
 * To run a mutation, you first call `useDeleteNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNotificationMutation, { data, loading, error }] = useDeleteNotificationMutation({
 *   variables: {
 *      notificationId: // value for 'notificationId'
 *   },
 * });
 */
export function useDeleteNotificationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteNotificationMutation, DeleteNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteNotificationMutation, DeleteNotificationMutationVariables>(DeleteNotificationDocument, options);
      }
export type DeleteNotificationMutationHookResult = ReturnType<typeof useDeleteNotificationMutation>;
export type DeleteNotificationMutationResult = Apollo.MutationResult<DeleteNotificationMutation>;
export type DeleteNotificationMutationOptions = Apollo.BaseMutationOptions<DeleteNotificationMutation, DeleteNotificationMutationVariables>;
export const DeleteAllNotificationsDocument = gql`
    mutation DeleteAllNotifications {
  deleteAllNotifications
}
    `;
export type DeleteAllNotificationsMutationFn = Apollo.MutationFunction<DeleteAllNotificationsMutation, DeleteAllNotificationsMutationVariables>;

/**
 * __useDeleteAllNotificationsMutation__
 *
 * To run a mutation, you first call `useDeleteAllNotificationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAllNotificationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAllNotificationsMutation, { data, loading, error }] = useDeleteAllNotificationsMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteAllNotificationsMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAllNotificationsMutation, DeleteAllNotificationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAllNotificationsMutation, DeleteAllNotificationsMutationVariables>(DeleteAllNotificationsDocument, options);
      }
export type DeleteAllNotificationsMutationHookResult = ReturnType<typeof useDeleteAllNotificationsMutation>;
export type DeleteAllNotificationsMutationResult = Apollo.MutationResult<DeleteAllNotificationsMutation>;
export type DeleteAllNotificationsMutationOptions = Apollo.BaseMutationOptions<DeleteAllNotificationsMutation, DeleteAllNotificationsMutationVariables>;
export const GetAllURlsDocument = gql`
    query GetAllURls($currentPage: Float!, $sortField: String!, $searchText: String!, $privateUrls: Boolean) {
  urls(
    currentPage: $currentPage
    sortField: $sortField
    searchText: $searchText
    privateUrls: $privateUrls
  ) {
    urls {
      id
      name
      path
      createdAt
      histories {
        id
        response
        status_code
        created_at
      }
    }
    totalPages
    currentPage
    previousPage
    nextPage
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
 *      currentPage: // value for 'currentPage'
 *      sortField: // value for 'sortField'
 *      searchText: // value for 'searchText'
 *      privateUrls: // value for 'privateUrls'
 *   },
 * });
 */
export function useGetAllURlsQuery(baseOptions: Apollo.QueryHookOptions<GetAllURlsQuery, GetAllURlsQueryVariables> & ({ variables: GetAllURlsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
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
    private
    user {
      id
    }
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
export const PaginatesHistoriesDocument = gql`
    query PaginatesHistories($privateHistories: Boolean, $currentPage: Float!, $searchText: String, $sortField: String, $urlId: String) {
  paginatesHistories(
    privateHistories: $privateHistories
    currentPage: $currentPage
    searchText: $searchText
    sortField: $sortField
    urlId: $urlId
  ) {
    currentPage
    nextPage
    previousPage
    totalPages
    histories {
      id
      created_at
      status_code
      url {
        id
        name
        path
      }
    }
  }
}
    `;

/**
 * __usePaginatesHistoriesQuery__
 *
 * To run a query within a React component, call `usePaginatesHistoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaginatesHistoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaginatesHistoriesQuery({
 *   variables: {
 *      privateHistories: // value for 'privateHistories'
 *      currentPage: // value for 'currentPage'
 *      searchText: // value for 'searchText'
 *      sortField: // value for 'sortField'
 *      urlId: // value for 'urlId'
 *   },
 * });
 */
export function usePaginatesHistoriesQuery(baseOptions: Apollo.QueryHookOptions<PaginatesHistoriesQuery, PaginatesHistoriesQueryVariables> & ({ variables: PaginatesHistoriesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PaginatesHistoriesQuery, PaginatesHistoriesQueryVariables>(PaginatesHistoriesDocument, options);
      }
export function usePaginatesHistoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaginatesHistoriesQuery, PaginatesHistoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PaginatesHistoriesQuery, PaginatesHistoriesQueryVariables>(PaginatesHistoriesDocument, options);
        }
export function usePaginatesHistoriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PaginatesHistoriesQuery, PaginatesHistoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PaginatesHistoriesQuery, PaginatesHistoriesQueryVariables>(PaginatesHistoriesDocument, options);
        }
export type PaginatesHistoriesQueryHookResult = ReturnType<typeof usePaginatesHistoriesQuery>;
export type PaginatesHistoriesLazyQueryHookResult = ReturnType<typeof usePaginatesHistoriesLazyQuery>;
export type PaginatesHistoriesSuspenseQueryHookResult = ReturnType<typeof usePaginatesHistoriesSuspenseQuery>;
export type PaginatesHistoriesQueryResult = Apollo.QueryResult<PaginatesHistoriesQuery, PaginatesHistoriesQueryVariables>;
export const RecentPrivateUrlsDocument = gql`
    query RecentPrivateUrls {
  recentPrivateUrls {
    id
    name
    path
    createdAt
    histories {
      id
      status_code
      created_at
    }
  }
}
    `;

/**
 * __useRecentPrivateUrlsQuery__
 *
 * To run a query within a React component, call `useRecentPrivateUrlsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecentPrivateUrlsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecentPrivateUrlsQuery({
 *   variables: {
 *   },
 * });
 */
export function useRecentPrivateUrlsQuery(baseOptions?: Apollo.QueryHookOptions<RecentPrivateUrlsQuery, RecentPrivateUrlsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RecentPrivateUrlsQuery, RecentPrivateUrlsQueryVariables>(RecentPrivateUrlsDocument, options);
      }
export function useRecentPrivateUrlsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecentPrivateUrlsQuery, RecentPrivateUrlsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RecentPrivateUrlsQuery, RecentPrivateUrlsQueryVariables>(RecentPrivateUrlsDocument, options);
        }
export function useRecentPrivateUrlsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<RecentPrivateUrlsQuery, RecentPrivateUrlsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RecentPrivateUrlsQuery, RecentPrivateUrlsQueryVariables>(RecentPrivateUrlsDocument, options);
        }
export type RecentPrivateUrlsQueryHookResult = ReturnType<typeof useRecentPrivateUrlsQuery>;
export type RecentPrivateUrlsLazyQueryHookResult = ReturnType<typeof useRecentPrivateUrlsLazyQuery>;
export type RecentPrivateUrlsSuspenseQueryHookResult = ReturnType<typeof useRecentPrivateUrlsSuspenseQuery>;
export type RecentPrivateUrlsQueryResult = Apollo.QueryResult<RecentPrivateUrlsQuery, RecentPrivateUrlsQueryVariables>;
export const RecentPrivateHistoriesDocument = gql`
    query RecentPrivateHistories {
  recentPrivateHistories {
    id
    status_code
    created_at
    url {
      name
      path
    }
  }
}
    `;

/**
 * __useRecentPrivateHistoriesQuery__
 *
 * To run a query within a React component, call `useRecentPrivateHistoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecentPrivateHistoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecentPrivateHistoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useRecentPrivateHistoriesQuery(baseOptions?: Apollo.QueryHookOptions<RecentPrivateHistoriesQuery, RecentPrivateHistoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RecentPrivateHistoriesQuery, RecentPrivateHistoriesQueryVariables>(RecentPrivateHistoriesDocument, options);
      }
export function useRecentPrivateHistoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecentPrivateHistoriesQuery, RecentPrivateHistoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RecentPrivateHistoriesQuery, RecentPrivateHistoriesQueryVariables>(RecentPrivateHistoriesDocument, options);
        }
export function useRecentPrivateHistoriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<RecentPrivateHistoriesQuery, RecentPrivateHistoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RecentPrivateHistoriesQuery, RecentPrivateHistoriesQueryVariables>(RecentPrivateHistoriesDocument, options);
        }
export type RecentPrivateHistoriesQueryHookResult = ReturnType<typeof useRecentPrivateHistoriesQuery>;
export type RecentPrivateHistoriesLazyQueryHookResult = ReturnType<typeof useRecentPrivateHistoriesLazyQuery>;
export type RecentPrivateHistoriesSuspenseQueryHookResult = ReturnType<typeof useRecentPrivateHistoriesSuspenseQuery>;
export type RecentPrivateHistoriesQueryResult = Apollo.QueryResult<RecentPrivateHistoriesQuery, RecentPrivateHistoriesQueryVariables>;
export const LogoutDocument = gql`
    query Logout {
  logout
}
    `;

/**
 * __useLogoutQuery__
 *
 * To run a query within a React component, call `useLogoutQuery` and pass it any options that fit your needs.
 * When your component renders, `useLogoutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLogoutQuery({
 *   variables: {
 *   },
 * });
 */
export function useLogoutQuery(baseOptions?: Apollo.QueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
      }
export function useLogoutLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
        }
export function useLogoutSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
        }
export type LogoutQueryHookResult = ReturnType<typeof useLogoutQuery>;
export type LogoutLazyQueryHookResult = ReturnType<typeof useLogoutLazyQuery>;
export type LogoutSuspenseQueryHookResult = ReturnType<typeof useLogoutSuspenseQuery>;
export type LogoutQueryResult = Apollo.QueryResult<LogoutQuery, LogoutQueryVariables>;
export const MeDocument = gql`
    query Me {
  me
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const CheckFrequenciesDocument = gql`
    query CheckFrequencies {
  checkFrequencies {
    id
    interval
  }
}
    `;

/**
 * __useCheckFrequenciesQuery__
 *
 * To run a query within a React component, call `useCheckFrequenciesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckFrequenciesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckFrequenciesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCheckFrequenciesQuery(baseOptions?: Apollo.QueryHookOptions<CheckFrequenciesQuery, CheckFrequenciesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckFrequenciesQuery, CheckFrequenciesQueryVariables>(CheckFrequenciesDocument, options);
      }
export function useCheckFrequenciesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckFrequenciesQuery, CheckFrequenciesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckFrequenciesQuery, CheckFrequenciesQueryVariables>(CheckFrequenciesDocument, options);
        }
export function useCheckFrequenciesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CheckFrequenciesQuery, CheckFrequenciesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CheckFrequenciesQuery, CheckFrequenciesQueryVariables>(CheckFrequenciesDocument, options);
        }
export type CheckFrequenciesQueryHookResult = ReturnType<typeof useCheckFrequenciesQuery>;
export type CheckFrequenciesLazyQueryHookResult = ReturnType<typeof useCheckFrequenciesLazyQuery>;
export type CheckFrequenciesSuspenseQueryHookResult = ReturnType<typeof useCheckFrequenciesSuspenseQuery>;
export type CheckFrequenciesQueryResult = Apollo.QueryResult<CheckFrequenciesQuery, CheckFrequenciesQueryVariables>;
export const NotificationsDocument = gql`
    query Notifications {
  notifications {
    id
    is_read
    created_at
    content
  }
}
    `;

/**
 * __useNotificationsQuery__
 *
 * To run a query within a React component, call `useNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useNotificationsQuery(baseOptions?: Apollo.QueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
      }
export function useNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
        }
export function useNotificationsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
        }
export type NotificationsQueryHookResult = ReturnType<typeof useNotificationsQuery>;
export type NotificationsLazyQueryHookResult = ReturnType<typeof useNotificationsLazyQuery>;
export type NotificationsSuspenseQueryHookResult = ReturnType<typeof useNotificationsSuspenseQuery>;
export type NotificationsQueryResult = Apollo.QueryResult<NotificationsQuery, NotificationsQueryVariables>;
export const HistoryWithResponseDocument = gql`
    query HistoryWithResponse($historyWithResponseUrlId: String!) {
  historyWithResponse(urlId: $historyWithResponseUrlId) {
    response
    id
    status_code
  }
}
    `;

/**
 * __useHistoryWithResponseQuery__
 *
 * To run a query within a React component, call `useHistoryWithResponseQuery` and pass it any options that fit your needs.
 * When your component renders, `useHistoryWithResponseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHistoryWithResponseQuery({
 *   variables: {
 *      historyWithResponseUrlId: // value for 'historyWithResponseUrlId'
 *   },
 * });
 */
export function useHistoryWithResponseQuery(baseOptions: Apollo.QueryHookOptions<HistoryWithResponseQuery, HistoryWithResponseQueryVariables> & ({ variables: HistoryWithResponseQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HistoryWithResponseQuery, HistoryWithResponseQueryVariables>(HistoryWithResponseDocument, options);
      }
export function useHistoryWithResponseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HistoryWithResponseQuery, HistoryWithResponseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HistoryWithResponseQuery, HistoryWithResponseQueryVariables>(HistoryWithResponseDocument, options);
        }
export function useHistoryWithResponseSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<HistoryWithResponseQuery, HistoryWithResponseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<HistoryWithResponseQuery, HistoryWithResponseQueryVariables>(HistoryWithResponseDocument, options);
        }
export type HistoryWithResponseQueryHookResult = ReturnType<typeof useHistoryWithResponseQuery>;
export type HistoryWithResponseLazyQueryHookResult = ReturnType<typeof useHistoryWithResponseLazyQuery>;
export type HistoryWithResponseSuspenseQueryHookResult = ReturnType<typeof useHistoryWithResponseSuspenseQuery>;
export type HistoryWithResponseQueryResult = Apollo.QueryResult<HistoryWithResponseQuery, HistoryWithResponseQueryVariables>;
export const GetAllUsersDocument = gql`
    query GetAllUsers {
  getAllUsers
}
    `;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
      }
export function useGetAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export function useGetAllUsersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>;
export type GetAllUsersSuspenseQueryHookResult = ReturnType<typeof useGetAllUsersSuspenseQuery>;
export type GetAllUsersQueryResult = Apollo.QueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;