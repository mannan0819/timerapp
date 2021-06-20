import { stringifyVariables } from "@urql/core";
import { Resolver } from "@urql/exchange-graphcache";
import {
  LogoutMutation,
  MeQuery,
  MeDocument,
  LoginMutation,
  ResgisterMutation,
} from "../generated/graphql";
import betterUpdateCache from "./betterUpdateCache";

const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isItInTheCache = cache.resolve(
      cache.resolveFieldByKey(entityKey, fieldKey) as string,
      "reads"
    );
    info.partial = !isItInTheCache;
    let hasMore = true;
    const results: string[] = [];
    fieldInfos.forEach((fi) => {
      const key = cache.resolveFieldByKey(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(key, "reads") as string[];
      const _hasMore = cache.resolve(key, "hasMore");
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      results.push(...data);
    });

    return {
      __typename: "PaginatedReads",
      hasMore,
      reads: results,
    };
  };
};

export default {
  resolvers: {
    Query: {
      Reads: cursorPagination(),
    },
  },
  updates: {
    Mutation: {
      logout: (_result: any, args, cache, info) => {
        betterUpdateCache<LogoutMutation, MeQuery>(
          _result,
          { query: MeDocument },
          cache,
          () => {
            return { me: null };
          }
        );
      },
      Login: (_result: any, args, cache, info) => {
        betterUpdateCache<LoginMutation, MeQuery>(
          _result,
          { query: MeDocument },
          cache,
          (result, query) => {
            if (result.Login.error) {
              return query;
            } else {
              return {
                me: result.Login.user,
              };
            }
          }
        );
      },
      register: (_result: any, args, cache, info) => {
        betterUpdateCache<ResgisterMutation, MeQuery>(
          _result,
          { query: MeDocument },
          cache,
          (result, query) => {
            if (result.register.error) {
              return query;
            } else {
              return {
                me: result.register.user,
              };
            }
          }
        );
      },
    },
  },
};
