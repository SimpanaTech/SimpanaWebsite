"use client";

import { useFormik } from "formik";
import { useEffect } from "react";
import FormField from "@/components/forms/FormField";
import FormNotice from "@/components/forms/FormNotice";
import Button from "@/components/ui/Button";
import { ENQUIRY_TOPICS } from "@/data/content";
import { CONTACT } from "@/data/site";
import { submitForm } from "@/lib/submitForm";
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
    onSubmit: async (values, helpers) => {
      setStatus("submitting");

      const { website, ...clean } = values;
      // Bots fill the honeypot. Report success, deliver nothing.
      if (website) {
        markSubmitted();
        helpers.resetForm({ values: INITIAL });
        return;
      }

      const result = await submitForm({ kind: "enquiry", ...clean });

      if (result.ok) {
        markSubmitted();
        helpers.resetForm({ values: INITIAL });
        return;
      }

      setStatus("error", result.reason);
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

  const busy = status === "submitting" || formik.isSubmitting;

  return (
    <form onSubmit={formik.handleSubmit} noValidate className="space-y-5">
      {status === "success" ? (
        <FormNotice tone="success">
          Thanks — that&apos;s with us. We read every enquiry and usually come
          back within one working day.
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
          {busy ? "Sending…" : "Send enquiry"}
        </Button>
        <p className="text-sm text-ink-500">
          We reply from {CONTACT.email}. No newsletter, no list.
        </p>
      </div>
    </form>
  );
}
