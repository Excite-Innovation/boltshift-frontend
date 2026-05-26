import Image from "next/image";

type LegalSection = {
  title: string;
  content: string | string[];
  ordered?: boolean;
  gapAfterTitle?: boolean;
};

type LegalDocument = {
  title: string;
  effectiveDate: string;
  intro: string;
  sections: LegalSection[];
};

const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  effectiveDate: "Effective Date: Nov 26th, 2023",
  intro:
    'This Privacy Policy describes how Boltshift ("we," "our," or "us") collects, uses, and discloses personal information that we obtain from visitors to our website boltshift.com (the "Site") and customers who purchase products or services through the Site. By accessing or using the Site, you agree to the terms of this Privacy Policy.',
  sections: [
    {
      title: "Information We Collect",
      ordered: true,
      content: [
        "Personal Information: We may collect personal information such as your name, email address, postal address, phone number, and payment information when you register on our Site, place an order, subscribe to our newsletter, or fill out a form.",
        "Usage Information: We may collect non-personal information about your interactions with the Site, including your IP address, browser type, operating system, referring URLs, pages visited, and the date and time of your visit.",
      ],
    },
    {
      title: "How We Use Your Information",
      ordered: true,
      content: [
        "Provide Services: We use your personal information to process and fulfill orders, communicate with you about your orders, and provide customer support.",
        "Marketing Communications: We may use your email address to send you promotional materials, newsletters, and updates about our products and services. You can opt-out of receiving these communications at any time.",
        "Analytics and Improvements: We may use usage information to analyze and improve the functionality of the Site and our services.",
      ],
    },
    {
      title: "Disclosure of Your Information",
      content:
        "We do not sell, trade, or otherwise transfer your personal information to third parties for marketing purposes. However, we may share your information with trusted third-party service providers who assist us in operating our website, conducting our business, or servicing you.",
    },
    {
      title: "Cookies and Tracking Technologies",
      content:
        "We may use cookies and similar tracking technologies to enhance your experience on the Site, understand how you use the Site, and for marketing purposes. You can adjust your browser settings to refuse cookies, but this may affect your ability to access certain features of the Site.",
    },
    {
      title: "Security",
      content:
        "We take reasonable measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the internet or electronic storage is 100% secure.",
    },
    {
      title: "Your Rights",
      content:
        "You have the right to access, correct, update, or delete your personal information. You can exercise these rights by contacting us at legal@excite.company.",
    },
    {
      title: "Children's Privacy",
      content:
        "Our Site is not intended for children under the age of 13. We do not knowingly collect or solicit personal information from children.",
    },
    {
      title: "Changes to this Privacy Policy",
      content:
        "We may update this Privacy Policy from time to time. The most current version will always be posted on our Site.",
    },
    {
      title: "Contact Us",
      content:
        "If you have any questions about this Privacy Policy, please contact us at legal@excite.company.",
    },
  ],
};

const termsAndConditions: LegalDocument = {
  title: "Terms & Conditions",
  effectiveDate: "Effective Date: Nov 26th, 2023",
  intro:
    'Welcome to Boltshift ("we," "our," or "us"). Please read these terms and conditions ("Terms") carefully before using our website boltshift.com (the "Site"). By accessing or using the Site, you agree to be bound by these Terms.',
  sections: [
    {
      title: "Use of the Site",
      ordered: true,
      content: [
        "Eligibility: You must be at least 18 years old to use this Site. By using the Site, you represent and warrant that you have the right, authority, and capacity to enter into these Terms.",
        "Account: If you create an account on our Site, you are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.",
        "Prohibited Activities: You agree not to use the Site for any unlawful purpose or any purpose prohibited by these Terms. This includes, but is not limited to, transmitting any material that is offensive, abusive, defamatory, or violates any third-party rights.",
      ],
    },
    {
      title: "Product Purchases",
      ordered: true,
      content: [
        "Product Information: We strive to provide accurate and up-to-date information about our products. However, we do not warrant that product descriptions, prices, or other content on the Site are accurate, complete, reliable, current, or error-free.",
        "Order Acceptance: Your placement of an order does not necessarily result in acceptance. We reserve the right to accept or decline any order at our sole discretion.",
        "Payment: Payment for products is due at the time of order placement. We accept the payment methods shown during checkout.",
      ],
    },
    {
      title: "Shipping and Returns",
      ordered: true,
      content: [
        "Shipping: We will make reasonable efforts to deliver products within the estimated timeframe. However, we are not responsible for any delays caused by third-party shipping providers.",
        "Returns and Refunds: Please refer to our return and refund policy for information about eligible returns and refunds.",
      ],
    },
    {
      title: "Intellectual Property",
      ordered: true,
      content: [
        "Ownership: All content on the Site, including text, graphics, logos, images, and software, is the property of Boltshift or its licensors and is protected by copyright and other intellectual property laws.",
        "License: You are granted a limited, non-exclusive, revocable license to access and use the Site for personal, non-commercial use. You may not reproduce, distribute, modify, create derivative works, or publicly display any portion of the Site without our prior written consent.",
      ],
    },
    {
      title: "Limitation of Liability",
      ordered: true,
      gapAfterTitle: false,
      content: [
        'Disclaimer of Warranties: The Site and its content are provided "as is" without warranties of any kind, either express or implied.',
        "Limitation of Liability: To the fullest extent permitted by applicable law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages.",
      ],
    },
    {
      title: "Indemnification",
      content:
        "You agree to indemnify and hold us harmless from and against any claims, liabilities, damages, losses, and expenses (including reasonable attorney's fees) arising out of your use of the Site or any violation of these Terms.",
    },
    {
      title: "Governing Law",
      content:
        "These Terms shall be governed by and construed in accordance with the applicable laws, without regard to conflicts of law principles.",
    },
    {
      title: "Changes to the Terms",
      content:
        "We may update these Terms from time to time. The most current version will always be posted on our Site.",
    },
    {
      title: "Contact Us",
      content:
        "If you have any questions about these Terms, please contact us at legal@excite.company.",
    },
  ],
};

function LegalDocumentContent({ document }: { document: LegalDocument }) {
  return (
    <>
      <h1 className="text-3xl font-bold">{document.title}</h1>
      <br />

      <h2 className="text-base font-semibold">{document.effectiveDate}</h2>
      <br />
      <p>{document.intro}</p>
      <br />

      {document.sections.map((section) => (
        <LegalSectionContent key={section.title} section={section} />
      ))}
    </>
  );
}

function LegalSectionContent({ section }: { section: LegalSection }) {
  const hasTitleGap = section.gapAfterTitle ?? true;

  return (
    <>
      <h2 className="text-base font-semibold">{section.title}</h2>
      {hasTitleGap ? <br /> : null}

      {section.ordered && Array.isArray(section.content) ? (
        <ol className="list-decimal list-outside ml-5">
          {section.content.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      ) : (
        <p>{section.content}</p>
      )}
      <br />
    </>
  );
}

export function TermsAndPrivacy() {
  return (
    <main className="text-sm leading-9">
      <LegalDocumentContent document={privacyPolicy} />
      <br />
      <br />

      <LegalDocumentContent document={termsAndConditions} />
      <br />

      <div className="w-full py-12 flex justify-center items-center">
        <Image
          src="/T&C/Excite!_Logo.png"
          alt="Excite! Innovation logo"
          width={204}
          height={84}
          className="mb-4 h-auto w-51"
        />
      </div>
      <br />
      <br />

      <p>© 2023 Excite! Innovation, LLC. All rights reserved.</p>
    </main>
  );
}
