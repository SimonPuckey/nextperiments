import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

// ORIG app - controls page initialisation
// function App({ Component, pageProps }: AppProps) {
//    return <Component {...pageProps} />
// }

// override page initialisation
function MyApp({ Component, pageProps }: AppProps) {
   // ensures creates new query client once per app - so users dont share it
   const [queryClient] = React.useState(() => new QueryClient())
   return (
      // Provide the client to your App
      <QueryClientProvider client={queryClient}>
         <Hydrate>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
         </Hydrate>
      </QueryClientProvider>
   )
}

export default MyApp
