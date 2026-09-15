import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What IDAEVIA collects, why, how long it is kept and your rights.",
};

const UPDATED = "14 September 2026";

export default function PrivacyPage() {
  return (
    <LegalPage
      current="/privacy"
      eyebrow="Legal"
      title="PRIVACY POLICY."
      intro="This policy explains what data IDAEVIA collects when you visit this website or send us a project request, why we collect it, how long we keep it and what rights you have. We keep it short and honest."
      updated={UPDATED}
      sections={[
        {
          title: "Who we are",
          body: [
            "IDAEVIA is a technology and product development company. This website (the \"Site\") is operated by IDAEVIA, which is the controller of the personal data described here. You can reach us through the contact page.",
          ],
        },
        {
          title: "What we collect",
          body: [
            "Analytics (only with your consent). When you accept analytics in the consent banner we record, for each page you open:",
            [
              "the page path (for example /products) and the time",
              "the website that referred you (only its domain, never the full address)",
              "your device type (desktop, tablet or mobile) and screen width",
              "the country, derived by our hosting provider from your IP address; the IP address itself is not stored",
              "a random visitor identifier stored in your browser, and a random session identifier for the current tab",
            ],
            "Project requests. When you submit the contact form we store the details you type: your name, email, company (optional), the type of project, an optional budget range and your description. We also record the country derived from your IP and the time of submission.",
            "We do not collect payment data, precise location, or anything from your device beyond what is listed above.",
          ],
        },
        {
          title: "Why we collect it",
          body: [
            [
              "Analytics: to understand how many people visit, which pages are useful, which countries and devices we should optimise for, and where visitors come from. Legal basis: your consent.",
              "Project requests: to answer you, evaluate the project and, if we work together, to prepare a proposal. Legal basis: taking steps at your request before entering a contract, and our legitimate interest in running the business.",
              "Security: request rate limits and abuse detection use your IP address transiently, in memory, without storing it. Legal basis: our legitimate interest in keeping the Site secure.",
            ],
          ],
        },
        {
          title: "Cookies and local storage",
          body: [
            "The Site does not set advertising or third-party cookies. It uses browser storage for your consent choice, the anonymous visitor identifier and the session identifier, and one secure cookie for the private administration area used by IDAEVIA staff only. Details are in the Cookie Policy.",
          ],
        },
        {
          title: "Who has access",
          body: [
            "Only IDAEVIA. Analytics and project requests are stored in our own database and viewed through a password-protected administration panel. We do not sell, rent or share your data with advertisers. Our hosting provider processes data on our behalf under a data processing agreement, and derives the country from your IP address as part of delivering the Site.",
          ],
        },
        {
          title: "How long we keep it",
          body: [
            [
              "Analytics page views: up to 24 months, then deleted or aggregated.",
              "Project requests: for as long as needed to handle the request and any resulting work, and up to 3 years after our last contact unless a contract requires longer.",
              "Consent choice and identifiers: stored in your browser until you clear them or withdraw consent.",
            ],
          ],
        },
        {
          title: "Your rights",
          body: [
            "Depending on where you live (including under the GDPR), you can ask us to access, correct, delete, export or restrict the processing of your personal data, and you can object to processing based on legitimate interest. You can withdraw analytics consent at any time from the Cookie Policy page; it stops future collection and does not affect what was lawful before. To exercise any right, contact us through the contact page. You also have the right to lodge a complaint with your data protection authority.",
          ],
        },
        {
          title: "Security",
          body: [
            "Data is encrypted in transit (HTTPS). The Site enforces a strict content security policy, rate limiting, and same-origin checks on every form. Access to the database is restricted to the server; it is never exposed to the browser. The administration panel is protected by a strong password, a signed session and automatic lockout after repeated failed attempts.",
          ],
        },
        {
          title: "Children",
          body: ["The Site is not directed at children under 16 and we do not knowingly collect data from them."],
        },
        {
          title: "Changes",
          body: ["We may update this policy. The date at the top shows the latest version. Material changes will be announced on the Site."],
        },
      ]}
    />
  );
}
