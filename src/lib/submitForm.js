/**
 * Form delivery for a static site.
 *
 * The site builds to plain HTML with no server of its own, so submissions go
 * straight from the browser to whatever endpoint is configured in
 * NEXT_PUBLIC_FORM_ENDPOINT - a form service (Formspree, Basin, Web3Forms) or
 * any endpoint of your own that accepts the POST with CORS enabled.
 *
 * Payloads without a file are sent as JSON. As soon as one carries a File - the
 * careers form's CV upload - the whole thing switches to multipart/form-data,
 * which is what those services expect for attachments.
 *
 * With nothing configured the form does not pretend to send: it reports back
 * so the UI can point the visitor at the email address instead.
 */

const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "";
const isFormConfigured = Boolean(FORM_ENDPOINT);

const isFile = (value) => typeof File !== "undefined" && value instanceof File;

function buildBody(payload) {
  const submittedAt = new Date().toISOString();

  if (!Object.values(payload).some(isFile)) {
    return {
      body: JSON.stringify({ ...payload, submittedAt }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
  }

  const form = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value === null || value === undefined || value === "") return;
    form.append(key, value);
  });
  form.append("submittedAt", submittedAt);

  // No Content-Type header: the browser has to set it so the multipart
  // boundary is included.
  return { body: form, headers: { Accept: "application/json" } };
}

/**
 * @returns {Promise<{ok: boolean, reason?: "unconfigured"|"network"|"rejected", message?: string}>}
 */
export async function submitForm(payload) {
  if (!isFormConfigured) {
    // Surface the payload in dev so the form is still testable locally.
    if (process.env.NODE_ENV !== "production") {
      console.info(
        "[form] no NEXT_PUBLIC_FORM_ENDPOINT set. Payload:",
        payload,
      );
    }
    return { ok: false, reason: "unconfigured" };
  }

  try {
    const { body, headers } = buildBody(payload);
    const res = await fetch(FORM_ENDPOINT, { method: "POST", headers, body });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return {
        ok: false,
        reason: "rejected",
        message:
          detail.slice(0, 200) || `The form service returned ${res.status}.`,
      };
    }

    return { ok: true };
  } catch {
    return { ok: false, reason: "network" };
  }
}
