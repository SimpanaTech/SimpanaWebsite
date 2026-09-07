import { CONTACT } from "@/data/site";

/**
 * Success and failure messaging for the forms.
 *
 * Failure copy is written per cause: when no form endpoint is configured the
 * visitor is told plainly to email instead, rather than being shown a generic
 * "something went wrong" for a message that was never going to send.
 */
const REASONS = {
  unconfigured: (
    <>
      This form is not connected to a mailbox yet. Please email{" "}
      <a
        href={`mailto:${CONTACT.email}`}
        className="font-medium underline underline-offset-2"
      >
        {CONTACT.email}
      </a>{" "}
      and we will pick it straight up.
    </>
  ),
  network: (
    <>
      That request did not get through — the connection dropped. Please try
      again, or email{" "}
      <a
        href={`mailto:${CONTACT.email}`}
        className="font-medium underline underline-offset-2"
      >
        {CONTACT.email}
      </a>
      .
    </>
  ),
  rejected: (
    <>
      We could not send that. Please try again, or email{" "}
      <a
        href={`mailto:${CONTACT.email}`}
        className="font-medium underline underline-offset-2"
      >
        {CONTACT.email}
      </a>
      .
    </>
  ),
};

export default function FormNotice({ tone = "error", reason, children }) {
  const success = tone === "success";

  return (
    <div
      role={success ? "status" : "alert"}
      className={`flex gap-3 rounded-lg border p-4 text-[15px] ${
        success
          ? "border-leaf-300 bg-leaf-50 text-leaf-700"
          : "border-amber-300 bg-amber-50 text-amber-900"
      }`}
    >
      <svg
        viewBox="0 0 20 20"
        className="mt-0.5 h-5 w-5 flex-none"
        aria-hidden="true"
      >
        {success ? (
          <path
            d="M4 10.5l4 4 8-9"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <>
            <circle
              cx="10"
              cy="10"
              r="7.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <path
              d="M10 6v5M10 13.6v.1"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </>
        )}
      </svg>
      <p>{children ?? REASONS[reason] ?? REASONS.rejected}</p>
    </div>
  );
}
