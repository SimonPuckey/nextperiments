/** TODO
 * Need to retrun a query client with methods that set and get cache?
 * No! need equiv of prefetch so cache and fetch
 * Could scope cahce to module or maybe lower level fn closure?
 * or could return new class with get and set
 */

type QueryInfo = {
  queryKey: string; // array in r-q so args can make more unique, string is fine for now
  queryFn: Function;
};

type SimpleQueryCache = {
  [key: string]: any;
};

type PagedQueryCacheItem = {
  queryResult: any; // well should limit to primitives or result type? improve later
  lastPage: number;
};
type PagedQueryCache = {
  [key: string]: PagedQueryCacheItem;
};

const pagedQueryCache: PagedQueryCache = {}; // shouldnt this be a closure var
export const getQueryClient = () => {
  const prefetchPagedQuery = async ({ queryKey, queryFn }: QueryInfo) => {
    const queryResult = await queryFn();
    pagedQueryCache[queryKey] = { queryResult, lastPage: 1 }; // prefetch should always only get 1st page
    console.log("paged query cache when prefetch", pagedQueryCache);
  };
  /** TODO as NOT WORKING
   * calling get fn the cahce is undefined because have created new query client. Doh
   */
  return {
    prefetchPagedQuery,
    // getCachedPagedQuery,
  };
};

export const getCachedPagedQuery = async (queryKey: string) => {
  console.log("paged query cache when get", pagedQueryCache);
  return pagedQueryCache[queryKey];
};

// const pagedQueryCache: PagedQueryCache = {};
// export const prefetchPagedQuery = async ({ queryKey, queryFn }: QueryInfo) => {
//   const queryResult = await queryFn();
//   pagedQueryCache[queryKey] = { queryResult, lastPage: 1 }; // prefetch should always only get 1st page
//   console.log("paged query cache when prefetch", pagedQueryCache);
// };
// // wlaschin would not like typing with primitives like this! 😂
// export const getCachedPagedQuery = async (queryKey: string) => {
//   console.log("paged query cache when get", pagedQueryCache);
//   return pagedQueryCache[queryKey];
// };
