"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
//^ query client is client-side rendered
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import React from "react";

type ProvidersProps = {
  children: React.ReactNode;
};

export const PlainQCProvider = ({ children }: ProvidersProps) => {
  const [queryClient] = React.useState(
    () => new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

// IMPORTANT: this currently doesnt work as per guidance related to @tanstack/react-query-next-experimental
// see README in app router folder
export const StreamedHydrationQCProvider = ({ children }: ProvidersProps) => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
