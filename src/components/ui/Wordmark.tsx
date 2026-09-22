/**
 * Brand wordmark: IDÆVIA. "ideæ via" is Latin for "the path of the idea",
 * and the æ ligature is the classical spelling of "ae", hence the domain idaevia.com.
 * Screen readers get the plain "IDAEVIA".
 */
export default function Wordmark({ className = "", accent = true }: { className?: string; accent?: boolean }) {
  return (
    <span className={className} aria-label="IDAEVIA" translate="no">
      <span aria-hidden>ID</span>
      <span aria-hidden className={accent ? "text-accent" : ""}>Æ</span>
      <span aria-hidden>VIA</span>
    </span>
  );
}
