import { useState } from "react"

/*
* bit different writing a hook that just performs logic rather than retrives data
 */

// haha accidental documentation!!!
/**
 * 
 * @param count 
 * @param pageSize 
 */
export const usePagination = (count: number, pageSize: number) => {
    // TODO: this hook will need to be called before useQuery so query can know page to query for
    // AND AFTER useQuery because this hook uses results from that hook. SEPARATION DOES NOT WORK!
    // const [page, setPage] = useState(1)

    const noOfPages = Math.ceil(count / pageSize)

    return {
        // page,
        // setPage,
        noOfPages
    }

}