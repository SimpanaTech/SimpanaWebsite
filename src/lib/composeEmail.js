import { CONTACT, SITE } from "@/data/site";

/**
 * Form delivery by handing the visitor a pre-filled email.
 *
 * The site is a static export with no server of its own, so instead of posting
 * a payload anywhere we compose the message and open the visitor's Gmail
 * compose window with every field already typed in. They press Send; it
 * arrives at CONTACT.email from their own address, so replying just works.
 *
 * Two things this deliberately cannot do, because no browser or mail provider
 * allows it:
 *
 *   - Attach a file. There is no attachment parameter on a Gmail compose URL
 *     or on `mailto:`; it is blocked so a page cannot silently exfiltrate a
 *     file from your disk. The CV is named in the body instead and the UI asks
 *     the applicant to attach it, which is the one manual step left.
 *   - Force the From address. Gmail sends as whoever is signed in. The address
 *     typed into the form is written into the body as the reply-to, so it
 *     survives even if the two differ.
 */

/** Gmail rejects absurdly long compose URLs; keep well inside the limit. */
const MAX_BODY = 6000;

const line = (label, value) =>
  value ? `${label.padEnd(11)}${value}` : null;

// Drops the null entries `line` returns for empty fields, but keeps ""
// entries - those are the deliberate blank lines between sections.
const block = (parts) => parts.filter((part) => part != null).join("\n");

function trimBody(body) {
  if (body.length <= MAX_BODY) return body;
  return `${body.slice(0, MAX_BODY - 60)}\n\n[Message truncated - please continue below.]`;
}

export function buildEnquiryEmail(values) {
  const subject = `Website enquiry - ${values.topic || "General"} - ${values.name}`;

  const body = trimBody(
    block([
      "New enquiry from the Simpana website.",
      "",
      block([
        line("Name:", values.name),
        line("Email:", values.email),
        line("Company:", values.company),
        line("Topic:", values.topic),
      ]),
      "",
      "Message",
      "-------",
      values.message,
      "",
      "--",
      `Sent from ${SITE.url}/contact`,
      `Reply to: ${values.email}`,
    ]),
  );

  return { to: CONTACT.email, subject, body };
}

export function buildApplicationEmail(values) {
  const subject = `Application - ${values.role || "Open application"} - ${values.name}`;
  const cv = values.resume?.name;

  const body = trimBody(
    block([
      "New application from the Simpana careers page.",
      "",
      block([
        line("Name:", values.name),
        line("Email:", values.email),
        line("Role:", values.role),
        line("Portfolio:", values.portfolio),
      ]),
      "",
      "About",
      "-----",
      values.message,
      ...(cv
        ? ["", "CV", "--", `${cv}  <-- please attach this file before sending`]
        : []),
      "",
      "--",
      `Sent from ${SITE.url}/careers`,
      `Reply to: ${values.email}`,
    ]),
  );

  return { to: CONTACT.email, subject, body, attachmentName: cv };
}

export function gmailComposeUrl({ to, subject, body }) {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to,
    su: subject,
    body,
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
}

export function mailtoUrl({ to, subject, body }) {
  const params = new URLSearchParams({ subject, body });
  return `mailto:${to}?${params.toString()}`;
}

/**
 * Opens the Gmail compose window.
 *
 * MUST be called synchronously from the submit handler - `await` anything
 * first and the browser drops the user-gesture that lets a popup through.
 * Returns `blocked` so the caller can offer the link manually instead.
 */
export function openGmailCompose(message) {
  const url = gmailComposeUrl(message);

  if (typeof window === "undefined") return { ok: false, blocked: true, url };

  const win = window.open(url, "_blank");
  if (!win) return { ok: false, blocked: true, url };

  // Sever the opener so the new tab cannot reach back into this page.
  win.opener = null;
  return { ok: true, blocked: false, url };
}
