import { Metadata } from "next";

import { TermsAndPrivacy } from "@/components/terms-and-privacy/terms-and-privacy";

export const metadata: Metadata = {
  title: "Terms & Privacy",
  description: "Read Boltshift's terms and privacy policy.",
};

export default function TermsAndPrivacyPage() {
  return (
    <div className="min-h-screen w-full bg-background px-4 py-10 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-3xl">
        <TermsAndPrivacy />
      </div>
    </div>
  );
}
