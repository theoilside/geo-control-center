/**
 * Generated by orval v6.27.1 🍺
 * Do not edit manually.
 * API Geo
 * OpenAPI spec version: 0.1.0
 */
import { useMutation } from "@tanstack/react-query";
import type {
  MutationFunction,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import type {
  BodyAuthJwtLoginAuthLoginPost,
  ErrorModel,
  HTTPValidationError,
  UserCreate,
  UserRead,
} from "../../model";
import { customInstance } from "../../../orvalAxios";

/**
 * @summary Auth:Jwt.Login
 */
export const authJwtLoginAuthLoginPost = (
  bodyAuthJwtLoginAuthLoginPost: BodyAuthJwtLoginAuthLoginPost,
) => {
  return customInstance<unknown | void>({
    url: `/auth/login`,
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: bodyAuthJwtLoginAuthLoginPost,
  });
};

export const getAuthJwtLoginAuthLoginPostMutationOptions = <
  TError = ErrorModel | HTTPValidationError,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authJwtLoginAuthLoginPost>>,
    TError,
    { data: BodyAuthJwtLoginAuthLoginPost },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof authJwtLoginAuthLoginPost>>,
  TError,
  { data: BodyAuthJwtLoginAuthLoginPost },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authJwtLoginAuthLoginPost>>,
    { data: BodyAuthJwtLoginAuthLoginPost }
  > = (props) => {
    const { data } = props ?? {};

    return authJwtLoginAuthLoginPost(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type AuthJwtLoginAuthLoginPostMutationResult = NonNullable<
  Awaited<ReturnType<typeof authJwtLoginAuthLoginPost>>
>;
export type AuthJwtLoginAuthLoginPostMutationBody =
  BodyAuthJwtLoginAuthLoginPost;
export type AuthJwtLoginAuthLoginPostMutationError =
  | ErrorModel
  | HTTPValidationError;

/**
 * @summary Auth:Jwt.Login
 */
export const useAuthJwtLoginAuthLoginPost = <
  TError = ErrorModel | HTTPValidationError,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authJwtLoginAuthLoginPost>>,
    TError,
    { data: BodyAuthJwtLoginAuthLoginPost },
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<typeof authJwtLoginAuthLoginPost>>,
  TError,
  { data: BodyAuthJwtLoginAuthLoginPost },
  TContext
> => {
  const mutationOptions = getAuthJwtLoginAuthLoginPostMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary Auth:Jwt.Logout
 */
export const authJwtLogoutAuthLogoutPost = () => {
  return customInstance<unknown | void>({
    url: `/auth/logout`,
    method: "POST",
  });
};

export const getAuthJwtLogoutAuthLogoutPostMutationOptions = <
  TError = void,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authJwtLogoutAuthLogoutPost>>,
    TError,
    void,
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof authJwtLogoutAuthLogoutPost>>,
  TError,
  void,
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authJwtLogoutAuthLogoutPost>>,
    void
  > = () => {
    return authJwtLogoutAuthLogoutPost();
  };

  return { mutationFn, ...mutationOptions };
};

export type AuthJwtLogoutAuthLogoutPostMutationResult = NonNullable<
  Awaited<ReturnType<typeof authJwtLogoutAuthLogoutPost>>
>;

export type AuthJwtLogoutAuthLogoutPostMutationError = void;

/**
 * @summary Auth:Jwt.Logout
 */
export const useAuthJwtLogoutAuthLogoutPost = <
  TError = void,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authJwtLogoutAuthLogoutPost>>,
    TError,
    void,
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<typeof authJwtLogoutAuthLogoutPost>>,
  TError,
  void,
  TContext
> => {
  const mutationOptions =
    getAuthJwtLogoutAuthLogoutPostMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary Register:Register
 */
export const registerRegisterAuthRegisterPost = (userCreate: UserCreate) => {
  return customInstance<UserRead>({
    url: `/auth/register`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: userCreate,
  });
};

export const getRegisterRegisterAuthRegisterPostMutationOptions = <
  TError = ErrorModel | HTTPValidationError,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof registerRegisterAuthRegisterPost>>,
    TError,
    { data: UserCreate },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof registerRegisterAuthRegisterPost>>,
  TError,
  { data: UserCreate },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof registerRegisterAuthRegisterPost>>,
    { data: UserCreate }
  > = (props) => {
    const { data } = props ?? {};

    return registerRegisterAuthRegisterPost(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type RegisterRegisterAuthRegisterPostMutationResult = NonNullable<
  Awaited<ReturnType<typeof registerRegisterAuthRegisterPost>>
>;
export type RegisterRegisterAuthRegisterPostMutationBody = UserCreate;
export type RegisterRegisterAuthRegisterPostMutationError =
  | ErrorModel
  | HTTPValidationError;

/**
 * @summary Register:Register
 */
export const useRegisterRegisterAuthRegisterPost = <
  TError = ErrorModel | HTTPValidationError,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof registerRegisterAuthRegisterPost>>,
    TError,
    { data: UserCreate },
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<typeof registerRegisterAuthRegisterPost>>,
  TError,
  { data: UserCreate },
  TContext
> => {
  const mutationOptions =
    getRegisterRegisterAuthRegisterPostMutationOptions(options);

  return useMutation(mutationOptions);
};