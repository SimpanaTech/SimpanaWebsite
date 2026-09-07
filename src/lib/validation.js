import * as Yup from "yup";

/**
 * Yup schemas shared by the Formik forms (client) and the route handler
 * (server), so a payload can never pass in the browser and fail silently on
 * the way in - or bypass the browser entirely.
 */

const name = Yup.string()
  .trim()
  .min(2, "Please use at least 2 characters.")
  .max(80, "That is longer than we can store (80 max).")
  .required("Tell us who you are.");

const email = Yup.string()
  .trim()
  .email("That does not look like an email address.")
  .max(160, "That address is too long.")
  .required("We need an address to reply to.");

export const enquirySchema = Yup.object({
  name,
  email,
  company: Yup.string().trim().max(120, "120 characters max.").default(""),
  topic: Yup.string()
    .trim()
    .max(120, "120 characters max.")
    .required("Pick the closest match."),
  message: Yup.string()
    .trim()
    .min(20, "A sentence or two helps - 20 characters minimum.")
    .max(4000, "Please keep it under 4000 characters.")
    .required("Tell us what you are trying to solve."),
  // Honeypot: real people never fill this in.
  website: Yup.string().max(0),
});

/** Resume upload limits. 5 MB is what the common form services accept. */
export const RESUME_MAX_BYTES = 5 * 1024 * 1024;
export const RESUME_ACCEPT = ".pdf,.doc,.docx";

const RESUME_MIME = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

/** Some browsers report an empty or odd MIME type, so fall back to extension. */
const looksLikeResume = (file) =>
  RESUME_MIME.includes(file.type) || /\.(pdf|docx?)$/i.test(file.name || "");

export const applicationSchema = Yup.object({
  name,
  email,
  role: Yup.string()
    .trim()
    .max(120)
    .required("Which role are you applying for?"),
  portfolio: Yup.string()
    .trim()
    .url("Include the full URL, starting with https://")
    .max(300, "That URL is too long.")
    .default(""),
  message: Yup.string()
    .trim()
    .min(20, "A short introduction helps - 20 characters minimum.")
    .max(4000, "Please keep it under 4000 characters.")
    .required("Introduce yourself briefly."),
  // A File, set by the upload field. The tests only ever run in the browser,
  // so referencing File inside them is safe during a static build.
  resume: Yup.mixed()
    .required("Attach your CV.")
    .test("size", "That file is over 5 MB. Please compress it.", (file) =>
      file ? file.size <= RESUME_MAX_BYTES : true,
    )
    .test("type", "Use a PDF, DOC, or DOCX file.", (file) =>
      file ? looksLikeResume(file) : true,
    ),
  website: Yup.string().max(0),
});
