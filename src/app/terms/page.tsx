import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that apply when you use the IDAEVIA website or send us a project request.",
};

const UPDATED = "14 September 2026";

export default function TermsPage() {
  return (
    <LegalPage
      current="/terms"
      eyebrow="Legal"
      title="TERMS OF SERVICE."
      intro="These terms apply to your use of the IDAEVIA website and to project requests sent through it. Work we agree to do for you is governed by a separate written agreement."
      updated={UPDATED}
      sections={[
        {
          title: "Using the Site",
          body: [
            "You may browse the Site and use the contact form to tell us about a project. You agree not to misuse the Site: no attempts to breach, overload, scrape at scale, reverse-engineer or circumvent its security; no submitting false, abusive or unlawful content; no impersonating another person or company.",
          ],
        },
        {
          title: "Project requests",
          body: [
            "Sending a request through the contact form does not create a contract and does not oblige IDAEVIA to accept the project. If we decide to work together, the scope, price, timeline and responsibilities are set out in a separate written proposal or agreement, which takes precedence over these terms.",
          ],
        },
        {
          title: "Products and projects shown",
          body: [
            "Products, projects and demos presented on the Site are shown for information. Screenshots, numbers and interactive previews illustrate what we build and may differ from the live products. Third-party products and brands mentioned belong to their respective owners.",
          ],
        },
        {
          title: "Intellectual property",
          body: [
            "The Site, its design, text, code, 3D assets, animations and logos are owned by IDAEVIA or its licensors and protected by copyright and trademark law. You may not copy, modify or redistribute them without written permission, except for viewing the Site in a browser.",
          ],
        },
        {
          title: "Confidentiality of what you send us",
          body: [
            "We treat the ideas and details you share through the contact form as confidential and use them only to evaluate and discuss the project. If you need a signed NDA before sharing details, ask for it first.",
          ],
        },
        {
          title: "No warranty",
          body: [
            "The Site is provided \"as is\". We work to keep it available and accurate but do not guarantee that it is error-free or uninterrupted. To the extent permitted by law, IDAEVIA is not liable for indirect or consequential losses arising from your use of the Site.",
          ],
        },
        {
          title: "Privacy",
          body: ["How we handle personal data is described in the Privacy Policy and the Cookie Policy, which form part of these terms."],
        },
        {
          title: "Changes and contact",
          body: [
            "We may update these terms; the date at the top shows the latest version. Continued use of the Site after a change means you accept the updated terms. Questions: use the contact page.",
          ],
        },
      ]}
    />
  );
}
