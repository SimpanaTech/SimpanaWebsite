"use client";

import { create } from "zustand";

/** Mobile navigation drawer state, shared by the header and its drawer. */
export const useUIStore = create((set) => ({
  mobileNavOpen: false,
  toggleMobileNav: () => set((s) => ({ mobileNavOpen: !s.mobileNavOpen })),
  closeMobileNav: () => set({ mobileNavOpen: false }),
}));
