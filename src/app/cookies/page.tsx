import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import ConsentControls from "@/components/ConsentControls";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Which cookies and browser storage the IDAEVIA website uses, and how to change your choice.",
};

const UPDATED = "14 September 2026";

export default function CookiesPage() {
  return (
    <>
      <LegalPage
        current="/cookies"
        eyebrow="Legal"
        title="COOKIE POLICY."
        intro="We keep this simple: no advertising cookies, no third-party trackers. The Site uses a small amount of browser storage for your consent choice and for privacy-friendly, first-party analytics that only run if you accept them."
        updated={UPDATED}
        sections={[
          {
            title: "What we store in your browser",
            body: [
              [
                "idevia_consent (localStorage): your choice in the consent banner, \"all\" or \"essential\". Kept until you clear it.",
                "idevia_vid (localStorage): a random visitor identifier so we can count unique visitors. Created only after you accept analytics. Contains no personal data.",
                "idevia_sid (sessionStorage): a random session identifier for the current browser tab. Removed when the tab closes.",
                "idevia_loaded (sessionStorage): remembers that the intro animation already played in this session.",
                "idevia_admin (cookie, httpOnly, secure): only set for IDAEVIA staff who sign in to the administration panel. Never set for visitors.",
              ],
            ],
          },
          {
            title: "Analytics: what we measure and why",
            body: [
              "With your consent we record page views on our own server: the page, the time, the referring domain, device type, screen width and the country derived from your IP address by our hosting provider. We use this to see how many people visit, which pages and products interest them, which countries and devices to optimise for, and where traffic comes from. The IP address is not stored, the data stays in our own database, and it is never shared with advertisers.",
            ],
          },
          {
            title: "Third parties",
            body: [
              "None. There is no Google Analytics, Meta Pixel or similar on this Site. Fonts are served from our own domain. Videos and images are hosted by us.",
            ],
          },
          {
            title: "How to change your choice",
            body: [
              "Use the controls below at any time. \"Essential only\" stops analytics immediately. \"Reset\" also deletes the identifiers from your browser. You can also clear site data in your browser settings.",
            ],
          },
        ]}
      />
      <section className="container-x -mt-16 pb-24">
        <div className="max-w-3xl">
          <ConsentControls />
        </div>
      </section>
    </>
  );
}
