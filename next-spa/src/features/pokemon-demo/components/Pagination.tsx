import { useState } from "react";

type PaginationProps = {
  count: number;
  pageSize: number;
  setPage: Function; // make more precise
};
export const Pagination = ({ count, pageSize, setPage }: PaginationProps) => {
  /* Pseudo
   * receive data count & pageSize and work out number of pages required
   * create buttons that update state for each page
   * highlight button that matches current state
   * on button click update pagination state
   * when state updates should client-side query for data based on page number
   */
  /*
   this looks good but use a hook which is intersting. will compare and possibly steal
   https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/
   */
  /** Other pagination & react query resources
   * https://tanstack.com/query/v4/docs/react/guides/paginated-queries
   * https://dev.to/elisabethleonhardt/how-to-combine-ssr-and-pagination-with-react-query-4ihp
   */

  /*
   Notice that we are using Math.ceil to round of the number to the next higher integer value. 
   This ensures that we are reserving an extra page for the remaining data. 
    */
  const pages = Math.ceil(count / pageSize);

  // ROUGHLY WORKS! but..
  // TODO: need to sort out the display of possible pages, make horizontal, highlight current etc
  return (
    <ul>
      {[...Array(pages)].map((_value: undefined, index: number) => (
        <li key={index}>
          <button onClick={() => setPage(index)}>{index + 1}</button>
        </li>
      ))}
    </ul>
  );
};

//     {/* attempt to add pagination controls
// below is just steal with prev <> next
// i want to calc mnumber of pages
// */}
// <div className='nav btn-container'>
//    <button
//       onClick={() => setPage(prevState => Math.max(prevState - 1, 0))}
//       disabled={page === 1}
//    >Prev Page</button>

//    <button
//       onClick={() => setPage(prevState => prevState + 1)}
//    >Next Page</button>
// </div>
