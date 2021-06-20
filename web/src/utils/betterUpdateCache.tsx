import { Cache, QueryInput } from "@urql/exchange-graphcache";

export default function betterUpdateCache<Result, Query>(
  result: any,
  queryInput: QueryInput,
  cache: Cache,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(
    queryInput,
    (data) => fn(result, data as any) as any
  );
}
