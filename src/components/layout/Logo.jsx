import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/data/site";

/**
 * Brand artwork.
 *
 * `public/logo.png` is the full lockup - the three interlocking pieces plus
 * the wordmark - and `public/logo-mark.png` is the mark on its own, for places
 * that set their own text beside it (the footer does, in white).
 *
 * Both are keyed off Simpana's supplied white-ground artwork, so the white is
 * transparent and they sit on any background. They stay PNG because that is
 * the master Simpana has; at a few KB each the request is not worth arguing
 * with. If vector artwork turns up later, swap the files and the `src` here -
 * the intrinsic sizes below are the only other thing to update.
 */

export function LogoMark({ className = "h-9 w-auto" }) {
  return (
    <Image
      src="/logo-mark.png"
      alt=""
      width={106}
      height={144}
      className={className}
      priority
    />
  );
}

export default function Logo({ className = "", onClick }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${SITE.name} — home`}
      className={`inline-flex items-center rounded-lg opacity-100
                  transition-opacity duration-200 hover:opacity-80 ${className}`}
    >
      {/* The wordmark is part of the artwork, so the alt text carries the
          company name and no separate text node is needed. */}
      <Image
        src="/logo.png"
        alt={SITE.name}
        width={370}
        height={160}
        className="h-9 w-auto sm:h-10"
        priority
      />
    </Link>
  );
}
