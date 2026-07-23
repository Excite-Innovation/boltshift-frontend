import type { Metadata } from "next";

import { ErrorPageView } from "@/components/error-page/error-page";
import {
  errorCopy,
  errorPageMetadata,
  type ErrorVariant,
} from "@/components/error-page/error-page-data";

export const metadata: Metadata = errorPageMetadata;

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
