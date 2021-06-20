import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};


export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createRead: Read;
  deleteRead: Scalars['Boolean'];
  updateRead?: Maybe<Read>;
  register: UserResponse;
  forgotPassword: Scalars['Boolean'];
  changePassword: UserResponse;
  Login: UserResponse;
  logout: Scalars['Boolean'];
  Timer?: Maybe<Timer>;
  createTimer: TimerResponse;
  endTimer: Timer;
  deleteTimer: Scalars['Boolean'];
  createProject: Projects;
  deleteProjects: Scalars['Boolean'];
  updateProjects?: Maybe<Projects>;
};


export type MutationCreateReadArgs = {
  input: ReadInput;
};


export type MutationDeleteReadArgs = {
  id: Scalars['Float'];
};


export type MutationUpdateReadArgs = {
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  token: Scalars['String'];
  newpassword: Scalars['String'];
  oldpassword: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationTimerArgs = {
  id: Scalars['Int'];
};


export type MutationCreateTimerArgs = {
  timerinput: TimerInput;
};


export type MutationEndTimerArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteTimerArgs = {
  id: Scalars['Int'];
};


export type MutationCreateProjectArgs = {
  input: ProjectInput;
};


export type MutationDeleteProjectsArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateProjectsArgs = {
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

export type PaginatedReads = {
  __typename?: 'PaginatedReads';
  reads: Array<Read>;
  hasMore: Scalars['Boolean'];
};

export type ProjectInput = {
  title: Scalars['String'];
  text: Scalars['String'];
  colorhex: Scalars['String'];
};

export type Projects = {
  __typename?: 'Projects';
  id: Scalars['Float'];
  title: Scalars['String'];
  text: Scalars['String'];
  colorhex: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  Read?: Maybe<Read>;
  Reads: PaginatedReads;
  me?: Maybe<User>;
  User?: Maybe<User>;
  Users: Array<User>;
  Timers: Array<Timer>;
  Project?: Maybe<Projects>;
  Projects: Array<Projects>;
  getTimers: Array<Timer>;
};


export type QueryReadArgs = {
  id: Scalars['Float'];
};


export type QueryReadsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['Float'];
};


export type QueryProjectArgs = {
  id: Scalars['Int'];
};


export type QueryGetTimersArgs = {
  id: Scalars['Int'];
};

export type Read = {
  __typename?: 'Read';
  id: Scalars['Float'];
  title: Scalars['String'];
  text: Scalars['String'];
  creatorId: Scalars['Float'];
  creator: User;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  textSnippet: Scalars['String'];
};

export type ReadInput = {
  title: Scalars['String'];
  text: Scalars['String'];
};

export type Timer = {
  __typename?: 'Timer';
  id: Scalars['Float'];
  title: Scalars['String'];
  text: Scalars['String'];
  starttime: Scalars['DateTime'];
  endtime?: Maybe<Scalars['DateTime']>;
  complete: Scalars['Boolean'];
  projectId: Scalars['Float'];
  project: Projects;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  clocktimer: Scalars['Float'];
};

export type TimerInput = {
  title: Scalars['String'];
  text: Scalars['String'];
  projectId: Scalars['Float'];
  starttime: Scalars['DateTime'];
  complete: Scalars['Boolean'];
};

export type TimerResponse = {
  __typename?: 'TimerResponse';
  error?: Maybe<Array<FieldError>>;
  timer?: Maybe<Timer>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  error?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newpassword: Scalars['String'];
  oldpassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & { error?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )> }
  ) }
);

export type CreateReadMutationVariables = Exact<{
  input: ReadInput;
}>;


export type CreateReadMutation = (
  { __typename?: 'Mutation' }
  & { createRead: (
    { __typename?: 'Read' }
    & Pick<Read, 'id' | 'title' | 'text' | 'creatorId' | 'createdAt' | 'updatedAt'>
  ) }
);

export type CreateTimerMutationVariables = Exact<{
  timerinput: TimerInput;
}>;


export type CreateTimerMutation = (
  { __typename?: 'Mutation' }
  & { createTimer: (
    { __typename?: 'TimerResponse' }
    & { error?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, timer?: Maybe<(
      { __typename?: 'Timer' }
      & Pick<Timer, 'id' | 'title' | 'text' | 'starttime' | 'complete'>
    )> }
  ) }
);

export type DeleteTimerMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteTimerMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteTimer'>
);

export type EndtimerMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type EndtimerMutation = (
  { __typename?: 'Mutation' }
  & { endTimer: (
    { __typename?: 'Timer' }
    & Pick<Timer, 'id' | 'title' | 'text' | 'starttime' | 'complete'>
  ) }
);

export type ForgotpasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotpasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { Login: (
    { __typename?: 'UserResponse' }
    & { error?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type ResgisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type ResgisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { error?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )> }
  ) }
);

export type TimerMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type TimerMutation = (
  { __typename?: 'Mutation' }
  & { Timer?: Maybe<(
    { __typename?: 'Timer' }
    & Pick<Timer, 'id' | 'title' | 'text' | 'starttime' | 'complete' | 'endtime' | 'clocktimer'>
    & { project: (
      { __typename?: 'Projects' }
      & Pick<Projects, 'id' | 'title' | 'colorhex'>
    ) }
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  )> }
);

export type ProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectsQuery = (
  { __typename?: 'Query' }
  & { Projects: Array<(
    { __typename?: 'Projects' }
    & Pick<Projects, 'id' | 'title' | 'text' | 'colorhex' | 'createdAt' | 'updatedAt'>
  )> }
);

export type ReadsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type ReadsQuery = (
  { __typename?: 'Query' }
  & { Reads: (
    { __typename?: 'PaginatedReads' }
    & Pick<PaginatedReads, 'hasMore'>
    & { reads: Array<(
      { __typename?: 'Read' }
      & Pick<Read, 'id' | 'title' | 'textSnippet' | 'createdAt' | 'updatedAt' | 'creatorId'>
    )> }
  ) }
);

export type TimersQueryVariables = Exact<{ [key: string]: never; }>;


export type TimersQuery = (
  { __typename?: 'Query' }
  & { Timers: Array<(
    { __typename?: 'Timer' }
    & Pick<Timer, 'id' | 'title' | 'text' | 'starttime' | 'endtime' | 'complete' | 'clocktimer'>
    & { project: (
      { __typename?: 'Projects' }
      & Pick<Projects, 'id' | 'title' | 'colorhex'>
    ) }
  )> }
);


export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newpassword: String!, $oldpassword: String!) {
  changePassword(
    token: $token
    newpassword: $newpassword
    oldpassword: $oldpassword
  ) {
    error {
      field
      message
    }
    user {
      id
      username
    }
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newpassword: // value for 'newpassword'
 *      oldpassword: // value for 'oldpassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreateReadDocument = gql`
    mutation CreateRead($input: ReadInput!) {
  createRead(input: $input) {
    id
    title
    text
    creatorId
    createdAt
    updatedAt
  }
}
    `;
export type CreateReadMutationFn = Apollo.MutationFunction<CreateReadMutation, CreateReadMutationVariables>;

/**
 * __useCreateReadMutation__
 *
 * To run a mutation, you first call `useCreateReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReadMutation, { data, loading, error }] = useCreateReadMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateReadMutation(baseOptions?: Apollo.MutationHookOptions<CreateReadMutation, CreateReadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReadMutation, CreateReadMutationVariables>(CreateReadDocument, options);
      }
export type CreateReadMutationHookResult = ReturnType<typeof useCreateReadMutation>;
export type CreateReadMutationResult = Apollo.MutationResult<CreateReadMutation>;
export type CreateReadMutationOptions = Apollo.BaseMutationOptions<CreateReadMutation, CreateReadMutationVariables>;
export const CreateTimerDocument = gql`
    mutation CreateTimer($timerinput: TimerInput!) {
  createTimer(timerinput: $timerinput) {
    error {
      field
      message
    }
    timer {
      id
      title
      text
      starttime
      complete
    }
  }
}
    `;
export type CreateTimerMutationFn = Apollo.MutationFunction<CreateTimerMutation, CreateTimerMutationVariables>;

/**
 * __useCreateTimerMutation__
 *
 * To run a mutation, you first call `useCreateTimerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTimerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTimerMutation, { data, loading, error }] = useCreateTimerMutation({
 *   variables: {
 *      timerinput: // value for 'timerinput'
 *   },
 * });
 */
export function useCreateTimerMutation(baseOptions?: Apollo.MutationHookOptions<CreateTimerMutation, CreateTimerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTimerMutation, CreateTimerMutationVariables>(CreateTimerDocument, options);
      }
export type CreateTimerMutationHookResult = ReturnType<typeof useCreateTimerMutation>;
export type CreateTimerMutationResult = Apollo.MutationResult<CreateTimerMutation>;
export type CreateTimerMutationOptions = Apollo.BaseMutationOptions<CreateTimerMutation, CreateTimerMutationVariables>;
export const DeleteTimerDocument = gql`
    mutation DeleteTimer($id: Int!) {
  deleteTimer(id: $id)
}
    `;
export type DeleteTimerMutationFn = Apollo.MutationFunction<DeleteTimerMutation, DeleteTimerMutationVariables>;

/**
 * __useDeleteTimerMutation__
 *
 * To run a mutation, you first call `useDeleteTimerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTimerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTimerMutation, { data, loading, error }] = useDeleteTimerMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTimerMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTimerMutation, DeleteTimerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTimerMutation, DeleteTimerMutationVariables>(DeleteTimerDocument, options);
      }
export type DeleteTimerMutationHookResult = ReturnType<typeof useDeleteTimerMutation>;
export type DeleteTimerMutationResult = Apollo.MutationResult<DeleteTimerMutation>;
export type DeleteTimerMutationOptions = Apollo.BaseMutationOptions<DeleteTimerMutation, DeleteTimerMutationVariables>;
export const EndtimerDocument = gql`
    mutation Endtimer($id: Int!) {
  endTimer(id: $id) {
    id
    title
    text
    starttime
    complete
  }
}
    `;
export type EndtimerMutationFn = Apollo.MutationFunction<EndtimerMutation, EndtimerMutationVariables>;

/**
 * __useEndtimerMutation__
 *
 * To run a mutation, you first call `useEndtimerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEndtimerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [endtimerMutation, { data, loading, error }] = useEndtimerMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEndtimerMutation(baseOptions?: Apollo.MutationHookOptions<EndtimerMutation, EndtimerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EndtimerMutation, EndtimerMutationVariables>(EndtimerDocument, options);
      }
export type EndtimerMutationHookResult = ReturnType<typeof useEndtimerMutation>;
export type EndtimerMutationResult = Apollo.MutationResult<EndtimerMutation>;
export type EndtimerMutationOptions = Apollo.BaseMutationOptions<EndtimerMutation, EndtimerMutationVariables>;
export const ForgotpasswordDocument = gql`
    mutation forgotpassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotpasswordMutationFn = Apollo.MutationFunction<ForgotpasswordMutation, ForgotpasswordMutationVariables>;

/**
 * __useForgotpasswordMutation__
 *
 * To run a mutation, you first call `useForgotpasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotpasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotpasswordMutation, { data, loading, error }] = useForgotpasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotpasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotpasswordMutation, ForgotpasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotpasswordMutation, ForgotpasswordMutationVariables>(ForgotpasswordDocument, options);
      }
export type ForgotpasswordMutationHookResult = ReturnType<typeof useForgotpasswordMutation>;
export type ForgotpasswordMutationResult = Apollo.MutationResult<ForgotpasswordMutation>;
export type ForgotpasswordMutationOptions = Apollo.BaseMutationOptions<ForgotpasswordMutation, ForgotpasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  Login(username: $username, password: $password) {
    error {
      field
      message
    }
    user {
      id
      username
    }
  }
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
 *      username: // value for 'username'
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
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const ResgisterDocument = gql`
    mutation Resgister($username: String!, $email: String!, $password: String!) {
  register(options: {username: $username, email: $email, password: $password}) {
    error {
      field
      message
    }
    user {
      id
      username
    }
  }
}
    `;
export type ResgisterMutationFn = Apollo.MutationFunction<ResgisterMutation, ResgisterMutationVariables>;

/**
 * __useResgisterMutation__
 *
 * To run a mutation, you first call `useResgisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResgisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resgisterMutation, { data, loading, error }] = useResgisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useResgisterMutation(baseOptions?: Apollo.MutationHookOptions<ResgisterMutation, ResgisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResgisterMutation, ResgisterMutationVariables>(ResgisterDocument, options);
      }
export type ResgisterMutationHookResult = ReturnType<typeof useResgisterMutation>;
export type ResgisterMutationResult = Apollo.MutationResult<ResgisterMutation>;
export type ResgisterMutationOptions = Apollo.BaseMutationOptions<ResgisterMutation, ResgisterMutationVariables>;
export const TimerDocument = gql`
    mutation Timer($id: Int!) {
  Timer(id: $id) {
    id
    title
    text
    starttime
    complete
    endtime
    clocktimer
    project {
      id
      title
      colorhex
    }
  }
}
    `;
export type TimerMutationFn = Apollo.MutationFunction<TimerMutation, TimerMutationVariables>;

/**
 * __useTimerMutation__
 *
 * To run a mutation, you first call `useTimerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTimerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [timerMutation, { data, loading, error }] = useTimerMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTimerMutation(baseOptions?: Apollo.MutationHookOptions<TimerMutation, TimerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TimerMutation, TimerMutationVariables>(TimerDocument, options);
      }
export type TimerMutationHookResult = ReturnType<typeof useTimerMutation>;
export type TimerMutationResult = Apollo.MutationResult<TimerMutation>;
export type TimerMutationOptions = Apollo.BaseMutationOptions<TimerMutation, TimerMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    username
  }
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
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const ProjectsDocument = gql`
    query Projects {
  Projects {
    id
    title
    text
    colorhex
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useProjectsQuery__
 *
 * To run a query within a React component, call `useProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useProjectsQuery(baseOptions?: Apollo.QueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, options);
      }
export function useProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, options);
        }
export type ProjectsQueryHookResult = ReturnType<typeof useProjectsQuery>;
export type ProjectsLazyQueryHookResult = ReturnType<typeof useProjectsLazyQuery>;
export type ProjectsQueryResult = Apollo.QueryResult<ProjectsQuery, ProjectsQueryVariables>;
export const ReadsDocument = gql`
    query Reads($limit: Int!, $cursor: String) {
  Reads(limit: $limit, cursor: $cursor) {
    hasMore
    reads {
      id
      title
      textSnippet
      createdAt
      updatedAt
      creatorId
    }
  }
}
    `;

/**
 * __useReadsQuery__
 *
 * To run a query within a React component, call `useReadsQuery` and pass it any options that fit your needs.
 * When your component renders, `useReadsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReadsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useReadsQuery(baseOptions: Apollo.QueryHookOptions<ReadsQuery, ReadsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReadsQuery, ReadsQueryVariables>(ReadsDocument, options);
      }
export function useReadsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReadsQuery, ReadsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReadsQuery, ReadsQueryVariables>(ReadsDocument, options);
        }
export type ReadsQueryHookResult = ReturnType<typeof useReadsQuery>;
export type ReadsLazyQueryHookResult = ReturnType<typeof useReadsLazyQuery>;
export type ReadsQueryResult = Apollo.QueryResult<ReadsQuery, ReadsQueryVariables>;
export const TimersDocument = gql`
    query Timers {
  Timers {
    id
    title
    text
    starttime
    endtime
    complete
    clocktimer
    project {
      id
      title
      colorhex
    }
  }
}
    `;

/**
 * __useTimersQuery__
 *
 * To run a query within a React component, call `useTimersQuery` and pass it any options that fit your needs.
 * When your component renders, `useTimersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTimersQuery({
 *   variables: {
 *   },
 * });
 */
export function useTimersQuery(baseOptions?: Apollo.QueryHookOptions<TimersQuery, TimersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TimersQuery, TimersQueryVariables>(TimersDocument, options);
      }
export function useTimersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TimersQuery, TimersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TimersQuery, TimersQueryVariables>(TimersDocument, options);
        }
export type TimersQueryHookResult = ReturnType<typeof useTimersQuery>;
export type TimersLazyQueryHookResult = ReturnType<typeof useTimersLazyQuery>;
export type TimersQueryResult = Apollo.QueryResult<TimersQuery, TimersQueryVariables>;