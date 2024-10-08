import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
    T extends { [key: string]: unknown },
    K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
    | T
    | {
          [P in keyof T]?: P extends " $fragmentName" | "__typename"
              ? T[P]
              : never;
      };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string };
    String: { input: string; output: string };
    Boolean: { input: boolean; output: boolean };
    Int: { input: number; output: number };
    Float: { input: number; output: number };
    DateTimeISO: { input: any; output: any };
};

export type CheckFrequency = {
    __typename?: "CheckFrequency";
    created_at: Scalars["DateTimeISO"]["output"];
    id: Scalars["String"]["output"];
    interval: Scalars["String"]["output"];
    urls: Array<Url>;
};

export type History = {
    __typename?: "History";
    created_at: Scalars["DateTimeISO"]["output"];
    id: Scalars["String"]["output"];
    response: Scalars["String"]["output"];
    status_code: Scalars["Float"]["output"];
    url: Url;
};

export type Mutation = {
    __typename?: "Mutation";
    addUrl: Url;
    checkUrl: Url;
    createUser: Scalars["String"]["output"];
    login: Scalars["String"]["output"];
};

export type MutationAddUrlArgs = {
    checkFrequencyId?: InputMaybe<Scalars["String"]["input"]>;
    isPrivate?: Scalars["Boolean"]["input"];
    urlData: UrlInput;
};

export type MutationCheckUrlArgs = {
    id: Scalars["String"]["input"];
};

export type MutationCreateUserArgs = {
    email: Scalars["String"]["input"];
    password: Scalars["String"]["input"];
    username: Scalars["String"]["input"];
};

export type MutationLoginArgs = {
    email: Scalars["String"]["input"];
    password: Scalars["String"]["input"];
};

export type PaginateUrls = {
    __typename?: "PaginateUrls";
    currentPage: Scalars["Float"]["output"];
    nextPage: Scalars["Float"]["output"];
    previousPage: Scalars["Float"]["output"];
    totalPages: Scalars["Float"]["output"];
    urls: Array<Url>;
};

export type Query = {
    __typename?: "Query";
    checkFrequencies: Array<CheckFrequency>;
    histories: Array<History>;
    history: History;
    logout: Scalars["String"]["output"];
    me: Scalars["String"]["output"];
    recentPrivateHistories: Array<History>;
    recentPrivateUrls: Array<Url>;
    url: Url;
    urls: PaginateUrls;
};

export type QueryHistoryArgs = {
    id: Scalars["String"]["input"];
};

export type QueryUrlArgs = {
    id: Scalars["String"]["input"];
};

export type QueryUrlsArgs = {
    currentPage?: Scalars["Float"]["input"];
    privateUrls?: Scalars["Boolean"]["input"];
    searchText: Scalars["String"]["input"];
    sortField: Scalars["String"]["input"];
};

export type Url = {
    __typename?: "Url";
    checkFrequency?: Maybe<CheckFrequency>;
    createdAt: Scalars["DateTimeISO"]["output"];
    histories: Array<History>;
    id: Scalars["String"]["output"];
    lastCheckDate: Scalars["DateTimeISO"]["output"];
    name: Scalars["String"]["output"];
    path: Scalars["String"]["output"];
    private: Scalars["Boolean"]["output"];
    user?: Maybe<User>;
};

export type UrlInput = {
    name: Scalars["String"]["input"];
    path: Scalars["String"]["input"];
};

export type User = {
    __typename?: "User";
    email: Scalars["String"]["output"];
    id: Scalars["String"]["output"];
    urls?: Maybe<Array<Url>>;
    username: Scalars["String"]["output"];
};

export type AddUrlMutationVariables = Exact<{
    urlData: UrlInput;
    isPrivate: Scalars["Boolean"]["input"];
    checkFrequencyId?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type AddUrlMutation = {
    __typename?: "Mutation";
    addUrl: { __typename?: "Url"; name: string; path: string };
};

export type AddUserMutationVariables = Exact<{
    username: Scalars["String"]["input"];
    email: Scalars["String"]["input"];
    password: Scalars["String"]["input"];
}>;

export type AddUserMutation = { __typename?: "Mutation"; createUser: string };

export type LoginMutationVariables = Exact<{
    email: Scalars["String"]["input"];
    password: Scalars["String"]["input"];
}>;

export type LoginMutation = { __typename?: "Mutation"; login: string };

export type CheckUrlMutationVariables = Exact<{
    id: Scalars["String"]["input"];
}>;

export type CheckUrlMutation = {
    __typename?: "Mutation";
    checkUrl: { __typename?: "Url"; name: string; path: string };
};

export type GetAllURlsQueryVariables = Exact<{
    currentPage: Scalars["Float"]["input"];
    sortField: Scalars["String"]["input"];
    searchText: Scalars["String"]["input"];
    privateUrls?: InputMaybe<Scalars["Boolean"]["input"]>;
}>;

export type GetAllURlsQuery = {
    __typename?: "Query";
    urls: {
        __typename?: "PaginateUrls";
        totalPages: number;
        currentPage: number;
        previousPage: number;
        nextPage: number;
        urls: Array<{
            __typename?: "Url";
            id: string;
            name: string;
            path: string;
            createdAt: any;
            histories: Array<{
                __typename?: "History";
                id: string;
                response: string;
                status_code: number;
                created_at: any;
            }>;
        }>;
    };
};

export type UrlQueryVariables = Exact<{
    urlId: Scalars["String"]["input"];
}>;

export type UrlQuery = {
    __typename?: "Query";
    url: {
        __typename?: "Url";
        id: string;
        name: string;
        path: string;
        histories: Array<{
            __typename?: "History";
            id: string;
            response: string;
            status_code: number;
            created_at: any;
        }>;
    };
};

export type RecentPrivateUrlsQueryVariables = Exact<{ [key: string]: never }>;

export type RecentPrivateUrlsQuery = {
    __typename?: "Query";
    recentPrivateUrls: Array<{
        __typename?: "Url";
        id: string;
        name: string;
        path: string;
        createdAt: any;
        histories: Array<{
            __typename?: "History";
            id: string;
            status_code: number;
            created_at: any;
        }>;
    }>;
};

export type RecentPrivateHistoriesQueryVariables = Exact<{
    [key: string]: never;
}>;

export type RecentPrivateHistoriesQuery = {
    __typename?: "Query";
    recentPrivateHistories: Array<{
        __typename?: "History";
        id: string;
        status_code: number;
        created_at: any;
        url: { __typename?: "Url"; name: string; path: string };
    }>;
};

export type LogoutQueryVariables = Exact<{ [key: string]: never }>;

export type LogoutQuery = { __typename?: "Query"; logout: string };

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: "Query"; me: string };

export type CheckFrequenciesQueryVariables = Exact<{ [key: string]: never }>;

export type CheckFrequenciesQuery = {
    __typename?: "Query";
    checkFrequencies: Array<{
        __typename?: "CheckFrequency";
        id: string;
        interval: string;
    }>;
};

export const AddUrlDocument = gql`
    mutation AddUrl(
        $urlData: UrlInput!
        $isPrivate: Boolean!
        $checkFrequencyId: String
    ) {
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
export type AddUrlMutationFn = Apollo.MutationFunction<
    AddUrlMutation,
    AddUrlMutationVariables
>;

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
export function useAddUrlMutation(
    baseOptions?: Apollo.MutationHookOptions<
        AddUrlMutation,
        AddUrlMutationVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<AddUrlMutation, AddUrlMutationVariables>(
        AddUrlDocument,
        options,
    );
}
export type AddUrlMutationHookResult = ReturnType<typeof useAddUrlMutation>;
export type AddUrlMutationResult = Apollo.MutationResult<AddUrlMutation>;
export type AddUrlMutationOptions = Apollo.BaseMutationOptions<
    AddUrlMutation,
    AddUrlMutationVariables
>;
export const AddUserDocument = gql`
    mutation AddUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password)
    }
`;
export type AddUserMutationFn = Apollo.MutationFunction<
    AddUserMutation,
    AddUserMutationVariables
>;

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
export function useAddUserMutation(
    baseOptions?: Apollo.MutationHookOptions<
        AddUserMutation,
        AddUserMutationVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<AddUserMutation, AddUserMutationVariables>(
        AddUserDocument,
        options,
    );
}
export type AddUserMutationHookResult = ReturnType<typeof useAddUserMutation>;
export type AddUserMutationResult = Apollo.MutationResult<AddUserMutation>;
export type AddUserMutationOptions = Apollo.BaseMutationOptions<
    AddUserMutation,
    AddUserMutationVariables
>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password)
    }
`;
export type LoginMutationFn = Apollo.MutationFunction<
    LoginMutation,
    LoginMutationVariables
>;

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
export function useLoginMutation(
    baseOptions?: Apollo.MutationHookOptions<
        LoginMutation,
        LoginMutationVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
        LoginDocument,
        options,
    );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
    LoginMutation,
    LoginMutationVariables
>;
export const CheckUrlDocument = gql`
    mutation CheckUrl($id: String!) {
        checkUrl(id: $id) {
            name
            path
        }
    }
`;
export type CheckUrlMutationFn = Apollo.MutationFunction<
    CheckUrlMutation,
    CheckUrlMutationVariables
>;

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
export function useCheckUrlMutation(
    baseOptions?: Apollo.MutationHookOptions<
        CheckUrlMutation,
        CheckUrlMutationVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<CheckUrlMutation, CheckUrlMutationVariables>(
        CheckUrlDocument,
        options,
    );
}
export type CheckUrlMutationHookResult = ReturnType<typeof useCheckUrlMutation>;
export type CheckUrlMutationResult = Apollo.MutationResult<CheckUrlMutation>;
export type CheckUrlMutationOptions = Apollo.BaseMutationOptions<
    CheckUrlMutation,
    CheckUrlMutationVariables
>;
export const GetAllURlsDocument = gql`
    query GetAllURls(
        $currentPage: Float!
        $sortField: String!
        $searchText: String!
        $privateUrls: Boolean
    ) {
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
export function useGetAllURlsQuery(
    baseOptions: Apollo.QueryHookOptions<
        GetAllURlsQuery,
        GetAllURlsQueryVariables
    > &
        (
            | { variables: GetAllURlsQueryVariables; skip?: boolean }
            | { skip: boolean }
        ),
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<GetAllURlsQuery, GetAllURlsQueryVariables>(
        GetAllURlsDocument,
        options,
    );
}
export function useGetAllURlsLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        GetAllURlsQuery,
        GetAllURlsQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<GetAllURlsQuery, GetAllURlsQueryVariables>(
        GetAllURlsDocument,
        options,
    );
}
export function useGetAllURlsSuspenseQuery(
    baseOptions?: Apollo.SuspenseQueryHookOptions<
        GetAllURlsQuery,
        GetAllURlsQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery<GetAllURlsQuery, GetAllURlsQueryVariables>(
        GetAllURlsDocument,
        options,
    );
}
export type GetAllURlsQueryHookResult = ReturnType<typeof useGetAllURlsQuery>;
export type GetAllURlsLazyQueryHookResult = ReturnType<
    typeof useGetAllURlsLazyQuery
>;
export type GetAllURlsSuspenseQueryHookResult = ReturnType<
    typeof useGetAllURlsSuspenseQuery
>;
export type GetAllURlsQueryResult = Apollo.QueryResult<
    GetAllURlsQuery,
    GetAllURlsQueryVariables
>;
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
export function useUrlQuery(
    baseOptions: Apollo.QueryHookOptions<UrlQuery, UrlQueryVariables> &
        ({ variables: UrlQueryVariables; skip?: boolean } | { skip: boolean }),
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<UrlQuery, UrlQueryVariables>(UrlDocument, options);
}
export function useUrlLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<UrlQuery, UrlQueryVariables>,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<UrlQuery, UrlQueryVariables>(
        UrlDocument,
        options,
    );
}
export function useUrlSuspenseQuery(
    baseOptions?: Apollo.SuspenseQueryHookOptions<UrlQuery, UrlQueryVariables>,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery<UrlQuery, UrlQueryVariables>(
        UrlDocument,
        options,
    );
}
export type UrlQueryHookResult = ReturnType<typeof useUrlQuery>;
export type UrlLazyQueryHookResult = ReturnType<typeof useUrlLazyQuery>;
export type UrlSuspenseQueryHookResult = ReturnType<typeof useUrlSuspenseQuery>;
export type UrlQueryResult = Apollo.QueryResult<UrlQuery, UrlQueryVariables>;
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
export function useRecentPrivateUrlsQuery(
    baseOptions?: Apollo.QueryHookOptions<
        RecentPrivateUrlsQuery,
        RecentPrivateUrlsQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<
        RecentPrivateUrlsQuery,
        RecentPrivateUrlsQueryVariables
    >(RecentPrivateUrlsDocument, options);
}
export function useRecentPrivateUrlsLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        RecentPrivateUrlsQuery,
        RecentPrivateUrlsQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<
        RecentPrivateUrlsQuery,
        RecentPrivateUrlsQueryVariables
    >(RecentPrivateUrlsDocument, options);
}
export function useRecentPrivateUrlsSuspenseQuery(
    baseOptions?: Apollo.SuspenseQueryHookOptions<
        RecentPrivateUrlsQuery,
        RecentPrivateUrlsQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery<
        RecentPrivateUrlsQuery,
        RecentPrivateUrlsQueryVariables
    >(RecentPrivateUrlsDocument, options);
}
export type RecentPrivateUrlsQueryHookResult = ReturnType<
    typeof useRecentPrivateUrlsQuery
>;
export type RecentPrivateUrlsLazyQueryHookResult = ReturnType<
    typeof useRecentPrivateUrlsLazyQuery
>;
export type RecentPrivateUrlsSuspenseQueryHookResult = ReturnType<
    typeof useRecentPrivateUrlsSuspenseQuery
>;
export type RecentPrivateUrlsQueryResult = Apollo.QueryResult<
    RecentPrivateUrlsQuery,
    RecentPrivateUrlsQueryVariables
>;
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
export function useRecentPrivateHistoriesQuery(
    baseOptions?: Apollo.QueryHookOptions<
        RecentPrivateHistoriesQuery,
        RecentPrivateHistoriesQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<
        RecentPrivateHistoriesQuery,
        RecentPrivateHistoriesQueryVariables
    >(RecentPrivateHistoriesDocument, options);
}
export function useRecentPrivateHistoriesLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        RecentPrivateHistoriesQuery,
        RecentPrivateHistoriesQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<
        RecentPrivateHistoriesQuery,
        RecentPrivateHistoriesQueryVariables
    >(RecentPrivateHistoriesDocument, options);
}
export function useRecentPrivateHistoriesSuspenseQuery(
    baseOptions?: Apollo.SuspenseQueryHookOptions<
        RecentPrivateHistoriesQuery,
        RecentPrivateHistoriesQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery<
        RecentPrivateHistoriesQuery,
        RecentPrivateHistoriesQueryVariables
    >(RecentPrivateHistoriesDocument, options);
}
export type RecentPrivateHistoriesQueryHookResult = ReturnType<
    typeof useRecentPrivateHistoriesQuery
>;
export type RecentPrivateHistoriesLazyQueryHookResult = ReturnType<
    typeof useRecentPrivateHistoriesLazyQuery
>;
export type RecentPrivateHistoriesSuspenseQueryHookResult = ReturnType<
    typeof useRecentPrivateHistoriesSuspenseQuery
>;
export type RecentPrivateHistoriesQueryResult = Apollo.QueryResult<
    RecentPrivateHistoriesQuery,
    RecentPrivateHistoriesQueryVariables
>;
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
export function useLogoutQuery(
    baseOptions?: Apollo.QueryHookOptions<LogoutQuery, LogoutQueryVariables>,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<LogoutQuery, LogoutQueryVariables>(
        LogoutDocument,
        options,
    );
}
export function useLogoutLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        LogoutQuery,
        LogoutQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<LogoutQuery, LogoutQueryVariables>(
        LogoutDocument,
        options,
    );
}
export function useLogoutSuspenseQuery(
    baseOptions?: Apollo.SuspenseQueryHookOptions<
        LogoutQuery,
        LogoutQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery<LogoutQuery, LogoutQueryVariables>(
        LogoutDocument,
        options,
    );
}
export type LogoutQueryHookResult = ReturnType<typeof useLogoutQuery>;
export type LogoutLazyQueryHookResult = ReturnType<typeof useLogoutLazyQuery>;
export type LogoutSuspenseQueryHookResult = ReturnType<
    typeof useLogoutSuspenseQuery
>;
export type LogoutQueryResult = Apollo.QueryResult<
    LogoutQuery,
    LogoutQueryVariables
>;
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
export function useMeQuery(
    baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeSuspenseQuery(
    baseOptions?: Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(
        MeDocument,
        options,
    );
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
export function useCheckFrequenciesQuery(
    baseOptions?: Apollo.QueryHookOptions<
        CheckFrequenciesQuery,
        CheckFrequenciesQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<
        CheckFrequenciesQuery,
        CheckFrequenciesQueryVariables
    >(CheckFrequenciesDocument, options);
}
export function useCheckFrequenciesLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        CheckFrequenciesQuery,
        CheckFrequenciesQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<
        CheckFrequenciesQuery,
        CheckFrequenciesQueryVariables
    >(CheckFrequenciesDocument, options);
}
export function useCheckFrequenciesSuspenseQuery(
    baseOptions?: Apollo.SuspenseQueryHookOptions<
        CheckFrequenciesQuery,
        CheckFrequenciesQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery<
        CheckFrequenciesQuery,
        CheckFrequenciesQueryVariables
    >(CheckFrequenciesDocument, options);
}
export type CheckFrequenciesQueryHookResult = ReturnType<
    typeof useCheckFrequenciesQuery
>;
export type CheckFrequenciesLazyQueryHookResult = ReturnType<
    typeof useCheckFrequenciesLazyQuery
>;
export type CheckFrequenciesSuspenseQueryHookResult = ReturnType<
    typeof useCheckFrequenciesSuspenseQuery
>;
export type CheckFrequenciesQueryResult = Apollo.QueryResult<
    CheckFrequenciesQuery,
    CheckFrequenciesQueryVariables
>;
