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

export type GroupByStatusHistory = {
  __typename?: 'GroupByStatusHistory';
  countHtml: Scalars['Float']['output'];
  countJson: Scalars['Float']['output'];
  countUnknown: Scalars['Float']['output'];
  statusCode: Scalars['Float']['output'];
};

export type GroupByStatusUrl = {
  __typename?: 'GroupByStatusUrl';
  dateTime: Scalars['String']['output'];
  offLine: Scalars['Float']['output'];
  onLine: Scalars['Float']['output'];
};

export type History = {
  __typename?: 'History';
  content_type: Scalars['String']['output'];
  created_at: Scalars['DateTimeISO']['output'];
  id: Scalars['String']['output'];
  response: Scalars['String']['output'];
  status_code: Scalars['Float']['output'];
  url: Url;
};

export type Mutation = {
  __typename?: 'Mutation';
  addUrl: Url;
  cancelSubscription: Scalars['String']['output'];
  changeSubscriptionTier: Scalars['String']['output'];
  checkUrl: Url;
  createStripeSetupIntent: Scalars['String']['output'];
  createSubscription: Scalars['String']['output'];
  createUser: Scalars['String']['output'];
  deleteAllNotifications: Scalars['String']['output'];
  deleteNotification: Scalars['String']['output'];
  deleteUrl: Scalars['Boolean']['output'];
  login: Scalars['String']['output'];
  readNotification: Scalars['String']['output'];
  updateCheckFrequency: Url;
  updateUrlName: Url;
  updateUserNotifFrequency: Scalars['String']['output'];
};


export type MutationAddUrlArgs = {
  checkFrequencyId?: InputMaybe<Scalars['String']['input']>;
  isPrivate?: Scalars['Boolean']['input'];
  urlData: UrlInput;
};


export type MutationChangeSubscriptionTierArgs = {
  newPriceKey: Scalars['String']['input'];
};


export type MutationCheckUrlArgs = {
  id: Scalars['String']['input'];
};


export type MutationCreateSubscriptionArgs = {
  paymentMethodId: Scalars['String']['input'];
  priceKey: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationDeleteNotificationArgs = {
  notificationId: Scalars['String']['input'];
};


export type MutationDeleteUrlArgs = {
  id: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationReadNotificationArgs = {
  notificationId: Scalars['String']['input'];
};


export type MutationUpdateCheckFrequencyArgs = {
  checkFrequencyId: Scalars['String']['input'];
  id: Scalars['String']['input'];
};


export type MutationUpdateUrlNameArgs = {
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
};


export type MutationUpdateUserNotifFrequencyArgs = {
  frequency: Scalars['String']['input'];
};

export type NotifFrequency = {
  __typename?: 'NotifFrequency';
  created_at: Scalars['DateTimeISO']['output'];
  id: Scalars['String']['output'];
  interval: Scalars['String']['output'];
  users: Array<User>;
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
  getUserNotifFrequency: Scalars['String']['output'];
  histories: Array<History>;
  history: History;
  historyWithResponse: History;
  logout: Scalars['String']['output'];
  me: Scalars['String']['output'];
  notifFrequencies: Array<NotifFrequency>;
  notifications: Array<Notification>;
  paginatesHistories: PaginatesHistories;
  privateHistoriesByStatus: Array<GroupByStatusHistory>;
  privateSumUrls: Scalars['Float']['output'];
  privatesUrlsByStatus: Array<GroupByStatusUrl>;
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


export type QueryPrivatesUrlsByStatusArgs = {
  timeFrame: Scalars['String']['input'];
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
  notifFrequency?: Maybe<NotifFrequency>;
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

export type CreateStripeSetupIntentMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateStripeSetupIntentMutation = { __typename?: 'Mutation', createStripeSetupIntent: string };

export type CreateSubscriptionMutationVariables = Exact<{
  paymentMethodId: Scalars['String']['input'];
  priceKey: Scalars['String']['input'];
}>;


export type CreateSubscriptionMutation = { __typename?: 'Mutation', createSubscription: string };

export type ChangeSubscriptionTierMutationVariables = Exact<{
  newPriceKey: Scalars['String']['input'];
}>;


export type ChangeSubscriptionTierMutation = { __typename?: 'Mutation', changeSubscriptionTier: string };

export type CancelSubscriptionMutationVariables = Exact<{ [key: string]: never; }>;


export type CancelSubscriptionMutation = { __typename?: 'Mutation', cancelSubscription: string };

export type UpdateUrlNameMutationVariables = Exact<{
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
}>;


export type UpdateUrlNameMutation = { __typename?: 'Mutation', updateUrlName: { __typename?: 'Url', id: string, name: string } };

export type UpdateCheckFrequencyMutationVariables = Exact<{
  id: Scalars['String']['input'];
  checkFrequencyId: Scalars['String']['input'];
}>;


export type UpdateCheckFrequencyMutation = { __typename?: 'Mutation', updateCheckFrequency: { __typename?: 'Url', id: string, checkFrequency?: { __typename?: 'CheckFrequency', id: string } | null } };

export type DeleteUrlMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteUrlMutation = { __typename?: 'Mutation', deleteUrl: boolean };

export type UpdateUserNotifFrequencyMutationVariables = Exact<{
  frequency: Scalars['String']['input'];
}>;


export type UpdateUserNotifFrequencyMutation = { __typename?: 'Mutation', updateUserNotifFrequency: string };

export type GetAllURlsQueryVariables = Exact<{
  currentPage: Scalars['Float']['input'];
  sortField: Scalars['String']['input'];
  searchText: Scalars['String']['input'];
  privateUrls?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetAllURlsQuery = { __typename?: 'Query', urls: { __typename?: 'PaginateUrls', totalPages: number, currentPage: number, previousPage: number, nextPage: number, urls: Array<{ __typename?: 'Url', id: string, name: string, path: string, private: boolean, createdAt: any, histories: Array<{ __typename?: 'History', id: string, response: string, status_code: number, created_at: any }> }> } };

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


export type PaginatesHistoriesQuery = { __typename?: 'Query', paginatesHistories: { __typename?: 'PaginatesHistories', currentPage: number, nextPage: number, previousPage: number, totalPages: number, histories: Array<{ __typename?: 'History', id: string, created_at: any, status_code: number, url: { __typename?: 'Url', id: string, name: string, path: string, private: boolean } }> } };

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


export type HistoryWithResponseQuery = { __typename?: 'Query', historyWithResponse: { __typename?: 'History', response: string, id: string, status_code: number, content_type: string } };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', getAllUsers: string };

export type PrivateHistoriesByStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type PrivateHistoriesByStatusQuery = { __typename?: 'Query', privateHistoriesByStatus: Array<{ __typename?: 'GroupByStatusHistory', statusCode: number, countHtml: number, countJson: number, countUnknown: number }> };

export type PrivatesUrlsByStatusQueryVariables = Exact<{
  timeFrame: Scalars['String']['input'];
}>;


export type PrivatesUrlsByStatusQuery = { __typename?: 'Query', privatesUrlsByStatus: Array<{ __typename?: 'GroupByStatusUrl', dateTime: string, offLine: number, onLine: number }> };

export type PrivateSumUrlsQueryVariables = Exact<{ [key: string]: never; }>;


export type PrivateSumUrlsQuery = { __typename?: 'Query', privateSumUrls: number };

export type NotifFrequenciesQueryVariables = Exact<{ [key: string]: never; }>;


export type NotifFrequenciesQuery = { __typename?: 'Query', getUserNotifFrequency: string, notifFrequencies: Array<{ __typename?: 'NotifFrequency', interval: string }> };


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
export const CreateStripeSetupIntentDocument = gql`
    mutation CreateStripeSetupIntent {
  createStripeSetupIntent
}
    `;
export type CreateStripeSetupIntentMutationFn = Apollo.MutationFunction<CreateStripeSetupIntentMutation, CreateStripeSetupIntentMutationVariables>;

/**
 * __useCreateStripeSetupIntentMutation__
 *
 * To run a mutation, you first call `useCreateStripeSetupIntentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStripeSetupIntentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStripeSetupIntentMutation, { data, loading, error }] = useCreateStripeSetupIntentMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateStripeSetupIntentMutation(baseOptions?: Apollo.MutationHookOptions<CreateStripeSetupIntentMutation, CreateStripeSetupIntentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateStripeSetupIntentMutation, CreateStripeSetupIntentMutationVariables>(CreateStripeSetupIntentDocument, options);
      }
export type CreateStripeSetupIntentMutationHookResult = ReturnType<typeof useCreateStripeSetupIntentMutation>;
export type CreateStripeSetupIntentMutationResult = Apollo.MutationResult<CreateStripeSetupIntentMutation>;
export type CreateStripeSetupIntentMutationOptions = Apollo.BaseMutationOptions<CreateStripeSetupIntentMutation, CreateStripeSetupIntentMutationVariables>;
export const CreateSubscriptionDocument = gql`
    mutation CreateSubscription($paymentMethodId: String!, $priceKey: String!) {
  createSubscription(paymentMethodId: $paymentMethodId, priceKey: $priceKey)
}
    `;
export type CreateSubscriptionMutationFn = Apollo.MutationFunction<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>;

/**
 * __useCreateSubscriptionMutation__
 *
 * To run a mutation, you first call `useCreateSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubscriptionMutation, { data, loading, error }] = useCreateSubscriptionMutation({
 *   variables: {
 *      paymentMethodId: // value for 'paymentMethodId'
 *      priceKey: // value for 'priceKey'
 *   },
 * });
 */
export function useCreateSubscriptionMutation(baseOptions?: Apollo.MutationHookOptions<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>(CreateSubscriptionDocument, options);
      }
export type CreateSubscriptionMutationHookResult = ReturnType<typeof useCreateSubscriptionMutation>;
export type CreateSubscriptionMutationResult = Apollo.MutationResult<CreateSubscriptionMutation>;
export type CreateSubscriptionMutationOptions = Apollo.BaseMutationOptions<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>;
export const ChangeSubscriptionTierDocument = gql`
    mutation ChangeSubscriptionTier($newPriceKey: String!) {
  changeSubscriptionTier(newPriceKey: $newPriceKey)
}
    `;
export type ChangeSubscriptionTierMutationFn = Apollo.MutationFunction<ChangeSubscriptionTierMutation, ChangeSubscriptionTierMutationVariables>;

/**
 * __useChangeSubscriptionTierMutation__
 *
 * To run a mutation, you first call `useChangeSubscriptionTierMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeSubscriptionTierMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeSubscriptionTierMutation, { data, loading, error }] = useChangeSubscriptionTierMutation({
 *   variables: {
 *      newPriceKey: // value for 'newPriceKey'
 *   },
 * });
 */
export function useChangeSubscriptionTierMutation(baseOptions?: Apollo.MutationHookOptions<ChangeSubscriptionTierMutation, ChangeSubscriptionTierMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeSubscriptionTierMutation, ChangeSubscriptionTierMutationVariables>(ChangeSubscriptionTierDocument, options);
      }
export type ChangeSubscriptionTierMutationHookResult = ReturnType<typeof useChangeSubscriptionTierMutation>;
export type ChangeSubscriptionTierMutationResult = Apollo.MutationResult<ChangeSubscriptionTierMutation>;
export type ChangeSubscriptionTierMutationOptions = Apollo.BaseMutationOptions<ChangeSubscriptionTierMutation, ChangeSubscriptionTierMutationVariables>;
export const CancelSubscriptionDocument = gql`
    mutation CancelSubscription {
  cancelSubscription
}
    `;
export type CancelSubscriptionMutationFn = Apollo.MutationFunction<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>;

/**
 * __useCancelSubscriptionMutation__
 *
 * To run a mutation, you first call `useCancelSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelSubscriptionMutation, { data, loading, error }] = useCancelSubscriptionMutation({
 *   variables: {
 *   },
 * });
 */
export function useCancelSubscriptionMutation(baseOptions?: Apollo.MutationHookOptions<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>(CancelSubscriptionDocument, options);
      }
export type CancelSubscriptionMutationHookResult = ReturnType<typeof useCancelSubscriptionMutation>;
export type CancelSubscriptionMutationResult = Apollo.MutationResult<CancelSubscriptionMutation>;
export type CancelSubscriptionMutationOptions = Apollo.BaseMutationOptions<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>;
export const UpdateUrlNameDocument = gql`
    mutation UpdateUrlName($id: String!, $name: String!) {
  updateUrlName(id: $id, name: $name) {
    id
    name
  }
}
    `;
export type UpdateUrlNameMutationFn = Apollo.MutationFunction<UpdateUrlNameMutation, UpdateUrlNameMutationVariables>;

/**
 * __useUpdateUrlNameMutation__
 *
 * To run a mutation, you first call `useUpdateUrlNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUrlNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUrlNameMutation, { data, loading, error }] = useUpdateUrlNameMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateUrlNameMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUrlNameMutation, UpdateUrlNameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUrlNameMutation, UpdateUrlNameMutationVariables>(UpdateUrlNameDocument, options);
      }
export type UpdateUrlNameMutationHookResult = ReturnType<typeof useUpdateUrlNameMutation>;
export type UpdateUrlNameMutationResult = Apollo.MutationResult<UpdateUrlNameMutation>;
export type UpdateUrlNameMutationOptions = Apollo.BaseMutationOptions<UpdateUrlNameMutation, UpdateUrlNameMutationVariables>;
export const UpdateCheckFrequencyDocument = gql`
    mutation UpdateCheckFrequency($id: String!, $checkFrequencyId: String!) {
  updateCheckFrequency(id: $id, checkFrequencyId: $checkFrequencyId) {
    id
    checkFrequency {
      id
    }
  }
}
    `;
export type UpdateCheckFrequencyMutationFn = Apollo.MutationFunction<UpdateCheckFrequencyMutation, UpdateCheckFrequencyMutationVariables>;

/**
 * __useUpdateCheckFrequencyMutation__
 *
 * To run a mutation, you first call `useUpdateCheckFrequencyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCheckFrequencyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCheckFrequencyMutation, { data, loading, error }] = useUpdateCheckFrequencyMutation({
 *   variables: {
 *      id: // value for 'id'
 *      checkFrequencyId: // value for 'checkFrequencyId'
 *   },
 * });
 */
export function useUpdateCheckFrequencyMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCheckFrequencyMutation, UpdateCheckFrequencyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCheckFrequencyMutation, UpdateCheckFrequencyMutationVariables>(UpdateCheckFrequencyDocument, options);
      }
export type UpdateCheckFrequencyMutationHookResult = ReturnType<typeof useUpdateCheckFrequencyMutation>;
export type UpdateCheckFrequencyMutationResult = Apollo.MutationResult<UpdateCheckFrequencyMutation>;
export type UpdateCheckFrequencyMutationOptions = Apollo.BaseMutationOptions<UpdateCheckFrequencyMutation, UpdateCheckFrequencyMutationVariables>;
export const DeleteUrlDocument = gql`
    mutation DeleteUrl($id: String!) {
  deleteUrl(id: $id)
}
    `;
export type DeleteUrlMutationFn = Apollo.MutationFunction<DeleteUrlMutation, DeleteUrlMutationVariables>;

/**
 * __useDeleteUrlMutation__
 *
 * To run a mutation, you first call `useDeleteUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUrlMutation, { data, loading, error }] = useDeleteUrlMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUrlMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUrlMutation, DeleteUrlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUrlMutation, DeleteUrlMutationVariables>(DeleteUrlDocument, options);
      }
export type DeleteUrlMutationHookResult = ReturnType<typeof useDeleteUrlMutation>;
export type DeleteUrlMutationResult = Apollo.MutationResult<DeleteUrlMutation>;
export type DeleteUrlMutationOptions = Apollo.BaseMutationOptions<DeleteUrlMutation, DeleteUrlMutationVariables>;
export const UpdateUserNotifFrequencyDocument = gql`
    mutation UpdateUserNotifFrequency($frequency: String!) {
  updateUserNotifFrequency(frequency: $frequency)
}
    `;
export type UpdateUserNotifFrequencyMutationFn = Apollo.MutationFunction<UpdateUserNotifFrequencyMutation, UpdateUserNotifFrequencyMutationVariables>;

/**
 * __useUpdateUserNotifFrequencyMutation__
 *
 * To run a mutation, you first call `useUpdateUserNotifFrequencyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserNotifFrequencyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserNotifFrequencyMutation, { data, loading, error }] = useUpdateUserNotifFrequencyMutation({
 *   variables: {
 *      frequency: // value for 'frequency'
 *   },
 * });
 */
export function useUpdateUserNotifFrequencyMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserNotifFrequencyMutation, UpdateUserNotifFrequencyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserNotifFrequencyMutation, UpdateUserNotifFrequencyMutationVariables>(UpdateUserNotifFrequencyDocument, options);
      }
export type UpdateUserNotifFrequencyMutationHookResult = ReturnType<typeof useUpdateUserNotifFrequencyMutation>;
export type UpdateUserNotifFrequencyMutationResult = Apollo.MutationResult<UpdateUserNotifFrequencyMutation>;
export type UpdateUserNotifFrequencyMutationOptions = Apollo.BaseMutationOptions<UpdateUserNotifFrequencyMutation, UpdateUserNotifFrequencyMutationVariables>;
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
      private
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
        private
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
    content_type
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
export const PrivateHistoriesByStatusDocument = gql`
    query PrivateHistoriesByStatus {
  privateHistoriesByStatus {
    statusCode
    countHtml
    countJson
    countUnknown
  }
}
    `;

/**
 * __usePrivateHistoriesByStatusQuery__
 *
 * To run a query within a React component, call `usePrivateHistoriesByStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `usePrivateHistoriesByStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePrivateHistoriesByStatusQuery({
 *   variables: {
 *   },
 * });
 */
export function usePrivateHistoriesByStatusQuery(baseOptions?: Apollo.QueryHookOptions<PrivateHistoriesByStatusQuery, PrivateHistoriesByStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PrivateHistoriesByStatusQuery, PrivateHistoriesByStatusQueryVariables>(PrivateHistoriesByStatusDocument, options);
      }
export function usePrivateHistoriesByStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PrivateHistoriesByStatusQuery, PrivateHistoriesByStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PrivateHistoriesByStatusQuery, PrivateHistoriesByStatusQueryVariables>(PrivateHistoriesByStatusDocument, options);
        }
export function usePrivateHistoriesByStatusSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PrivateHistoriesByStatusQuery, PrivateHistoriesByStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PrivateHistoriesByStatusQuery, PrivateHistoriesByStatusQueryVariables>(PrivateHistoriesByStatusDocument, options);
        }
export type PrivateHistoriesByStatusQueryHookResult = ReturnType<typeof usePrivateHistoriesByStatusQuery>;
export type PrivateHistoriesByStatusLazyQueryHookResult = ReturnType<typeof usePrivateHistoriesByStatusLazyQuery>;
export type PrivateHistoriesByStatusSuspenseQueryHookResult = ReturnType<typeof usePrivateHistoriesByStatusSuspenseQuery>;
export type PrivateHistoriesByStatusQueryResult = Apollo.QueryResult<PrivateHistoriesByStatusQuery, PrivateHistoriesByStatusQueryVariables>;
export const PrivatesUrlsByStatusDocument = gql`
    query PrivatesUrlsByStatus($timeFrame: String!) {
  privatesUrlsByStatus(timeFrame: $timeFrame) {
    dateTime
    offLine
    onLine
  }
}
    `;

/**
 * __usePrivatesUrlsByStatusQuery__
 *
 * To run a query within a React component, call `usePrivatesUrlsByStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `usePrivatesUrlsByStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePrivatesUrlsByStatusQuery({
 *   variables: {
 *      timeFrame: // value for 'timeFrame'
 *   },
 * });
 */
export function usePrivatesUrlsByStatusQuery(baseOptions: Apollo.QueryHookOptions<PrivatesUrlsByStatusQuery, PrivatesUrlsByStatusQueryVariables> & ({ variables: PrivatesUrlsByStatusQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PrivatesUrlsByStatusQuery, PrivatesUrlsByStatusQueryVariables>(PrivatesUrlsByStatusDocument, options);
      }
export function usePrivatesUrlsByStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PrivatesUrlsByStatusQuery, PrivatesUrlsByStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PrivatesUrlsByStatusQuery, PrivatesUrlsByStatusQueryVariables>(PrivatesUrlsByStatusDocument, options);
        }
export function usePrivatesUrlsByStatusSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PrivatesUrlsByStatusQuery, PrivatesUrlsByStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PrivatesUrlsByStatusQuery, PrivatesUrlsByStatusQueryVariables>(PrivatesUrlsByStatusDocument, options);
        }
export type PrivatesUrlsByStatusQueryHookResult = ReturnType<typeof usePrivatesUrlsByStatusQuery>;
export type PrivatesUrlsByStatusLazyQueryHookResult = ReturnType<typeof usePrivatesUrlsByStatusLazyQuery>;
export type PrivatesUrlsByStatusSuspenseQueryHookResult = ReturnType<typeof usePrivatesUrlsByStatusSuspenseQuery>;
export type PrivatesUrlsByStatusQueryResult = Apollo.QueryResult<PrivatesUrlsByStatusQuery, PrivatesUrlsByStatusQueryVariables>;
export const PrivateSumUrlsDocument = gql`
    query PrivateSumUrls {
  privateSumUrls
}
    `;

/**
 * __usePrivateSumUrlsQuery__
 *
 * To run a query within a React component, call `usePrivateSumUrlsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePrivateSumUrlsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePrivateSumUrlsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePrivateSumUrlsQuery(baseOptions?: Apollo.QueryHookOptions<PrivateSumUrlsQuery, PrivateSumUrlsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PrivateSumUrlsQuery, PrivateSumUrlsQueryVariables>(PrivateSumUrlsDocument, options);
      }
export function usePrivateSumUrlsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PrivateSumUrlsQuery, PrivateSumUrlsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PrivateSumUrlsQuery, PrivateSumUrlsQueryVariables>(PrivateSumUrlsDocument, options);
        }
export function usePrivateSumUrlsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PrivateSumUrlsQuery, PrivateSumUrlsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PrivateSumUrlsQuery, PrivateSumUrlsQueryVariables>(PrivateSumUrlsDocument, options);
        }
export type PrivateSumUrlsQueryHookResult = ReturnType<typeof usePrivateSumUrlsQuery>;
export type PrivateSumUrlsLazyQueryHookResult = ReturnType<typeof usePrivateSumUrlsLazyQuery>;
export type PrivateSumUrlsSuspenseQueryHookResult = ReturnType<typeof usePrivateSumUrlsSuspenseQuery>;
export type PrivateSumUrlsQueryResult = Apollo.QueryResult<PrivateSumUrlsQuery, PrivateSumUrlsQueryVariables>;
export const NotifFrequenciesDocument = gql`
    query NotifFrequencies {
  getUserNotifFrequency
  notifFrequencies {
    interval
  }
}
    `;

/**
 * __useNotifFrequenciesQuery__
 *
 * To run a query within a React component, call `useNotifFrequenciesQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotifFrequenciesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotifFrequenciesQuery({
 *   variables: {
 *   },
 * });
 */
export function useNotifFrequenciesQuery(baseOptions?: Apollo.QueryHookOptions<NotifFrequenciesQuery, NotifFrequenciesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NotifFrequenciesQuery, NotifFrequenciesQueryVariables>(NotifFrequenciesDocument, options);
      }
export function useNotifFrequenciesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotifFrequenciesQuery, NotifFrequenciesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NotifFrequenciesQuery, NotifFrequenciesQueryVariables>(NotifFrequenciesDocument, options);
        }
export function useNotifFrequenciesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<NotifFrequenciesQuery, NotifFrequenciesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<NotifFrequenciesQuery, NotifFrequenciesQueryVariables>(NotifFrequenciesDocument, options);
        }
export type NotifFrequenciesQueryHookResult = ReturnType<typeof useNotifFrequenciesQuery>;
export type NotifFrequenciesLazyQueryHookResult = ReturnType<typeof useNotifFrequenciesLazyQuery>;
export type NotifFrequenciesSuspenseQueryHookResult = ReturnType<typeof useNotifFrequenciesSuspenseQuery>;
export type NotifFrequenciesQueryResult = Apollo.QueryResult<NotifFrequenciesQuery, NotifFrequenciesQueryVariables>;