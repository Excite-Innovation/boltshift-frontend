import type { Metadata } from "next";

import { ErrorPageView, errorCopy, type ErrorVariant } from "@/components/error-page/error-page";

export const metadata: Metadata = {
  title: "Error",
  description: "Something went wrong while loading this page.",
};

type ErrorPageProps = {
  searchParams?: Promise<{
    type?: string;
  }>;
};

export default async function ErrorPage({ searchParams }: ErrorPageProps) {
  const params = await searchParams;
  const variant =
    params?.type && Object.hasOwn(errorCopy, params.type)
      ? (params.type as ErrorVariant)
      : "404";

  return <ErrorPageView variant={variant} />;
}
