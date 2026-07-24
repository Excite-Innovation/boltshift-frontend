import type { Metadata } from "next";

import { ErrorPageView } from "@/components/error-page/error-page";
import { notFoundPageMetadata } from "@/components/error-page/error-page-data";

export const metadata: Metadata = notFoundPageMetadata;

export default function NotFound() {
  return <ErrorPageView variant="404" />;
}
