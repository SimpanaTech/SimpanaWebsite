"use client";

import { useFormik } from "formik";
import { useState } from "react";
import FileField from "@/components/forms/FileField";
import FormField from "@/components/forms/FormField";
import FormNotice from "@/components/forms/FormNotice";
import Button from "@/components/ui/Button";
import { ROLES } from "@/data/content";
import { CONTACT } from "@/data/site";
import { buildApplicationEmail, openGmailCompose } from "@/lib/composeEmail";
import { RESUME_ACCEPT, applicationSchema } from "@/lib/validation";

const INITIAL = {
  name: "",
  email: "",
  role: "",
  portfolio: "",
  message: "",
  resume: null,
  website: "",
};

export default function ApplicationForm({ defaultRole = "" }) {
  const [state, setState] = useState({ status: "idle", url: null, cv: null });

  const formik = useFormik({
    initialValues: { ...INITIAL, role: defaultRole },
    validationSchema: applicationSchema,
    // Synchronous on purpose - see the note in ContactForm. Awaiting anything
    // before the window.open costs us the user gesture and the tab is blocked.
    onSubmit: (values, helpers) => {
      // See the note in ContactForm: Formik does not reset `isSubmitting` for
      // a synchronous handler, so the button would never re-enable.
      helpers.setSubmitting(false);

      const { website, ...clean } = values;
      if (website) {
        setState({ status: "success", url: null, cv: null });
        helpers.resetForm({ values: { ...INITIAL, role: defaultRole } });
        return;
      }

      const message = buildApplicationEmail(clean);
      const result = openGmailCompose(message);

      // Values are kept: the CV still has to be attached by hand in the Gmail
      // tab, and clearing the form would leave nothing to refer back to.
      setState({
        status: result.blocked ? "blocked" : "success",
        url: result.url,
        cv: message.attachmentName,
      });
    },
  });

  const busy = formik.isSubmitting;

  return (
    <form onSubmit={formik.handleSubmit} noValidate className="space-y-5">
      {state.status === "success" ? (
        <FormNotice tone="success">
          Gmail is open in a new tab with your application filled in.{" "}
          <strong className="font-semibold">
            Attach {state.cv ?? "your CV"} and press Send
          </strong>{" "}
          — a web page cannot attach a file to an email for you, so that last
          step is yours.{" "}
          <a
            href={state.url}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-2"
          >
            Reopen that tab
          </a>{" "}
          if it did not appear.
        </FormNotice>
      ) : null}

      {state.status === "blocked" ? (
        <FormNotice>
          Your browser blocked the Gmail tab.{" "}
          <a
            href={state.url}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-2"
          >
            Open it manually
          </a>
          , attach {state.cv ?? "your CV"}, and send — or email {CONTACT.email}{" "}
          directly.
        </FormNotice>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          id="apply-name"
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          )}
        </FormField>

        <FormField
          id="apply-email"
          name="email"
          label="Email"
          required
          error={formik.errors.email}
          touched={formik.touched.email}
        >
          {(props) => (
            <input
              {...props}
              type="email"
              autoComplete="email"
              placeholder="you@email.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          )}
        </FormField>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          id="apply-role"
          name="role"
          label="Role"
          required
          error={formik.errors.role}
          touched={formik.touched.role}
        >
          {(props) => (
            <select
              {...props}
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Select a role…</option>
              {ROLES.map((role) => (
                <option key={role.id} value={role.title}>
                  {role.title}
                </option>
              ))}
              <option value="Open application">Open application</option>
            </select>
          )}
        </FormField>

        <FormField
          id="apply-portfolio"
          name="portfolio"
          label="Portfolio or LinkedIn"
          hint="Optional, but it helps."
          error={formik.errors.portfolio}
          touched={formik.touched.portfolio}
        >
          {(props) => (
            <input
              {...props}
              type="url"
              inputMode="url"
              placeholder="https://"
              value={formik.values.portfolio}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          )}
        </FormField>
      </div>

      <FormField
        id="apply-message"
        name="message"
        label="Tell us about your work"
        required
        error={formik.errors.message}
        touched={formik.touched.message}
      >
        {(props) => (
          <textarea
            {...props}
            rows={6}
            placeholder="What have you built, and what would you want to build here?"
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        )}
      </FormField>

      <FileField
        id="apply-resume"
        name="resume"
        label="Your CV"
        required
        accept={RESUME_ACCEPT}
        hint="PDF, DOC, or DOCX · up to 5 MB. Named in the email so you can attach it in Gmail — browsers cannot attach it for you."
        file={formik.values.resume}
        error={formik.errors.resume}
        touched={formik.touched.resume}
        onSelect={(file) => {
          formik.setFieldValue("resume", file);
          formik.setFieldTouched("resume", true, false);
        }}
        onBlur={() => formik.setFieldTouched("resume", true)}
      />

      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label htmlFor="apply-website">Leave this field empty</label>
        <input
          id="apply-website"
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
          Opens Gmail with your details filled in — attach your CV there, then
          send. Prefer to do it yourself? {CONTACT.email}
        </p>
      </div>
    </form>
  );
}
