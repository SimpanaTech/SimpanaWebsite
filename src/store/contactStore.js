"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const EMPTY_DRAFT = {
  name: "",
  email: "",
  company: "",
  topic: "",
  message: "",
};

/**
 * Enquiry state.
 *
 * The draft is persisted to sessionStorage so someone who wanders off to a
 * product page mid-enquiry comes back to what they typed. Submission status
 * lives here too, so the header/CTA can reflect "already sent" if we ever
 * want it to.
 */
export const useContactStore = create(
  persist(
    (set) => ({
      draft: { ...EMPTY_DRAFT },
      /** "idle" | "submitting" | "success" | "error" */
      status: "idle",
      feedback: "",
      lastSubmittedAt: null,

      setDraft: (patch) => set((s) => ({ draft: { ...s.draft, ...patch } })),
      clearDraft: () => set({ draft: { ...EMPTY_DRAFT } }),

      setStatus: (status, feedback = "") => set({ status, feedback }),
      markSubmitted: () =>
        set({
          status: "success",
          draft: { ...EMPTY_DRAFT },
          lastSubmittedAt: new Date().toISOString(),
        }),
      resetStatus: () => set({ status: "idle", feedback: "" }),
    }),
    {
      name: "simpana-enquiry-draft",
      storage: createJSONStorage(() =>
        typeof window === "undefined" ? undefined : window.sessionStorage,
      ),
      // Never persist transient submission state.
      partialize: (s) => ({
        draft: s.draft,
        lastSubmittedAt: s.lastSubmittedAt,
      }),
    },
  ),
);
