"use client";

import { useFormik } from "formik";
import { useEffect } from "react";
import FormField from "@/components/forms/FormField";
import FormNotice from "@/components/forms/FormNotice";
import Button from "@/components/ui/Button";
import { ENQUIRY_TOPICS } from "@/data/content";
import { CONTACT } from "@/data/site";
import { buildEnquiryEmail, openGmailCompose } from "@/lib/composeEmail";
import { enquirySchema } from "@/lib/validation";
import { useContactStore } from "@/store/contactStore";

const INITIAL = {
  name: "",
  email: "",
  company: "",
  topic: "",
  message: "",
  website: "", // honeypot
};

export default function ContactForm() {
  const setDraft = useContactStore((s) => s.setDraft);
  const setStatus = useContactStore((s) => s.setStatus);
  const markSubmitted = useContactStore((s) => s.markSubmitted);
  const status = useContactStore((s) => s.status);
  const feedback = useContactStore((s) => s.feedback);

  const formik = useFormik({
    initialValues: INITIAL,
    validationSchema: enquirySchema,
    // Deliberately synchronous: opening the Gmail tab has to happen inside the
    // user gesture that submitted the form, and a single `await` before it is
    // enough for the browser to treat the popup as unsolicited and block it.
    onSubmit: (values, helpers) => {
      // Formik bails out of its own submit bookkeeping when the handler is
      // synchronous ("consumer is responsible for cleaning up via
      // setSubmitting(false)"), so clear it here or the button stays disabled
      // after the first press.
      helpers.setSubmitting(false);

      const { website, ...clean } = values;
      // Bots fill the honeypot. Report success, deliver nothing.
      if (website) {
        markSubmitted();
        helpers.resetForm({ values: INITIAL });
        return;
      }

      const result = openGmailCompose(buildEnquiryEmail(clean));

      // The values stay put on success. Gmail has its own copy now, but the
      // send happens over there and we never learn whether it went - clearing
      // the form would throw the enquiry away if that tab is closed.
      setStatus(result.blocked ? "blocked" : "success", result.url);
    },
  });

  // Restore anything typed earlier in this session. Runs after mount so the
  // first client render matches the prerendered HTML.
  useEffect(() => {
    const draft = useContactStore.getState().draft;
    if (Object.values(draft).some(Boolean)) {
      formik.setValues({ ...INITIAL, ...draft });
    }
    // Mount-only: this is a one-shot restore.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const track = (event) => {
    formik.handleChange(event);
    const { name, value } = event.target;
    if (name !== "website") setDraft({ [name]: value });
  };

  const busy = formik.isSubmitting;

  return (
    <form onSubmit={formik.handleSubmit} noValidate className="space-y-5">
      {status === "success" ? (
        <FormNotice tone="success">
          Gmail is open in a new tab with your enquiry ready to go —{" "}
          <strong className="font-semibold">press Send there to finish</strong>.
          Nothing has reached us until you do.{" "}
          <a
            href={feedback}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-2"
          >
            Reopen that tab
          </a>{" "}
          if it did not appear.
        </FormNotice>
      ) : null}

      {status === "blocked" ? (
        <FormNotice>
          Your browser blocked the Gmail tab.{" "}
          <a
            href={feedback}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-2"
          >
            Open it manually
          </a>{" "}
          — your enquiry is already filled in — or email {CONTACT.email}.
        </FormNotice>
      ) : null}

      {status === "error" ? <FormNotice reason={feedback} /> : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          id="contact-name"
          name="name"
          label="Your name"
          required
          error={formik.errors.name}
          touched={formik.touched.name}
        >
          {(props) => (
            <input
              {...props}
              type="text"
              autoComplete="name"
              placeholder="Priya Deshmukh"
              value={formik.values.name}
              onChange={track}
              onBlur={formik.handleBlur}
            />
          )}
        </FormField>

        <FormField
          id="contact-email"
          name="email"
          label="Work email"
          required
          error={formik.errors.email}
          touched={formik.touched.email}
        >
          {(props) => (
            <input
              {...props}
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={formik.values.email}
              onChange={track}
              onBlur={formik.handleBlur}
            />
          )}
        </FormField>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          id="contact-company"
          name="company"
          label="Company"
          error={formik.errors.company}
          touched={formik.touched.company}
        >
          {(props) => (
            <input
              {...props}
              type="text"
              autoComplete="organization"
              placeholder="Optional"
              value={formik.values.company}
              onChange={track}
              onBlur={formik.handleBlur}
            />
          )}
        </FormField>

        <FormField
          id="contact-topic"
          name="topic"
          label="What can we help with?"
          required
          error={formik.errors.topic}
          touched={formik.touched.topic}
        >
          {(props) => (
            <select
              {...props}
              value={formik.values.topic}
              onChange={track}
              onBlur={formik.handleBlur}
            >
              <option value="">Select one…</option>
              {ENQUIRY_TOPICS.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          )}
        </FormField>
      </div>

      <FormField
        id="contact-message"
        name="message"
        label="Tell us about the problem"
        required
        hint="Stock accuracy, dispatch speed, systems that will not talk to each other — whatever it is."
        error={formik.errors.message}
        touched={formik.touched.message}
      >
        {(props) => (
          <textarea
            {...props}
            rows={6}
            placeholder="Describe the operation and what is going wrong."
            value={formik.values.message}
            onChange={track}
            onBlur={formik.handleBlur}
          />
        )}
      </FormField>

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={formik.values.website}
          onChange={formik.handleChange}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <Button type="submit" size="lg" disabled={busy}>
          {busy ? "Opening Gmail…" : "Compose in Gmail"}
        </Button>
        <p className="text-sm text-ink-500">
          Opens Gmail with this enquiry filled in, addressed to {CONTACT.email}.
        </p>
      </div>
    </form>
  );
}
