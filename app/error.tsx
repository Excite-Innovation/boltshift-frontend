"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw } from "lucide-react";

import { ErrorPageView } from "@/components/error-page/error-page";
import { Button } from "@/components/ui/button";

type AppErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function AppError({ error, reset }: AppErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorPageView
      variant="500"
      showChrome={false}
      primaryAction={
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button size="lg" className="w-full sm:w-auto" onClick={reset}>
            <RefreshCw className="size-4" />
            Try again
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="w-full sm:w-auto"
          >
            <Link href="/">
              <ArrowLeft className="size-4" />
              Return home
            </Link>
          </Button>
        </div>
      }
    />
  );
}
