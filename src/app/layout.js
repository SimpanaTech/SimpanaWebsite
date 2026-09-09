import {
  Carter_One,
  Instrument_Serif,
  Inter,
  Manrope,
} from "next/font/google";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { SITE } from "@/data/site";
import "@/styles/globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// The hero headline only. Carter One ships a single weight (400) - there is no
// bold to ask for, so anything that sets 700 on it gets a synthesised fake
// bold, which smears the rounded terminals. See `.font-hero` usage.
const carterOne = Carter_One({
  variable: "--font-carter-one",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

// The hero's payoff line. A high-contrast display serif against Carter One's
// chunky rounded sans - the jump in structure is what makes the last clause
// land. Italic only; the roman would just read as a different font rather
// than a change of voice. Single weight (400), which is by design: it is
// drawn for display sizes, where 400 carries plenty.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — warehouse & supply-chain software`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "warehouse management system",
    "inventory management system",
    "supply chain software",
    "WMS India",
    "3PL software",
    "Pune software company",
    "SAP consulting",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: SITE.locale,
    url: SITE.url,
    title: `${SITE.name} — warehouse & supply-chain software`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — warehouse & supply-chain software`,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport = {
  themeColor: "#0f2a44",
  colorScheme: "light",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={[
        manrope.variable,
        inter.variable,
        carterOne.variable,
        instrumentSerif.variable,
      ].join(" ")}
    >
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only rounded-lg bg-brand-900 px-4 py-2 text-white
                     focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100]"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
