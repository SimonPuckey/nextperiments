"use client";
import { useEffect } from "react";
// TODO: improve error boundary - low priority
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service?
    // have already logged closer to source of error
    console.error("Error boundary caught error:", error);
  }, [error]);
  return (
    <div>
      <h2>Something went wrong!</h2>
      {/* dont think will allow reset
      and at moment I am in control of errors */}
      {/* <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button> */}
    </div>
  );
}
